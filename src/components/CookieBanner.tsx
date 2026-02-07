"use client";

import { useState, useEffect } from "react";
import styles from "./CookieBanner.module.css";

const GA_ID = "G-JFH1V8XF05";

function loadGA() {
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", GA_ID);
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      loadGA();
    } else if (consent === null) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    loadGA();
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <p className={styles.text}>
          Ova stranica koristi kolačiće za analitiku.
        </p>

        <div className={styles.buttons}>
          <button onClick={decline} className={styles.declineButton}>
            Odbijam
          </button>
          <button onClick={accept} className={styles.acceptButton}>
            Prihvaćam
          </button>
        </div>
      </div>
    </div>
  );
}
