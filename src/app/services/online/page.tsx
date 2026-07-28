'use client';

import Link from 'next/link';
import styles from './OnlineServices.module.css';
import { useEffect, useRef, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';
import StackingCardsSection from '@/components/StackingCardsSection';
import ServicesVolumeGrid from '@/components/ServicesVolumeGrid';
import ServicesHero from '@/components/ServicesHero';

const onlineImage = (filename: string) =>
  encodeURI(`/online services/${filename}`);

const onlineServices = [
  {
    title: 'Digital Marketing Service',
    slug: 'digital-marketing-service',
    image: encodeURI('/popular services/digital services.png'),
  },
  {
    title: 'Search Engine Optimization',
    slug: 'seo',
    image: encodeURI('/popular services/Search Engine Optimization.png'),
  },
  {
    title: 'Search Engine Marketing',
    slug: 'sem',
    image: encodeURI('/popular services/Search Engine Marketing.png'),
  },
  {
    title: 'Online Reputation Management',
    slug: 'online-reputation-management',
    image: encodeURI('/popular services/Online Reputation Management.png'),
  },
  {
    title: 'Website Designing and Development',
    slug: 'website-design-development',
    image: onlineImage('Web Designing And Development.png'),
  },
  {
    title: 'Social Media Optimization',
    slug: 'social-media-optimization',
    image: onlineImage('Social Media Optimization.png'),
  },
  {
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    image: onlineImage('Social Media Marketing.png'),
  },
  {
    title: 'Software Design & Development',
    slug: 'software-design-development',
    image: onlineImage('Software Design and Development.png'),
  },
  {
    title: 'Geolocation Analytical SMS',
    slug: 'geolocation-sms',
    image: onlineImage('Geolocation Analytical SMS.png'),
  },
  {
    title: 'Creative Designing',
    slug: 'creative-designing',
    image: onlineImage('Creative Designing.png'),
  },
  {
    title: 'API Integration',
    slug: 'api-integration',
    image: onlineImage('API Integration.png'),
  },
  {
    title: 'Ecommerce Solutions',
    slug: 'ecommerce-solutions',
    image: onlineImage('Ecommerce Solutions.png'),
  },
  {
    title: 'Email Marketing',
    slug: 'email-marketing',
    image: onlineImage('Email Marketing.png'),
  },
  {
    title: 'Mobile Application Development',
    slug: 'mobile-app-development',
    image: onlineImage('Mobile Application Development.png'),
  },
  {
    title: 'Real Estate Online Marketing Service',
    slug: 'real-estate-marketing',
    image: onlineImage('Real Estate Online Marketing Service.png'),
  },
  {
    title: 'Display Advertisement',
    slug: 'display-advertisement',
    image: onlineImage('Display Advertisement.png'),
  },
  {
    title: 'Blog Articles',
    slug: 'blog-articles',
    image: onlineImage('Blog Articles.png'),
  },
  {
    title: 'Classified Portal Management',
    slug: 'classified-portal',
    image: onlineImage('Classified Portal Management.png'),
  },
  {
    title: 'Press Releases Services',
    slug: 'press-releases',
    image: onlineImage('Press Releases Services.png'),
  },
];

const popularImage = (filename: string) =>
  encodeURI(`/popular services/${filename}`);

const onlineStackingCards = [
  {
    title: 'Digital Marketing Service',
    slug: 'digital-marketing-service',
    description:
      'Build full-funnel digital campaigns that drive awareness, engagement, and measurable growth across Bangalore and beyond.',
    tag: 'Digital',
    number: 1,
    image: popularImage('digital services.png'),
  },
  {
    title: 'Search Engine Optimization',
    slug: 'seo',
    description:
      'Improve organic visibility with data-led SEOtechnical fixes, content strategy, and rankings that bring qualified traffic.',
    tag: 'SEO',
    number: 2,
    image: popularImage('Search Engine Optimization.png'),
  },
  {
    title: 'Search Engine Marketing',
    slug: 'sem',
    description:
      'Capture high-intent demand with targeted paid search campaigns optimized for leads, sales, and strong ROI.',
    tag: 'Paid Search',
    number: 3,
    image: popularImage('Search Engine Marketing.png'),
  },
  {
    title: 'Online Reputation Management',
    slug: 'online-reputation-management',
    description:
      'Protect and strengthen your brand online with proactive monitoring, reviews management, and trust-building content.',
    tag: 'ORM',
    number: 4,
    image: popularImage('Online Reputation Management.png'),
  },
];

export default function OnlineServicesPage() {


  // featured: top 5 priority services
  const featured = [
    {
      title: 'Digital Marketing Service',
      slug: 'digital-marketing-service',
      img1: '/services/pro-feature-1-left.svg',
      img2: '/services/pro-feature-1-right.svg',
    },
    {
      title: 'Search Engine Optimization',
      slug: 'seo',
      img1: '/services/pro-feature-2-left.svg',
      img2: '/services/pro-feature-2-right.svg',
    },
    {
      title: 'Search Engine Marketing',
      slug: 'sem',
      img1: '/services/pro-feature-3-left.svg',
      img2: '/services/pro-feature-3-right.svg',
    },
    {
      title: 'Online Reputation Management',
      slug: 'online-reputation-management',
      img1: '/services/pro-feature-4-left.svg',
      img2: '/services/pro-feature-4-right.svg',
    },
    {
      title: 'Social Media Marketing',
      slug: 'social-media-marketing',
      img1: '/services/pro-feature-5-left.svg',
      img2: '/services/pro-feature-5-right.svg',
    },
  ];



  const [active, setActive] = useState<number | null>(null);
  const featuredRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [imageTopLeft, setImageTopLeft] = useState<number | null>(null);
  const [imageTopRight, setImageTopRight] = useState<number | null>(null);
  const [imageLeft, setImageLeft] = useState<number | null>(null);
  const [imageRight, setImageRight] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 640px)');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncMobile = () => setIsMobile(mobileQuery.matches);
    const syncReduceMotion = () => setReduceMotion(reduceMotionQuery.matches);

    syncMobile();
    syncReduceMotion();

    mobileQuery.addEventListener('change', syncMobile);
    reduceMotionQuery.addEventListener('change', syncReduceMotion);

    return () => {
      mobileQuery.removeEventListener('change', syncMobile);
      reduceMotionQuery.removeEventListener('change', syncReduceMotion);
    };
  }, []);

  const handleEnter = (i: number) => {
    setActive(i);
    if (featuredRef.current && itemRefs.current[i]) {
      const containerRect = featuredRef.current.getBoundingClientRect();
      const itemRect = itemRefs.current[i]!.getBoundingClientRect();
      const centerY = itemRect.top - containerRect.top + itemRect.height / 2;

      // compute left/right positions so images sit near the left/right edges
      const imgW = 280; // matches CSS image width
      const imgH = 280;
      const inset = 32; // how far from the container edge the image should sit

      // pin images near the edges
      let leftPos = inset;
      let rightPos = containerRect.width - imgW - inset;

      // vertical offset: left slightly above, right slightly below
      const offsetY = 50;
      let leftTop = centerY - offsetY;
      let rightTop = centerY + offsetY;

      // clamp positions to container bounds (so images don't overflow)
      leftPos = Math.max(8, leftPos);
      rightPos = Math.min(containerRect.width - imgW - 8, rightPos);

      const minTop = imgH / 2 + 8;
      const maxTop = containerRect.height - imgH / 2 - 8;
      leftTop = Math.min(Math.max(leftTop, minTop), maxTop);
      rightTop = Math.min(Math.max(rightTop, minTop), maxTop);

      setImageTopLeft(leftTop);
      setImageTopRight(rightTop);
      setImageLeft(leftPos);
      setImageRight(rightPos);
    }
  };

  const handleLeave = () => {
    setActive(null);
    setImageTopLeft(null);
    setImageTopRight(null);
    setImageLeft(null);
    setImageRight(null);
  };

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is digital marketing and how can it help my business?',
      answer: 'Digital marketing encompasses all online marketing activities including SEO, social media marketing, content marketing, and paid advertising. It helps your business reach targeted audiences, increase brand awareness, drive website traffic, and generate qualified leads with measurable ROI.'
    },
    {
      question: 'How long does it take to see results from digital marketing?',
      answer: 'Results vary by strategy. Paid campaigns (PPC, SEM) can show immediate results within days. Organic strategies (SEO, content marketing) typically take 3-6 months to show significant results. We focus on long-term sustainable growth while delivering early wins through strategic planning.'
    },
    {
      question: 'Which digital marketing channels should I focus on?',
      answer: 'The best channels depend on your target audience and business goals. Social media works great for brand awareness, SEO for organic traffic, SEM for immediate conversions, and email marketing for customer retention. We analyze your audience and recommend an optimal mix of channels for maximum impact.'
    },
    {
      question: 'What is the difference between SEO and SEM?',
      answer: 'SEO (Search Engine Optimization) focuses on organic search results through content optimization and technical improvements. SEM (Search Engine Marketing) includes paid search advertising. Both are valuableSEO provides long-term results while SEM offers immediate visibility. A combination strategy often works best.'
    },
    {
      question: 'How do you measure the success of digital marketing campaigns?',
      answer: 'We track KPIs including website traffic, conversion rates, cost-per-acquisition, ROI, engagement metrics, leads generated, and sales revenue. Custom dashboards provide real-time performance data so you can see exactly how your investment is performing and make informed decisions.'
    },
    {
      question: 'Why is social media marketing important?',
      answer: 'Social media reaches billions of users where they spend significant time. It builds brand community, improves customer engagement, drives website traffic, and provides valuable customer insights. Consistent social presence strengthens brand authority and creates loyal customer relationships.'
    },
    {
      question: 'What services do you offer for website design and development?',
      answer: 'We provide website design, responsive development, e-commerce solutions, API integration, performance optimization, and ongoing maintenance. Our websites are SEO-friendly, mobile-optimized, and designed to convert visitors into customers while providing excellent user experiences.'
    },
    {
      question: 'How important is content marketing?',
      answer: 'Content marketing is crucial for establishing authority, improving SEO rankings, and providing value to your audience. Quality content attracts organic traffic, builds trust, educates prospects, and supports other marketing channels. We create strategic content that aligns with your business goals and audience needs.'
    },
    {
      question: 'Can I integrate digital marketing with offline advertising?',
      answer: 'Absolutely! Integrated marketing campaigns combining online and offline tactics create powerful synergies. QR codes, unique coupon codes, and retargeting campaigns bridge online-offline gaps. We create cohesive campaigns where each channel amplifies the others for maximum impact and ROI.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <ServicesHero
        eyebrow="CREATIVE SOLUTIONS"
        headingBlack="Every brand needs
a digital edge."
        headingRed="We build it."
        description="At IM Solutions, we combine strategy, creativity and technology to deliver online services that grow your brand, drive leads and leave a lasting impact."
        ctaLabel="EXPLORE ONLINE SERVICES"
        ctaHref="#services-listing"
      />

      <StackingCardsSection cards={onlineStackingCards} />

      <section className={styles.servicesListing}>
        <div className={styles.sectionTitleWrapper}>
          <h2 className={styles.sectionTitle}>Online Services</h2>
        </div>
        <ServicesVolumeGrid mediaType="image" services={onlineServices} />
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqContent}>
          <ScrollReveal delay={0.2}>
            <h2 className={styles.faqTitle}>ONLINE SERVICES FAQ&apos;S</h2>
          </ScrollReveal>
          <div className={styles.faqContainer}>
            {faqs.slice(0, 7).map((faq, index) => (
              <ScrollReveal key={index} delay={0.3 + index * 0.15}>
                <div className={`${styles.faqItem} ${openFaqIndex === index ? styles.open : ''}`}>
                  <button className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                    <span>{faq.question}</span>
                    <span className={styles.faqIcon}>
                      {openFaqIndex === index ? <FaMinus /> : <FaPlus />}
                    </span>
                  </button>
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
