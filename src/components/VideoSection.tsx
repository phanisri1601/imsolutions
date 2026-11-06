"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import styles from "./VideoSection.module.css";

const VideoSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(containerRef, { amount: 0.3 });
    // Only load the (large) video on desktop-class connections; phones, data-saver
    // and reduced-motion users get the poster image instead.
    const [allowVideo, setAllowVideo] = useState(false);

    useEffect(() => {
        const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
        const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const saveData = Boolean(nav.connection?.saveData);
        setAllowVideo(!isSmallScreen && !reducedMotion && !saveData);
    }, []);

    // Scroll Progress Logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Momentum Physics (Spring Smoothing)
    // damping: higher = less oscillation, stiffness: lower = looser spring
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 26,
        stiffness: 240,
        mass: 0.35
    });

    // Animation Mappings - IMMERSIVE FULL SCREEN EFFECT

    // 1. Container Width/Scale: 
    // Starts smaller (40% width) -> Grows to Full Width (100%)
    // Using simple scale X/Y might distort, so we animate width percentage if possible, 
    // or use scale with a specific container setup. 
    // Let's use Scale for smooth GPU perf, relying on container being 100vw base.
    // Start: 0.4 (Smaller Box) -> End: 1.0 (Full Screen 100vw)
    const containerScale = useTransform(smoothProgress, [0, 0.6], [0.4, 1]);

    // 2. Border Radius:
    // Starts Rounded (40px) -> Becomes Sharp/Full Screen (0px)
    const containerRadius = useTransform(smoothProgress, [0, 0.5], ["40px", "0px"]);

    // 3. Opacity: Fades in
    const containerOpacity = useTransform(smoothProgress, [0, 0.1], [0.8, 1]);

    // 4. Parallax Video: 
    // As container grows, video moves slightly to create depth window
    const videoY = useTransform(smoothProgress, [0, 0.8], ["-15%", "0%"]); // Ends centered

    // Autoplay Logic
    useEffect(() => {
        if (!allowVideo) return;
        if (isInView && videoRef.current) {
            videoRef.current.play().catch(() => { });
        } else if (!isInView && videoRef.current) {
            videoRef.current.pause();
        }
    }, [isInView, allowVideo]);

    return (
        <section ref={containerRef} className={styles.videoSection}>
            <div className={styles.videoWrapper}>
                <motion.div
                    className={styles.videoContainer}
                    style={{
                        scale: containerScale,
                        opacity: containerOpacity,
                        borderRadius: containerRadius,
                    }}
                >
                    <motion.video
                        ref={videoRef}
                        className={styles.video}
                        src={allowVideo ? "/home-showreel.mp4" : undefined}
                        poster="/home-showreel-poster.jpg"
                        preload="none"
                        loop
                        muted
                        autoPlay={allowVideo}
                        playsInline
                        aria-hidden="true"
                        style={{
                            y: videoY,
                            scale: 1.1 // Slightly larger to prevent edges showing during parallax
                        }}
                    />

                    
                </motion.div>
            </div>
        </section>
    );
};

export default VideoSection;
