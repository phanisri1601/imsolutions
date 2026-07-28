'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdMail, MdPhone } from 'react-icons/md';
import styles from './Footer.module.css';

const moreFooterLinks = [
    { title: 'Advertising Agency In Bangalore', url: '/services/advertising-agency-bangalore' },
    { title: 'Digital Marketing Service', url: '/services/digital-marketing-service' },
    { title: 'Search Engine Optimization', url: '/services/seo' },
    { title: 'Search Engine Marketing', url: '/services/sem' },
    { title: 'Online Reputation Management', url: '/services/online-reputation-management' },
    { title: 'Website Designing and Development', url: '/services/website-design-development' },
    { title: 'Social Media Optimization', url: '/services/social-media-optimization' },
    { title: 'Social Media Marketing', url: '/services/social-media-marketing' },
    { title: 'Software Design & Development', url: '/services/software-design-development' },
    { title: 'Geolocation Analytical SMS', url: '/services/geolocation-sms' },
    { title: 'AI Advertising Agency', url: '/services/ai-advertising-agency' },
    { title: 'Creative Designing', url: '/services/creative-designing' },
    { title: 'API Integration', url: '/services/api-integration' },
    { title: 'Ecommerce Solutions', url: '/services/ecommerce-solutions' },
    { title: 'Email Marketing', url: '/services/email-marketing' },
    { title: 'Mobile Application Development', url: '/services/mobile-app-development' },
    { title: 'Real Estate Online Marketing Service', url: '/services/real-estate-marketing' },
    { title: 'Display Advertisement', url: '/services/display-advertisement' },
    { title: 'Blog Articles', url: '/services/blog-articles' },
    { title: 'Classified Portal Management', url: '/services/classified-portal' },
    { title: 'Press Releases Services', url: '/services/press-releases' },
    { title: 'Bus Branding', url: '/services/bus-branding' },
    { title: 'RWA Activation', url: '/services/rwa-activation' },
    { title: 'BTL Advertising', url: '/services/btl-advertising' },
    { title: 'Advertising Activities In Malls & Multiplex', url: '/services/mall-advertising' },
    { title: 'Advertisements In Tech Parks', url: '/services/tech-park-ads' },
    { title: 'Advertising in Airports', url: '/services/airport-advertising' },
    { title: 'Paper Insertion', url: '/services/paper-insertion' },
    { title: 'Advertisements In Cafes Gyms & Super Markets', url: '/services/cafe-gym-ads' },
    { title: 'Advertisement in ATMs', url: '/services/atm-ads' },
    { title: 'Auto Rickshaw Advertising', url: '/services/auto-rickshaw-ads' },
    { title: 'Advertisement in Magazines', url: '/services/magazine-ads' },
    { title: 'Advertising in Public & Private Parking Lots', url: '/services/parking-ads' },
    { title: 'Branding Re-Branding', url: '/services/branding-rebranding' },
    { title: 'Corporate Gifts', url: '/services/corporate-gifts' },
    { title: 'Corporate Training Services', url: '/services/corporate-training' },
    { title: 'Event Management', url: '/services/event-management' },
    { title: 'FM Campaigns', url: '/services/fm-campaigns' },
    { title: 'Fabrications', url: '/services/fabrications' },
    { title: 'Hoarding Services', url: '/services/hoarding-services' },
    { title: 'Marketing Collaterals', url: '/services/marketing-collaterals' },
    { title: 'Marketing Services for Start-ups', url: '/services/startup-marketing' },
    { title: 'Photographic Services', url: '/services/photographic-services' },
    { title: 'PR Services', url: '/services/pr-services' },
    { title: 'Printing Services', url: '/services/printing-services' },
    { title: 'Retail Advertising', url: '/services/retail-advertising' },
    { title: 'Real Estate Videography', url: '/services/real-estate-videography' },
    { title: 'Signage', url: '/services/signage' }
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
                            219, Nilkanth Plaza, Near Kiran Chowk, Varachha Road, Surat, Gujarat 395010
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
                    <div className={styles.socialLinks}>
                        
                        <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href="#" aria-label="X" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
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
                        <li><Link href="/privacy">Privacy Policy</Link></li>
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
                    More Footer
                </button>
                <div className={`${styles.moreFooterContent} ${isExpanded ? styles.expanded : ''}`}>
                    <div className={styles.moreFooterLinks}>
                        {moreFooterLinks.map((link, index) => (
                            <span key={index}>
                                <Link href={link.url}>{link.title}</Link>
                                {index < moreFooterLinks.length - 1 && <span className={styles.separator}>|</span>}
                            </span>
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
                    <Link href="/copyright">Copyright</Link>
                </div>
            </div>
        </footer>
    );
}
