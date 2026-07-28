'use client';

import Link from 'next/link';
import GSAPScrollReveal from './GSAPScrollReveal';
import TextReveal from './TextReveal';
import styles from './Services.module.css';
import animStyles from './ScrollAnimations.module.css';

export default function Services() {
    const onlineServices = [
        'Advertising Agency In Bangalore',
        'Digital Marketing Service',
        'Search Engine Optimization',
        'Search Engine Marketing',
        'Online Reputation Management',
        'Website Designing and Development',
        'Social Media Optimization',
        'Social Media Marketing',
        'Software Design & Development',
        'Geolocation Analytical SMS',
        'AI Advertising Agency',
        'Creative Designing',
        'API Integration',
        'Ecommerce Solutions',
        'Email Marketing',
        'Mobile Application Development',
        'Real Estate Online Marketing Service',
        'Display Advertisement',
        'Blog Articles',
        'Classified Portal Management',
        'Press Releases Services',
    ];

    const offlineServices = [
        'Bus Branding',
        'RWA Activation',
        'BTL Advertising',
        'Advertising Activities In Malls & Multiplex',
        'Advertisements In Tech Parks',
        'Advertising in Airports',
        'Paper Insertion',
        'Advertisements In Cafes Gyms & Super Markets',
        'Advertisement in ATMs',
        'Auto Rickshaw Advertising',
        'Advertisement in Magazines',
        'Advertising in Public & Private Parking Lots',
        'Branding Re-Branding',
        'Corporate Gifts',
        'Corporate Training Services',
        'Event Management',
        'FM Campaigns',
        'Fabrications',
        'Hoarding Services',
        'Marketing Collaterals',
        'Marketing Services for Start-ups',
        'Photographic Services',
        'PR Services',
        'Printing Services',
        'Retail Advertising',
        'Real Estate Videography',
        'Signage',
        'Washroom Advertising',
    ];

    const serviceUrlMap: { [key: string]: string } = {
        'Advertising Agency In Bangalore': '/services/advertising-agency-bangalore',
        'Digital Marketing Service': '/services/digital-marketing-service',
        'Search Engine Optimization': '/services/seo',
        'Search Engine Marketing': '/services/sem',
        'Online Reputation Management': '/services/online-reputation-management',
        'Website Designing and Development': '/services/website-design-development',
        'Social Media Optimization': '/services/social-media-optimization',
        'Social Media Marketing': '/services/social-media-marketing',
        'Software Design & Development': '/services/software-design-development',
        'Geolocation Analytical SMS': '/services/geolocation-sms',
        'AI Advertising Agency': '/services/ai-advertising-agency',
        'Creative Designing': '/services/creative-designing',
        'API Integration': '/services/api-integration',
        'Ecommerce Solutions': '/services/ecommerce-solutions',
        'Email Marketing': '/services/email-marketing',
        'Mobile Application Development': '/services/mobile-app-development',
        'Real Estate Online Marketing Service': '/services/real-estate-marketing',
        'Display Advertisement': '/services/display-advertisement',
        'Blog Articles': '/services/blog-articles',
        'Classified Portal Management': '/services/classified-portal',
        'Press Releases Services': '/services/press-releases',
        'Bus Branding': '/services/bus-branding',
        'RWA Activation': '/services/rwa-activation',
        'BTL Advertising': '/services/btl-advertising',
        'Advertising Activities In Malls & Multiplex': '/services/mall-advertising',
        'Advertisements In Tech Parks': '/services/tech-park-ads',
        'Advertising in Airports': '/services/airport-advertising',
        'Paper Insertion': '/services/paper-insertion',
        'Advertisements In Cafes Gyms & Super Markets': '/services/cafe-gym-ads',
        'Advertisement in ATMs': '/services/atm-ads',
        'Auto Rickshaw Advertising': '/services/auto-rickshaw-ads',
        'Advertisement in Magazines': '/services/magazine-ads',
        'Advertising in Public & Private Parking Lots': '/services/parking-ads',
        'Branding Re-Branding': '/services/branding-rebranding',
        'Corporate Gifts': '/services/corporate-gifts',
        'Corporate Training Services': '/services/corporate-training',
        'Event Management': '/services/event-management',
        'FM Campaigns': '/services/fm-campaigns',
        'Fabrications': '/services/fabrications',
        'Hoarding Services': '/services/hoarding-services',
        'Marketing Collaterals': '/services/marketing-collaterals',
        'Marketing Services for Start-ups': '/services/startup-marketing',
        'Photographic Services': '/services/photographic-services',
        'PR Services': '/services/pr-services',
        'Printing Services': '/services/printing-services',
        'Retail Advertising': '/services/retail-advertising',
        'Real Estate Videography': '/services/real-estate-videography',
        'Signage': '/services/signage',
        'Washroom Advertising': '/services/washroom-advertising',
    };

    const getServiceUrl = (service: string) => {
        return serviceUrlMap[service] || '/services';
    };

    return (
        <GSAPScrollReveal className={styles.services} id="services">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <TextReveal as="h2" animateType="heading" className="section-title">
                        OUR ADVERTISING SERVICES
                    </TextReveal>
                    <TextReveal as="p" animateType="paragraph" className={styles.subtitle}>
                        Comprehensive solutions for all your advertising and marketing needs
                    </TextReveal>
                </div>

                {/* Services Grid */}
                <div className={styles.servicesWrapper}>
                    {/* Online Services Section */}
                    <div id="online-services" style={{ scrollMarginTop: '100px' }} className={styles.servicesSection}>
                        <h3 className={styles.sectionHeading} data-animate="heading">
                            <span className={animStyles.revealText}>Online</span>
                        </h3>
                        <div className={styles.servicesColumn}>
                            {onlineServices.map((service, index) => (
                                <Link 
                                    key={index}
                                    href={getServiceUrl(service)}
                                    className={styles.serviceLink}
                                >
                                    {service}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Offline Services Section */}
                    <div id="offline-services" style={{ scrollMarginTop: '100px' }} className={styles.servicesSection}>
                        <h3 className={styles.sectionHeading} data-animate="heading">
                            <span className={animStyles.revealText}>Offline</span>
                        </h3>
                        <div className={styles.servicesColumn}>
                            {offlineServices.map((service, index) => (
                                <Link 
                                    key={index}
                                    href={getServiceUrl(service)}
                                    className={styles.serviceLink}
                                >
                                    {service}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </GSAPScrollReveal>
    );
}
