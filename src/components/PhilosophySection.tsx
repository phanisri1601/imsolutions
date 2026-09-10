"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionTemplate,
    useReducedMotion,
    type MotionValue,
} from "framer-motion";
import styles from "./PhilosophySection.module.css";

const HEADING_WORDS = "Every Brand Follows A Journey. We Design It.".split(" ");

const STATEMENTS = ["A logo is remembered.", "A campaign is noticed.", "A brand is experienced."];

function RevealWord({
    word,
    progress,
    range,
}: {
    word: string;
    progress: MotionValue<number>;
    range: [number, number];
}) {
    const opacity = useTransform(progress, range, [0, 1]);
    const y = useTransform(progress, range, [18, 0]);
    return (
        <>
            <motion.span className={styles.word} style={{ opacity, y }}>
                {word}
            </motion.span>
            {" "}
        </>
    );
}

function StatementLine({
    text,
    progress,
    inRange,
    dimRange,
    finalOpacity,
}: {
    text: string;
    progress: MotionValue<number>;
    inRange: [number, number];
    dimRange: [number, number];
    finalOpacity: number;
}) {
    const riseOpacity = useTransform(progress, inRange, [0, 1]);
    const y = useTransform(progress, inRange, [26, 0]);
    const dimOpacity = useTransform(progress, dimRange, [1, finalOpacity]);
    const opacity = useTransform([riseOpacity, dimOpacity], ([a, b]: number[]) => Math.min(a, b));

    return (
        <motion.p className={styles.statement} style={{ opacity, y }}>
            {text}
        </motion.p>
    );
}

export default function PhilosophySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(mediaQuery.matches);
        update();
        mediaQuery.addEventListener("change", update);
        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    const { scrollYProgress: rawProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scrollYProgress = useSpring(rawProgress, {
        damping: 30,
        stiffness: 180,
        mass: 0.4,
    });

    const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);
    const eyebrowY = useTransform(scrollYProgress, [0, 0.04], [16, 0]);

    const introOpacity = useTransform(scrollYProgress, [0.14, 0.22], [1, 0]);
    const introY = useTransform(scrollYProgress, [0.14, 0.22], [0, -24]);

    const imageScale = useTransform(scrollYProgress, [0.08, 0.2], [1.08, 1]);
    const imageOpacity = useTransform(scrollYProgress, [0.06, 0.14], [0, 1]);
    const imageFadeOut = useTransform(scrollYProgress, [0.28, 0.36], [1, 0]);
    const imageShow = useTransform([imageOpacity, imageFadeOut], ([a, b]: number[]) => Math.min(a, b));

    const copyOpacity = useTransform(scrollYProgress, [0.24, 0.32], [0, 1]);
    const copyY = useTransform(scrollYProgress, [0.24, 0.32], [20, 0]);

    const paraOpacity = useTransform(scrollYProgress, [0.38, 0.44], [0, 1]);
    const paraBlurPx = useTransform(scrollYProgress, [0.38, 0.44], [8, 0]);
    const paraFilter = useMotionTemplate`blur(${paraBlurPx}px)`;

    if (prefersReducedMotion || isMobile) {
        return (
            <section className={styles.staticSection}>
                <div className={styles.container}>
                    <span className={styles.eyebrow}>Our Philosophy</span>
                    <h2 className={styles.heading}>Every Brand Follows A Journey. We Design It.</h2>
                    <div className={styles.imageWrap}>
                        <Image
                            src="/philosophy-editorial.png"
                            alt="A designer's desk with brand strategy notebooks and moodboards"
                            fill
                            className={styles.image}
                            sizes="(max-width: 900px) 100vw, 1000px"
                        />
                    </div>
                    <div className={styles.statements}>
                        {STATEMENTS.map((s) => (
                            <p key={s} className={styles.statement}>{s}</p>
                        ))}
                    </div>
                    <p className={styles.paragraph}>
                        We believe meaningful brands are never accidental. They are shaped through insight,
                        refined through creativity and strengthened by consistency. Every decision we make
                        is guided by purpose, because enduring brands are built one thoughtful choice at a
                        time.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section ref={containerRef} className={styles.pinWrapper}>
            <div className={styles.stickyInner}>
                <div className={styles.container}>
                    <div className={styles.stage}>
                        <motion.div
                            className={styles.introLayer}
                            style={{ opacity: introOpacity, y: introY }}
                        >
                            <motion.span className={styles.eyebrow} style={{ opacity: eyebrowOpacity, y: eyebrowY }}>
                                Our Philosophy
                            </motion.span>

                            <h2 className={styles.heading}>
                                {HEADING_WORDS.map((word, i) => {
                                    const start = 0.02 + i * 0.018;
                                    const end = start + 0.05;
                                    return <RevealWord key={i} word={word} progress={scrollYProgress} range={[start, end]} />;
                                })}
                            </h2>
                        </motion.div>

                        <motion.div
                            className={styles.imageLayer}
                            style={{ opacity: imageShow }}
                        >
                            <motion.div className={styles.imageScaler} style={{ scale: imageScale }}>
                                <Image
                                    src="/philosophy-editorial.png"
                                    alt="A designer's desk with brand strategy notebooks and moodboards"
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 900px) 100vw, 1000px"
                                />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className={styles.copyLayer}
                            style={{ opacity: copyOpacity, y: copyY }}
                        >
                            <div className={styles.statements}>
                                <StatementLine
                                    text={STATEMENTS[0]}
                                    progress={scrollYProgress}
                                    inRange={[0.3, 0.35]}
                                    dimRange={[0.42, 0.46]}
                                    finalOpacity={0.55}
                                />
                                <StatementLine
                                    text={STATEMENTS[1]}
                                    progress={scrollYProgress}
                                    inRange={[0.4, 0.45]}
                                    dimRange={[0.5, 0.54]}
                                    finalOpacity={0.55}
                                />
                                <StatementLine
                                    text={STATEMENTS[2]}
                                    progress={scrollYProgress}
                                    inRange={[0.44, 0.49]}
                                    dimRange={[0.99, 1]}
                                    finalOpacity={1}
                                />
                            </div>

                            <motion.p className={styles.paragraph} style={{ opacity: paraOpacity, filter: paraFilter }}>
                                We believe meaningful brands are never accidental. They are shaped through insight,
                                refined through creativity and strengthened by consistency. Every decision we make
                                is guided by purpose, because enduring brands are built one thoughtful choice at a
                                time.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
