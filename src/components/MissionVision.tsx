"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import styles from "./MissionVision.module.css";

const missionContent = {
    title: "Our Mission",
    description: "To awaken the extraordinary within every brand.",
    additionalText: "Turning vision into influence, and ambition into enduring value."
};

const visionContent = {
    title: "Our Vision",
    description: "To create a world inspired by brands with purpose.",
    additionalText: "To shape ideas that transcend time, industries, and generations."
};

export default function MissionVision() {
    return (
        <section className={styles.missionVisionSection}>
            <div className={styles.container}>
                {/* Mission Section - Text left, Image right */}
                <div className={styles.section}>
                    <div className={styles.contentWrapper}>
                        <ScrollReveal direction="right" delay={0.2}>
                            <div className={styles.textContent}>
                                <h2 className={styles.title}>{missionContent.title}</h2>
                                <p className={styles.description}>{missionContent.description}</p>
                                <p className={styles.additionalText}>{missionContent.additionalText}</p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="left" delay={0.3}>
                            <motion.div
                                className={styles.imageWrapper}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img
                                    src="/image%20snew/6.jpeg"
                                    alt="Mission"
                                    className={styles.image}
                                />
                            </motion.div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Vision Section - Image left, Text right */}
                <div className={styles.section}>
                    <div className={styles.contentWrapper}>
                        <ScrollReveal direction="right" delay={0.4}>
                            <motion.div
                                className={styles.imageWrapper}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img
                                    src="/image%20snew/9.jpeg"
                                    alt="Vision"
                                    className={styles.image}
                                />
                            </motion.div>
                        </ScrollReveal>

                        <ScrollReveal direction="left" delay={0.5}>
                            <div className={styles.textContent}>
                                <h2 className={styles.title}>{visionContent.title}</h2>
                                <p className={styles.description}>{visionContent.description}</p>
                                <p className={styles.additionalText}>{visionContent.additionalText}</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

