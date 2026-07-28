'use client';

import { motion } from 'framer-motion';
import styles from './CareerHero.module.css';

export default function CareerHero() {
    return (
        <section className={styles.hero}>
            <motion.div
                className={styles.background}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    CAREERS
                </motion.h1>
            </div>
        </section>
    );
}

