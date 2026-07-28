'use client';

import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import ScrollReveal from '@/components/ScrollReveal';
import styles from './CareersPage.module.css';

const openRoles = [
  'Senior Graphic Designer',
  'Brand Strategist',
  'Performance Marketing Specialist',
  'Client Servicing Executive',
  'Motion Graphics Designer',
  'Content Writer',
  'UI/UX Designer',
  'Full Stack Developer',
];

const benefits = [
  'Meaningful Ownership',
  'Diverse Industry Exposure',
  'Continuous Learning & Mentorship',
  'Collaborative Work Environment',
  'Performance Recognition',
  'Career Progression Opportunities',
  'Modern Creative Workspace',
  'Flexible, Growth-Oriented Culture',
];

const hiringSteps = [
  {
    num: '01',
    title: 'Apply',
    desc: 'Share your résumé and portfolio.',
  },
  {
    num: '02',
    title: 'Initial Conversation',
    desc: 'Help us understand your experience, aspirations and strengths.',
  },
  {
    num: '03',
    title: 'Skill Assessment',
    desc: 'A role-specific discussion or assignment that reflects real-world work.',
  },
  {
    num: '04',
    title: 'Final Interaction',
    desc: 'Meet the leadership team and explore how we can grow together.',
  },
  {
    num: '05',
    title: 'Welcome to IM',
    desc: "Begin your journey with a structured onboarding experience and become part of a team that's committed to creating exceptional work.",
  },
];

const testimonials = [
  {
    quote:
      "At IM Solutions, you're trusted with responsibility from day one. The exposure, mentorship and freedom to contribute have accelerated my growth beyond expectations.",
    role: 'Senior Brand Strategist',
  },
  {
    quote:
      "Every project challenges us to think differently. It's a place where collaboration genuinely inspires better ideas.",
    role: 'Creative Designer',
  },
  {
    quote:
      "The culture encourages learning, experimentation and ownership. You're never limited by your designation—only by your curiosity.",
    role: 'Performance Marketing Specialist',
  },
];

