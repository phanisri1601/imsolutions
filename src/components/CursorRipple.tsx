'use client';

import { useEffect, useRef } from 'react';
import styles from './CursorRipple.module.css';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CursorRipple() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      const newRipple: Ripple = {
        id: idRef.current++,
        x,
        y,
      };

      ripplesRef.current.push(newRipple);

      const rippleElement = document.createElement('div');
      rippleElement.className = styles.ripple;
      rippleElement.style.left = `${x}px`;
      rippleElement.style.top = `${y}px`;
      rippleElement.id = `ripple-${newRipple.id}`;

      containerRef.current.appendChild(rippleElement);

      setTimeout(() => {
        const element = document.getElementById(`ripple-${newRipple.id}`);
        if (element) {
          element.remove();
        }
        ripplesRef.current = ripplesRef.current.filter((r) => r.id !== newRipple.id);
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={containerRef} className={styles.container} />;
}
