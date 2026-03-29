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
  // Must use `arguments` (not rest params) — gtag.js expects Arguments objects in dataLayer
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: Function;
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
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    document.body.style.overflow = "";
    loadGA();
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    document.body.style.overflow = "";
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.banner}>
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
