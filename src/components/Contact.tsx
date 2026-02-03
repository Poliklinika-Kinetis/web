import Section from "@/components/Section";
import { assetPath } from "@/lib/assetPath";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <Section>
      <div className={styles.contactContainer}>
        <h2 className={styles.mainHeading}>Kontakt</h2>

        <div className={styles.contentGrid}>
          <div
            className={styles.contactImage}
            style={{ backgroundImage: `url(${assetPath("/images/contact.jpg")})` }}
          >
            {/* Contact image */}
          </div>

          <div className={styles.contactContent}>
            <div className={styles.section}>
              <h3 className={styles.sectionHeading}>Gdje smo?</h3>
              <div className={styles.info}>
                <p>Kinetis d.o.o.</p>
                <p>Ružmarinka 23, 10000 Zagreb (Prizemlje, istočni ulaz)</p>
                <p>Parking: 2. zona</p>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionHeadingAccent}>Naručivanje</h3>
              <ul className={styles.contactList}>
                <li>telefon</li>
                <li>e-mail</li>
                <li>whats upp</li>
              </ul>
              <p className={styles.note}>
                <em>Napomena: Bez liste čekanja, termin je najčešće moguće dobiti unutar nekoliko radnih dana.</em>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>
      </div>
    </Section>
  );
}
