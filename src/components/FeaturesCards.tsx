"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import styles from "./FeaturesCards.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

const paragraphs = [
    "Growth is more than reaching new audiences.",
    "It is about earning trust, shaping perceptions, creating influence, and becoming the brand people instinctively choose. At IM Solutions, we transform ideas into momentum and momentum into meaningful business success by bringing together strategic thinking, compelling creativity, intelligent technology, and performance-driven marketing to build brand ecosystems that thrive across every platform and every stage of the customer journey. From strengthening your digital presence and improving organic search visibility to crafting unforgettable brand experiences and delivering measurable marketing performance, every solution is designed with one goalto move your business forward. We believe exceptional brands are not built through isolated campaigns but through consistency, clarity, innovation, and a relentless commitment to excellence. Because when every touchpoint reflects your purpose, your brand doesn't simply growit creates lasting impact.",
];

const closingStatements = ["It becomes admired.", "It becomes trusted.", "It becomes unforgettable."];

// Reusable animation variants  kept separate from JSX.
const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const contentVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = (distance: number): Variants => ({
    hidden: { opacity: 0, y: distance },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: EASE },
    },
});

// Reduces the reveal translate distance on smaller viewports (80 → 50).
function useResponsiveDistance() {
    const [distanceY, setDistanceY] = useState(80);

    useEffect(() => {
        const update = () => setDistanceY(window.innerWidth <= 768 ? 50 : 80);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return distanceY;
}

export default function FeaturesCards() {
    const prefersReducedMotion = useReducedMotion();
    const distanceY = useResponsiveDistance();
    const viewport = { once: true, amount: 0.28 as const };

    return (
        <motion.section
            className={styles.featuresSection}
            initial={prefersReducedMotion ? undefined : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={viewport}
            variants={sectionVariants}
        >
            <div className={styles.container}>
                <div className={styles.layoutGrid}>
                    <motion.div
                        className={styles.textCol}
                        initial={prefersReducedMotion ? undefined : "hidden"}
                        whileInView={prefersReducedMotion ? undefined : "visible"}
                        viewport={viewport}
                        variants={contentVariants}
                    >
                        <motion.span variants={itemVariants(distanceY)} className={styles.eyebrow}>
                            Our Approach
                        </motion.span>

                        <motion.h3 variants={itemVariants(distanceY)} className={styles.mainTitle}>
                            Powering Brand Growth
                        </motion.h3>

                        <motion.div variants={itemVariants(distanceY)} className={styles.textBlock}>
                            {paragraphs.map((paragraph) => (
                                <p key={paragraph} className={styles.paragraph}>
                                    {paragraph}
                                </p>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants(distanceY)} className={styles.statementList}>
                            {closingStatements.map((statement) => (
                                <p key={statement} className={styles.statement}>
                                    <span className={styles.statementDot} aria-hidden="true" />
                                    {statement}
                                    <FiArrowRight className={styles.statementArrow} aria-hidden="true" />
                                </p>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants(distanceY)}>
                            <Link href="/services" className={styles.ctaButton}>
                                <motion.span
                                    className={styles.ctaButtonInner}
                                    whileHover={{ scale: 1.05, boxShadow: "0 12px 28px rgba(186, 50, 50, 0.28)" }}
                                    transition={{ duration: 0.25, ease: EASE }}
                                >
                                    Explore Our Services
                                    <FiArrowRight aria-hidden="true" />
                                </motion.span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
