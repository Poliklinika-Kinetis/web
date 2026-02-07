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

          <div className={`${styles.contactContent} content-block-right`}>
            <div className={styles.section}>
              <h3 className={styles.sectionHeading}>Gdje smo?</h3>
              <div className={styles.info}>
                <p className="paragraph-large">Kinetis d.o.o.</p>
                <p className="paragraph-large">Ružmarinka 23, 10000 Zagreb (Prizemlje, istočni ulaz)</p>
                <p className="paragraph-large">Parking: 2. zona</p>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionHeadingAccent}>Naručivanje</h3>
              <ul className={styles.contactList}>
                <li className="paragraph-large">telefon: <a href="tel:+385958189160">+385 95 818 9160</a></li>
                <li className="paragraph-large">e-mail: <a href="mailto:kinetisfizikalna@gmail.com">kinetisfizikalna@gmail.com</a></li>
                <li className="paragraph-large">WhatsApp: <a href="https://wa.me/+385958189160" target="_blank" rel="noopener noreferrer">+385 95 818 9160</a></li>
              </ul>
              <p className="paragraph-body">
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
