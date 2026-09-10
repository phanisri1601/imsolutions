"use client";

import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import type { BlogPost } from "../../data/blogPosts";
import styles from "./BlogPage.module.css";

type Props = {
  posts: BlogPost[];
  /** When true, the expanded story stays within the card row's own bounds instead of taking over the full viewport. */
  contained?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;
const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.18,
    },
  },
};

const revealItem = {
  hidden: {
    opacity: 0,
    y: 90,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

function RevealImageBlock({
  src,
  alt,
  eyebrow,
  title,
  description,
  index,
  scrollContainer,
}: {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  index: number;
  scrollContainer: HTMLDivElement | null;
}) {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    container: scrollContainer ? ({ current: scrollContainer } as any) : undefined,
    target: blockRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.45 });
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.96, 1, 0.98]);
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.9]);
  const imageY = useTransform(smoothProgress, [0, 1], [15, -15]);
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.04, 1.1, 1.05]);

  return (
    <motion.div
      ref={blockRef}
      className={styles.revealBlock}
      style={{
        scale,
        opacity,
        position: "sticky",
        top: `calc(1.5rem + ${index * 24}px)`,
        zIndex: index + 1,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      }}
      variants={revealItem}
    >
      <motion.div className={styles.revealBlockImageWrap} style={{ y: imageY, scale: imageScale }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={styles.revealBlockImage} loading="lazy" />
      </motion.div>
      <div className={styles.revealBlockContent}>
        <span className={styles.revealBlockEyebrow}>{eyebrow}</span>
        <h3>
          <span className={styles.revealBlockIndex}>0{index + 1}</span>
          {title}
        </h3>
        <p>{description}</p>
      </div>
    </motion.div>
  );
}

