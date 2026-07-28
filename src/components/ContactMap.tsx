"use client";

import { useState } from "react";
import styles from "@/app/contact/ContactPage.module.css";

export default function ContactMap() {
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <div
      className={`${styles.mapContainer} ${isInteractive ? styles.mapContainerActive : ""}`}
      onMouseLeave={() => setIsInteractive(false)}
    >
      <iframe
        src="https://www.google.com/maps?q=IM%20Solutions%20HSR%20Layout%20Bangalore&output=embed"
        className={styles.mapIframe}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="IM Solutions Office Location"
      ></iframe>

      {!isInteractive ? (
        <button
          type="button"
          className={styles.mapOverlay}
          onClick={() => setIsInteractive(true)}
          aria-label="Activate map interaction"
        >
          <span className={styles.mapOverlayTitle}>Click to interact with the map</span>
          <span className={styles.mapOverlayText}>Scrolling will stay smooth until you activate it.</span>
        </button>
      ) : null}
    </div>
  );
}
