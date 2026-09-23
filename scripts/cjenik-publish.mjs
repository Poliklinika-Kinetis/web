#!/usr/bin/env node
/**
 * Generira novu verziju cjenika u CSV formatu prema Odluci o objavi cjenika
 * proizvoda i usluga (NN 101/2026) i pojašnjenju Ministarstva gospodarstva.
 *
 * Upotreba:
 *   npm run cjenik:publish                       # objava = sada
 *   npm run cjenik:publish -- --objava 2026-10-01T07:45
 *   npm run cjenik:publish -- --dry-run          # samo ispis, bez pisanja
 *   npm run cjenik:publish -- --force            # objavi i ako nema promjena
 *
 * Skripta čita src/data/cjenik.json, zapisuje public/cjenik/<propisani naziv>.csv,
 * osvježava public/cjenik/cjenik-aktualni.csv i dodaje verziju u src/data/cjenik-arhiva.json.
 * Stare datoteke se nikad ne brišu (arhiva mora biti dostupna najmanje 30 dana).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CJENIK_JSON = path.join(root, "src/data/cjenik.json");
const ARHIVA_JSON = path.join(root, "src/data/cjenik-arhiva.json");
const OUT_DIR = path.join(root, "public/cjenik");
const AKTUALNI = path.join(OUT_DIR, "cjenik-aktualni.csv");

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const dryRun = flag("--dry-run");
const force = flag("--force");
const objava = parseObjava(opt("--objava"));

const cjenik = JSON.parse(fs.readFileSync(CJENIK_JSON, "utf8"));
const arhiva = JSON.parse(fs.readFileSync(ARHIVA_JSON, "utf8"));

validate(cjenik);

const zadnja = arhiva.verzije.at(-1);
const brojPohrane = (zadnja?.brojPohrane ?? 0) + 1;
const datoteka = nazivDatoteke(cjenik.objekt, brojPohrane, objava);
const csv = buildCsv(cjenik);

if (zadnja && !force) {
  const prethodni = fs.readFileSync(path.join(OUT_DIR, zadnja.datoteka), "utf8");
  if (prethodni === csv) {
    console.error(
      `Cjenik se nije promijenio u odnosu na verziju ${pad(zadnja.brojPohrane)} (${zadnja.datoteka}).\n` +
        `Nova verzija nije objavljena. Koristi --force ako je ipak želiš objaviti.`
    );
    process.exit(1);
  }
}

console.log(`Verzija:      ${pad(brojPohrane)}`);
console.log(`Datoteka:     ${datoteka}`);
console.log(`Objava:       ${objava.iso}`);
console.log(`Vrijedi od:   ${cjenik.vrijediOd}`);
console.log(`Usluga:       ${cjenik.kategorije.reduce((n, k) => n + k.usluge.length, 0)}`);
console.log("");
console.log(csv.replace(/^\uFEFF/, ""));

if (dryRun) {
  console.log("(dry-run: ništa nije zapisano)");
  process.exit(0);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, datoteka), csv);
fs.writeFileSync(AKTUALNI, csv);
arhiva.verzije.push({
  brojPohrane,
  datoteka,
  objavljeno: objava.iso,
  vrijediOd: cjenik.vrijediOd,
});
fs.writeFileSync(ARHIVA_JSON, JSON.stringify(arhiva, null, 2) + "\n");

console.log(`Zapisano: public/cjenik/${datoteka}`);
console.log(`Zapisano: public/cjenik/cjenik-aktualni.csv`);
console.log(`Ažurirano: src/data/cjenik-arhiva.json`);
console.log("");
console.log("Sljedeći korak: pregledaj /cjenik lokalno, zatim commit i push (deploy je automatski).");

// ---------------------------------------------------------------------------

function parseObjava(input) {
  const d = input ? new Date(input) : new Date();
  if (Number.isNaN(d.getTime())) {
    console.error(`Neispravan datum objave: "${input}". Očekivan format: 2026-10-01T07:45`);
    process.exit(1);
  }
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1, 2);
  const dd = pad(d.getDate(), 2);
  const hh = pad(d.getHours(), 2);
  const min = pad(d.getMinutes(), 2);
  return {
    iso: `${yyyy}-${mm}-${dd}T${hh}:${min}`,
    datumZaNaziv: `${yyyy}-${mm}-${dd}`,
    vrijemeZaNaziv: `${hh}-${min}`,
  };
}

/**
 * Propisani naziv: vrsta objekta_adresa_oznaka objekta_broj pohrane_datum_vrijeme
 * Primjer iz pojašnjenja: servis_Vukovarska 20 Osijek_U-03_015_01.10.2026_07:45
 * Zadržavamo sve propisane elemente, ali u obliku prikladnom za URL:
 * mala slova, crtice umjesto razmaka i dvotočke, ISO datum.
 * Rezultat: poliklinika-kinetis_ruzmarinka-23-zagreb_u-01_001_2026-10-01_07-45.csv
 */
