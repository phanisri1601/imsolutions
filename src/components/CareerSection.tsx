"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import styles from "./CareerSection.module.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function CareerSection() {
    const prefersReducedMotion = useReducedMotion();
    const viewport = { once: true, amount: 0.3 as const };

    return (
        <section className={styles.section}>
            <div className={styles.imageWrap}>
                <img src="/career-Home.png" alt="Life at IM Solutions" className={styles.image} />
            </div>

            <motion.div
                className={styles.content}
                initial={prefersReducedMotion ? undefined : "hidden"}
                whileInView={prefersReducedMotion ? undefined : "visible"}
                viewport={viewport}
                variants={stagger}
            >
                <motion.span variants={fadeUp} className={styles.brand}>
                    IM SOLUTIONS
                </motion.span>

                <motion.span variants={fadeUp} className={styles.eyebrow}>
                    CAREERS AT IM SOLUTIONS
                </motion.span>

                <motion.h2 variants={fadeUp} className={styles.title}>
                    Build your story.<br />
                    Shape what&apos;s next.
                </motion.h2>

                <motion.p variants={fadeUp} className={styles.text}>
                    At IM Solutions, we believe the best work comes from curious minds, bold ideas, and
                    meaningful collaboration. Join a team where your talent is nurtured, your ideas matter,
                    and your work creates real impact.
                </motion.p>

                <motion.div variants={fadeUp} className={styles.actions}>
                    <Link href="/careers" className={styles.primaryButton}>
                        EXPLORE OPPORTUNITIES
                        <FiArrowRight aria-hidden="true" />
                    </Link>
                    <Link href="/careers" className={styles.secondaryButton}>
                        LIFE AT IM
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
