import Image from "next/image";
import styles from "./PhilosophySection.module.css";

const STATEMENTS = ["A logo is remembered.", "A campaign is noticed.", "A brand is experienced."];

export default function PhilosophySection() {
    return (
        <section className={styles.staticSection} aria-labelledby="philosophy-heading">
            <div className={styles.container}>
                <div className={styles.introduction}>
                    <span className={styles.eyebrow}>Our Philosophy</span>
                    <h2 id="philosophy-heading" className={styles.heading}>Every Brand Follows A Journey. We Design It.</h2>
                    <div className={styles.imageWrap}>
                        <Image
                            src="/philosophy-editorial.png"
                            alt="A designer's desk with brand strategy notebooks and moodboards"
                            fill
                            className={styles.image}
                            sizes="(max-width: 372px) calc(100vw - 32px), (max-width: 768px) 340px, 380px"
                        />
                    </div>
                </div>
                <div className={styles.content}>
                    <ol className={styles.statements}>
                        {STATEMENTS.map((statement, index) => (
                            <li key={statement} className={styles.statement}>
                                <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                                <span>{statement}</span>
                            </li>
                        ))}
                    </ol>
                    <p className={styles.paragraph}>
                        We believe meaningful brands are never accidental. They are shaped through insight,
                        refined through creativity and strengthened by consistency. Every decision we make
                        is guided by purpose, because enduring brands are built one thoughtful choice at a
                        time.
                    </p>
                </div>
            </div>
        </section>
    );
}
