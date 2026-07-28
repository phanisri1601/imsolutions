"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./BlogPost.module.css";

type Props = {
  src: string;
  alt: string;
};

type StageSize = {
  width: number;
  height: number;
};

export default function BlogPostSplitBanner({ src, alt }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const leftTrackRef = useRef<HTMLDivElement>(null);
  const rightTrackRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState<StageSize>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const update = () => {
      setStageSize({
        width: stage.offsetWidth,
        height: stage.offsetHeight,
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const leftEl = leftTrackRef.current;
    const rightEl = rightTrackRef.current;
    const stageEl = stageRef.current;
    if (!leftEl || !rightEl || !stageEl || stageSize.width === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.killTweensOf([leftEl, rightEl, stageEl]);

    if (prefersReducedMotion) {
      gsap.set([leftEl, rightEl], { yPercent: 0 });
      gsap.set(stageEl, { scale: 1 });
      return;
    }

    gsap.set(leftEl, { yPercent: -100 });
    gsap.set(rightEl, { yPercent: 100 });
    gsap.set(stageEl, { scale: 1, transformOrigin: "center center" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(leftEl, { yPercent: 0, duration: 1.4 }, 0.1)
      .to(rightEl, { yPercent: 0, duration: 1.4 }, 0.1)
      .to(
        stageEl,
        {
          scale: 1.08,
          duration: 0.9,
          ease: "power2.out",
        },
        "+=0.08"
      );

    return () => {
      tl.kill();
      gsap.set(stageEl, { scale: 1 });
    };
  }, [src, stageSize.width, stageSize.height]);

  const { width: stageWidth, height: stageHeight } = stageSize;
  const trackReady = stageWidth > 0 && stageHeight > 0;
  const rightOffset = trackReady ? -Math.round(stageWidth / 2) : undefined;

  const sharedBgStyle = trackReady
    ? {
        width: stageWidth,
        height: stageHeight,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }
    : undefined;

  return (
    <section className={styles.splitBanner} aria-label="Article cover">
      <img src={src} alt={alt} className={styles.splitBannerAlt} />
      <div className={styles.splitBannerFrame}>
        <div ref={stageRef} className={styles.splitBannerStage}>
          <div className={`${styles.splitPanel} ${styles.splitPanelLeft}`}>
            <div
              ref={leftTrackRef}
              className={styles.splitImageTrack}
              style={trackReady ? { width: stageWidth, height: stageHeight } : undefined}
            >
              <div className={styles.splitBg} style={sharedBgStyle} aria-hidden />
            </div>
          </div>
          <div className={`${styles.splitPanel} ${styles.splitPanelRight}`}>
            <div
              ref={rightTrackRef}
              className={styles.splitImageTrack}
              style={
                trackReady
                  ? {
                      width: stageWidth,
                      height: stageHeight,
                      left: rightOffset,
                    }
                  : undefined
              }
            >
              <div className={styles.splitBg} style={sharedBgStyle} aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
