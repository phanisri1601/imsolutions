'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { FiSearch, FiTarget, FiBox, FiSend, FiZap } from 'react-icons/fi';
import styles from './AboutHero.module.css';

const processSteps = [
  { label: 'DISCOVER', icon: <FiSearch /> },
  { label: 'STRATEGIZE', icon: <FiTarget /> },
  { label: 'CREATE', icon: <FiBox /> },
  { label: 'LAUNCH', icon: <FiSend /> },
  { label: 'LEAVE IMPACT', icon: <FiZap /> },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] } },
} as const);

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay, ease: 'easeOut' } },
} as const);

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      {/* ── Main 2-column grid ── */}
      <div className={styles.heroGrid}>

        {/* LEFT  Philosophy */}
        <motion.div
          className={styles.leftPanel}
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
        >
          <motion.span className={styles.eyebrow} variants={fadeIn(0)}>OUR PHILOSOPHY</motion.span>

          <motion.h1 className={styles.heroTitle} variants={fadeUp(0.1)}>
            Every brand<br />follows a journey.<br />
            <span className={styles.redLine}>We design it.</span>
          </motion.h1>

          <motion.p className={styles.heroDesc} variants={fadeUp(0.25)}>
            At IM Solutions, we combine strategy, creativity, and technology to build brands
            <br />
            that grow, influence, and leave a lasting legacy.
          </motion.p>

          <motion.div className={styles.imWatermark} variants={fadeIn(0.4)}>IM</motion.div>

          <motion.a href="/services" className={styles.exploreLink} variants={fadeUp(0.45)}>
            EXPLORE OUR SYSTEM <FiArrowRight className={styles.arrowIcon} />
          </motion.a>
        </motion.div>

        {/* CENTER  Cube */}
        <motion.div
          className={styles.centerPanel}
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.cubeWrapper}>
            <Image
              src="/Cube.jpeg"
              alt="Brand journey cubes – Clarity, Growth, Precision, Legacy"
              fill
              className={styles.cubeImage}
              priority
            />
          </div>
        </motion.div>

      </div>

      {/* ── Bottom Process Bar ── */}
      <motion.div
        className={styles.processBar}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1 }}
      >
        <div className={styles.processLeft}>
          <span className={styles.processTagline}>STRATEGY<br />TO LEGACY.</span>
          <span className={styles.processSub}>WE BUILD WHAT<br />MATTERS.</span>
        </div>

        <div className={styles.processSteps}>
          {processSteps.map((step, i) => (
            <div key={step.label} className={styles.processStep}>
              <span className={styles.processStepIcon}>{step.icon}</span>
              <span className={styles.processStepLabel}>{step.label}</span>
              {i < processSteps.length - 1 && <span className={styles.processDivider}></span>}
            </div>
          ))}
        </div>

        <div className={styles.processRight}>
          <span className={styles.processEnd}>ONE SYSTEM.<br />ENDLESS IMPACT.</span>
          <span className={styles.processIM}>IM</span>
        </div>
      </motion.div>
    </section>
  );
}
