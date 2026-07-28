'use client';

import Image from 'next/image';
import styles from './ScrollAnimations.module.css';

interface ImageRevealProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
}

export default function ImageReveal({
    src,
    alt,
    width = 800,
    height = 600,
    className = '',
    priority = false,
}: ImageRevealProps) {
    return (
        <div data-animate="image" className={`${styles.imageWrapper} ${className}`}>
            <div className={styles.imageContent}>
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    priority={priority}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    style={{ width: '100%', height: 'auto' }}
                />
            </div>
        </div>
    );
}
