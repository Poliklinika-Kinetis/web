import Section from "@/components/Section";
import { assetPath } from "@/lib/assetPath";
import styles from "./TherapyProcess.module.css";

export default function TherapyProcess() {
  return (
    <Section>
      <div className={styles.therapyContainer}>
        <div
          className={styles.therapyImage}
          style={{ backgroundImage: `url(${assetPath("/images/therapy-process.jpg")})` }}
        >
          {/* Therapy image */}
        </div>

        <div className={`${styles.therapyContent} content-block-right`}>
          <h2 className={styles.therapyHeading}>Kako izgleda terapija?</h2>

          <div className={styles.stepsList}>
            <div className={styles.step}>
              {/* <div className={styles.stepNumber}>1.</div> */}
              <div className={styles.stepContent}>
                <h3>1. Klinički pregled</h3>
                <p className="paragraph-large">
                  Detaljna procjena stanja kroz testiranja, mjerenja i razgovor. Jer, bez pregleda terapija ne može započeti.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepContent}>
                <h3>2. Plan terapije</h3>
                <p className="paragraph-large">
                  Jasna preporuka o tome što raditi, koliko često i s kojim ciljem.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepContent}>
                <h3>3. Terapija i praćenje</h3>
                <p className="paragraph-large">
                  Rad usmjeren na uzrok problema uz objektivno praćenje napretka.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
