"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./ServicesVolumeGrid.module.css";

export const DEFAULT_SERVICE_VIDEO_SRC = "/12642073_1920_1080_24fps.mp4";

export type ServiceGridItem = {
  title: string;
  slug: string;
  image: string;
  video?: string;
  description?: string;
  href?: string;
};

type Props = {
  services: ServiceGridItem[];
  basePath?: string;
  flushTop?: boolean;
  /** When "image", cards show the service image instead of autoplay video. */
  mediaType?: "video" | "image";
};

function serviceDescription(title: string, custom?: string) {
  if (custom?.trim()) return custom;
  return `End-to-end ${title.toLowerCase()} for brands that want clear strategy, sharp creative, and measurable growth across Bangalore and beyond.`;
}

function ServiceGridVideo({
  title,
  poster,
  src,
}: {
  title: string;
  poster: string;
  src: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [posterVisible, setPosterVisible] = useState(true);

  useEffect(() => {
    setPosterVisible(true);
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      void video.play().catch(() => {});
    };

    tryPlay();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);

    video.addEventListener("loadeddata", tryPlay);

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, [src]);

  return (
    <div className={styles.mediaWrap}>
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={posterVisible ? poster : undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={title}
        onPlaying={() => setPosterVisible(false)}
      />
      <span className={styles.moreBtn}>View Details +</span>
    </div>
  );
}

function ServiceGridImage({ title, src }: { title: string; src: string }) {
  return (
    <div className={styles.mediaWrap}>
      <img
        className={styles.mediaImage}
        src={src}
        alt={title}
        loading="lazy"
        decoding="async"
        width={1200}
        height={750}
      />
      <span className={styles.moreBtn}>View Details +</span>
    </div>
  );
}

export default function ServicesVolumeGrid({
  services,
  basePath = "/services",
  flushTop = true,
  mediaType = "video",
}: Props) {
  return (
    <div className={`${styles.grid} ${flushTop ? styles.gridFlush : ""}`}>
      {services.map((service) => {
        const href = service.href ?? `${basePath}/${service.slug}`;
        const videoSrc = service.video ?? DEFAULT_SERVICE_VIDEO_SRC;

        return (
          <Link
            key={service.slug}
            href={href}
            className={styles.card}
            title={service.title}
          >
            {mediaType === "image" ? (
              <ServiceGridImage title={service.title} src={service.image} />
            ) : (
              <ServiceGridVideo
                title={service.title}
                poster={service.image}
                src={videoSrc}
              />
            )}
            <h3 className={styles.title}>{service.title}</h3>
            <p className={styles.description}>
              {serviceDescription(service.title, service.description)}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
