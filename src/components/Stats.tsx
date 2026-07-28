'use client';

import { FaUsers, FaClock, FaThumbsUp } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import Counter from './Counter';
import styles from './Stats.module.css';

export default function Stats() {
    const stats = [
        {
            icon: <FaClock />,
            value: 7,
            suffix: '+',
            label: 'Years of Experience'
        },
        {
            icon: <FaUsers />,
            value: 300,
            suffix: '+',
            label: 'Happy Clients'
        },
        {
            icon: <FaThumbsUp />,
            value: 100,
            suffix: '%',
            label: 'Satisfaction Rate'
        }
    ];

    return (
        <section className={styles.stats}>
            <div className="container">
                <ScrollReveal delay={0.2}>
                    <h2 className="section-title">WHO WE ARE?</h2>
                    <p className={styles.subtitle}>
                        A leading advertising agency in Bangalore delivering exceptional results for brands across industries
                    </p>
                </ScrollReveal>

                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <ScrollReveal key={index} delay={0.3 + index * 0.15}>
                            <div className={styles.statCard}>
                                <div className={styles.statIcon}>
                                    {stat.icon}
                                </div>
                                <div className={styles.statValue}>
                                    <Counter end={stat.value} duration={2000} suffix={stat.suffix} />
                                </div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
