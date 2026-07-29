'use client';

import Link from 'next/link';
import GSAPScrollReveal from './GSAPScrollReveal';
import TextReveal from './TextReveal';
import styles from './Services.module.css';
import animStyles from './ScrollAnimations.module.css';
import { serviceUrlMap } from '../data/services';

export default function CrucialServices() {
    const crucialServices = [
        { name: 'Advertising Agency In Bangalore', image: '/online services/Advertising Agency In Banglore.png' },
        { name: 'Digital Marketing Service', image: '/online services/Digital Marketing Service.png' },
        { name: 'Search Engine Optimization', image: '/online services/Search Engine Optimization.png' },
        { name: 'Social Media Marketing', image: '/online services/Social Media Marketing.png' },
        { name: 'Website Designing and Development', image: '/online services/Web Designing And Development.png' },
        { name: 'Creative Designing', image: '/online services/Creative Designing.png' },
        { name: 'Mobile Application Development', image: '/online services/Mobile Application Development.png' },
        { name: 'Ecommerce Solutions', image: '/online services/Ecommerce Solutions.png' }
    ];

    const getServiceUrl = (service: string) => {
        return serviceUrlMap[service] || '/services';
    };

    return (
        <GSAPScrollReveal className={styles.services} id="crucial-services">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <TextReveal as="h2" animateType="heading" className="section-title">
                        CRUCIAL SERVICES
                    </TextReveal>
                    <TextReveal as="p" animateType="paragraph" className={styles.subtitle}>
                        Essential digital and advertising services to accelerate your growth
                    </TextReveal>
                </div>

                <div className={styles.servicesImageGrid}>
                    {crucialServices.map((service, index) => (
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
