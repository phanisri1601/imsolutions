"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import GSAPScrollReveal from "./GSAPScrollReveal";
import TextReveal from "./TextReveal";
import ImageReveal from "./ImageReveal";
import { homeImage } from "@/lib/homeImages";
import styles from "./AboutSection.module.css";

type AboutSectionProps = {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string | string[];
    imageSrc?: string;
};

export default function AboutSection({ eyebrow, title, subtitle, description, imageSrc }: AboutSectionProps) {
    return (
        <GSAPScrollReveal className={styles.aboutSection}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    {/* Left Content - Image */}
                    <div className={styles.imageWrapper}>
                        <TiltImage imageSrc={imageSrc} />
                    </div>

                    {/* Right Content - Text */}
                    <div className={styles.textContent}>
                        <TextReveal as="span" animateType="heading" className={styles.eyebrow}>
                            {eyebrow}
                        </TextReveal>

                        <TextReveal as="h2" animateType="heading" className={styles.title}>
                            {title}
                        </TextReveal>

                        <TextReveal as="p" animateType="paragraph" className={styles.subtitle}>
                            {subtitle}
                        </TextReveal>

                        <div className={styles.description}>
                            {(Array.isArray(description) ? description : [description]).map((paragraph) => (
                                <TextReveal key={paragraph} as="p" animateType="paragraph">
                                    {paragraph}
                                </TextReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </GSAPScrollReveal>
    );
}

function TiltImage({ imageSrc }: { imageSrc?: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Mouse tilt logic
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        // Calculate mouse position relative to center of element (-0.5 to 0.5)
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const imgSrc = imageSrc ?? homeImage("About Us.png");

    return (
        <motion.div
            className={styles.imageContainer}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
            }}
        >
            <div
                style={{ width: "100%", height: "100%" }}
            >
                <img
                    src={imgSrc}
                    alt="IM Solutions banner"
                    className={styles.aboutBannerImage}
                />
            </div>
        </motion.div>
    );
}

// Service name is rendered as an overlay in the banner (left bottom)
