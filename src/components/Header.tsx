"use client"

import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.isScrolled : ""}`}
    >
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <img
            src="/assets/favicon.png"
            alt="Kinetis Logo"
            className={styles.logoImage}
          />
        </div>
      </div>

      <div className={styles.socialButtons}>
        <a
          className={styles.socialButton}
          href="mailto:info@kinetis.hr"
          aria-label="Email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>

        <a
          className={styles.socialButton}
          href="https://wa.me/+385123456789"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.161 4.741a10.76 10.76 0 0 0-7.666-3.178c-5.976 0-10.84 4.863-10.84 10.84 0 1.909.498 3.774 1.446 5.42l-1.538 5.615 5.747-1.51a10.8 10.8 0 0 0 5.18 1.32h.005c5.972 0 10.943-4.864 10.943-10.84 0-2.896-1.231-5.616-3.277-7.667m-7.666 16.68a9 9 0 0 1-4.59-1.255l-.327-.195-3.408.893.908-3.325-.215-.342a9 9 0 0 1-1.377-4.795c0-4.965 4.043-9.008 9.014-9.008a8.93 8.93 0 0 1 6.367 2.641c1.7 1.704 2.744 3.965 2.74 6.372 0 4.97-4.146 9.014-9.112 9.014m4.942-6.748c-.269-.137-1.602-.791-1.851-.88-.25-.092-.43-.136-.61.138-.181.273-.699.879-.86 1.064-.156.18-.317.205-.586.069-1.591-.796-2.636-1.421-3.686-3.223-.279-.479.278-.444.796-1.48.087-.18.044-.337-.025-.473-.068-.137-.61-1.47-.835-2.012-.22-.527-.444-.454-.61-.464-.156-.01-.337-.01-.518-.01-.18 0-.473.069-.722.337-.25.274-.948.928-.948 2.261s.972 2.622 1.104 2.803c.137.18 1.91 2.915 4.629 4.092 1.719.742 2.392.805 3.252.678.522-.078 1.601-.654 1.826-1.289s.225-1.177.156-1.289c-.063-.122-.244-.19-.513-.322"/>
          </svg>
        </a>
      </div>
    </header>
  );
}
