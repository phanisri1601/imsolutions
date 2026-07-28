"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { homeImage } from "@/lib/homeImages";
import styles from "./WhyChooseUs.module.css";

const reasons = [
    {
        image: homeImage("360 degree marketing.png"),
        title: "360° Marketing Solution",
        description: "We take pride in delivering fully-integrated and measurable marketing solutions. We help support all your brands digital needs."
    },
    {
        image: homeImage("Maximise Your Lead Generation.png"),
        title: "Maximise your Lead Generation",
        description: "Growth begins with accuracy. Our data-led strategies ensure your brand attracts the right audience - not just more clicks."
    },
    {
        image: homeImage("Creative Branding Strategy.png"),
        title: "Creative Branding Strategy",
        description: "Brands create impressions. We make brands become iconic with stunning designs and strategic campaigns that truly resonate."
    },
    {
        image: homeImage("Data Driven Analytics.png"),
        title: "Data-Driven Analytics",
        description: "We don't guess, we calculate. Our team uses relevant analytics and metrics to implement solid digital strategies customized for your business."
    },
    {
        image: homeImage("End To End Execution.png"),
        title: "End-to-End Execution",
        description: "From concept to launch, we handle every aspect of your campaign with precision, ensuring flawless execution across all channels."
    },
    {
        image: homeImage("Client Centric Approach.png"),
        title: "Client-Centric Approach",
        description: "Your goal is our goal. We work as an extension of your team to ensure transparency, collaboration, and shared success."
    }
];

export default function WhyChooseUs() {
    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const x = useMotionValue(0);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    const slideLeft = () => {
        const currentX = x.get();
        let newX = currentX + 350; // Card width approx
        if (newX > 0) newX = 0;
        controls.start({ x: newX, transition: { type: "spring", stiffness: 200, damping: 25, mass: 0.5 } });
    };

    const slideRight = () => {
        const currentX = x.get();
        let newX = currentX - 350;
        if (newX < -width) newX = -width;
        controls.start({ x: newX, transition: { type: "spring", stiffness: 200, damping: 25, mass: 0.5 } });
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                   
                    <h2 className={styles.title}>Why choose us?</h2>
                </div>

                <div className={styles.carouselWrapper}>
                    <motion.div
                        ref={carouselRef}
                        className={styles.track}
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        whileTap={{ cursor: "grabbing" }}
                        animate={controls}
                        style={{ x }}
                        dragTransition={{ power: 0.2, timeConstant: 200 }}
                        dragElastic={0.05}
                    >
                        {reasons.map((reason, index) => (
                            <motion.div
                                key={index}
                                className={styles.card}
                                whileHover={{ y: -10 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className={styles.imageWrapper}>
                                    <img src={reason.image} alt={reason.title} className={styles.cardImage} />
                                </div>
                                <h3 className={styles.cardTitle}>{reason.title}</h3>
                                <p className={styles.cardDescription}>{reason.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Arrow Controls */}
                <div className={styles.controls}>
                    <button className={styles.controlButton} onClick={slideLeft} aria-label="Previous">
                        <FaChevronLeft />
                    </button>
                    <button className={styles.controlButton} onClick={slideRight} aria-label="Next">
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
}
