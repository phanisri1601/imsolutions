import Image from "next/image";
import styles from "./PhilosophySection.module.css";

const STATEMENTS = ["A logo is remembered.", "A campaign is noticed.", "A brand is experienced."];

export default function PhilosophySection() {
    return (
    <section className={styles.staticSection}>
        <div className={styles.container}>
            <span className={styles.eyebrow}>Our Philosophy</span>
            <h2 className={styles.heading}>Every Brand Follows A Journey. We Design It.</h2>
            <div className={styles.imageWrap}>
                <Image
                    src="/philosophy-editorial.png"
                    alt="A designer's desk with brand strategy notebooks and moodboards"
                    fill
                    className={styles.image}
                    sizes="(max-width: 900px) 100vw, 1000px"
                />
            </div>
            <div className={styles.statements}>
                {STATEMENTS.map((s) => (
                    <p key={s} className={styles.statement}>{s}</p>
                ))}
            </div>
            <p className={styles.paragraph}>
                We believe meaningful brands are never accidental. They are shaped through insight,
                refined through creativity and strengthened by consistency. Every decision we make
                is guided by purpose, because enduring brands are built one thoughtful choice at a
                time.
            </p>
        </div>
    </section>
    );
}
