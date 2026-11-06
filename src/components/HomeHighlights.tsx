import Link from "next/link";
import CountUp from "./CountUp";
import styles from "./HomeHighlights.module.css";

const FOUNDED = 2013;

// Keep these in sync with the stats on the Clients page (ClientsShowcase.tsx).
const METRICS = [
  { value: new Date().getFullYear() - FOUNDED, suffix: "+", label: "Years in business", note: `Since ${FOUNDED}` },
  { value: 40, suffix: "+", label: "Clients served", note: "Across India" },
  { value: 100, suffix: "+", label: "Projects delivered", note: "Online & offline" },
  { value: 8, suffix: "", label: "Industries", note: "Real estate to healthcare" },
];

/** Proof strip shown directly under the hero. */
export function MetricsStrip() {
  return (
    <section className={styles.metrics} aria-label="IM Solutions at a glance">
      <dl className={styles.metricsGrid}>
        {METRICS.map((m) => (
          <div key={m.label} className={styles.metric}>
            <dt className={styles.metricLabel}>{m.label}</dt>
            <dd className={styles.metricValue}>
              <CountUp end={m.value} suffix={m.suffix} />
            </dd>
            <dd className={styles.metricNote}>{m.note}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const AI_POINTS = [
  { title: "AI-assisted media buying", text: "Bidding, audience and budget decisions informed by live performance data." },
  { title: "Creative at scale", text: "Faster ad variations and testing without diluting the brand." },
  { title: "AI search visibility", text: "Structured content built to surface in Google AI Overviews and answer engines." },
];

/** Short homepage surface for the AI advertising capability. */
export function AISpotlight() {
  return (
    <section className={styles.ai} aria-labelledby="ai-spotlight-heading">
      <div className={styles.aiInner}>
        <div className={styles.aiIntro}>
          <span className={styles.eyebrow}>AI Advertising</span>
          <h2 id="ai-spotlight-heading" className={styles.aiHeading}>
            Marketing that learns as it runs.
          </h2>
          <p className={styles.aiText}>
            We put AI to work where it moves results: sharper targeting, faster creative
            iteration and visibility in AI-powered search.
          </p>
          <Link href="/services/ai-advertising-agency" className={styles.textLink}>
            Explore AI advertising <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ul className={styles.aiGrid}>
          {AI_POINTS.map((p, i) => (
            <li key={p.title} className={styles.aiCard}>
              <span className={styles.aiIndex} aria-hidden="true">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Repeated conversion CTA, placed after the client logos. */
export function StrategyCallBand() {
  return (
    <section className={styles.cta} aria-labelledby="strategy-call-heading">
      <div className={styles.ctaInner}>
        <div>
          <h2 id="strategy-call-heading" className={styles.ctaHeading}>
            Ready to see what one partner can do?
          </h2>
          <p className={styles.ctaText}>
            A 30-minute call to understand your goals and map the first moves.
          </p>
        </div>
        <Link href="/contact" className={styles.ctaButton}>
          Book a Strategy Call <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
