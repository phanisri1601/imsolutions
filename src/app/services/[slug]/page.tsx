'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './ServiceDetail.module.css';
import { serviceData } from '@/data/servicesData';
import {
  FaCompass,
  FaLightbulb,
  FaPencilAlt,
  FaBullhorn,
  FaChartBar,
} from 'react-icons/fa';
import { FaCar, FaShoppingCart, FaShoppingBag, FaBuilding, FaLandmark, FaHeartbeat, FaCheckCircle } from 'react-icons/fa';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  let service: any = null;
  try {
    service = require(`../../../data/services/${slug}.json`);
  } catch (e) {
    service = serviceData[slug];
  }

  if (!service) {
    notFound();
  }

  const servicesGridData = [
    { num: '01', title: 'Strategy', image: '/aervice/c075c89b-19d5-4dec-848a-889dfb74a554.png', color: '#1a3322' },
    { num: '02', title: 'Creative', image: '/aervice/a981681e-929c-4d59-bc8b-96860c3d1c19.png', color: '#6e1919' },
    { num: '03', title: 'Digital & Technology', image: '/aervice/16b2eb51-d473-41a3-a6f9-4e7f529e8a0f.png', color: '#1c2b42' },
    { num: '04', title: 'Media', image: '/aervice/ef983301-dfb4-4710-977a-4fd1d36b8e53.png', color: '#1a2744' },
    { num: '05', title: 'Outdoor', image: '/aervice/1a804cf6-7715-46f0-8249-05d6dbe2f75e.png', color: '#1c3d2e' },
    { num: '06', title: 'Production & Experiences', image: '/aervice/47700efa-0d09-445c-940e-57d4e12a5432.png', color: '#4a3621' },
  ];

  return (
    <main className={styles.pageContainer}>
      {/* 1. Hero Section */}
      <section className={styles.heroSection}>
        <img
          src="/aervice/service banner image.png"
          alt="Service Banner"
          className={styles.heroBannerBg}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Everything<br />
            Your Brand<br />
            Needs to Move Forward.
          </h1>
          <p className={styles.heroSubtitle}>One Partner. Every Possibility.</p>
          <hr className={styles.heroDivider} />
        </div>
      </section>

      {/* 2. Intro & Collage Section */}
      <section className={styles.introSection}>
        <div className={styles.introLayout}>
          <div className={styles.introText}>
            We bring strategy, creativity, technology, media, outdoor and production together to build meaningful connections between brands and people. Integrated by design. Impact by destination.
          </div>
          <div className={styles.introCollage}>
            <div className={`${styles.collageImgWrap} ${styles.collageShort}`}>
              <img src="/aervice/WhatsApp Image 2026-07-17 at 2.50.02 PM.jpeg" alt="Brand Strategy" className={styles.collageImg} />
            </div>
            <div className={`${styles.collageImgWrap} ${styles.collageTall}`}>
              <img src="/aervice/WhatsApp Image 2026-07-17 at 2.50.14 PM.jpeg" alt="Ideas" className={styles.collageImg} />
            </div>
            <div className={`${styles.collageImgWrap} ${styles.collageTall}`}>
              <img src="/aervice/WhatsApp Image 2026-07-17 at 2.50.27 PM.jpeg" alt="Digital" className={styles.collageImg} />
            </div>
            <div className={`${styles.collageImgWrap} ${styles.collageTall}`}>
              <img src="/aervice/WhatsApp Image 2026-07-17 at 2.50.35 PM.jpeg" alt="Move Forward" className={styles.collageImg} />
            </div>
            <div className={`${styles.collageImgWrap} ${styles.collageShort}`}>
              <img src="/aervice/WhatsApp Image 2026-07-17 at 2.50.41 PM.jpeg" alt="Production" className={styles.collageImg} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Grid */}
      <section className={styles.servicesGridSection}>
        <div className={styles.servicesGrid}>
          {servicesGridData.map((item, idx) => (
            <div key={idx} className={styles.serviceCard}>
              <div className={styles.serviceCardContent}>
                <span className={styles.serviceNum} style={{ color: item.color, borderBottomColor: item.color }}>{item.num}</span>
                <h3 className={styles.serviceCardTitle} style={{ color: item.color }}>{item.title}</h3>
              </div>
              <div className={styles.serviceCardImageWrapper}>
                <img src={item.image} alt={item.title} className={styles.serviceCardImage} />
                <div className={styles.serviceCardOverlay}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Process Timeline */}
      <section className={styles.processSection}>
        <div className={styles.processContainer}>
          <div className={styles.processLine}></div>
          <div className={styles.processSteps}>
            <div className={styles.processStep}>
              <div className={styles.stepCircle}>1</div>
              <div className={styles.stepIcon}><FaCompass /></div>
              <p className={styles.stepText}>Understand</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepCircle}>2</div>
              <div className={styles.stepIcon}><FaLightbulb /></div>
              <p className={styles.stepText}>Strategize</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepCircle}>3</div>
              <div className={styles.stepIcon}><FaPencilAlt /></div>
              <p className={styles.stepText}>Create</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepCircle}>4</div>
              <div className={styles.stepIcon}><FaBullhorn /></div>
              <p className={styles.stepText}>Amplify</p>
            </div>
            <div className={styles.processStep}>
              <div className={styles.stepCircle}>5</div>
              <div className={styles.stepIcon}><FaChartBar /></div>
              <p className={styles.stepText}>Measure &<br/>Optimize</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Impact Section */}
      <section className={styles.impactSection}>
        <h2 className={styles.impactTitle}>Ideas That Became Impact.</h2>
        <div className={styles.impactTitleUnderline}></div>
        <div className={styles.impactCollage}>
          <img src="/aervice/97a558b2-4527-4183-a2be-3097a73e415d.png" alt="Impact 1" className={styles.impactImg} />
          <img src="/aervice/761dde1e-3339-4099-ad1b-b9dbefb40b3f.png" alt="Impact 2" className={styles.impactImg} />
          <img src="/aervice/3957978b-1b40-4818-8063-1ba2b2ed9cb9.png" alt="Impact 3" className={`${styles.impactImg} ${styles.impactImgWide}`} />
          <img src="/aervice/34843754-92c9-4981-a003-a0dc0918ac21.png" alt="Impact 4" className={styles.impactImg} />
          <img src="/aervice/f89cad5e-dc84-4c26-826b-a548309c827c.png" alt="Impact 5" className={styles.impactImg} />
        </div>
      </section>

      {/* 6. Industries Section */}
      <section className={styles.industriesSection}>
        <div className={styles.industryItem}>
          <FaCar className={styles.industryIcon} />
          <p>AUTOMOTIVE</p>
        </div>
        <div className={styles.industryItem}>
          <FaShoppingBag className={styles.industryIcon} />
          <p>CONSUMER<br/>GOODS</p>
        </div>
        <div className={styles.industryItem}>
          <FaShoppingCart className={styles.industryIcon} />
          <p>RETAIL &<br/>E-COMMERCE</p>
        </div>
        <div className={styles.industryItem}>
          <FaBuilding className={styles.industryIcon} />
          <p>REAL ESTATE &<br/>INFRASTRUCTURE</p>
        </div>
        <div className={styles.industryItem}>
          <FaLandmark className={styles.industryIcon} />
          <p>BANKING &<br/>FINANCIAL SERVICES</p>
        </div>
        <div className={styles.industryItem}>
          <FaHeartbeat className={styles.industryIcon} />
          <p>HEALTHCARE &<br/>WELLNESS</p>
        </div>
      </section>

      {/* 7. Why Choose Us Section */}
      <section className={styles.whyChooseSection}>
        <div className={styles.whyChooseContent}>
          <h2 className={styles.whyChooseTitle}>Why Brands Choose<br/>IM Solutions</h2>
          <div className={styles.whyChooseUnderline}></div>
          <div className={styles.whyChooseLogoBackground}>IM</div>
        </div>
        <div className={styles.whyChooseList}>
          <ul>
            <li><FaCheckCircle className={styles.checkIcon}/> Integrated thinking across every touch point.</li>
            <li><FaCheckCircle className={styles.checkIcon}/> One team. Seamless execution.</li>
            <li><FaCheckCircle className={styles.checkIcon}/> Data-informed. Insight-led. Outcome-focused.</li>
            <li><FaCheckCircle className={styles.checkIcon}/> Agile, transparent and accountable.</li>
            <li><FaCheckCircle className={styles.checkIcon}/> Built for today. Ready for what's next.</li>
          </ul>
        </div>
        <div className={styles.whyChooseImageWrapper}>
            <img src="/aervice/abdefc39-7b76-4b3a-85f0-503540871f50.png" alt="Why Choose IM Solutions" className={styles.whyChooseImage} />
        </div>
      </section>

      {/* 8. Footer CTA Section */}
      <section className={styles.footerCtaSection}>
        <img src="/aervice/2c2db5ef-3f75-4b58-90b6-6c0d62a82d62.png" alt="Let's Build Background" className={styles.footerCtaBg} />
        <div className={styles.footerCtaOverlay}></div>
        <div className={styles.footerCtaContent}>
          <h2 className={styles.footerCtaTitle}>Let's Build What<br/>Your <span className={styles.highlightRed}>Brand</span> Needs Next.</h2>
          <div className={styles.footerCtaUnderline}></div>
        </div>
        <div className={styles.footerCtaAction}>
          <p className={styles.footerCtaSubtitle}>Let's start a conversation.</p>
          <Link href="/contact" className={styles.footerCtaButton}>
            GET IN TOUCH <span className={styles.arrow}>&rarr;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
