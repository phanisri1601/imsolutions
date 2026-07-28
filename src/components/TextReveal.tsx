'use client';

import styles from './ScrollAnimations.module.css';

interface TextRevealProps {
    children: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    className?: string;
    animateType?: 'heading' | 'paragraph' | 'button';
}

export default function TextReveal({
    children,
    as: Component = 'div',
    className = '',
    animateType = 'paragraph',
}: TextRevealProps) {
    return (
        <Component
            data-animate={animateType}
            className={`${className}`}
        >
            <span className={`${styles.revealText}`}>
                {children}
            </span>
        </Component>
    );
}
