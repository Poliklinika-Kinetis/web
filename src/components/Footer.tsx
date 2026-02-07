import styles from "./Footer.module.css";
import AnimatedLogo from "./AnimatedLogo";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <AnimatedLogo size={72} className={styles.logo} />

        <div className={styles.info}>
          <p className="paragraph-footer">Poliklinika Kinetis d.o.o.</p>
          <p className="paragraph-footer">Ružmarinka 23, 10000 Zagreb</p>
          <p className="paragraph-footer">Društvo je upisano u sudski registar Trgovačkog suda u Zagrebu, pod MBS 081620667</p>
          <p className="paragraph-footer">Temeljni kapital društva iznosi: 2500,00 eura</p>
          <p className="paragraph-footer">Direktor: Stjepan Marinčević</p>
          <p className="paragraph-footer">Kontakt e-mail: kinetisfizikalna@gmail.com</p>
          <p className="paragraph-footer"><a href="/politika-privatnosti.pdf" target="_blank" rel="noopener noreferrer">Politika privatnosti</a></p>
        </div>
      </div>
    </footer>
  );
}
