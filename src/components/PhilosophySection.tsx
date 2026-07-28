"use client";

import { useRef } from "react";
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

// Word-by-word heading reveal  each word owns a thin slice of the pinned
// scroll range so they light up left-to-right as the user scrolls.
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

// A statement line slides up into view, then settles to a dimmed-but-visible
// state once the next line takes focus  keeps the previous line legible
// without competing with the new one.
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

    const { scrollYProgress: rawProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooths the raw scroll position into a slightly lagging, springy motion
    // value  every transform below rides this instead of the raw progress,
    // which is what makes the reveal feel fluid rather than mechanically
    // locked to the scrollbar.
    const scrollYProgress = useSpring(rawProgress, {
        damping: 30,
        stiffness: 180,
        mass: 0.4,
    });

    const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.03], [0, 1]);
    const eyebrowY = useTransform(scrollYProgress, [0, 0.03], [16, 0]);

    const imageScale = useTransform(scrollYProgress, [0.17, 0.3], [1.08, 1]);
    const imageOpacity = useTransform(scrollYProgress, [0.17, 0.26], [0, 1]);

    const paraOpacity = useTransform(scrollYProgress, [0.52, 0.58], [0, 1]);
    const paraBlurPx = useTransform(scrollYProgress, [0.52, 0.58], [8, 0]);
    const paraFilter = useMotionTemplate`blur(${paraBlurPx}px)`;

    if (prefersReducedMotion) {
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

                    <motion.div className={styles.imageWrap} style={{ opacity: imageOpacity }}>
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
                            inRange={[0.48, 0.53]}
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
                </div>
            </div>
        </section>
    );
}
