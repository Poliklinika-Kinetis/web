import Section from "@/components/Section";
import styles from "./PainWarning.module.css";

export default function PainWarning() {
  return (
    <Section>
      <div className={styles.warningContainer}>
        <div className={styles.divider}></div>

        <div className={styles.content}>
          <h2 className={styles.heading}>Ako bol traje, nemojte čekati.</h2>
          <p className={styles.text}>
            Bol koja traje dulje od dva do tri tjedna rijetko prolazi sama od sebe.
            <br />
            Konzultacije su besplatne i ne obvezuju vas na nastavak terapije.
          </p>
        </div>

        <div className={styles.divider}></div>
      </div>
    </Section>
  );
}
