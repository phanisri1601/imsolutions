'use client';

import { useEffect, useRef } from 'react';
import styles from './CreativeShowcaseSection.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function CreativeShowcaseSection() {
    const reduceMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);
    const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const showcaseItems = [
        { num: '01.', title: 'DISCOVERY', desc: 'We uncover the core of your brand, understanding your goals and audience to lay a solid foundation.', img: '/discovery.png', rotation: -3, offsetY: 0 },
        { num: '02.', title: 'STRATEGY', desc: 'Crafting a tailored roadmap and creative strategy designed to effectively capture attention and drive results.', img: '/strategy.png', rotation: 2, offsetY: 30 },
        { num: '03.', title: 'EXECUTION', desc: 'Bringing the vision to life through precision design, development, and impactful marketing campaigns.', img: '/execution.png', rotation: -2, offsetY: 60 },
        { num: '04.', title: 'GROWTH', desc: 'Analyzing performance data to optimize and scale your business, ensuring sustained and measurable success.', img: '/growth.png', rotation: 4, offsetY: 10 },
    ];

    useEffect(() => {
        if (reduceMotion) return;

        const section = sectionRef.current;
        const container = containerRef.current;
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

        if (!section || !container || cards.length === 0) return;

        const ctx = gsap.context(() => {
            // 1. Initial State: Hide all cards by pushing them offscreen below the fold 
            cards.forEach((card, i) => {
                const itemData = showcaseItems[i];
                gsap.set(card, {
                    y: '60vh', // Start closer to viewport to remove the blank scrolling gap
                    rotation: itemData.rotation * 2, // start with an exaggerated spin
                    opacity: 0,
                    scale: 0.8,
                    zIndex: i + 1, // ensure the cards stack over the previous ones properly
                });
            });

            // 2. Build the Timeline
            // Pin the entire container from the top so the title and space for cards lock into place
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: `+=${cards.length * 80}%`,
                    scrub: 1, // Smooth scrolling
                    pin: true,
                    pinSpacing: true,
                },
            });

            // 3. Animate each card in sequence
            cards.forEach((card, i) => {
                const itemData = showcaseItems[i];

                // As the user scrolls, bring the card up from 100vh to its natural flex position
                tl.to(card, {
                    y: itemData.offsetY,
                    x: 0,
                    rotation: itemData.rotation, // Apply tilt
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out"
                }, i * 0.3); // Add overlap by staggering with a small absolute time offset multiplier
            });

        }, section);

        return () => ctx.revert();
    }, [reduceMotion, showcaseItems.length]);

    return (
        <section ref={sectionRef} className={styles.showcaseSection}>
            <div ref={containerRef} className={styles.pinContainer}>
                <div className={styles.showcaseHeader}>
                    <h2 className={styles.showcaseTitle}>Creative Showcase</h2>
                    <p className={styles.showcaseDesc}>Explore our creative work and service highlights.</p>
                </div>

                <div className={styles.showcaseGrid}>
                    {showcaseItems.map((item, idx) => (
                        <div
                            key={idx}
                            ref={(el) => {
                                cardsRef.current[idx] = el;
                            }}
                            className={styles.showcaseCard}
                        >
                            <div className={styles.cardTop}>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <div className={styles.cardNumber}>{item.num}</div>
                                <p className={styles.cardDesc}>{item.desc}</p>
                            </div>
                            <div className={styles.cardImageWrapper}>
                                <img src={item.img} alt={item.title} className={styles.cardImage} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
