import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}>
          <img
            src="/assets/favicon.png"
            alt="Kinetis Logo"
            className={styles.logoImage}
          />
        </div>

        <div className={styles.info}>
          <p>Kinetis d.o.o.</p>
          <p>Ružmarinka 23</p>
          <p>10000 Zagreb</p>
        </div>
      </div>
    </footer>
  );
}
