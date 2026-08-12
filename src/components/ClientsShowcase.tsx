import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import CountUp from "./CountUp";
import styles from "./ClientsShowcase.module.css";

const bg = (filename: string) => `/clients-showcase/${filename}`;

const industries = [
  { label: "Real Estate", image: bg("real-estate.png") },
  { label: "Jewellery", image: bg("jewellery.png") },
  { label: "Healthcare", image: bg("healthcare.png") },
  { label: "Retail", image: bg("retail.png") },
  { label: "Technology", image: bg("technology.png") },
  { label: "Education", image: bg("education.png") },
  { label: "Hospitality", image: bg("hospitality.png") },
  { label: "Lifestyle", image: bg("lifestyle.png") },
];

const clientStories = [
  {
    logo: "/clients/prestigegroup.png",
    name: "Prestige Group",
    text: "A long-standing real estate partner across brand campaigns and digital growth.",
  },
  {
    logo: "/clients/tatahousing.png",
    name: "Tata Housing",
    text: "Supporting brand consistency and digital presence across multiple project launches.",
  },
  {
    logo: "/clients/brigade.png",
    name: "Brigade Group",
    text: "Collaborating on integrated marketing for residential and commercial developments.",
  },
];

const stats = [
  { value: 12, suffix: "+", label: "Years Of Experience" },
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "+", label: "Satisfied Clients" },
  { value: 8, suffix: "", label: "Industries Served" },
];

const partnerLogos = [
  "adithya.png",
  "brigade.png",
  "caratlane.png",
  "DTDS.png",
  "evershine.png",
  "gcorp.png",
  "homelane.png",
  "indinmony.png",
  "gap.png",
  "kotak.png"
];

export default function ClientsShowcase() {
  return (
    <div className={styles.showcase}>
      {/* 1. Hero — The Showcase */}
      <section className={styles.hero} style={{ backgroundImage: `url(${bg("hero.png")})` }}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Our Clients</span>
          <h1 className={styles.heroTitle}>The Showcase</h1>
          <p className={styles.heroDesc}>Partnerships that inspire. Work that drives impact.</p>
        </div>
      </section>

      {/* 2. Industries We Serve */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <span className={styles.eyebrow}>Industries We Serve</span>
          <div className={styles.industriesGrid}>
            {industries.map((industry) => (
              <div
                key={industry.label}
                className={styles.industryTile}
                style={{ backgroundImage: `url(${industry.image})` }}
              >
                <span className={styles.industryLabel}>{industry.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Work */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.featuredHead}>
            <span className={styles.eyebrow}>Featured Work</span>
            <div className={styles.featuredNav} aria-hidden="true">
              <span className={styles.navCircle}>
                <FiArrowLeft />
              </span>
              <span className={styles.navCircle}>
                <FiArrowRight />
              </span>
            </div>
          </div>
          <div className={styles.featuredBody}>
            <div
              className={styles.featuredImage}
              style={{ backgroundImage: `url(${bg("featured-jewellery.png")})` }}
            />
            <div className={styles.featuredContent}>
              <h3 className={styles.featuredTitle}>Jewellery &amp; Luxury Retail</h3>
              <p className={styles.featuredDesc}>
                Crafting refined identities and digital campaigns for fine jewellery and luxury
                retail brands — from product storytelling to performance-driven visibility.
              </p>
              <Link href="/services" className={styles.featuredLink}>
                Explore Our Services <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* 5. Partnerships stats */}
      <section
        className={styles.statsSection}
        style={{ backgroundImage: `url(${bg("stats-bg.png")})` }}
      >
        <div className={styles.sectionInner}>
          <span className={styles.eyebrow}>Partnerships That Create Impact</span>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statBlock}>
                <div className={styles.statValue}>
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Let's Build Together — Final CTA */}
      <section className={styles.ctaSection} style={{ backgroundImage: `url(${bg("cta-bg.png")})` }}>
        <div className={styles.sectionInner}>
          <div className={styles.ctaGrid}>
            <div>
              <h3 className={styles.ctaTitle}>Let&apos;s Build Something Extraordinary Together.</h3>
              <Link href="/contact" className={styles.ctaLink}>
                Let&apos;s Talk <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div>
              <span className={styles.ctaLabel}>Brands We&apos;ve Partnered With</span>
              <div className={styles.ctaLogos}>
                {partnerLogos.map((logo) => (
                  <div key={logo} className={styles.ctaLogoChip}>
                    <img src={`/clients/${logo}`} alt="" className={styles.ctaLogo} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
