# Poliklinika Kinetis

Website for Poliklinika Kinetis - a medical clinic.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:4280](http://localhost:4280) with your browser to see the result.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- PostCSS

## Project Structure

```
src/
├── app/           # Next.js app directory
├── components/    # React components
├── core/          # Core utilities and styles
└── hooks/         # Custom React hooks
```

## Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Cjenik (sidrene cijene i CSV)

Od 1. 10. 2026. uz svaku cijenu mora stajati i cijena koja je vrijedila 10. 9. 2026.
(Odluka o isticanju dodatne cijene, NN 101/2026), a cjenik mora biti objavljen i u CSV/XML
formatu s arhivom prethodnih verzija (Odluka o objavi cjenika, NN 101/2026).

Jedini izvor podataka je `src/data/cjenik.json`. Iz njega se rendera stranica `/cjenik`
i generira CSV datoteka.

### Promjena cijena

1. U `src/data/cjenik.json` promijeni `cijena` (aktualna) i po potrebi `akcija` (naziv akcije ili `null`).
   `sidrenaCijena` se **ne mijenja** — to je cijena na dan 10. 9. 2026.
   Za novu uslugu uvedenu nakon tog datuma postavi `sidrenaCijena` na prvu cijenu i dodaj `datumSidrenja`.
2. Postavi `vrijediOd` na datum od kojeg nove cijene vrijede.
3. Generiraj novu verziju CSV-a:

   ```bash
   npm run cjenik:publish                              # objava = sada
   npm run cjenik:publish -- --objava 2026-11-01T07:30 # ili s zadanim datumom i vremenom objave
   npm run cjenik:publish -- --dry-run                 # samo pregled, bez pisanja
   ```

   Skripta zapisuje `public/cjenik/<propisani naziv>.csv`, osvježava `public/cjenik/cjenik-aktualni.csv`
   i dodaje verziju u `src/data/cjenik-arhiva.json`. Stare datoteke se ne brišu (arhiva mora ostati
   dostupna najmanje 30 dana).
4. Provjeri `/cjenik` lokalno, pa commit i push. Deploy na GitHub Pages je automatski.

**Rok:** izmjena mora biti objavljena najkasnije do 8:00 na dan stupanja novih cijena na snagu,
pa push napravi večer prije.

### Naziv datoteke

Propisani oblik je `vrsta objekta_adresa_oznaka objekta_broj pohrane_datum_vrijeme`
(službeni primjer: `servis_Vukovarska 20 Osijek_U-03_015_01.10.2026_07:45`). Zadržani su svi
elementi, ali u obliku prikladnom za URL: mala slova, crtice umjesto razmaka i dvotočke, ISO datum, npr.
`poliklinika-kinetis_ruzmarinka-23-zagreb_u-01_001_2026-10-01_07-45.csv`. Naziv se u sučelju ne
prikazuje; korisnici koriste stalnu poveznicu `cjenik-aktualni.csv`. Parametri objekta su u `objekt`
bloku u `cjenik.json`.
