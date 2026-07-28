"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { BlogPost } from "../../data/blogPosts";
import BlogPortfolioVideo from "./BlogPortfolioVideo";
import styles from "./BlogPage.module.css";

type CardProps = {
  post: BlogPost;
};

function PortfolioCard({ post }: CardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const coverImage = post.image || "/blog_seo.png";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 58%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.35,
    restDelta: 0.001,
  });

  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  const y = useTransform(smoothProgress, [0, 1], [40, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [1.05, 1]);

  const motionStyle = reduceMotion ? undefined : { opacity, y, scale };

  return (
    <motion.article ref={ref} className={styles.portfolioCard} style={motionStyle}>
      <Link href={`/blog/${post.slug}`} className={styles.portfolioCardLink}>
        <div className={styles.portfolioImage}>
          <Image
            src={coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.portfolioCardImage}
          />
        </div>
        <div className={styles.portfolioMeta}>
          <h2 className={styles.portfolioTitle}>{post.title}</h2>
          <div className={styles.portfolioTags}>
            {(post.tags ?? ["Blog"]).slice(0, 3).map((tag) => (
              <span key={tag} className={styles.portfolioTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

type GridProps = {
  posts: BlogPost[];
};

export default function PortfolioBlogGrid({ posts }: GridProps) {
  return (
    <div className={styles.portfolioGrid}>
      {posts.map((post) => (
        <PortfolioCard key={post.id} post={post} />
      ))}
    </div>
  );
}
