import { FaWhatsapp } from "react-icons/fa";
import styles from "./WhatsAppButton.module.css";

// Same number as the footer contact. Change here if WhatsApp uses a different line.
const WHATSAPP_NUMBER = "918880564488";
const PREFILL = "Hi IM Solutions, I'd like to discuss a project.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL)}`;

  return (
    <a
      href={href}
      className={styles.button}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with IM Solutions on WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" className={styles.icon} />
    </a>
  );
}
