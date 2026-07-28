'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Hero.module.css';

const heroBanner = encodeURI('/Home Page Banner.png');

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as any },
  },
});

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  },
});

export default function Hero() {
  const router = useRouter();
  const [hoveredFace, setHoveredFace] = useState<string | null>(null);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem('homeScrollPos');
    if (savedScroll) {
      window.scrollTo({ top: parseInt(savedScroll, 10), behavior: 'instant' });
      sessionStorage.removeItem('homeScrollPos');
    }
  }, []);

  const handleFaceClick = (serviceId: string) => {
    sessionStorage.setItem('homeScrollPos', window.scrollY.toString());
    router.push(`/services/online?service=${serviceId}&autoPlay=true&returnHome=true`);
  };

  const FACES = [
    { id: 'strategy', label: 'Strategy', d: 'M 721,246 L 916,287 L 924,502 L 741,458 Z' },
    { id: 'creative', label: 'Creative', d: 'M 1111,328 L 1285,228 L 1281,446 L 1107,546 Z' },
    { id: 'technology', label: 'Technology', d: 'M 741,458 L 924,502 L 932,717 L 761,670 Z' },
    { id: 'media', label: 'Media', d: 'M 924,502 L 1107,546 L 1103,764 L 932,717 Z' },
    { id: 'growth', label: 'Growth', d: 'M 1107,546 L 1281,446 L 1277,664 L 1103,764 Z' },
  ];

  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${heroBanner})` }}>
      {/* ── Background SVG Hotspots ── */}
      <svg 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }} 
        viewBox="0 0 1600 974" 
        preserveAspectRatio="xMaxYMid slice" 
        aria-hidden="false"
      >
        <defs>
          <radialGradient id="homeCubeGlow" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#D4AF37" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>

        {FACES.map((face) => (
          <motion.path
            key={`glow-${face.id}`}
            d={face.d}
            initial={false}
            animate={{ opacity: hoveredFace === face.id ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ fill: 'url(#homeCubeGlow)', pointerEvents: 'none' }}
          />
        ))}

        {FACES.map((face) => (
          <path
            key={face.id}
            d={face.d}
            role="button"
            tabIndex={0}
            aria-label={`Explore ${face.label}`}
            onClick={() => handleFaceClick(face.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleFaceClick(face.id);
              }
            }}
            onMouseEnter={() => setHoveredFace(face.id)}
            onMouseLeave={() => setHoveredFace(null)}
            onFocus={() => setHoveredFace(face.id)}
            onBlur={() => setHoveredFace(null)}
            style={{ cursor: 'pointer', fill: 'transparent' }}
          />
        ))}
      </svg>

      {/* ── Left  Text content ── */}
      <div className={styles.heroLeft} style={{ zIndex: 2 }}>
        <motion.p
          className={styles.heroTagline}
          initial="hidden"
          animate="visible"

        >
          STRATEGY. CREATIVITY. TECHNOLOGY. GROWTH.
        </motion.p>
        <motion.div
          className={styles.heroTaglineRule}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        />

        <motion.h1
          className={styles.heroHeading}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
          }}
        >
          <motion.span className={styles.heroLine} variants={fadeUp(0)}>
            One Partner<span className={styles.heroDot}>.</span>
          </motion.span>
          <motion.span className={styles.heroLine} variants={fadeUp(0.12)}>
            Every Possibility<span className={styles.heroDot}>.</span>
          </motion.span>
        </motion.h1>

        <motion.p
          className={styles.heroSubtext}
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.55)}
        >
          Everything your brand needs,working as one.
        </motion.p>

        <motion.div
          className={styles.heroCta}
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.7)}
        >
          <Link href="/contact" className={styles.heroCtaBtn} aria-label="Start the journey">
            <span className={styles.heroCtaCircle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
            <span className={styles.heroCtaLabel}>START THE JOURNEY</span>
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className={styles.heroScroll}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <span className={styles.heroScrollLabel}>SCROLL TO CONTINUE</span>
        <motion.div
          className={styles.heroScrollArrow}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="0" x2="8" y2="16" />
            <polyline points="2 10 8 16 14 10" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
