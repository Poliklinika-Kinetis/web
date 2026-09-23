import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { assetPath } from "@/lib/assetPath";
import {
  AKTUALNI_CSV,
  CJENIK_DIR,
  aktualnaVerzija,
  cjenik,
  formatCijena,
  formatDatum,
  formatDatumVrijeme,
  nadjiUslugu,
  prethodneVerzije,
  ukupnoProtokola,
  type Usluga,
} from "@/data/cjenik";
import "../page.css";
import styles from "./cjenik.module.css";

export const metadata: Metadata = {
  title: "Cjenik usluga – Poliklinika Kinetis",
  description:
    "Cjenik usluga Poliklinike Kinetis: pregled, manualna terapija, kineziterapija i fizikalna terapija aparatima, s cijenama na dan 10. 9. 2026.",
  alternates: {
    canonical: "https://poliklinika-kinetis.hr/cjenik",
  },
};

const referentniDatum = formatDatum(cjenik.referentniDatum);

function Cijene({ usluga, className }: { usluga: Usluga; className?: string }) {
  const datum = usluga.datumSidrenja ? formatDatum(usluga.datumSidrenja) : referentniDatum;
  return (
    <div className={`${styles.prices} ${className ?? ""}`}>
      {usluga.akcija && <span className={styles.badge}>{usluga.akcija}</span>}
      <span className={styles.price}>{formatCijena(usluga.cijena)}</span>
      <span className={styles.anchor}>
        Cijena na {datum}: {formatCijena(usluga.sidrenaCijena)}
      </span>
    </div>
  );
}

export default function CjenikPage() {
  return (
    <div className="pageContainer">
      <Header />
      <main>
        <Section>
          <article className={styles.page}>
            <a href={assetPath("/")} className={styles.back}>
              ← Povratak na naslovnicu
            </a>

            <header className={styles.intro}>
              <h1 className={styles.title}>Cjenik usluga</h1>
              <p className="paragraph-large">
                Cjenik vrijedi od {formatDatum(cjenik.vrijediOd)} Uz svaku cijenu navedena je i cijena
                koja je vrijedila na dan {referentniDatum}, sukladno Odluci o isticanju dodatne cijene
                (NN 101/2026).
              </p>
            </header>

            {cjenik.kategorije.map((kategorija) => (
              <section key={kategorija.naziv} className={styles.category}>
                <h3 className={styles.categoryTitle}>{kategorija.naziv}</h3>
                <ul className={styles.list}>
                  {kategorija.usluge.map((usluga) => (
                    <li key={usluga.id} className={styles.row}>
                      <div className={styles.rowText}>
                        <h4 className={styles.serviceName}>{usluga.naziv}</h4>
                        {usluga.opis && <p className="paragraph-body">{usluga.opis}</p>}
                        {usluga.napomena && <p className={styles.note}>{usluga.napomena}</p>}
                      </div>
                      <Cijene usluga={usluga} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section className={styles.category}>
              <h3 className={styles.categoryTitle}>Fizioterapijski protokoli</h3>
              <p className={`paragraph-body ${styles.categoryLead}`}>{cjenik.napomenaProtokoli}</p>

              <div className={styles.protocols}>
                {cjenik.protokoli.map((protokol) => {
                  const ukupno = ukupnoProtokola(protokol);
                  return (
                    <div key={protokol.naziv} className={styles.protocol}>
                      <h4 className={styles.protocolTitle}>{protokol.naziv}</h4>
                      {protokol.opis && <p className={`paragraph-body ${styles.protocolDesc}`}>{protokol.opis}</p>}

                      <ul className={styles.protocolItems}>
                        {protokol.stavke.map((stavka, i) => {
                          const usluga = nadjiUslugu(stavka.uslugaId);
                          return (
                            <li key={i} className={styles.protocolItem}>
                              <div className={styles.protocolItemText}>
                                <span>
                                  {stavka.kolicina} × {stavka.naziv ?? usluga.naziv}
                                </span>
                                {stavka.napomena && <span className={styles.note}>{stavka.napomena}</span>}
                              </div>
                              <span className={styles.protocolItemPrice}>
                                {formatCijena(stavka.kolicina * usluga.cijena)}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      <div className={styles.protocolTotal}>
                        <span className={styles.protocolTotalLabel}>Ukupno</span>
                        <div className={styles.prices}>
                          <span className={styles.price}>{formatCijena(ukupno.cijena)}</span>
                          <span className={styles.anchor}>
                            Cijena na {referentniDatum}: {formatCijena(ukupno.sidrenaCijena)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className={styles.notes}>
              <h4 className={styles.notesTitle}>Napomene</h4>
              <ul className={styles.notesList}>
                {cjenik.napomene.map((n) => (
                  <li key={n} className="paragraph-body">
                    {n}
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.download}>
              <h4 className={styles.downloadTitle}>Cjenik u strojno čitljivom obliku</h4>
              <p className="paragraph-body">
                Sukladno Odluci o objavi cjenika proizvoda i usluga (NN 101/2026), cjenik je dostupan i
                u CSV formatu pogodnom za automatsku obradu.
              </p>

              {aktualnaVerzija ? (
                <>
                  <a href={assetPath(AKTUALNI_CSV)} className={styles.downloadButton} download>
                    Preuzmi aktualni cjenik (CSV)
                  </a>
                  <p className={styles.fileMeta}>
                    Verzija {String(aktualnaVerzija.brojPohrane).padStart(3, "0")}, objavljena{" "}
                    {formatDatumVrijeme(aktualnaVerzija.objavljeno)}, vrijedi od{" "}
                    {formatDatum(aktualnaVerzija.vrijediOd)}{" "}
                    <a href={assetPath(`${CJENIK_DIR}/${aktualnaVerzija.datoteka}`)} className={styles.fileLink}>
                      Trajna poveznica na ovu verziju
                    </a>
                  </p>
                </>
              ) : (
                <p className={styles.fileMeta}>Datoteka još nije objavljena.</p>
              )}

              <div className={styles.archive}>
                <h5 className={styles.archiveTitle}>Arhiva prethodnih cjenika</h5>
                {prethodneVerzije.length === 0 ? (
                  <p className={styles.fileMeta}>Nema prethodnih verzija.</p>
                ) : (
                  <ul className={styles.archiveList}>
                    {prethodneVerzije.map((v) => (
                      <li key={v.brojPohrane} className={styles.archiveItem}>
                        <a href={assetPath(`${CJENIK_DIR}/${v.datoteka}`)} className={styles.fileLink}>
                          Verzija {String(v.brojPohrane).padStart(3, "0")} (CSV)
                        </a>
                        <span className={styles.fileMeta}>
                          Objavljena {formatDatumVrijeme(v.objavljeno)}, vrijedila od {formatDatum(v.vrijediOd)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </article>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
