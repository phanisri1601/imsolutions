"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import styles from "./BenefitsSection.module.css";

const benefits = [
    "Change all you have in your world.",
    "We develop good teams and leaders.",
    "The business guru gives you the idea."
];

export default function BenefitsSection() {
    return (
        <section className={styles.benefitsSection}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    {/* Left Side - Image */}
                    <ScrollReveal direction="left" delay={0.2}>
                        <motion.div
                            className={styles.imageWrapper}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                src="/wcu_growth.png"
                                alt="Team working"
                                className={styles.image}
                            />
                        </motion.div>
                    </ScrollReveal>

                    {/* Right Side - Content */}
                    <div className={styles.textContent}>
                        <ScrollReveal delay={0.3}>
                            <h2 className={styles.title}>Lorem ipsum dolor sit amet</h2>
                        </ScrollReveal>

                        <ScrollReveal delay={0.4}>
                            <p className={styles.description}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consectetur.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal delay={0.5}>
                            <ul className={styles.benefitsList}>
                                {benefits.map((benefit, index) => (
                                    <motion.li
                                        key={index}
                                        className={styles.benefitItem}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false, amount: 0.3 }}
                                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={styles.checkIcon}
                                        >
                                            <path
                                                d="M20 6L9 17L4 12"
                                                stroke="#22c55e"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span>{benefit}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

