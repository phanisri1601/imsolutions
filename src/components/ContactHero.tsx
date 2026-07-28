'use client';

import { useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import styles from '../app/contact/ContactPage.module.css';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  },
} as const);

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  },
} as const);

const slideIn = (delay = 0) => ({
  hidden: { scaleX: 0, transformOrigin: 'left' },
  visible: {
    scaleX: 1,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  },
} as const);

export default function ContactHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const animate = isInView ? 'visible' : 'hidden';

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.heroLeft} ref={ref}>
          {/* Eyebrow */}
          <motion.span
            className={styles.eyebrow}
            variants={fadeIn(0.1)}
            initial="hidden"
            animate={animate}
          >
            LET&apos;S CONNECT
          </motion.span>

          {/* Title */}
          <motion.h1
            className={styles.title}
            variants={fadeUp(0.25)}
            initial="hidden"
            animate={animate}
          >
            Let&apos;s build<br />what&apos;s{' '}
            <span className={styles.highlight}>next</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={styles.subtitle}
            variants={fadeUp(0.4)}
            initial="hidden"
            animate={animate}
          >
            Have a question, an idea, or a project in mind?<br />
            We&apos;d love to hear from you.
          </motion.p>

          {/* Contact Info Grid */}
          <motion.div
            className={styles.contactInfoGrid}
            variants={fadeUp(0.55)}
            initial="hidden"
            animate={animate}
          >
            <motion.div className={styles.contactItem} variants={fadeUp(0.6)} initial="hidden" animate={animate}>
              <span className={styles.contactLabel}>EMAIL</span>
              <a href="mailto:hello@imsolutions.com" className={styles.contactLink}>
                 info@imsolutions.mobi <FaArrowRight className={styles.linkIcon} />
              </a>
            </motion.div>
            <motion.div className={styles.contactItem} variants={fadeUp(0.7)} initial="hidden" animate={animate}>
              <span className={styles.contactLabel}>PHONE</span>
              <a href="tel:+919876543210" className={styles.contactLink}>
                +91-8880564488 <FaArrowRight className={styles.linkIcon} />
              </a>
            </motion.div>
            <motion.div className={styles.contactItem} variants={fadeUp(0.8)} initial="hidden" animate={animate}>
              <span className={styles.contactLabel}>LOCATION</span>
              <a href="#map" className={styles.contactLink}>
                Bengaluru, Karnataka <FaArrowRight className={styles.linkIcon} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
