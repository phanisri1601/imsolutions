import styles from './PrivacyPage.module.css';

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Privacy Policy</h1>
        
        <div className={styles.section}>
          <p><strong>Effective Date: August 6, 2025 Last Updated: August 6, 2025</strong></p>
          <p>
            IM Solutions ("we", "our", or "us") is a leading technology and digital marketing provider based in Bengaluru. 
            This Privacy Policy applies to our website (imsolutions.co), digital campaigns, lead forms, and integration 
            of tracking technologiesincluding Meta (Facebook/Instagram) and Google Ads platforms.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. What We Collect</h2>
          
          <h3 className={styles.subTitle}>a. Information You Provide</h3>
          <p>
            When you interact with us via lead forms, contact us, or register on our site, we may collect:
          </p>
          <ul>
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Mobile Number</li>
            <li>City / Location</li>
            <li>Service of interest (e.g. digital marketing, branding, software development)</li>
          </ul>
          <p>We do not collect sensitive data such as Aadhaar, PAN, health, or financial information.</p>

          <h3 className={styles.subTitle}>b. Automatic Data Collection</h3>
          <p>
            Through tools like Meta Pixel, Google Analytics, Google Ads tags, and cookies, we may collect:
          </p>
          <ul>
            <li>IP Address</li>
            <li>Browser and device type</li>
            <li>Pages and features visited</li>
            <li>Time of visit and interaction events</li>
            <li>Ad clicks and conversions</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Why We Use Your Data</h2>
          <p>We use your data to:</p>
          <ul>
            <li>Respond to inquiries and project/service requests</li>
            <li>Send brochures, estimates, and proposals relevant to your interest</li>
            <li>Personalize your experience and offer</li>
            <li>Measure ad and campaign effectiveness</li>
            <li>Optimize website performance and visitor experience</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Legal Basis for Processing (GDPR)</h2>
          <p>
            If you are in the EU, UK, or EEA, our processing is based on:
          </p>
          <ul>
            <li>Your consent (via form submission or cookie acceptance)</li>
            <li>Providing a service you requested (e.g. sending a proposal)</li>
            <li>Our legitimate interests in running marketing campaigns and improving services</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Cookies & Third-Party Tracking</h2>
          <p>
            We utilize cookies and tracking technologies such as:
          </p>
          <ul>
            <li>Meta Pixel and Google Ads tags for ad targeting and conversions</li>
            <li>Google Analytics for site traffic analysis</li>
          </ul>
          <p>
            Users are presented with a cookie consent banner on initial visit, allowing acceptance or rejection. 
            Preferences can be updated anytime via cookie settings or browser options.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Data Sharing & Disclosure</h2>
          <p>Your data may be shared with:</p>
          <ul>
            <li>Our internal sales and CRM teams</li>
            <li>Authorized service providers, such as consultants or campaign partners</li>
            <li>Advertising platforms (Meta, Google) to deliver relevant marketing content</li>
            <li>Marketing automation and CRM tools (e.g., cloud-based platforms)</li>
          </ul>
          <p>We do not sell or rent your personal data.</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Your Rights Under Privacy Laws</h2>
          <p>
            Under GDPR, CCPA, and other applicable legislation, you have the right to:
          </p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct any inaccuracies</li>
            <li>Request deletion of your information</li>
            <li>Restrict or oppose processing</li>
            <li>Withdraw consent at any time</li>
            <li>Request data portability (where applicable)</li>
          </ul>
          <p>To exercise these rights, contact us at info@imsolutions.mobi</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Data Retention</h2>
          <p>
            We retain personal data only as long as necessary:
          </p>
          <ul>
            <li>For fulfillment of specific purpose</li>
            <li>To comply with legal obligations</li>
            <li>Or up to 24 months of inactivity, after which data is anonymized or deleted</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Security Measures</h2>
          <p>
            We use appropriate technical and organizational safeguards to protect your personal data. 
            While we aim to secure your information, no system can guarantee absolute security. 
            You are responsible for safeguarding your account credentials.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Children's Privacy</h2>
          <p>
            Our services are intended for individuals aged at least 18. We do not knowingly collect data from minors. 
            If discovered, such information will be promptly deleted.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites and platforms. 
            We are not responsible for privacy practices of those external websites. 
            Please review their privacy policies independently.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Policy Updates</h2>
          <p>
            We may update this Privacy Policy periodically. All updates will be posted here with revised Effective Date. 
            Continued use of our site indicates acceptance of any changes.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>12. Contact Us</h2>
          <p>
            For questions or concerns regarding this policy or your personal data, please contact:
          </p>
          <div className={styles.contactInfo}>
            <p><strong>IM Solutions Bengaluru, Karnataka, India</strong></p>
            <p>Email: <a href="mailto:info@imsolutions.mobi">info@imsolutions.mobi</a></p>
            <p>Support: +918880564488</p>
            <p>Website: <a href="https://www.imsolutions.co" target="_blank" rel="noopener noreferrer">imsolutions.co</a></p>
          </div>
          
          <div className={styles.addresses}>
            <div className={styles.address}>
              <h3 className={styles.addressTitle}>Visit Us</h3>
              <p>921, Laxmi Tower, 4th Floor, 5th Main Rd, Sector 7, HSR Layout, Bengaluru, Karnataka 560102</p>
              <p><a href="mailto:info@imsolutions.mobi">info@imsolutions.mobi</a></p>
            </div>
            <div className={styles.address}>
              <p>214, South West Block, Near Ram Mandir, Alwar, Rajasthan</p>
            </div>
            <div className={styles.address}>
              <p>219, Nilkanth Plaza, Near Kiran Chowk, Varachha Road, Surat, Gujarat 395010</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
