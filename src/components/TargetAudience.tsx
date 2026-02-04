import Section from "@/components/Section";
import { assetPath } from "@/lib/assetPath";
import styles from "./TargetAudience.module.css";

export default function TargetAudience() {
  return (
    <Section>
      <div className={styles.targetContainer}>
        <h2 className={styles.mainHeading}>Kome je namijenjen Kinetis?</h2>

        <div className={styles.contentGrid}>
          <div
            className={styles.targetImage}
            style={{ backgroundImage: `url(${assetPath("/images/who-are-customers.jpg")})` }}
          >
            {/* Target audience image */}
          </div>

          <div className={`${styles.targetContent} content-block-right`}>
            <h3 className={styles.contentHeading}>
              Svima koji žele jasno razumjeti svoj problem i dobiti terapiju koja ima svrhu
            </h3>

            <ul className={styles.targetList}>
              <li className="paragraph-large">pacijentima s bolovima u kralježnici i zglobovima</li>
              <li className="paragraph-large">osobama nakon ozljeda i / ili operacija</li>
              <li className="paragraph-large">pacijentima s dugotrajnim ili ponavljajućim bolovima</li>
              <li className="paragraph-large">svima koji su doživjeli loša iskustva kroz neučinkovite terapije</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
