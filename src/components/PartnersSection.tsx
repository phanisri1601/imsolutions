import Image from "next/image";
import styles from "./PartnersSection.module.css";

const PARTNERS = [
    { src: "/clients/tatahousing.png", alt: "Tata" },
    { src: "/clients/RMZcorp.png", alt: "RMZ" },
    { src: "/clients/prestigegroup.png", alt: "Prestige" },
    { src: "/clients/kotak.png", alt: "Kotak" },
    { src: "/clients/homelane.png", alt: "HomeLane" },
    { src: "/clients/houseofhiranandani.png", alt: "Hiranandani" },
    { src: "/clients/lakmesalon.png", alt: "Lakme" },
    { src: "/clients/sleepwell.png", alt: "Sleepwell" },
    { src: "/clients/living-water.png", alt: "Living Water" },
    { src: "/clients/sjr.png", alt: "SJR" },
];

export default function PartnersSection() {
    return (
        <section className={styles.partnersSection}>
            <div className={styles.partnersContainer}>
                <div className={styles.partnersLeft}>
                    <h2 className={styles.partnersTitle}>OUR CLIENTS</h2>
                    <div className={styles.partnersDivider}></div>
                    <p className={styles.partnersDesc}>
                        We partner with ambitious businesses across industries to create brands that endure and lead.
                    </p>
                </div>
                <div className={styles.partnersRight}>
                    <div className={styles.partnersGrid}>
                        {PARTNERS.map((partner) => (
                            <div key={partner.src} className={styles.partnerLogo}>
                                <Image src={partner.src} alt={partner.alt} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw" className={styles.partnerImg} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