function nazivDatoteke(objekt, broj, objava) {
  return [
    objekt.vrsta,
    objekt.adresaZaNazivDatoteke,
    objekt.oznaka,
    pad(broj),
    objava.datumZaNaziv,
    objava.vrijemeZaNaziv,
  ].join("_").toLowerCase() + ".csv";
}

function buildCsv(cjenik) {
  const header = [
    "naziv_usluge",
    "kategorija",
    "maloprodajna_cijena",
    "posebni_oblik_prodaje",
    "naziv_posebnog_oblika_prodaje",
    "sidrena_cijena",
    "datum_sidrene_cijene",
  ];
  const rows = [header];
  for (const kategorija of cjenik.kategorije) {
    for (const u of kategorija.usluge) {
      rows.push([
        u.naziv,
        kategorija.naziv,
        u.cijena.toFixed(2),
        u.akcija ? "DA" : "NE",
        u.akcija ?? "",
        u.sidrenaCijena.toFixed(2),
        hrDatum(u.datumSidrenja ?? cjenik.referentniDatum),
      ]);
    }
  }
  // UTF-8 BOM da Excel ispravno pročita dijakritike; CRLF prema RFC 4180.
  return "\uFEFF" + rows.map((r) => r.map(csvField).join(",")).join("\r\n") + "\r\n";
}

function csvField(value) {
  const s = String(value);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function hrDatum(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function pad(n, len = 3) {
  return String(n).padStart(len, "0");
}

function validate(cjenik) {
  const errors = [];
  const ids = new Set();
  const isIso = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s);

  if (!isIso(cjenik.referentniDatum)) errors.push(`referentniDatum mora biti ISO datum (YYYY-MM-DD).`);
  if (!isIso(cjenik.vrijediOd)) errors.push(`vrijediOd mora biti ISO datum (YYYY-MM-DD).`);
  for (const key of ["vrsta", "adresaZaNazivDatoteke", "oznaka"]) {
    if (!cjenik.objekt?.[key]) errors.push(`objekt.${key} je obavezan.`);
    else if (/[\s:/\\]/.test(cjenik.objekt[key])) errors.push(`objekt.${key} ne smije sadržavati razmake, dvotočke ni kose crte.`);
  }

  for (const k of cjenik.kategorije) {
    if (!k.naziv) errors.push("Kategorija bez naziva.");
    for (const u of k.usluge) {
      const ctx = `Usluga "${u.naziv ?? u.id}"`;
      if (!u.id) errors.push(`${ctx}: nedostaje id.`);
      if (ids.has(u.id)) errors.push(`${ctx}: dupli id "${u.id}".`);
      ids.add(u.id);
      if (!u.naziv) errors.push(`${ctx}: nedostaje naziv.`);
      if (typeof u.cijena !== "number" || u.cijena < 0) errors.push(`${ctx}: cijena mora biti broj ≥ 0.`);
      if (typeof u.sidrenaCijena !== "number" || u.sidrenaCijena < 0) errors.push(`${ctx}: sidrenaCijena mora biti broj ≥ 0.`);
      if (u.akcija !== null && typeof u.akcija !== "string") errors.push(`${ctx}: akcija mora biti null ili naziv akcije.`);
      if (u.akcija === "") errors.push(`${ctx}: akcija ne smije biti prazan string (koristi null).`);
      if (u.datumSidrenja && !isIso(u.datumSidrenja)) errors.push(`${ctx}: datumSidrenja mora biti ISO datum.`);
    }
  }

  for (const p of cjenik.protokoli ?? []) {
    for (const s of p.stavke) {
      if (!ids.has(s.uslugaId)) errors.push(`Protokol "${p.naziv}": nepoznata usluga "${s.uslugaId}".`);
      if (!Number.isInteger(s.kolicina) || s.kolicina <= 0) errors.push(`Protokol "${p.naziv}": količina mora biti pozitivan cijeli broj.`);
    }
  }

  if (errors.length) {
    console.error("Cjenik nije valjan:\n - " + errors.join("\n - "));
    process.exit(1);
  }
}
