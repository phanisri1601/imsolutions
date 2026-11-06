'use client';

import Link from 'next/link';
import GSAPScrollReveal from './GSAPScrollReveal';
import TextReveal from './TextReveal';
import styles from './Services.module.css';
import { serviceUrlMap } from '../data/services';
import { serviceData } from '../data/servicesData';

export default function FeatureServices() {
    const featuredServices = [
        {
            name: 'Branding Re-Branding',
            image: '/offline images/Branding Re-Branding.png',
            description: serviceData['branding-rebranding'].description
        },
        {
            name: 'Event Management',
            image: '/offline images/Event Management.png',
            description: serviceData['event-management'].description
        },
        {
            name: 'Hoarding Services',
            image: '/offline images/Hoarding Services.png',
            description: serviceData['hoarding-services'].description
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
                        Specialized offline and experiential marketing solutions
                    </TextReveal>
                </div>

                <div className={styles.servicesImageGrid}>
                    {featuredServices.map((service, index) => (
                        <Link
                            key={service.name}
                            href={getServiceUrl(service.name)}
                            className={`${styles.serviceImageTile} ${index === 0 ? styles.serviceImageTileLead : ''}`}
                            style={{ backgroundImage: `url("${service.image}")` }}
                        >
                            <span className={styles.serviceImageIndex} aria-hidden="true">
                                0{index + 1}
                            </span>
                            <span className={styles.serviceImageContent}>
                                <span className={styles.serviceImageLabel}>{service.name}</span>
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
