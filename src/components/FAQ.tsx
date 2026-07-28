 'use client';

 import { useId, useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';
import styles from './FAQ.module.css';

type FAQItem = {
    question: string;
    answer: string;
};

type FAQProps = {
    title?: string;
    items?: FAQItem[];
    /** No grey section background; transparent cards */
    variant?: 'default' | 'plain';
    /** Skip scroll-reveal stagger (faster on blog posts) */
    animated?: boolean;
};

export default function FAQ({
    title = "ADVERTISING FAQ's",
    items,
    variant = 'default',
    animated = true,
}: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const idPrefix = useId();

    const faqs: FAQItem[] = items ?? [
        {
            question: 'Which is the best advertising agency in Bangalore?',
            answer: 'IM Solutions is recognized as one of the best advertising agencies in Bangalore, offering comprehensive 360° marketing solutions, creative design services, and proven lead generation strategies. With 7+ years of experience and 300+ satisfied clients, we deliver exceptional results for brands across all industries.'
        },
        {
            question: 'Why an advertising agency is important for business growth?',
            answer: 'An advertising agency brings specialized expertise, creative talent, and strategic insights that help businesses reach their target audience effectively. We provide access to cutting-edge tools, industry knowledge, and proven strategies that accelerate brand growth, increase market visibility, and drive measurable ROI.'
        },
        {
            question: 'Why should start-ups hire an advertising agency?',
            answer: 'Start-ups benefit immensely from hiring an advertising agency as it provides cost-effective access to professional marketing expertise without the overhead of building an in-house team. We help startups establish strong brand identity, reach their target market efficiently, and scale their marketing efforts as they grow.'
        },
        {
            question: 'What services does IM Solutions offer?',
            answer: 'IM Solutions offers a comprehensive range of services including digital marketing, social media management, content creation, SEO optimization, web design and development, graphic design, video production, brand strategy, lead generation, and 360° marketing solutions tailored to meet your business goals and budget.'
        },
        {
            question: 'How do you measure the success of a marketing campaign?',
            answer: 'We measure campaign success through data-driven metrics including ROI, conversion rates, customer acquisition cost, engagement metrics, traffic analytics, and lead generation numbers. We provide detailed reports and regular performance reviews to ensure transparency and continuous optimization of your marketing investments.'
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const sectionClass = variant === 'plain' ? `${styles.faq} ${styles.faqPlain}` : styles.faq;

    const faqItem = (faq: FAQItem, index: number) => (
        <div
            key={index}
            className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
            aria-expanded={openIndex === index}
        >
            <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-controls={`${idPrefix}-faq-answer-${index}`}
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
