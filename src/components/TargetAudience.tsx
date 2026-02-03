import Section from "@/components/Section";
import styles from "./TargetAudience.module.css";

export default function TargetAudience() {
  return (
    <Section>
      <div className={styles.targetContainer}>
        <h2 className={styles.mainHeading}>Kome je namijenjen Kinetis?</h2>

        <div className={styles.contentGrid}>
          <div className={styles.targetImage}>
            {/* Target audience image */}
          </div>

          <div className={styles.targetContent}>
            <h3 className={styles.contentHeading}>
              Svima koji žele jasno razumjeti svoj problem i dobiti terapiju koja ima svrhu.
            </h3>

            <ul className={styles.targetList}>
              <li>pacijentima s bolovima u kralježnici i zglobovima</li>
              <li>osobama nakon ozljeda i / ili operacija</li>
              <li>pacijentima s dugotrajnim ili ponavljajućim bolovima</li>
              <li>svima koji su doživjeli loša iskustva kroz neučinkovite terapije</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
