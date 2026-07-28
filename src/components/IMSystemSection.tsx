"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styles from "./IMSystemSection.module.css";

interface Panel {
    id: string;
    num: string;
    label: string;
    heading: string[]; // rendered as separate lines
    content: string[]; // paragraphs
    quote?: string;
    accent: string; // tint used for this stage's visual card
    image?: string;
}

const SYSTEM: Panel = {
    id: "system",
    num: "00",
    label: "The IM System™",
    heading: ["One System.", "Infinite Possibilities."],
    content: [
        "A structured framework that moves every project through six interconnected stages, turning ideas into measurable business growth.",
    ],
    quote: "Not scattered. Not reactive. Designed to perform.",
    accent: "#1a1a1a",
};

const STAGES: Panel[] = [
    {
        id: "discover",
        num: "01",
        label: "Discover",
        heading: ["Every Great Brand Begins", "With Understanding."],
        content: [
            "We study markets before we shape messages  market research, consumer behaviour and brand discovery workshops uncover the opportunities others overlook.",
        ],
        quote: "The strongest ideas rarely come first.",
        accent: "#B5895B",
        image: "Discover.png",
    },
    {
        id: "strategize",
        num: "02",
        label: "Strategize",
        heading: ["Clarity Creates Direction."],
        content: [
            "Brand positioning, communication strategy and go-to-market planning  every decision engineered to move your business towards measurable growth.",
        ],
        quote: "Without strategy, creativity becomes decoration.",
        accent: "#28425E",
        image: "Strategize.png",
    },
    {
        id: "create",
        num: "03",
        label: "Create",
        heading: ["Ideas Deserve", "Extraordinary Execution."],
        content: [
            "Brand identities, campaigns, websites and digital experiences  work that's visually compelling and commercially effective.",
        ],
        quote: "Beautiful design earns attention. Meaningful design earns loyalty.",
        accent: "#5B3A6B",
        image: "Create.png",
    },
    {
        id: "amplify",
        num: "04",
        label: "Amplify",
        heading: ["Visibility Without Strategy", "Is Noise."],
        content: [
            "Performance advertising, SEO, SEM and social  reaching the right audience with the right message at the right moment.",
        ],
        accent: "#1E6E63",
        image: "Amplify.png",
    },
    {
        id: "scale",
        num: "05",
        label: "Scale",
        heading: ["Growth Is Never", "An Accident."],
        content: [
            "Performance analytics, optimisation and automation  growing your business with confidence and consistency.",
        ],
        quote: "Brands that thrive don't advertise more. They improve continuously.",
        accent: "#1F5C3C",
        image: "Scale.jpeg",
    },
    {
        id: "legacy",
        num: "06",
        label: "Legacy",
        heading: ["The Greatest Brands", "Outlive Campaigns."],
        content: [
            "We build businesses that continue to create value, influence industries and stay relevant for years to come.",
        ],
        quote: "Campaigns create conversations. Brands create memories.",
        accent: "#8A6D1E",
        image: "Legacy.png",
    },
];

const AUTOPLAY_MS = 6000;

const headerStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as any } },
};

const slideVariants = {
    enter: { opacity: 0, y: 24 },
    center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
    exit: { opacity: 0, y: -24, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as any } },
};

function StageVisual({ panel, className }: { panel: Panel; className: string }) {
    return (
        <div
            className={className}
            style={{
                background: `radial-gradient(120% 120% at 25% 20%, ${panel.accent}2e 0%, ${panel.accent}12 45%, #ffffff 100%)`,
            }}
        >
            {panel.image ? (
                <img
                    src={encodeURI(`/IM System/${panel.image}`)}
                    alt={`${panel.label} visual`}
                    className={styles.stageImage}
                    loading="lazy"
                />
            ) : (
                <span className={styles.ghostNumber} style={{ color: `${panel.accent}26` }}>
                    {panel.num}
                </span>
            )}
        </div>
    );
}

export default function IMSystemSection() {
    const prefersReducedMotion = useReducedMotion();
    const viewport = { once: true, amount: 0.3 as const };
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (prefersReducedMotion) return;
        const timer = setInterval(() => {
            setActiveIndex((i) => (i + 1) % STAGES.length);
        }, AUTOPLAY_MS);
        return () => clearInterval(timer);
    }, [prefersReducedMotion, activeIndex]);

    const panel = STAGES[activeIndex];
    const reversed = activeIndex % 2 === 1;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* ── Header  system overview ── */}
                <motion.div
                    className={styles.header}
                    initial={prefersReducedMotion ? undefined : "hidden"}
                    whileInView={prefersReducedMotion ? undefined : "visible"}
                    viewport={viewport}
                    variants={headerStagger}
                >
                    <motion.h2 variants={fadeUp} className={styles.heading}>
                        {SYSTEM.heading.map((line) => (
                            <span key={line} className={styles.headingLine}>{line}</span>
                        ))}
                    </motion.h2>

                    {SYSTEM.content.map((paragraph) => (
                        <motion.p key={paragraph} variants={fadeUp} className={styles.paragraph}>
                            {paragraph}
                        </motion.p>
                    ))}

                    {SYSTEM.quote && (
                        <motion.p variants={fadeUp} className={styles.quote}>
                            {SYSTEM.quote}
                        </motion.p>
                    )}
                </motion.div>

                {/* ── Stages  animated slider ── */}
                <div className={styles.slider}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={panel.id}
                            className={`${styles.stageRow} ${reversed ? styles.stageRowReverse : ""}`}
                            variants={prefersReducedMotion ? undefined : slideVariants}
                            initial={prefersReducedMotion ? undefined : "enter"}
                            animate={prefersReducedMotion ? undefined : "center"}
                            exit={prefersReducedMotion ? undefined : "exit"}
                        >
                            <StageVisual panel={panel} className={styles.stageVisual} />
                            <div className={styles.stageContent}>
                                <h3 className={styles.stageHeading}>
                                    {panel.heading.map((line) => (
                                        <span key={line} className={styles.headingLine}>{line}</span>
                                    ))}
                                </h3>
                                {panel.content.map((paragraph) => (
                                    <p key={paragraph} className={styles.stageParagraph}>
                                        {paragraph}
                                    </p>
                                ))}
                                {panel.quote && <p className={styles.stageQuote}>{panel.quote}</p>}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className={styles.dots}>
                        {STAGES.map((s, i) => (
                            <button
                                key={s.id}
                                type="button"
                                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={i === activeIndex}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
