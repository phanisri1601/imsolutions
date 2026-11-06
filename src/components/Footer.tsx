'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MdMail, MdPhone } from 'react-icons/md';
import styles from './Footer.module.css';

const moreFooterGroups = [
    {
        title: 'Digital Marketing',
        links: [
            { title: 'Digital Marketing', url: '/services/digital-marketing-service' },
            { title: 'Social Media Marketing', url: '/services/social-media-marketing' },
            { title: 'Website Design & Development', url: '/services/website-design-development' },
            { title: 'Email Marketing', url: '/services/email-marketing' },
        ],
    },
    {
        title: 'SEO & Performance',
        links: [
            { title: 'SEO Services', url: '/services/seo' },
            { title: 'Search Engine Marketing', url: '/services/sem' },
            { title: 'Online Reputation Management', url: '/services/online-reputation-management' },
            { title: 'Real Estate Marketing', url: '/services/real-estate-marketing' },
        ],
    },
    {
        title: 'Branding & Creative',
        links: [
            { title: 'Branding & Re-Branding', url: '/services/branding-rebranding' },
            { title: 'Creative Design', url: '/services/creative-designing' },
            { title: 'Marketing Collaterals', url: '/services/marketing-collaterals' },
            { title: 'Corporate Gifts', url: '/services/corporate-gifts' },
        ],
    },
    {
        title: 'AI & Technology',
        links: [
            { title: 'AI Advertising', url: '/services/ai-advertising-agency' },
            { title: 'Software Design & Development', url: '/services/software-design-development' },
            { title: 'API Integration', url: '/services/api-integration' },
            { title: 'Ecommerce Solutions', url: '/services/ecommerce-solutions' },
        ],
    },
    {
        title: 'Offline Advertising',
        links: [
            { title: 'Hoarding Services', url: '/services/hoarding-services' },
            { title: 'Airport Advertising', url: '/services/airport-advertising' },
            { title: 'Bus Branding', url: '/services/bus-branding' },
            { title: 'RWA Activations', url: '/services/rwa-activation' },
            { title: 'Event Management', url: '/services/event-management' },
        ],
    },
];

export default function Footer() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                {/* Powered By Section */}
                <div className={`${styles.footerColumn} ${styles.officeColumn}`}>


                    <div className={styles.addressBlock}>
                        <h4 className={styles.columnTitle}>Corporate Office</h4>
                        <p className={styles.addressText}>
                            921, Laxmi Tower, 4th Floor, 5th Main Rd, Sector 7, HSR Layout, Bengaluru, Karnataka 560102
                        </p>
                    </div>

                    <div className={styles.addressBlock}>
                        <h4 className={styles.columnTitle}>Branch Office</h4>
                        <p className={styles.addressText}>
                            214, South West Block, Near Ram Mandir, Alwar, Rajasthan
                        </p>
                        <p className={styles.addressText}>
                            
                        </p>
                    </div>

                    <div className={styles.contact}>
                        <div className={styles.contactItem}>
                            <MdMail className={styles.icon} />
                            <a href="mailto:info@imsolutions.mobi">info@imsolutions.mobi</a>
                        </div>
                        <div className={styles.contactItem}>
                            <MdPhone className={styles.icon} />
                            <a href="tel:+918880564488">+91 888 056 4488</a>
                        </div>
                    </div>
                </div>

                <div className={`${styles.footerColumn} ${styles.linksColumn}`}>
                    <h4 className={styles.columnTitle}>Quick Links</h4>
                    <ul className={styles.linkList}>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li className={styles.servicesGroup}>
                            <span className={styles.linkLabel} tabIndex={0}>Services</span>
                            <ul className={styles.servicesSubLinks}>
                                <li className={styles.subLinkItem}><Link href="/services/online">Online Services</Link></li>
                                <li className={styles.subLinkItem}><Link href="/services/offline">Offline Services</Link></li>
                            </ul>
                        </li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/careers">Career</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                        
                    </ul>
                </div>

                {/* Enquire Now Section */}
                <div className={`${styles.footerColumn} ${styles.enquireColumn}`}>
                    <h4 className={styles.columnTitle}>Enquire Now</h4>
                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <input type="text" placeholder="Name" required />
                        <input type="email" placeholder="Email" required />
                        <div className={styles.phoneRow}>
                            <select className={styles.countryCodeSelect} defaultValue={"+91"} aria-label="Country code">
                                <option value={"+91"}>IN +91</option>
                                <option value={"+1"}>US +1</option>
                                <option value={"+44"}>UK +44</option>
                                <option value={"+971"}>UAE +971</option>
                                <option value={"+61"}>AU +61</option>
                            </select>
                            <input className={styles.phoneInput} type="tel" placeholder="Phone Number" required />
                        </div>
                        <textarea placeholder="Message" rows={3} required></textarea>
                        <button type="submit" className={styles.submitBtn}>Submit</button>
                    </form>
                </div>

               
            </div>
            

            {/* Hidden Footer (More Footer) Section */}
            <div className={styles.moreFooterWrapper}>
                <button 
                    className={styles.moreFooterToggle}
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-expanded={isExpanded}
                >
                    Service Categories
                </button>
                <div className={`${styles.moreFooterContent} ${isExpanded ? styles.expanded : ''}`}>
                    <div className={styles.moreFooterLinks}>
                        {moreFooterGroups.map((group) => (
                            <section key={group.title} className={styles.footerLinkGroup}>
                                <h4>{group.title}</h4>
                                <ul>
                                    {group.links.map((link) => (
                                        <li key={link.url}>
                                            <Link href={link.url}>{link.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className={styles.footerBottom}>
                <p>&copy; Copyright 2013 - {new Date().getFullYear()} IM Solutions</p>
                <div className={styles.bottomLinks}>
                    <Link href="/privacy">Privacy policy</Link>
                    <Link href="/terms">Terms and conditions</Link>
                </div>
            </div>
        </footer>
    );
}
