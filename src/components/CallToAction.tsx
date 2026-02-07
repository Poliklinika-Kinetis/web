import Section from "@/components/Section";
import { assetPath } from "@/lib/assetPath";
import styles from "./CallToAction.module.css";

export default function CallToAction() {
  return (
    <Section>
      <div
        className={styles.ctaContainer}
        style={{ backgroundImage: `url(${assetPath("/images/call-to-action.png")})` }}
      >
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaHeading}>
            Bez paketa terapija.<br />
            Bez nepotrebnih dolazaka.<br />
            Bez uljepšavanja stanja.
          </h2>

          <a href={assetPath('/kinetis-cjenik.pdf')} className={styles.ctaButton} target="_blank" rel="noopener noreferrer">
            POGLEDAJ NAŠ CJENIK
          </a>
        </div>
      </div>
    </Section>
  );
}
