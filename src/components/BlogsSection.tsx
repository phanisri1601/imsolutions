"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./BlogsSection.module.css";

import { blogPosts as allPosts } from "../data/blogPosts";

const blogPosts = allPosts.slice(0, 7);

export default function BlogsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % blogPosts.length);
        }, 3500); // Keep each card visible ~3.5s
        return () => clearInterval(timer);
    }, [paused]);

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % blogPosts.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>The Inspiration</span>
                    <h2 className={styles.title}>Latest From Our Blog</h2>
                </div>

                <div className={styles.carouselContainer}>
                    <motion.button 
                        className={`${styles.navButton} ${styles.prevButton}`}
                        onClick={prevSlide}
                    >
                        <FiChevronLeft />
                    </motion.button>

                    <div className={styles.carouselWrapper}>
                        <div className={styles.carousel}>
                            {blogPosts.map((post, index) => {
                                 let position = "hidden";
                                const total = blogPosts.length;
                                
                                // Calculate position relative to activeIndex
                                const relativeIndex = (index - activeIndex + total) % total;
                                
                                if (relativeIndex === 0) position = "center";
                                else if (relativeIndex === 1) position = "right";
                                else if (relativeIndex === 2) position = "hiddenRight";
                                else if (relativeIndex === total - 1) position = "left";
                                else if (relativeIndex === total - 2) position = "hiddenLeft";
                                else position = "hidden";

                                const cardHref = `/blog/${post.slug}`;
                                
                                return (
                                    <BlogCard 
                                        key={post.slug} 
                                        post={post} 
                                        cardHref={cardHref} 
                                        position={position} 
                                        onHoverChange={setPaused}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <motion.button 
                        className={`${styles.navButton} ${styles.nextButton}`}
                        onClick={nextSlide}
                    >
                        <FiChevronRight />
                    </motion.button>
                </div>

                <div className={styles.footer}>
                    <motion.a
                        href="/blog"
                        className={styles.viewAllButton}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View All Blogs
                    </motion.a>
                </div>
            </div>
        </section>
    );
}

const variants = {
    center: {
        x: "0%",
        scale: 1.2,
        zIndex: 10,
        opacity: 1,
        filter: "blur(0px)",
        pointerEvents: "auto" as const,
    },
    left: {
        x: "-60%",
        scale: 0.8,
        zIndex: 5,
        opacity: 1, // Removed transparency
        filter: "blur(0px)",
        pointerEvents: "none" as const,
    },
    right: {
        x: "60%",
        scale: 0.8,
        zIndex: 5,
        opacity: 1, // Removed transparency
        filter: "blur(0px)",
        pointerEvents: "none" as const,
    },
    hidden: {
        x: "0%",
        scale: 0.5,
        zIndex: 0,
        opacity: 0,
        filter: "blur(10px)",
        pointerEvents: "none" as const,
    },
    hiddenLeft: {
        x: "-100%",
        scale: 0.4,
        zIndex: 0,
        opacity: 0,
        filter: "blur(15px)",
        pointerEvents: "none" as const,
    },
    hiddenRight: {
        x: "100%",
        scale: 0.4,
        zIndex: 0,
        opacity: 0,
        filter: "blur(15px)",
        pointerEvents: "none" as const,
    }
};

function BlogCard({ post, cardHref, position, onHoverChange }: { post: any, cardHref: string, position: string, onHoverChange: (paused: boolean) => void }) {
    return (
        <motion.div
            className={styles.cardWrapper}
            initial="hidden"
            animate={position}
            variants={variants}
            transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.8 }}
        >
            <motion.a
                href={cardHref}
                className={styles.card}
                whileHover={position === "center" ? { scale: 1.25 } : {}}
                onMouseEnter={() => onHoverChange(true)}
                onMouseLeave={() => onHoverChange(false)}
            >
                <img src={post.image} alt={post.title} className={styles.image} />
                <div className={styles.imageFade} aria-hidden="true" />
                <div className={styles.titleBlock}>
                    <h3 className={styles.blogTitle}>{post.title}</h3>
                </div>
            </motion.a>
        </motion.div>
    );
}
