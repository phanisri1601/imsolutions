"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { homeImage } from "@/lib/homeImages";
import styles from "./WantToKnowMore.module.css";

const services = [
    {
        title: "Web Design",
        description: "Crafting immersive digital experiences that captivate and convert.",
        image: homeImage("Web Design.png"),
        link: "services/website-design-development"
    },
    {
        title: "SEO Optimization",
        description: "Driving organic growth with data-driven search strategies.",
        image: homeImage("Seo Optimization.png"),
        link: "services/seo"
    },
    {
        title: "Full Stack Marketing ",
        description: "360° campaigns that amplify your brand's voice across all channels.",
        image: homeImage("Full Stack Marketing.png"),
        link: "services/digital-marketing-service"
    },
    {
        title: "Brand Identity",
        description: "Building resilient brands with distinctive visual storytelling.",
        image: homeImage("Brand Identity.png"),
        link: "services/branding"
    },
    {
        title: "Social Media",
        description: "Transforming audience attention into meaningful brand engagement.",
        image: homeImage("Social Media.png"),
        link: "/services/social-media-optimization"
    },
    {
        title: "Content Strategy",
        description: "Compelling narratives that resonate with your target audience.",
        image: homeImage("Content Strategy.png"),
        link: "services/content"
    }
];

export default function WantToKnowMore() {
    const [activeIndex, setActiveIndex] = useState(0);
    const gridRef = useRef<HTMLDivElement>(null);

    const handleRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const card = e.currentTarget;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        card.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    };

    const getCardStep = useCallback(() => {
        const grid = gridRef.current;
        const firstCard = grid?.firstElementChild as HTMLElement | null;
        if (firstCard?.offsetWidth) return firstCard.offsetWidth;
        return window.innerWidth / 3;
    }, []);

    const scrollToCard = useCallback((index: number) => {
        const grid = gridRef.current;
        if (!grid) return;
        const step = getCardStep();
        grid.scrollTo({
            left: index * step,
            behavior: "smooth",
        });
        setActiveIndex(index);
    }, [getCardStep]);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const handleScroll = () => {
            const step = getCardStep();
            if (!step) return;
            const index = Math.round(grid.scrollLeft / step);
            setActiveIndex(Math.min(Math.max(index, 0), services.length - 1));
        };

        grid.addEventListener("scroll", handleScroll);
        return () => grid.removeEventListener("scroll", handleScroll);
    }, [getCardStep]);

    // One card slides at a time
    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        let isHovered = false;
        const intervalId = window.setInterval(() => {
            if (isHovered) return;
            setActiveIndex((prev) => {
                const next = (prev + 1) % services.length;
                scrollToCard(next);
                return next;
            });
        }, 4500);

        const handleMouseEnter = () => {
            isHovered = true;
        };
        const handleMouseLeave = () => {
            isHovered = false;
        };

        grid.addEventListener("mouseenter", handleMouseEnter);
        grid.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.clearInterval(intervalId);
            grid.removeEventListener("mouseenter", handleMouseEnter);
            grid.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [scrollToCard]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={styles.eyebrow}
                    >
                        EXPLORE OUR EXPERTISE
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={styles.title}
                    >
                        Want To Know More?
                    </motion.h2>
                </div>

                <div className={styles.grid} ref={gridRef}>
                    {services.map((service, index) => (
                        <motion.a
                            href={service.link}
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover="hover"
                        >
                            <div className={styles.imageWrapper}>
                                <img src={service.image} alt={service.title} className={styles.image} />
                                <div className={styles.contentOverlay}>
                                    <h3 className={styles.cardTitle}>{service.title}</h3>
                                    <p className={styles.cardDesc}>{service.description}</p>
                                </div>
                                <div className={styles.arrowOverlay}>
                                    <FaArrowRight className={styles.arrowIcon} />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <div className={styles.dots} role="tablist" aria-label="Service slides">
                    {services.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            role="tab"
                            aria-selected={activeIndex === index}
                            aria-label={`Go to slide ${index + 1}`}
                            className={`${styles.dot} ${activeIndex === index ? styles.dotActive : ""}`}
                            onClick={() => scrollToCard(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
