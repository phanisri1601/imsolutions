"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}

export default function CountUp({ end, duration = 2, suffix = "" }: CountUpProps) {
  const countRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const count = countRef.current;
    const container = containerRef.current;

    if (!count || !container) return;

    // Set initial state
    gsap.set(count, { textContent: 0 });

    // Create scroll trigger for animation
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        gsap.to({ value: 0 }, {
          value: end,
          duration: duration,
          ease: "power2.out",
          onUpdate: function() {
            count.textContent = Math.round(this.targets()[0].value) + suffix;
          }
        });
      },
      once: true // Only trigger once
    });

    return () => {
      trigger.kill();
    };
  }, [end, duration, suffix]);

  return (
    <div ref={containerRef}>
      <span ref={countRef}>0{suffix}</span>
    </div>
  );
}
