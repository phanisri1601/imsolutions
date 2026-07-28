'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
// Lightweight inline icons to avoid client-side chunk loading issues
function BarsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
    </svg>
  );
}

function MicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z" />
    </svg>
  );
}

function TimesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M18.3 5.71L12 12.01 5.71 5.71 4.29 7.12 10.59 13.41 4.29 19.71 5.71 21.12 12 14.82 18.29 21.12 19.71 19.71 13.41 13.41 19.71 7.12z" />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  );
}
import { serviceUrlMap } from '../data/services';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === '/';
  const isCareers = pathname === '/careers';
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [closeDropdownTimer, setCloseDropdownTimer] = useState<NodeJS.Timeout | null>(null);

  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 968);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const onlineServices = [
    'Advertising Agency In Bangalore',
    'Digital Marketing Service',
    'Search Engine Optimization',
    'Search Engine Marketing',
    'Online Reputation Management',
    'Website Designing and Development',
    'Social Media Optimization',
    'Social Media Marketing',
    'Software Design & Development',
    'Geolocation Analytical SMS',
    'AI Advertising Agency',
    'Creative Designing',
    'API Integration',
    'Ecommerce Solutions',
    'Email Marketing',
    'Mobile Application Development',
    'Real Estate Online Marketing Service',
    'Display Advertisement',
    'Blog Articles',
    'Classified Portal Management',
    'Press Releases Services',
  ];

  const offlineServices = [
    'Bus Branding',
    'RWA Activation',
    'BTL Advertising',
    'Advertising Activities In Malls & Multiplex',
    'Advertisements In Tech Parks',
    'Advertising in Airports',
    'Paper Insertion',
    'Advertisements In Cafes Gyms & Super Markets',
    'Advertisement in ATMs',
    'Auto Rickshaw Advertising',
    'Advertisement in Magazines',
    'Advertising in Public & Private Parking Lots',
    'Branding Re-Branding',
    'Corporate Gifts',
    'Corporate Training Services',
    'Event Management',
    'FM Campaigns',
    'Fabrications',
    'Hoarding Services',
    'Marketing Collaterals',
    'Marketing Services for Start-ups',
    'Photographic Services',
    'PR Services',
    'Printing Services',
    'Retail Advertising',
    'Real Estate Videography',
    'Signage',
    'Washroom Advertising',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleServiceClick = () => {
    setIsServicesOpen(false);
    setIsMenuOpen(false);
  };

  const getServiceUrl = (service: string) => {
    return serviceUrlMap[service] || '/services';
  };

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const isQuestionIntent = (rawTranscript: string) => {
    const t = normalize(rawTranscript);
    return (
      t.startsWith('what is') ||
      t.startsWith('what are') ||
      t.startsWith('whats') ||
      t.startsWith("what's") ||
      t.startsWith('what services') ||
      t.startsWith('who is') ||
      t.startsWith('where is') ||
      t.startsWith('when') ||
      t.startsWith('why') ||
      t.startsWith('how') ||
      t.startsWith('explain') ||
      t.startsWith('tell me') ||
      t.startsWith('describe') ||
      t.startsWith('do you') ||
      t === 'blog' ||
      t === 'blogs' ||
      t.includes('blog') ||
      t.includes('blogs') ||
      t.includes('articles') ||
      t.includes('do you offer') ||
      t.includes('do you provide') ||
      t.includes('what are') ||
      t.includes('what is') ||
      t.includes('whats') ||
      t.includes("what's") ||
      t.includes('what services') ||
      t.includes('explain')
    );
  };

  const isExplicitNavigationRequest = (rawTranscript: string) => {
    const t = normalize(rawTranscript);
    return (
      t.includes('go to') ||
      t.includes('open') ||
      t.includes('navigate') ||
      t.includes('take me') ||
      t.includes('show me')
    );
  };

  const shouldAutoNavigateForInfo = (rawTranscript: string, suggestedPath: string | null) => {
    if (!suggestedPath) return false;
    const t = normalize(rawTranscript);

    // For "tell me about blogs/services" style queries, we want to open the relevant page
    const isInfoAsk =
      t.includes('tell me about') ||
      t.includes('information about') ||
      t.includes('details about') ||
      t.includes('explain') ||
      t.includes('describe');

    const isBlogs = t.includes('blog') || t.includes('blogs') || t.includes('articles') || t.includes('posts');
    const isServices = t.includes('service') || t.includes('services') || t.includes('online') || t.includes('offline');

    // Only auto-navigate to blog/services pages (avoid surprising redirects elsewhere)
    const isSuggestedBlogOrServices =
      suggestedPath.startsWith('/blog') || suggestedPath.startsWith('/services');

    return isSuggestedBlogOrServices && (isInfoAsk || isBlogs || isServices);
  };

  const speak = (text: string) => {
    if (typeof window === 'undefined') return;
    const synth = window.speechSynthesis;
    if (!synth) return;

    try {
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = 1;
      synth.speak(utter);
    } catch {
      // ignore
    }
  };

  const speakAsync = (text: string, timeoutMs = 4000) => {
    return new Promise<void>((resolve) => {
      if (typeof window === 'undefined') return resolve();
      const synth = window.speechSynthesis;
      if (!synth) {
        setVoiceError('Your browser does not support voice playback (Speech Synthesis).');
        return resolve();
      }

      const ensureVoices = () => {
        return new Promise<SpeechSynthesisVoice[]>((res) => {
          const voices = synth.getVoices();
          if (voices && voices.length) return res(voices);

          const onVoices = () => {
            try {
              synth.removeEventListener('voiceschanged', onVoices);
            } catch {
              // ignore
            }
            res(synth.getVoices() || []);
          };

          try {
            synth.addEventListener('voiceschanged', onVoices);
          } catch {
            // ignore
          }

          // Fallback: resolve even if voiceschanged never fires
          window.setTimeout(() => {
            try {
              synth.removeEventListener('voiceschanged', onVoices);
            } catch {
              // ignore
            }
            res(synth.getVoices() || []);
          }, 800);
        });
      };

      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        resolve();
      };

      // Give longer answers more time
      const dynamicTimeout = Math.max(timeoutMs, Math.min(12000, 1200 + text.length * 35));
      const t = window.setTimeout(finish, dynamicTimeout);

      (async () => {
        try {
          const voices = await ensureVoices();
          const preferred =
            voices.find(v => v.lang?.toLowerCase().startsWith('en') && v.name?.toLowerCase().includes('google')) ||
            voices.find(v => v.lang?.toLowerCase().startsWith('en')) ||
            null;

          synth.cancel();
          const utter = new SpeechSynthesisUtterance(text);
          utter.lang = 'en-US';
          utter.rate = 1;
          utter.pitch = 1;
          utter.volume = 1;
          if (preferred) utter.voice = preferred;

          utter.onend = () => {
            window.clearTimeout(t);
            finish();
          };
          utter.onerror = () => {
            window.clearTimeout(t);
            finish();
          };

          synth.speak(utter);
        } catch {
          window.clearTimeout(t);
          finish();
        }
      })();
    });
  };

  const askAssistant = async (query: string) => {
    const res = await fetch('/api/voice-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const data = (await res.json().catch(() => ({}))) as any;
    if (!res.ok) {
      const base = typeof data?.error === 'string' ? data.error : 'Assistant failed. Please try again.';
      const details = typeof data?.details === 'string' ? data.details : '';
      const msg = details ? `${base} ${details}` : base;
      throw new Error(msg);
    }

    return {
      answer: typeof data?.answer === 'string' ? data.answer : '',
      suggestedPath: typeof data?.suggestedPath === 'string' ? data.suggestedPath : null,
    };
  };

  const keywordRoutes = useMemo(() => {
    return [
      { keys: ['home', 'homepage'], url: '/' },
      { keys: ['about', 'about us', 'company'], url: '/about' },
      { keys: ['services', 'service'], url: '/services/online' },
      { keys: ['online services', 'digital services', 'digital marketing services'], url: '/services/online' },
      { keys: ['offline services', 'btl', 'outdoor', 'offline marketing'], url: '/services/offline' },
      { keys: ['clients', 'our clients'], url: '/clients' },
      { keys: ['careers', 'career', 'jobs', 'job'], url: '/careers' },
      { keys: ['blog', 'blogs', 'articles'], url: '/blog' },
      { keys: ['contact', 'contact us', 'call', 'email'], url: '/contact' },
    ];
  }, []);

  const serviceMatchers = useMemo(() => {
    return Object.entries(serviceUrlMap)
      .map(([serviceName, url]) => ({
        name: serviceName,
        norm: normalize(serviceName),
        url,
      }))
      .filter(e => e.norm)
      // Prefer more specific (longer) service names first
      .sort((a, b) => b.norm.length - a.norm.length);
  }, []);

  const findBestRoute = (rawTranscript: string) => {
    const t = normalize(rawTranscript);

    // If user speaks a URL-like path, navigate directly
    if (rawTranscript.includes('/') && rawTranscript.trim().startsWith('/')) {
      return rawTranscript.trim();
    }

    // 1) Prefer service URL matches first (more specific than generic page keywords)
    for (const svc of serviceMatchers) {
      if (t.includes(svc.norm)) return svc.url;
    }

    // 2) Then fall back to general pages
    for (const entry of keywordRoutes) {
      if (entry.keys.some(k => t.includes(normalize(k)))) return entry.url;
    }

    if (t.includes('seo')) return serviceUrlMap['Search Engine Optimization'] || '/services/seo';
    if (t.includes('sem') || t.includes('ppc')) return serviceUrlMap['Search Engine Marketing'] || '/services/sem';

    return null;
  };

  const stopListening = () => {
    const rec = recognitionRef.current;
    if (rec) {
      try {
        rec.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  };

  const startListening = () => {
    setVoiceError(null);

    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError('Voice search is not supported in this browser.');
      return;
    }

    const rec = new SpeechRecognition();
    recognitionRef.current = rec;
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (event: any) => {
      const transcript = event?.results?.[0]?.[0]?.transcript || '';
      stopListening();

      const run = async () => {
        // Question intent: answer using knowledge base + Gemini and speak it
        if (isQuestionIntent(transcript)) {
          try {
            const { answer, suggestedPath } = await askAssistant(transcript);
            const finalAnswer = answer || "I don't have that information yet.";
            setVoiceError(finalAnswer);

            const shouldNavigate =
              !!suggestedPath &&
              (isExplicitNavigationRequest(transcript) ||
                shouldAutoNavigateForInfo(transcript, suggestedPath));

            // Start speaking immediately. If we need to navigate, don't block on speech ending
            // (some browsers don't reliably fire onend for SpeechSynthesis).
            const speakPromise = speakAsync(finalAnswer, 5000);

            if (shouldNavigate && suggestedPath) {
              setIsMenuOpen(false);
              setIsServicesOpen(false);
              setIsMobileServicesOpen(false);
              window.setTimeout(() => router.push(suggestedPath), 350);
            }

            // Still await speech so UI timing stays consistent (but navigation won't be blocked).
            await speakPromise;
          } catch (e: any) {
            const msg = typeof e?.message === 'string' ? e.message : 'Assistant failed. Please try again.';
            setVoiceError(msg);
            await speakAsync(msg, 4000);
          }
          return;
        }

        // Otherwise: normal navigation
        const route = findBestRoute(transcript);
        if (route) {
          const msg = 'Opening your requested page.';
          setVoiceError(msg);
          await speakAsync(msg, 2500);
          setIsMenuOpen(false);
          setIsServicesOpen(false);
          setIsMobileServicesOpen(false);
          router.push(route);
        } else {
          // Fallback: if no route match, try assistant anyway so it behaves conversationally
          try {
            const { answer } = await askAssistant(transcript);
            const finalAnswer = answer || 'Could not match your request. Try saying “Services”, “Blog”, or a service name.';
            setVoiceError(finalAnswer);
            await speakAsync(finalAnswer, 5000);
          } catch (e: any) {
            const msg =
              typeof e?.message === 'string'
                ? e.message
                : 'Could not match your request. Try saying “Services”, “Blog”, or a service name.';
            setVoiceError(msg);
            await speakAsync(msg, 4000);
          }
        }
      };

      void run();
    };

    rec.onerror = () => {
      stopListening();
      setVoiceError('Voice search failed. Please try again.');
    };

    rec.onend = () => {
      setIsListening(false);
    };

    try {
      setIsListening(true);
      rec.start();
    } catch {
      setIsListening(false);
      setVoiceError('Unable to start voice search.');
    }
  };

  useEffect(() => {
    return () => {
      const rec = recognitionRef.current;
      if (rec) {
        try {
          rec.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return (
    <header className={`${styles.header} ${isHome ? styles.isHome : ''} ${isCareers ? styles.solidWhite : ''} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logo}>
          <img
            src="/weblogo.png"
            alt="IM Solutions"
            style={{ height: '52px', width: 'auto', marginLeft: '10px' }} // Inline style for immediate sizing control
          />
        </Link>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>The Beginning</Link>
            <Link href="/about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>The IM Perspective</Link>

            <div
              className={styles.dropdown}
              onMouseEnter={() => {
                setIsServicesOpen(true);
                if (closeDropdownTimer) clearTimeout(closeDropdownTimer);
              }}
              onMouseLeave={() => {
                const timer = setTimeout(() => setIsServicesOpen(false), 150);
                setCloseDropdownTimer(timer);
              }}
            >
              <button 
                className={styles.navLink}
                onMouseEnter={() => setIsServicesOpen(true)}
                onClick={() => {
                  if (isMobile) {
                    setIsMobileServicesOpen(!isMobileServicesOpen);
                  }
                }}
              >
                Creative Solutions <ChevronDownIcon className={`${styles.chevron} ${isServicesOpen || isMobileServicesOpen ? styles.chevronRotated : ''}`} />
              </button>
              {isMobile ? (
                isMobileServicesOpen && (
                  <div 
                    className={`${styles.dropdownMenu} ${styles.mobileDropdown}`}
                  >
                    <Link
                      href="/services/online"
                      className={styles.categoryButton}
                      onClick={() => {
                        setIsMobileServicesOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      Online Services
                    </Link>
                    <Link
                      href="/services/offline"
                      className={styles.categoryButton}
                      onClick={() => {
                        setIsMobileServicesOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      Offline Services
                    </Link>
                  </div>
                )
              ) : (
                isServicesOpen && (
                  <div 
                    className={`${styles.dropdownMenu}`}
                    onMouseEnter={() => {
                      setIsServicesOpen(true);
                      if (closeDropdownTimer) clearTimeout(closeDropdownTimer);
                    }}
                    onMouseLeave={() => {
                      const timer = setTimeout(() => setIsServicesOpen(false), 150);
                      setCloseDropdownTimer(timer);
                    }}
                  >
                    <Link
                      href="/services/online"
                      className={styles.categoryButton}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Online Services
                    </Link>
                    <Link
                      href="/services/offline"
                      className={styles.categoryButton}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Offline Services
                    </Link>
                  </div>
                )
              )}
            </div>

            <Link href="/clients" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>The Showcase</Link>
            <Link href="/careers" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>The Collective</Link>
            <Link href="/blog" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>The Inspiration</Link>
            <Link href="/contact" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Let's Connect</Link>
          </nav>

          <div className={styles.headerActions}>
            {/* Voice chat functionality hidden */}
            
            {/* Add hamburger menu button */}
            <button
              className={styles.menuToggle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <TimesIcon /> : <BarsIcon />}
            </button>
          </div>
        </div>
    </header>
  );
}
