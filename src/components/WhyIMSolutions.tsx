"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./WhyIMSolutions.module.css";

const FOCUS_ITEMS = [
    "Create meaningful work.",
    "Deliver measurable growth.",
    "Build enduring brands.",
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function WhyIMSolutions() {
    const prefersReducedMotion = useReducedMotion();
    const viewport = { once: true, amount: 0.3 as const };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.visual}
                    initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
                    viewport={viewport}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <img
                        src="/image%20snew/11.jpeg"
                        alt="IM Solutions team reviewing brand growth strategy"
                        className={styles.image}
                    />
                </motion.div>

                <motion.div
                    className={styles.content}
                    initial={prefersReducedMotion ? undefined : "hidden"}
                    whileInView={prefersReducedMotion ? undefined : "visible"}
                    viewport={viewport}
                    variants={stagger}
                >
                    <motion.span variants={fadeUp} className={styles.label}>
                        Why IM Solutions
                    </motion.span>

                    <motion.h2 variants={fadeUp} className={styles.heading}>
                        Designed For Businesses That Think Long Term.
                    </motion.h2>

                    <motion.p variants={fadeUp} className={styles.paragraph}>
                        Every engagement combines strategic thinking, exceptional design, measurable
                        marketing and emerging technology into one integrated system.
                    </motion.p>

                    <motion.p variants={fadeUp} className={styles.paragraph}>
                        Whether building a new brand or transforming an established one, our focus
                        remains unchanged:
                    </motion.p>

                    <motion.ul variants={fadeUp} className={styles.focusList}>
                        {FOCUS_ITEMS.map((item) => (
                            <li key={item} className={styles.focusItem}>
                                {item}
                            </li>
                        ))}
                    </motion.ul>
                </motion.div>
            </div>
        </section>
    );
}
