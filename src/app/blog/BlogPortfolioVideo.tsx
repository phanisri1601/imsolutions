"use client";

import { useRef } from "react";
import styles from "./BlogPage.module.css";

export const BLOG_PORTFOLIO_VIDEO_SRC = "/12642073_1920_1080_24fps.mp4";

type Props = {
  title: string;
  className?: string;
};

export default function BlogPortfolioVideo({ title, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {});
  };

  const pause = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <div
      className={className ?? styles.portfolioImage}
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      <video
        ref={videoRef}
        className={styles.portfolioVideo}
        src={BLOG_PORTFOLIO_VIDEO_SRC}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={title}
      />
    </div>
  );
}
