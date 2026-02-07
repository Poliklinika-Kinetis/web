import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.text}>Stranica nije pronađena.</p>
      <a href="/" className={styles.link}>
        Povratak na naslovnicu
      </a>
    </div>
  );
}
