"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import styles from "./BlogHomeSection.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function BlogHomeSection() {
    const prefersReducedMotion = useReducedMotion();
    const viewport = { once: true, amount: 0.3 as const };

    return (
        <section className={styles.section}>
            <img src="/Blog-Home.png" alt="IM Solutions blog  data and insights" className={styles.image} />

            <motion.div
                className={styles.content}
                initial={prefersReducedMotion ? undefined : "hidden"}
                whileInView={prefersReducedMotion ? undefined : "visible"}
                viewport={viewport}
                variants={stagger}
            >
                <motion.span variants={fadeUp} className={styles.eyebrow}>
                    IM SOLUTIONS BLOG
                </motion.span>

                <motion.span variants={fadeUp} className={styles.accentLine} />

                <motion.h2 variants={fadeUp} className={styles.title}>
                    Data That<br />
                    Drives
                </motion.h2>

                <motion.span variants={fadeUp} className={styles.accentLine} />

                <motion.p variants={fadeUp} className={styles.text}>
                    Turning insights into<br />
                    intelligence and<br />
                    performance.
                </motion.p>

                <motion.div variants={fadeUp}>
                    <Link href="/blog" className={styles.ctaButton} aria-label="Read the IM Solutions blog">
                        <FiArrowRight aria-hidden="true" />
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
