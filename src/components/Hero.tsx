import Section from "@/components/Section";
import { assetPath } from "@/lib/assetPath";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <Section>
      <div className={styles.heroContainer}>
        <div
          className={styles.heroImage}
          style={{ backgroundImage: `url(${assetPath("/images/hero.jpg")})` }}
        >
          {/* Placeholder for hero image */}
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>KINETIS - Korak naprijed.</h1>

          <div className={styles.heroText}>
            <p>
              Individualan pristup, jasna dijagnostika i terapija bez “šablona”. 
              <br/>Cilj nije “odrađivanje terapije”, nego stvaran oporavak.
            </p>
            <p>U Kinetisu terapija započinje razumijevanjem problema. Svaki pacijent prolazi klinički pregled na temelju kojeg se donosi odluka što ima smisla raditi, a što ne.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
