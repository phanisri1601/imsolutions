'use client';

import { FaRocket, FaHandshake, FaHome, FaLightbulb } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import styles from './Offerings.module.css';

export default function Offerings() {
    const offerings = [
        {
            icon: <FaRocket />,
            title: 'Product Launch',
            description: 'Strategic product launch campaigns that create buzz and drive market penetration.'
        },
        {
            icon: <FaHandshake />,
            title: 'Brand Activation',
            description: 'Experiential marketing campaigns that bring your brand to life and engage customers.'
        },
        {
            icon: <FaHome />,
            title: 'Real Estate Marketing',
            description: 'Specialized marketing solutions for real estate developers and property businesses.'
        },
        {
            icon: <FaLightbulb />,
            title: 'Start-Up Marketing',
            description: 'Growth-focused marketing strategies tailored for startups and emerging businesses.'
        }
    ];

    return (
        <section className={styles.offerings}>
            <div className="container">
                <ScrollReveal delay={0.2}>
                    <h2 className="section-title">WANT TO KNOW MORE?</h2>
                    <h3 className={styles.subtitle}>HELPING YOUR BRAND REACH NEW HEIGHTS!</h3>
                </ScrollReveal>

                <div className={styles.offeringsGrid}>
                    {offerings.map((offering, index) => (
                        <ScrollReveal key={index} delay={0.3 + index * 0.15}>
                            <div className={styles.offeringCard}>
                                <div className={styles.cardOverlay}>
                                    <div className={styles.iconWrapper}>
                                        {offering.icon}
                                    </div>
                                    <h3 className={styles.offeringTitle}>{offering.title}</h3>
                                    <p className={styles.offeringDescription}>{offering.description}</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
