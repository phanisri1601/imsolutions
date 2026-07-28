import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import ContactForm from "@/components/ContactForm";
import Clients from "@/components/Clients";
import ContactHero from "@/components/ContactHero";
import styles from "./ContactPage.module.css";

export const metadata = {
  title: "Contact Us | IM Solutions",
  description:
    "Get in touch with IM Solutions for advertising, marketing, and digital growth. Call, mail, or drop a message and we will respond quickly.",
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      {/* Hero Section  animated */}
      <ContactHero />

      {/* Partners Section */}


      {/* Form Section */}
      <ContactForm />

      {/* Bottom Section */}
      <section className={styles.bottomSection}>
        <div className={styles.bottomGrid}>
          {/* Left  conversation block with background image */}
          <div className={styles.conversationBlock}>
            <div className={styles.conversationContent}>
              <h2 className={styles.conversationTitle}>Great things start<br />with a conversation.</h2>
              <span className={styles.conversationEyebrow}>WE LOOK FORWARD TO CONNECTING</span>
              <button className={styles.circleBtn} aria-label="Get in touch">
                <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Right  Google Maps Embed */}
          <div className={styles.mapBlock} id="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.0799!2d77.6300791!3d12.9097456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1491d13b6519%3A0x3cb3ab2f8e060d9!2sIM%20Solutions!5e0!3m2!1sen!2sin!4v1751452800000"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: '100%' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="IM Solutions Office Location"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

