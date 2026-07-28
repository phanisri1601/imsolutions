'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GSAPScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    triggerStart?: string;
    duration?: number;
    staggerDelay?: number;
}

export default function GSAPScrollReveal({
    children,
    className = '',
    triggerStart = 'top 85%',
    duration = 0.8,
    staggerDelay = 0.12,
    ...props
}: GSAPScrollRevealProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const headings = section.querySelectorAll('[data-animate="heading"]');
        const paragraphs = section.querySelectorAll('[data-animate="paragraph"]');
        const images = section.querySelectorAll('[data-animate="image"]');
        const buttons = section.querySelectorAll('[data-animate="button"]');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: triggerStart,
                once: true,
                invalidateOnRefresh: true,
            },
        });

        // Refresh ScrollTrigger to ensure correct positions
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        let delay = 0;

        headings.forEach((heading) => {
            const textElements = heading.querySelectorAll('.revealText');
            if (textElements.length > 0) {
                textElements.forEach((text) => {
                    tl.from(
                        text,
                        {
                            y: 100,
                            autoAlpha: 0,
                            duration: duration,
                            ease: 'expo.out',
                            immediateRender: false,
                        },
                        delay
                    );
                    delay += staggerDelay;
                });
            } else {
                tl.from(
                    heading,
                    {
                        y: 100,
                        autoAlpha: 0,
                        duration: duration,
                        ease: 'expo.out',
                        immediateRender: false,
                    },
                    delay
                );
                delay += staggerDelay;
            }
        });

        paragraphs.forEach((paragraph) => {
            const textElements = paragraph.querySelectorAll('.revealText');
            if (textElements.length > 0) {
                textElements.forEach((text) => {
                    tl.from(
                        text,
                        {
                            y: 100,
                            autoAlpha: 0,
                            duration: duration,
                            ease: 'expo.out',
                            immediateRender: false,
                        },
                        delay
                    );
                    delay += staggerDelay;
                });
            } else {
                tl.from(
                    paragraph,
                    {
                        y: 100,
                        autoAlpha: 0,
                        duration: duration,
                        ease: 'expo.out',
                        immediateRender: false,
                    },
                    delay
                );
                delay += staggerDelay;
            }
        });

        buttons.forEach((button) => {
            tl.from(
                button,
                {
                    y: 100,
                    opacity: 0,
                    duration: duration,
                    ease: 'expo.out',
                    immediateRender: false,
                },
                delay
            );
            delay += staggerDelay;
        });

        images.forEach((image) => {
            tl.from(
                image,
                {
                    scale: 1.08,
                    y: 30,
                    autoAlpha: 0,
                    duration: duration,
                    ease: 'expo.out',
                    immediateRender: false,
                },
                0
            );
        });

        const scrollTrigger = tl.scrollTrigger;

        return () => {
            tl.kill();


            if (scrollTrigger) {
                scrollTrigger.kill();
            }

        };
    }, [triggerStart, duration, staggerDelay]);

    return (
        <div ref={sectionRef} className={className} {...props}>
            {children}
        </div>
    );
}
