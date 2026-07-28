'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Prevent the browser from restoring scroll position on back/forward.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    // If navigating to an anchor on the same page, don't override.
    if (window.location.hash) return;

    const docEl = document.documentElement;
    const prevScrollBehavior = docEl.style.scrollBehavior;
    docEl.style.scrollBehavior = 'auto';

    // Do it on next frames to win against any late layout shifts.
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      docEl.scrollTop = 0;
      document.body.scrollTop = 0;

      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        docEl.scrollTop = 0;
        document.body.scrollTop = 0;
        docEl.style.scrollBehavior = prevScrollBehavior;
      });
    });
  }, [pathname, searchParams]);

  return null;
}
