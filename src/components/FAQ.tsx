 'use client';

 import { useId, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import styles from './FAQ.module.css';

type FAQItem = {
    question: string;
    answer: string;
    details?: string[];
};

type FAQProps = {
    title?: string;
    items?: FAQItem[];
    /** No grey section background; transparent cards */
    variant?: 'default' | 'plain';
    /** Skip scroll-reveal stagger (faster on blog posts) */
    animated?: boolean;
    includeSchema?: boolean;
};

export default function FAQ({
    title = "ADVERTISING FAQ's",
    items,
    variant = 'default',
    animated = true,
    includeSchema = false,
}: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const idPrefix = useId();

    const faqs: FAQItem[] = items ?? [
        {
            question: 'What services does IM Solutions offer as a full-service marketing agency in Bangalore?',
            answer: 'IM Solutions is a full-service marketing and advertising agency in Bengaluru. We cover brand strategy, performance marketing, SEO, AI advertising and out-of-home media, and we run them as one plan, from the first strategy session to the last activation.',
            details: [
                'Performance and paid media: Google and Meta campaigns.',
                'Search and AI: SEO, AEO/GEO, and structured content.',
                'Integrated media: branding, events, and out-of-home advertising.',
            ],
        },
        {
            question: 'Why should businesses choose IM Solutions as their marketing agency in Bangalore?',
            answer: 'Because you get one partner instead of five. Since 2013 we have brought strategy, creative, technology and media under one roof, so online campaigns and offline activations pull in the same direction. Every engagement starts from your business objective and is measured against it.',
            details: [
                'Integrated online and offline campaign capabilities.',
                'Services shaped around the brief and business objectives.',
                'Performance marketing with an emphasis on clear measurement.',
            ],
        },
        {
            question: 'How many years of experience does IM Solutions have in advertising and marketing?',
            answer: 'We were founded in Bengaluru in 2013, so we bring more than a decade of hands-on experience in brand strategy, performance marketing and advertising. Our clients span real estate, retail, B2B and more, across India.',
            details: [
                'Established in Bengaluru, Karnataka.',
                'Capabilities span brand strategy, performance marketing, and advertising.',
            ],
        },
        {
            question: 'What digital marketing services does IM Solutions provide for high-intent lead generation?',
            answer: 'IM Solutions provides digital marketing services including Google Search Ads, Meta performance marketing, technical SEO, and conversion-focused landing pages. Depending on the campaign scope, these services can support audience reach, lead acquisition, and measurement across digital touchpoints. Contact the team to discuss channels and goals.',
            details: [
                'Google Search and Meta advertising.',
                'Technical SEO and conversion-focused landing pages.',
                'Campaign scope is tailored to the objectives discussed.',
            ],
        },
        {
            question: 'How does IM Solutions help real estate developers generate qualified leads?',
            answer: 'IM Solutions helps real estate developers attract qualified buyer enquiries through localized campaign planning and audience targeting. Campaign work may also use negative keyword controls and CRM-connected lead handling where included in the agreed scope. The right approach depends on the property, audience, location, and enquiry process.',
            details: [
                'Localized campaign planning and audience selection.',
                'Negative keyword controls where suitable.',
                'Lead handling aligned to the agreed campaign scope.',
            ],
        },
        {
            question: 'Does IM Solutions provide SEO services to improve Google search rankings?',
            answer: 'Yes. IM Solutions provides SEO services covering technical website improvements, commercial on-page content planning, and relevant authority-building strategies to support stronger organic search visibility. Search performance depends on many factors and outcomes are not guaranteed. A review of the site and business goals can help prioritize practical work.',
            details: [
                'Technical website improvements.',
                'Commercial on-page content planning.',
                'Relevant authority-building strategies.',
            ],
        },
        {
            question: 'Does IM Solutions provide AI SEO, AEO, and GEO optimization services?',
            answer: 'IM Solutions offers AI search optimization services, including Answer Engine Optimization and Generative Engine Optimization. This work focuses on clear content, entity information, and structured data for conversational search experiences. Search platforms decide what is surfaced, so these practices support discoverability but cannot guarantee citations or rankings.',
            details: [
                'Answer Engine Optimization and Generative Engine Optimization.',
                'Clear, well-structured content and entity information.',
                'Structured data aligned with visible page content.',
            ],
        },
        {
            question: 'Which industries does IM Solutions specialize in?',
            answer: 'IM Solutions works with organizations in sectors including real estate, retail and luxury goods, healthcare, education, and B2B enterprise. Services can include digital advertising, search optimization, and brand activation, with the approach adapted to each organization’s audience, goals, sector requirements, and marketing context.',
            details: [
                'Real estate, retail, and luxury goods.',
                'Healthcare and education.',
                'B2B and enterprise organizations.',
            ],
        },
        {
            question: 'Does IM Solutions provide both online and offline advertising solutions?',
            answer: 'Yes. IM Solutions provides online and offline advertising services, combining digital campaigns such as Google and Meta advertising with out-of-home placements, airport branding, transit media, and experiential activations. Available channels and formats depend on location, audience, and the objectives agreed for each engagement.',
            details: [
                'Digital campaigns across search and social channels.',
                'Out-of-home, airport, and transit media.',
                'Experiential and brand activation options.',
            ],
        },
        {
            question: 'How can businesses get started with an audit or campaign at IM Solutions?',
            answer: 'Book a strategy call through the contact page, or message us on WhatsApp. Tell us your goals and where you are today, and we will come back with a clear view of the first moves and the services that fit.',
            details: [
                'Describe your goals and service interests.',
                'Include relevant campaign context or constraints.',
                'Book a call via the contact page or WhatsApp.',
            ],
        },
    ];
    const faqSchema = includeSchema
        ? {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              '@id': 'https://www.imsolutions.co/#faq',
              mainEntity: faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                      '@type': 'Answer',
                      text: [faq.answer, ...(faq.details ?? [])].join(' '),
                  },
              })),
          }
        : null;

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const sectionClass = variant === 'plain' ? `${styles.faq} ${styles.faqPlain}` : styles.faq;

    const faqItem = (faq: FAQItem, index: number) => (
        <div
            key={index}
            className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
        >
            <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-controls={`${idPrefix}-faq-answer-${index}`}
                aria-expanded={openIndex === index}
            >
                <span>{faq.question}</span>
                <span className={styles.icon}>
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
            </button>
            <div
                id={`${idPrefix}-faq-answer-${index}`}
                className={styles.faqAnswer}
                role="region"
                aria-hidden={openIndex !== index}
            >
                <div className={styles.faqAnswerInner}>
                    <p>{faq.answer}</p>
                    {faq.details?.length ? (
                        <ul>
                            {faq.details.map((detail) => (
                                <li key={detail}>{detail}</li>
                            ))}
                        </ul>
                    ) : null}
                </div>
            </div>
        </div>
    );

    const titleBlock = animated ? (
        <ScrollReveal delay={0.1}>
            <h2 className="section-title">{title}</h2>
        </ScrollReveal>
    ) : (
        <h2 className="section-title">{title}</h2>
    );

    return (
        <section className={sectionClass}>
            {faqSchema ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
                    }}
                />
            ) : null}
            <div className="container">
                {titleBlock}

                <div className={styles.faqContainer}>
                    {faqs.map((faq, index) =>
                        animated ? (
                            <ScrollReveal key={index} delay={0.05 + index * 0.04}>
                                {faqItem(faq, index)}
                            </ScrollReveal>
                        ) : (
                            faqItem(faq, index)
                        )
                    )}
                </div>
            </div>
        </section>
    );
}
