'use client';

import Link from 'next/link';
import GSAPScrollReveal from './GSAPScrollReveal';
import TextReveal from './TextReveal';
import styles from './Services.module.css';
import { serviceUrlMap } from '../data/services';
import { serviceData } from '../data/servicesData';

export default function FeatureServices() {
    // Highest-value capabilities first: strategy, digital, AI, then offline reach.
    const featuredServices = [
        {
            name: 'Branding Re-Branding',
            label: 'Brand Strategy & Identity',
            image: '/offline images/Branding Re-Branding.png',
            description: 'Positioning, identity and messaging that give every channel one clear voice.'
        },
        {
            name: 'Digital Marketing Service',
            label: 'Digital & Performance Marketing',
            image: '/new-online-services/Digital Marketing Service.png',
            description: 'Search, social and paid media planned around qualified leads, not vanity metrics.'
        },
        {
            name: 'AI Advertising Agency',
            label: 'AI Advertising',
            image: '/new-online-services/Display Advertisement.png',
            description: 'AI-assisted targeting, creative testing and AI-search visibility.'
        },
        {
            name: 'Hoarding Services',
            label: 'Offline & Out-of-Home',
            image: '/offline images/Hoarding Services.png',
            description: 'Hoardings, airports, transit and activations that put the brand in the real world.'
        }
    ];

    const getServiceUrl = (service: string) => {
        return serviceUrlMap[service] || '/services';
    };

    return (
        <GSAPScrollReveal className={`${styles.services} ${styles.featuredServices}`} id="featured-services">
            <div className="container">
                <div className={styles.featuredHeader}>
                    <TextReveal as="h2" animateType="heading" className="section-title">
                        FEATURED SERVICES
                    </TextReveal>
                    <TextReveal as="p" animateType="paragraph" className={styles.subtitle}>
                        Strategy, digital, AI and offline: the capabilities clients bring us in for most
                    </TextReveal>
                </div>

                <div className={styles.servicesImageGrid}>
                    {featuredServices.map((service, index) => (
                        <Link
                            key={service.name}
                            href={getServiceUrl(service.name)}
                            className={`${styles.serviceImageTile} ${index === 0 ? styles.serviceImageTileLead : ''}`}
                            style={{ backgroundImage: `url("${encodeURI(service.image)}")` }}
                        >
                            <span className={styles.serviceImageIndex} aria-hidden="true">
                                0{index + 1}
                            </span>
                            <span className={styles.serviceImageContent}>
                                <span className={styles.serviceImageLabel}>{service.label}</span>
                                <span className={styles.serviceImageDescription}>{service.description}</span>
                                <span className={styles.serviceImageAction} aria-hidden="true">
                                    Explore service <span>↗</span>
                                </span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </GSAPScrollReveal>
    );
}
