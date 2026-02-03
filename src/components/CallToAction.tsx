import Section from "@/components/Section";
import styles from "./CallToAction.module.css";

export default function CallToAction() {
  return (
    <Section>
      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaHeading}>
            Bez paketa terapija.<br />
            Bez nepotrebnih dolazaka.<br />
            Bez uljepšavanja stanja.
          </h2>

          <a href="#contact" className={styles.ctaButton}>
            KONTAKTIRAJ NAS
          </a>
        </div>
      </div>
    </Section>
  );
}
