'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import styles from './TestAnimation.module.css';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = '/12642073_1920_1080_24fps.mp4';

const cardsContent = [
  {
    title: 'Performance Marketing',
    description: 'We help your business grow with marketing that delivers real results',
    items: ['Paid Ads / PPC', 'Conversion Optimization', 'ROI Analysis', 'Retargeting & Remarketing', 'Keyword Strategy'],
  },
  {
    title: 'Brand Strategy',
    description: 'Position your brand with clarity, consistency, and impact across every channel',
    items: ['Brand Identity', 'Messaging', 'Creative Direction', 'Campaign Planning', 'Market Research'],
  },
  {
    title: 'Content & Social',
    description: 'Build engagement with content designed for people and platforms',
    items: ['Content Planning', 'Reels & Shorts', 'Copywriting', 'Community Building', 'Analytics'],
  },
  {
    title: 'Offline Presence',
    description: 'Extend your reach beyond screens with targeted offline campaigns',
    items: ['OOH Advertising', 'Print Media', 'Events', 'Local Activations', 'Partnerships'],
  },
];

function CardBody({ card }: { card: (typeof cardsContent)[number] }) {
  return (
    <div className={styles.cardContent}>
      <div className={styles.textPane}>
        <h3 className={styles.cardTitle}>{card.title}</h3>
        <p className={styles.cardText}>{card.description}</p>
        <ul className={styles.list}>
          {card.items.map((item) => (
            <li key={item} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.mediaPane}>
        <video
          className={styles.video}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>
    </div>
  );
}

export default function TestAnimation() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stackScrollHeight = `${(cardsContent.length - 1) * 110 + 140}vh`;

  useEffect(() => {
    if (reduceMotion) return;

    const section = sectionRef.current;
    const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const stickyEl = section?.querySelector(`.${styles.sticky}`) as HTMLElement | null;

    if (!section || !stickyEl || cardEls.length === 0) return;

    const ctx = gsap.context(() => {
      cardEls.forEach((el, i) => {
        gsap.set(el, {
          y: i === 0 ? 0 : '100vh',
          yPercent: 0,
          zIndex: i + 1,
          scale: 1,
          willChange: 'transform',
        });
      });

      const segments = Math.max(1, cardEls.length - 1);
      const segmentScroll = 110;
      const releaseBuffer = 35;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stickyEl,
          start: 'center center',
          end: `+=${segments * segmentScroll + releaseBuffer}%`,
          scrub: 1,
          pin: stickyEl,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < cardEls.length; i += 1) {
        const current = cardEls[i];
        const previous = cardEls[i - 1];

        tl.to(
          current,
          {
            y: 0,
            yPercent: 0,
            duration: 1,
          },
          i - 1
        );

        tl.to(
          previous,
          {
            scale: 0.97,
            duration: 1,
          },
          i - 1
        );
      }
    }, section);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    const card = cardsContent[0];
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.stackArea} style={{ height: 'auto' }}>
            <div className={styles.stickyStatic}>
              <div className={styles.stackViewport}>
                <div className={styles.card}>
                  <CardBody card={card} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.stackArea} style={{ height: stackScrollHeight }}>
          <div className={styles.sticky}>
            <div className={styles.stackViewport}>
              {cardsContent.map((card, index) => (
                <div
                  key={card.title}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className={styles.card}
                >
                  <CardBody card={card} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
