import cjenikJson from "./cjenik.json";
import arhivaJson from "./cjenik-arhiva.json";

export interface Usluga {
  id: string;
  naziv: string;
  opis?: string;
  napomena?: string;
  /** Aktualna maloprodajna cijena u eurima. */
  cijena: number;
  /** Cijena koja je vrijedila na referentni datum (10. 9. 2026.). */
  sidrenaCijena: number;
  /** Za usluge uvedene nakon referentnog datuma: datum prvog uvrštenja (ISO), inače se koristi referentniDatum. */
  datumSidrenja?: string;
  /** Naziv posebnog oblika prodaje (akcije) ako je aktualna cijena akcijska, inače null. */
  akcija: string | null;
}

export interface Kategorija {
  naziv: string;
  usluge: Usluga[];
}

export interface ProtokolStavka {
  uslugaId: string;
  kolicina: number;
  naziv?: string;
  napomena?: string;
}

export interface Protokol {
  naziv: string;
  opis?: string;
  stavke: ProtokolStavka[];
}

export interface Objekt {
  naziv: string;
  vrsta: string;
  adresa: string;
  adresaZaNazivDatoteke: string;
  oznaka: string;
}

export interface Cjenik {
  objekt: Objekt;
  referentniDatum: string;
  vrijediOd: string;
  kategorije: Kategorija[];
  protokoli: Protokol[];
  napomenaProtokoli: string;
  napomene: string[];
}

export interface VerzijaCjenika {
  brojPohrane: number;
  datoteka: string;
  objavljeno: string;
  vrijediOd: string;
}

export interface Arhiva {
  verzije: VerzijaCjenika[];
}

export const cjenik: Cjenik = cjenikJson as Cjenik;
export const arhiva: Arhiva = arhivaJson as Arhiva;

export const CJENIK_DIR = "/cjenik";
export const AKTUALNI_CSV = `${CJENIK_DIR}/cjenik-aktualni.csv`;

export const sveUsluge: Usluga[] = cjenik.kategorije.flatMap((k) => k.usluge);

export function nadjiUslugu(id: string): Usluga {
  const usluga = sveUsluge.find((u) => u.id === id);
  if (!usluga) throw new Error(`Usluga "${id}" ne postoji u cjeniku.`);
  return usluga;
}

export function ukupnoProtokola(protokol: Protokol) {
  return protokol.stavke.reduce(
    (acc, s) => {
      const u = nadjiUslugu(s.uslugaId);
      acc.cijena += s.kolicina * u.cijena;
      acc.sidrenaCijena += s.kolicina * u.sidrenaCijena;
      return acc;
    },
    { cijena: 0, sidrenaCijena: 0 }
  );
}

export function formatCijena(iznos: number): string {
  if (iznos === 0) return "Besplatno";
  const fixed = Number.isInteger(iznos) ? String(iznos) : iznos.toFixed(2).replace(".", ",");
  return `${fixed} €`;
}

/** ISO "2026-09-10" → "10. 9. 2026." */
export function formatDatum(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${d}. ${m}. ${y}.`;
}

/** ISO datetime → "1. 10. 2026. u 7:45" (lokalno vrijeme zapisano u ISO stringu). */
export function formatDatumVrijeme(iso: string): string {
  const [datum, vrijeme] = iso.split("T");
  const [h, min] = vrijeme.split(":");
  return `${formatDatum(datum)} u ${Number(h)}:${min}`;
}

export const aktualnaVerzija: VerzijaCjenika | undefined = arhiva.verzije.at(-1);
export const prethodneVerzije: VerzijaCjenika[] = arhiva.verzije.slice(0, -1).reverse();
