'use client';

import { useState } from 'react';
import { FaClock, FaCalendarAlt, FaPhoneAlt, FaArrowRight } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        projectDetails: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            setFormData({ name: '', email: '', company: '', phone: '', message: '', projectDetails: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <section className={styles.splitSection}>
            <div className={styles.leftPanel}>
                <div className={styles.leftContent}>
                    <ScrollReveal delay={0.2} direction="up">
                        <span className={styles.eyebrow}>WE RESPOND FAST</span>
                        <h2 className={styles.title}>Your vision<br />deserves the right<br />conversation.</h2>
                        <p className={styles.description}>
                            Tell us a bit about what you&apos;re looking for and we&apos;ll get back to you shortly.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3} direction="up">
                        <div className={styles.timeline}>
                            <div className={styles.timelineItem}>
                                <div className={styles.timelineIcon}>
                                    <FaClock />
                                </div>
                                <div className={styles.timelineContent}>
                                    <span className={styles.timelineLabel}>RESPONSE TIME</span>
                                    <span className={styles.timelineValue}>Within 24 hours</span>
                                </div>
                            </div>

                            <div className={styles.timelineItem}>
                                <div className={styles.timelineIcon}>
                                    <FaCalendarAlt />
                                </div>
                                <div className={styles.timelineContent}>
                                    <span className={styles.timelineLabel}>AVAILABILITY</span>
                                    <span className={styles.timelineValue}>Mon &ndash; Fri, 9AM &ndash; 6PM IST</span>
                                </div>
                            </div>

                            <div className={styles.timelineItem}>
                                <div className={styles.timelineIcon}>
                                    <FaPhoneAlt />
                                </div>
                                <div className={styles.timelineContent}>
                                    <span className={styles.timelineLabel}>PREFER TO TALK?</span>
                                    <span className={styles.timelineValue}>Book a quick call with our team.</span>
                                </div>
                            </div>
                        </div>

                        <button className={styles.scheduleBtn}>
                            SCHEDULE A CALL <FaArrowRight className={styles.btnIcon} />
                        </button>
                    </ScrollReveal>
                </div>
            </div>

            <div className={styles.rightPanel}>
                <ScrollReveal delay={0.4} direction="up" className={styles.formWrapper}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>FULL NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>EMAIL ADDRESS</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>COMPANY</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>PHONE NUMBER</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="+91"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>HOW CAN WE HELP?</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={3}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>PROJECT DETAILS (OPTIONAL)</label>
                            <input
                                type="text"
                                name="projectDetails"
                                value={formData.projectDetails}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'SENDING...' : (
                                <>
                                    SEND MESSAGE <FaArrowRight className={styles.btnIcon} />
                                </>
                            )}
                        </button>
                    </form>
                </ScrollReveal>
            </div>
        </section>
    );
}
