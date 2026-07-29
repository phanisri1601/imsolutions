'use client';

import Link from 'next/link';
import GSAPScrollReveal from './GSAPScrollReveal';
import TextReveal from './TextReveal';
import styles from './Services.module.css';
import animStyles from './ScrollAnimations.module.css';
import { serviceUrlMap } from '../data/services';

export default function FeatureServices() {
    const featuredServices = [
        { name: 'Branding Re-Branding', image: '/offline images/Branding Re-Branding.png' },
        { name: 'Event Management', image: '/offline images/Event Management.png' },
        { name: 'Hoarding Services', image: '/offline images/Hoarding Services.png' },
        { name: 'Corporate Training Services', image: '/offline images/Corporate Training.png' }
    ];

    const getServiceUrl = (service: string) => {
        return serviceUrlMap[service] || '/services';
    };

    return (
        <GSAPScrollReveal className={styles.services} id="featured-services" style={{ background: 'var(--color-bg-secondary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <TextReveal as="h2" animateType="heading" className="section-title">
                        FEATURED SERVICES
                    </TextReveal>
                    <TextReveal as="p" animateType="paragraph" className={styles.subtitle}>
                        Specialized offline and experiential marketing solutions
                    </TextReveal>
                </div>

                <div className={styles.servicesImageGrid}>
                    {featuredServices.map((service, index) => (
                        <Link 
                            key={index}
                            href={getServiceUrl(service.name)}
                            className={styles.serviceImageTile}
                            style={{ backgroundImage: `url("${service.image}")` }}
                        >
                            <span className={styles.serviceImageLabel}>{service.name.toLowerCase()}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </GSAPScrollReveal>
    );
}
