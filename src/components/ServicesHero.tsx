'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import styles from './ServicesHero.module.css';

interface ServicesHeroProps {
  eyebrow?: string;
  headingBlack: string;
  headingRed: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

interface CubeContent {
  heading: string;
  description: string;
  servicesLabel: string;
  services: string[];
}

// Pixel-perfect outlines of each visible cube face, traced off
// /public/strtegy pop.png via computer-vision segmentation (color/watershed
// region growing + contour extraction), not eyeballed  each `d` is an SVG
// path in a 0-100 x 0-100 viewBox (percent of the image). These are hit
// areas only; no fill is ever rendered.
const CUBES: { id: string; label: string; num: string; video: string; d: string; content: CubeContent | null }[] = [
  {
    id: 'strategy',
    label: 'Strategy',
    num: '01',
    video: '/videos/strategy-video.mp4',
    d: 'M 58.91,22.95 L 55.8,26.35 L 51.91,26.99 L 44.2,26.25 L 40.97,22.85 L 50.12,15.09 Z',
    content: {
      heading: 'STRATEGY',
      description: "Great brands don't begin with campaigns. They begin with clarity.",
      servicesLabel: 'Services',
      services: [
        'Brand Strategy',
        'Brand Positioning',
        'Market Research',
        'Consumer Insights',
        'Competitor Analysis',
        'Go-to-Market Strategy',
        'Brand Architecture',
        'Communication Strategy',
        'Campaign Planning',
        'Media Planning',
        'Business Consulting',
      ],
    },
  },
  {
    id: 'creative',
    label: 'Creative',
    num: '02',
    video: '/videos/creative-video.mp4',
    d: 'M 32.48,34.75 L 41.03,44.31 L 40.97,60.15 L 32.42,54.2 Z',
    content: {
      heading: 'CREATIVE',
      description: 'Creativity is where ideas find their voice.',
      servicesLabel: 'Services',
      services: [
        'Brand Identity',
        'Logo Design',
        'Visual Identity Systems',
        'Creative Campaigns',
        'Print Design',
        'Packaging Design',
        'Corporate Communication',
        'Copywriting',
        'Illustration',
        'Motion Graphics',
        'CGI & 3D Design',
        'Presentation Design',
      ],
    },
  },
  {
    id: 'technology',
    label: 'Technology',
    num: '03',
    video: '/videos/tech-video.mp4',
    d: 'M 67.4,35.39 L 67.4,51.22 L 59.15,60.15 L 59.09,44.53 Z',
    content: {
      heading: 'TECHNOLOGY',
      description: 'Technology turns ideas into experiences.',
      servicesLabel: 'Services',
      services: [
        'Website Design',
        'Website Development',
        'E-commerce',
        'UI/UX Design',
        'Mobile Applications',
        'Landing Pages',
        'Marketing Automation',
        'CRM Integration',
        'Analytics',
        'SEO',
        'AI Integrations',
      ],
    },
  },
  {
    id: 'media',
    label: 'Media',
    num: '04',
    video: '/videos/media-video.mp4',
    d: 'M 32.42,54.2 L 40.97,60.15 L 40.97,77.9 L 32.42,71.8 Z',
    content: {
      heading: 'MEDIA',
      description: "Visibility isn't enough. Precision is everything.",
      servicesLabel: 'Services',
      services: [
        'Media Planning',
        'Media Buying',
        'Digital Advertising',
        'Google Ads',
        'Meta Ads',
        'LinkedIn Campaigns',
        'YouTube Campaigns',
        'OTT Advertising',
        'Programmatic Media',
        'Outdoor Advertising',
        'Radio',
        'Print Media',
      ],
    },
  },
  {
    id: 'production',
    label: 'Production',
    num: '05',
    video: '/videos/production-video.mp4',
    d: 'M 42.4,64.29 L 57.78,64.51 L 57.78,81.62 L 50.9,89.8 L 48.5,88.31 L 42.4,81.3 Z',
    content: {
      heading: 'PRODUCTION',
      description: 'Every frame should leave an impression.',
      servicesLabel: 'Services',
      services: [
        'TV Commercials',
        'Digital Films',
        'Brand Films',
        'Corporate Films',
        'Product Films',
        'Photography',
        'Drone Shoots',
        'Podcasts',
        'Animation',
        'Motion Graphics',
        'Event Coverage',
        'Post Production',
      ],
    },
  },
  {
    id: 'growth',
    label: 'Growth',
    num: '06',
    video: '/videos/growth-video.mp4',
    d: 'M 59.51,80.87 L 59.57,63.23 L 67.52,54.52 L 67.52,71.84 Z',
    content: {
      heading: 'GROWTH',
      description: 'Growth is never accidental.',
      servicesLabel: 'Services',
      services: [
        'Performance Marketing',
        'Social Media Management',
        'Influencer Marketing',
        'Community Building',
        'Email Marketing',
        'Lead Generation',
        'Conversion Optimisation',
        'Marketplace Marketing',
        'Reputation Management',
        'Analytics & Reporting',
        'Growth Consulting',
      ],
    },
  },
];

type Cube = (typeof CUBES)[number];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as any },
  },
});

