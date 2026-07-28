"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import styles from "./CareerContent.module.css";
import { Job } from "@/data/jobs";

type CareerContentProps = {
    jobs: Job[];
};

export default function CareerContent({ jobs }: CareerContentProps) {
    const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const jobsToRender = Array.isArray(jobs) ? jobs : [];

    const handleApplyClick = (e: React.MouseEvent, jobTitle: string) => {
        e.stopPropagation();
        formRef.current?.scrollIntoView({ behavior: "smooth" });
        // Optional: Pre-fill the form "Apply For" field
        const applyForInput = formRef.current?.querySelector('input[placeholder="APPLY FOR*"]') as HTMLInputElement;
        if (applyForInput) {
            applyForInput.value = jobTitle;
        }
    };

    const toggleJob = (id: string) => {
        setExpandedJobId(expandedJobId === id ? null : id);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <ScrollReveal delay={0.1}>
                    <h2 className={styles.heading}>CAREERS</h2>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                    <p className={styles.subheading}>
                        Where we take advertising to the next big level!
                    </p>
                </ScrollReveal>

                <div className={styles.grid}>
                    <div className={styles.left}>
                        <ScrollReveal delay={0.3}>
                            <h3 className={styles.sectionTitle}>CURRENT OPENINGS</h3>
                        </ScrollReveal>
                        {jobsToRender.length === 0 ? (
                            <div className={styles.emptyState}>
                                No openings are available right now.
                            </div>
                        ) : (
                            <div className={styles.jobsGrid}>
                                {jobsToRender.map((job, index) => {
                                    const isExpanded = expandedJobId === job.id;
                                    return (
                                        <motion.div
                                            key={job.id}
                                            className={`${styles.jobCard} ${isExpanded ? styles.expanded : ""}`}
                                            onClick={() => toggleJob(job.id)}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.1 }}
                                            transition={{ duration: 0.4, delay: 0.05 * index }}
                                            style={{ cursor: "pointer", gridColumn: isExpanded ? "1 / -1" : "auto" }}
                                        >
                                            <div className={styles.jobTitle}>{job.title}</div>
                                            <div className={styles.jobMeta}>
                                                <span>{job.location}</span>
                                                <span className={styles.metaDot}>•</span>
                                                <span>{job.experience}</span>
                                                <span className={styles.metaDot}>•</span>
                                                <span>{job.employmentType}</span>
                                            </div>
                                            {!isExpanded && job.description && (
                                                <div className={styles.jobDesc}>
                                                    {job.description.slice(0, 120)}...
                                                </div>
                                            )}
                                            
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className={styles.detailsContainer}
                                                    >
                                                        <div className={styles.detailsSection}>
                                                            <div className={styles.detailsTitle}>Description</div>
                                                            <div className={styles.jobDesc}>{job.description}</div>
                                                        </div>

                                                        {job.responsibilities.length > 0 && (
                                                            <div className={styles.detailsSection}>
                                                                <div className={styles.detailsTitle}>Responsibilities</div>
                                                                <ul className={styles.detailsList}>
                                                                    {job.responsibilities.map((item, i) => (
                                                                        <li key={i}>{item}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        {job.skills.length > 0 && (
                                                            <div className={styles.detailsSection}>
                                                                <div className={styles.detailsTitle}>Skills Required</div>
                                                                <ul className={styles.detailsList}>
                                                                    {job.skills.map((item, i) => (
                                                                        <li key={i}>{item}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        {job.qualifications && job.qualifications.length > 0 && (
                                                            <div className={styles.detailsSection}>
                                                                <div className={styles.detailsTitle}>Qualifications</div>
                                                                <ul className={styles.detailsList}>
                                                                    {job.qualifications.map((item, i) => (
                                                                        <li key={i}>{item}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        <button 
                                                            className={styles.applyBtn}
                                                            onClick={(e) => handleApplyClick(e, job.title)}
                                                        >
                                                            Apply For This Role
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <div className={styles.jobLink}>
                                                {isExpanded ? "Show less" : "View details"}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <ScrollReveal delay={0.4}>
                        <div className={styles.formCard} ref={formRef}>
                            <h3 className={styles.formTitle}>APPLY NOW</h3>
                            <form className={styles.form}>
                                <div className={styles.inputRow}>
                                    <input type="text" placeholder="NAME*" required />
                                    <input type="email" placeholder="EMAIL*" required />
                                </div>
                                <div className={styles.inputRow}>
                                    <input type="text" placeholder="Bengaluru" />
                                    <input type="tel" placeholder="PHONE*" required />
                                </div>
                                <div className={styles.inputRow}>
                                    <input type="text" placeholder="APPLY FOR*" required />
                                    <input type="text" placeholder="EXPERIENCE*" required />
                                </div>
                                <div className={styles.fullRow}>
                                    <input type="file" />
                                </div>
                                <div className={styles.fullRow}>
                                    <textarea placeholder="MESSAGE*" rows={4}></textarea>
                                </div>
                                <div className={styles.actions}>
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
