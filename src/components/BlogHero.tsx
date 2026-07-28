'use client';

import styles from './BlogHero.module.css';

export default function BlogHero() {
    return (
        <section className={styles.blogHero}>
            <div className={styles.backgroundImage}></div>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>BLOG</h1>
            </div>
        </section>
    );
}