// Swaps the whole left-panel block (default copy <-> a clicked cube's content)
const panelSwap = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any, staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any } },
};

function ServicesHeroContent({
  eyebrow = 'OUR PHILOSOPHY',
  headingBlack,
  headingRed,
  description,
  ctaLabel = 'EXPLORE OUR SYSTEM',
  ctaHref = '/contact',
}: ServicesHeroProps) {
  const [activeCube, setActiveCube] = useState<Cube | null>(null);
  const [hoveredCube, setHoveredCube] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Hotspots are only triggers. The media always plays full-size in the
  // main image holder  clicking a face fades the cube image out and the
  // video in; clicking the same face again (or the video ending) reverses it.
  const toggleCube = useCallback((cube: Cube) => {
    if (pathname === '/') {
      sessionStorage.setItem('homeScrollPos', window.scrollY.toString());
      router.push(`/services/online?service=${cube.id}&autoPlay=true&returnHome=true`);
    } else {
      setActiveCube((current) => (current?.id === cube.id ? null : cube));
    }
  }, [pathname, router]);

  const closeActive = useCallback(() => {
    setActiveCube(null);
    if (searchParams.get('returnHome') === 'true') {
      router.push('/');
    }
  }, [searchParams, router]);

  useEffect(() => {
    const service = searchParams.get('service');
    const autoPlay = searchParams.get('autoPlay');
    if (service && autoPlay === 'true') {
      const cube = CUBES.find((c) => c.id === service);
      if (cube) {
        setActiveCube(cube);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (activeCube && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeCube]);

  useEffect(() => {
    if (!activeCube) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeActive();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeCube, closeActive]);

  return (
    <section className={styles.hero}>
      {/* ── LEFT panel  swaps to the active cube's content while its video plays ── */}
      <div className={styles.left}>
        <AnimatePresence mode="wait">
          {activeCube?.content ? (
            <motion.div
              key={`content-${activeCube.id}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelSwap}
            >
              <motion.p className={styles.eyebrow} variants={fadeUp(0)}>
                {activeCube.num}
              </motion.p>
              <motion.div
                className={styles.eyebrowRule}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              />

              <motion.h1 className={styles.heading} variants={fadeUp(0.05)}>
                {activeCube.content.heading}
              </motion.h1>

              <motion.p className={styles.description} variants={fadeUp(0.1)}>
                {activeCube.content.description}
              </motion.p>

              <motion.p className={styles.servicesLabel} variants={fadeUp(0.15)}>
                {activeCube.content.servicesLabel}
              </motion.p>

              <motion.ul className={styles.servicesList} variants={fadeUp(0.2)}>
                {activeCube.content.services.map((service) => (
                  <li key={service} className={styles.serviceItem}>
                    {service}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          ) : (
            <motion.div key="content-default" initial="hidden" animate="visible" exit="exit" variants={panelSwap}>
              <motion.p className={styles.eyebrow} variants={fadeUp(0)}>
                {eyebrow}
              </motion.p>
              <motion.div
                className={styles.eyebrowRule}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              />

              <motion.h1 className={styles.heading} variants={fadeUp(0.05)}>
                {headingBlack}
                <br />
                <span className={styles.headingRed}>{headingRed}</span>
              </motion.h1>

              <motion.p className={styles.description} variants={fadeUp(0.1)}>
                {description}
              </motion.p>

              <motion.div className={styles.watermark} variants={fadeUp(0.15)}>
                IM
              </motion.div>

              <motion.div variants={fadeUp(0.2)}>
                <Link href={ctaHref} className={styles.cta}>
                  <span className={styles.ctaLabel}>{ctaLabel}</span>
                  <span className={styles.ctaArrow}>
                    <svg width="18" height="12" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="0" y1="7" x2="16" y2="7" />
                      <polyline points="10 1 16 7 10 13" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── RIGHT panel  cube image, with the media always playing full-size in the same holder ── */}
      <motion.div
        className={styles.right}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] as any }}
      >
        <div className={styles.cubeWrapper}>
          <div className={styles.imageHolder}>
            {/* Base cube image */}
            <AnimatePresence>
              {!activeCube && (
                <motion.div
                  key="cube-image"
                  className={styles.mediaLayer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src="/strtegy pop.png"
                    alt="IM Solutions – Strategy, Creative, Technology, Media, Production, Growth"
                    fill
                    className={styles.cubeImg}
                    priority
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Full-size video  occupies the exact same holder, not clipped to any face */}
            <AnimatePresence>
              {activeCube && (
                <motion.div
                  key={activeCube.id}
                  className={styles.mediaLayer}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <video
                    ref={videoRef}
                    className={styles.cubeVideo}
                    autoPlay
                    muted
                    playsInline
                    onEnded={closeActive}
                  >
                    <source src={activeCube.video} type="video/mp4" />
                  </video>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Hotspots  invisible SVG paths, pixel-perfect to each face.
                 A soft blurred gold glow (radial gradient, no hard edge) fades in
                 behind the hovered face; the hit areas themselves stay fully invisible. ── */}
            <svg className={styles.hotspotSvg} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="false">
              <defs>
                <radialGradient id="cubeGlowGradient" cx="50%" cy="50%" r="65%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
                  <stop offset="55%" stopColor="#D4AF37" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                </radialGradient>
                <filter id="cubeGlowBlur" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="1.3" />
                </filter>
              </defs>

              {CUBES.map((cube) => (
                <motion.path
                  key={`glow-${cube.id}`}
                  d={cube.d}
                  className={styles.hotspotGlow}
                  initial={false}
                  animate={{ opacity: hoveredCube === cube.id && activeCube?.id !== cube.id ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}

              {CUBES.map((cube) => {
                const isActive = activeCube?.id === cube.id;
                return (
                  <path
                    key={cube.id}
                    d={cube.d}
                    className={styles.hotspotPath}
                    role="button"
                    tabIndex={0}
                    aria-label={isActive ? `${cube.label} video playing  press Enter to close` : `Play ${cube.label} video`}
                    onClick={() => toggleCube(cube)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleCube(cube);
                      }
                    }}
                    onMouseEnter={() => setHoveredCube(cube.id)}
                    onMouseLeave={() => setHoveredCube(null)}
                    onFocus={() => setHoveredCube(cube.id)}
                    onBlur={() => setHoveredCube(null)}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function ServicesHero(props: ServicesHeroProps) {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#111' }} />}>
      <ServicesHeroContent {...props} />
    </Suspense>
  );
}