export default function CareersPage() {
  const [applyRole, setApplyRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRoleClick = (role: string) => {
    setApplyRole(role);
    setIsSubmitted(false);
    document.getElementById('careers-apply-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleApplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      form.reset();
      setApplyRole('');
    }, 1200);
  };

  return (
    <main className={styles.container}>
      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <ScrollReveal delay={0.1} direction="up">
            <div className={styles.heroLeftEyebrow}>CAREERS AT IM SOLUTIONS</div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} direction="up">
            <h1 className={styles.heroTitle}>
              Build your story.<br />
              Shape what&apos;s next.
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3} direction="up">
            <div className={styles.heroVerticalLine}></div>
            <p className={styles.heroDescription}>
              At IM Solutions, we don&apos;t just create solutions for our clients &mdash; we build careers that create impact.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} direction="up">
            <button
              type="button"
              className={styles.exploreBtn}
              onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className={styles.iconCircle}>
                <FaArrowRight />
              </div>
              EXPLORE OPPORTUNITIES
            </button>
          </ScrollReveal>
        </div>

        <div className={styles.heroRightContent}>
          <ScrollReveal delay={0.5} direction="left">
            <div className={styles.rightItem}>PEOPLE</div>
          </ScrollReveal>
          <ScrollReveal delay={0.6} direction="left">
            <div className={styles.rightItem}>IDEAS</div>
          </ScrollReveal>
          <ScrollReveal delay={0.7} direction="left">
            <div className={styles.rightItem}>IMPACT</div>
            <div className={styles.heroRightVerticalLine}></div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. WHY IM SOLUTIONS  intro section */}
      <section className={styles.introSection}>
        <div className={styles.introContainer}>
          <ScrollReveal delay={0.1} direction="up">
            <div className={styles.sectionEyebrow}>WHY IM SOLUTIONS</div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} direction="up">
            <h2 className={styles.introTitle}>
              More Than a Workplace.<br />
              A Place to Grow.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3} direction="up">
            <p className={styles.introDesc}>
              The best ideas emerge when talented people are trusted to think freely, collaborate
              openly and challenge convention. At IM Solutions, you&apos;ll find an environment
              where ambition meets opportunity and growth is measured not only by experience, but
              by the impact you create.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. CULTURE SECTION */}
      <section id="culture" className={styles.cultureSection}>
        <div className={styles.cultureLeft}>
          <ScrollReveal delay={0.2} direction="up" className={styles.cultureLeftContent}>
            <div className={styles.cultureEyebrow}>OUR CULTURE</div>
            <div className={styles.cultureTitleLine}></div>
            <h2 className={styles.cultureTitle}>
              A Culture Built<br />
              Around People
            </h2>
            <div className={styles.cultureTitleLine}></div>
          </ScrollReveal>
        </div>

        <div className={styles.cultureRight}>
          <div className={styles.valuesGridFour}>
            <ScrollReveal delay={0.1} direction="up" className={styles.valueCard}>
              <h3 className={styles.valueTitle}>OWNERSHIP</h3>
              <p className={styles.valueDesc}>
                Take initiative, make decisions and see your ideas come to life.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="up" className={styles.valueCard}>
              <h3 className={styles.valueTitle}>COLLABORATION</h3>
              <p className={styles.valueDesc}>
                Work alongside strategists, designers, marketers and technologists who believe
                exceptional work is always a collective effort.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3} direction="up" className={styles.valueCard}>
              <h3 className={styles.valueTitle}>GROWTH</h3>
              <p className={styles.valueDesc}>
                Every project is an opportunity to learn, evolve and expand your capabilities.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.4} direction="up" className={styles.valueCard}>
              <h3 className={styles.valueTitle}>EXCELLENCE</h3>
              <p className={styles.valueDesc}>
                We pursue thoughtful execution, meaningful outcomes and continuous improvement in
                everything we create.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. STATS SECTION */}
      <section className={styles.statsSection}>
        <div className={styles.statsContentWrapper}>
          <div className={styles.statsLeft}>
            <ScrollReveal delay={0.2} direction="up">
              <h2 className={styles.statsTitle}>
                TOGETHER,<br />
                WE CREATE IMPACT<br />
                THAT LASTS.
              </h2>
              <div className={styles.statsArrow}>
                <FaArrowRight />
              </div>
            </ScrollReveal>
          </div>
          
          <div className={styles.statsRight}>
            <div className={styles.statsGrid}>
              <ScrollReveal delay={0.1} direction="up" className={styles.statItem}>
                <div className={styles.statNumber}>250+</div>
                <div className={styles.statLabel}>PROJECTS DELIVERED</div>
              </ScrollReveal>
              <ScrollReveal delay={0.2} direction="up" className={styles.statItem}>
                <div className={styles.statNumber}>25+</div>
                <div className={styles.statLabel}>NATIONALITIES</div>
              </ScrollReveal>
              <ScrollReveal delay={0.3} direction="up" className={styles.statItem}>
                <div className={styles.statNumber}>15+</div>
                <div className={styles.statLabel}>YEARS OF IMPACT</div>
              </ScrollReveal>
              <ScrollReveal delay={0.4} direction="up" className={styles.statItem}>
                <div className={styles.statNumber}>Endless</div>
                <div className={styles.statLabel}>POSSIBILITIES</div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU'LL WORK ON */}
      <section className={styles.introSection}>
        <div className={styles.introContainer}>
          <ScrollReveal delay={0.1} direction="up">
            <div className={styles.sectionEyebrow}>WHAT YOU&apos;LL WORK ON</div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} direction="up">
            <h2 className={styles.introTitle}>
              Meaningful Brands.<br />
              Meaningful Challenges.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3} direction="up">
            <p className={styles.introDesc}>
              From integrated campaigns and digital experiences to brand strategy, production and
              technology, you&apos;ll contribute to projects that influence businesses across
              industries. Every brief is an opportunity to solve real problems with creativity and
              purpose.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. OPEN OPPORTUNITIES */}
      <section id="opportunities" className={styles.opportunitiesSection}>
        <div className={styles.opportunitiesContainer}>
          <ScrollReveal delay={0.1} direction="up">
            <div className={styles.sectionEyebrow}>OPEN OPPORTUNITIES</div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} direction="up">
            <h2 className={styles.introTitle}>Find Your Place at IM</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3} direction="up">
            <p className={styles.introDesc}>
              Whether you&apos;re an experienced professional or an emerging talent, we&apos;re
              always looking for individuals who bring fresh perspectives and a passion for
              creating exceptional work.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} direction="up">
            <h3 className={styles.rolesHeading}>Current Opportunities</h3>
          </ScrollReveal>
          <div className={styles.rolesGrid}>
            {openRoles.map((role, i) => (
              <ScrollReveal key={role} delay={0.05 * i} direction="up">
                <button
                  type="button"
                  className={`${styles.roleRow} ${applyRole === role ? styles.roleRowActive : ''}`}
                  onClick={() => handleRoleClick(role)}
                >
                  <span>{role}</span>
                  <FaArrowRight className={styles.roleArrow} />
                </button>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} direction="up">
            <div className={styles.noRoleBlock}>
              <h4 className={styles.noRoleTitle}>Don&apos;t see a suitable role?</h4>
              <p className={styles.noRoleDesc}>
                Great talent is always welcome. Share your portfolio or résumé with us below, and
                we&apos;ll reach out when the right opportunity arises.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <form
              id="careers-apply-form"
              className={styles.applyForm}
              onSubmit={handleApplySubmit}
            >
              <h4 className={styles.applyFormTitle}>
                {applyRole ? `Apply for ${applyRole}` : 'Apply Now'}
              </h4>

              <div className={styles.applyFormRow}>
                <div className={styles.applyFormGroup}>
                  <label htmlFor="apply-name">Full Name*</label>
                  <input id="apply-name" name="name" type="text" required />
                </div>
                <div className={styles.applyFormGroup}>
                  <label htmlFor="apply-email">Email*</label>
                  <input id="apply-email" name="email" type="email" required />
                </div>
              </div>

              <div className={styles.applyFormRow}>
                <div className={styles.applyFormGroup}>
                  <label htmlFor="apply-phone">Phone*</label>
                  <input id="apply-phone" name="phone" type="tel" required />
                </div>
                <div className={styles.applyFormGroup}>
                  <label htmlFor="apply-role">Applying For*</label>
                  <select
                    id="apply-role"
                    name="role"
                    required
                    value={applyRole}
                    onChange={(e) => setApplyRole(e.target.value)}
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    {openRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                    <option value="General Application">General Application</option>
                  </select>
                </div>
              </div>

              <div className={styles.applyFormGroup}>
                <label htmlFor="apply-experience">Experience</label>
                <input id="apply-experience" name="experience" type="text" placeholder="e.g. 3 years" />
              </div>

              <div className={styles.applyFormGroup}>
                <label htmlFor="apply-portfolio">Portfolio / Résumé Link</label>
                <input id="apply-portfolio" name="portfolio" type="url" placeholder="https://" />
              </div>

              <div className={styles.applyFormGroup}>
                <label htmlFor="apply-message">Message</label>
                <textarea id="apply-message" name="message" rows={4} />
              </div>

              <button type="submit" className={styles.applyFormSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Submit Application'}
              </button>

              {isSubmitted && (
                <p className={styles.applyFormSuccess}>
                  Thank you — we&apos;ve received your application and will be in touch.
                </p>
              )}
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. LIFE AT IM */}
      <section className={styles.introSection}>
        <div className={styles.introContainer}>
          <ScrollReveal delay={0.1} direction="up">
            <div className={styles.sectionEyebrow}>LIFE AT IM</div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} direction="up">
            <h2 className={styles.introTitle}>
              Where Creativity Meets<br />
              Community
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3} direction="up">
            <p className={styles.introDesc}>
              Life at IM extends beyond projects. It includes shared achievements, collaborative
              learning, team celebrations and an environment where ideas are valued as much as the
              people behind them.
            </p>
            <p className={styles.introDesc}>
              Here, every milestone is celebrated together, and every success is built
              collectively.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. BENEFITS */}
      <section className={styles.benefitsSection}>
        <div className={styles.benefitsContainer}>
          <ScrollReveal delay={0.1} direction="up">
            <div className={styles.sectionEyebrow}>BENEFITS</div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} direction="up">
            <h2 className={styles.introTitle}>Designed for Long-Term Growth</h2>
          </ScrollReveal>

          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, i) => (
              <ScrollReveal
                key={benefit}
                delay={0.05 * i}
                direction="up"
                className={styles.benefitItem}
              >
                <span className={styles.benefitDot} aria-hidden="true" />
                {benefit}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. HIRING PROCESS */}
      <section className={styles.processSection}>
        <div className={styles.processContainer}>
          <ScrollReveal delay={0.1} direction="up">
            <div className={styles.sectionEyebrow}>HIRING PROCESS</div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} direction="up">
            <h2 className={styles.introTitle}>What to Expect</h2>
          </ScrollReveal>

          <div className={styles.processGrid}>
            {hiringSteps.map((step, i) => (
              <ScrollReveal key={step.num} delay={0.08 * i} direction="up" className={styles.processStep}>
                <div className={styles.processNum}>{step.num}</div>
                <h3 className={styles.processStepTitle}>{step.title}</h3>
                <p className={styles.processStepDesc}>{step.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. EMPLOYEE TESTIMONIALS */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsContainer}>
          <ScrollReveal delay={0.1} direction="up">
            <div className={styles.sectionEyebrow}>EMPLOYEE TESTIMONIALS</div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} direction="up">
            <h2 className={styles.introTitle}>In Their Own Words</h2>
          </ScrollReveal>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <ScrollReveal
                key={t.role}
                delay={0.15 * i}
                direction="up"
                className={styles.testimonialCard}
              >
                <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
                <span className={styles.testimonialRole}>{t.role}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION */}
      <section className={styles.finalCtaSection}>
        <div className={styles.finalCtaContainer}>
          <ScrollReveal delay={0.1} direction="up">
            <div className={styles.sectionEyebrowLight}>FINAL CALL TO ACTION</div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} direction="up">
            <h2 className={styles.finalCtaTitle}>Your Next Defining Chapter Starts Here.</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3} direction="up">
            <p className={styles.finalCtaDesc}>
              Bring your ideas, your ambition and your craft.
              <br />
              Together, let&apos;s create work that inspires audiences, builds remarkable brands
              and shapes the future.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4} direction="up">
            <div className={styles.finalCtaActions}>
              <button
                type="button"
                className={styles.exploreBtn}
                onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className={styles.iconCircle}>
                  <FaArrowRight />
                </div>
                EXPLORE OPPORTUNITIES
              </button>
              <a href="/contact" className={styles.applyBtn}>
                SUBMIT YOUR APPLICATION
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