export default function EditorialBlogGallery({ posts, contained = false }: Props) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [scrollContainerEl, setScrollContainerEl] = useState<HTMLDivElement | null>(null);
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollContentRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const syncMobile = () => setIsMobile(mobileQuery.matches);
    syncMobile();
    mobileQuery.addEventListener("change", syncMobile);
    return () => mobileQuery.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    if (contained) return;
    document.body.style.overflow = selectedPost ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPost, contained]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPost(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!selectedPost || !scrollWrapperRef.current || !scrollContentRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollWrapperRef.current,
      content: scrollContentRef.current,
      eventsTarget: scrollWrapperRef.current,
      smoothWheel: true,
      syncTouch: true,
      lerp: 0.075,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      overscroll: false,
      autoRaf: true,
    });

    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
    };
  }, [selectedPost]);

  useEffect(() => {
    if (!selectedPost) {
      setScrollContainerEl(null);
      return;
    }

    setScrollContainerEl(scrollWrapperRef.current);
  }, [selectedPost]);

  if (!posts.length) return null;

  const supportingPosts = selectedPost
    ? [
        selectedPost,
        ...posts.filter((p) => p.slug !== selectedPost.slug).slice(0, 2),
      ]
    : [];

  const redToneSlug = posts[1]?.slug;
  const isRedTonePost = (slug: string) => slug === redToneSlug;

  return (
    <section className={styles.editorialGallery} aria-label="Featured blog stories">
      <div className={styles.editorialMasthead}>
        <span>IM Solutions</span>
        <strong>Blog</strong>
      </div>

      <div className={styles.cardsWrapper}>
      <motion.div className={styles.editorialCards} layout>
        {posts.map((post, index) => {
          const isSelected = selectedPost?.slug === post.slug;
          const shouldExit = selectedPost && !isSelected;
          const direction = index < posts.findIndex((p) => p.slug === selectedPost?.slug) ? -1 : 1;

          return (
            <motion.article
              key={post.slug}
              layout
              className={`${styles.editorialCard} ${index === 1 ? styles.editorialCardRed : ""}`}
              animate={{
                opacity: shouldExit ? 0 : 1,
                x: shouldExit ? `${direction * 34}%` : "0%",
                filter: shouldExit ? "blur(8px)" : "blur(0px)",
              }}
              transition={{ duration: 0.9, ease }}
            >
              <button
                className={styles.editorialCardButton}
                type="button"
                onClick={() => {
                  if (isMobile) {
                    router.push(`/blog/${post.slug}`);
                  } else {
                    setSelectedPost(post);
                  }
                }}
                aria-label={`Open ${post.title}`}
              >
                <motion.div
                  className={styles.editorialImageWrap}
                  layoutId={`blog-image-${post.slug}`}
                  style={{ position: "absolute", inset: 0 }}
                  whileHover={{ scale: 1.045 }}
                  transition={{ duration: 0.9, ease }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image || "/blog_seo.png"}
                    alt={post.title}
                    className={`${styles.editorialImage} ${index === 1 ? styles.editorialImageRed : ""}`}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </motion.div>

                <div
                  className={`${styles.editorialShade} ${index === 1 ? styles.editorialShadeRed : ""}`}
                />
                <div className={styles.editorialIndex}>{String(index + 1).padStart(2, "0")}</div>
                <div className={styles.editorialContent}>
                  <h2>{post.title}</h2>
                </div>
              </button>
            </motion.article>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {selectedPost ? (
          <motion.div
            className={`${styles.expandedStory} ${contained ? styles.expandedStoryContained : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedPost.title}
          >
            <motion.div
              className={styles.expandedImage}
              layoutId={`blog-image-${selectedPost.slug}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPost.image || "/blog_seo.png"}
                alt={selectedPost.title}
                className={`${styles.editorialImage} ${isRedTonePost(selectedPost.slug) ? styles.editorialImageRed : ""}`}
              />
              <div
                className={`${styles.expandedImageShade} ${isRedTonePost(selectedPost.slug) ? styles.expandedImageShadeRed : ""}`}
              />
            </motion.div>

            <motion.aside
              className={styles.expandedPanel}
              initial={{ x: "100%", clipPath: "inset(0 0 0 100%)" }}
              animate={{ x: "0%", clipPath: "inset(0 0 0 0%)" }}
              exit={{ x: "100%", clipPath: "inset(0 0 0 100%)" }}
              transition={{ duration: 0.8, delay: 0.12, ease }}
            >
              <button
                type="button"
                className={styles.closeStory}
                onClick={() => setSelectedPost(null)}
                aria-label="Close story"
              >
                <FiX aria-hidden="true" />
              </button>

              <motion.span
                className={styles.expandedLetter}
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 0.13, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.75, delay: 0.24, ease }}
                aria-hidden="true"
              >
                {selectedPost.title.charAt(0)}
              </motion.span>

              <div className={styles.expandedScroll} ref={scrollWrapperRef}>
                <motion.div
                  className={styles.expandedCopy}
                  ref={scrollContentRef}
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 22 }}
                  transition={{ duration: 0.65, delay: 0.28, ease }}
                >
                  <div className={styles.expandedMeta}>
                    <span>{selectedPost.date}</span>
                    <span>{selectedPost.readingTime ?? "Insight"}</span>
                  </div>
                  <h2>{selectedPost.title}</h2>
                  <p>{selectedPost.excerpt}</p>

                  <div className={styles.expandedTags}>
                    {(selectedPost.tags ?? []).slice(0, 4).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className={styles.expandedDetails}>
                    <h3>Inside this story</h3>
                    <p>
                      A practical look at the shifts, decisions, and opportunities shaping this topic for growth-focused
                      brands.
                    </p>
                    <ul>
                      {(selectedPost.takeaways?.length
                        ? selectedPost.takeaways
                        : [
                            "What is changing in the market right now.",
                            "Where brands can improve visibility and trust.",
                            "How to turn the insight into a stronger digital plan.",
                          ]
                      )
                        .slice(0, 4)
                        .map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                    </ul>
                  </div>

                  <Link href={`/blog/${selectedPost.slug}`} className={styles.expandedReadMore}>
                    <span>Read Article</span>
                    <FiArrowUpRight aria-hidden="true" />
                  </Link>

                  {scrollContainerEl ? (
                    <motion.div className={styles.revealStack} variants={revealContainer} initial="hidden" animate="visible">
                      {supportingPosts.map((post, index) => {
                        const fallback = post.animatedImages?.[0]?.src ?? post.image;
                        const blockTitle =
                          index === 0
                            ? "Primary story frame"
                            : index === 1
                              ? "Supporting perspective"
                              : "Editorial context";
                        const blockDescription =
                          index === 0
                            ? post.excerpt
                            : index === 1
                              ? "A companion visual that keeps the motion layered as the panel moves."
                              : "A quieter frame that lets the content breathe before the next section enters.";

                        return (
                          <RevealImageBlock
                            key={post.slug}
                            src={fallback}
                            alt={post.title}
                            eyebrow={post.date}
                            title={blockTitle}
                            description={blockDescription}
                            index={index}
                            scrollContainer={scrollContainerEl}
                          />
                        );
                      })}
                    </motion.div>
                  ) : null}
                </motion.div>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
      </div>
    </section>
  );
}
