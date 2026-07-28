import styles from './Background3D.module.css';

export default function Background3D() {
    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.gridPlane} />
            
            {/* Popping Lines (Beams) */}
            <div className={styles.linesContainer}>
                <div className={`${styles.line} ${styles.hLine} ${styles.line1}`} />
                <div className={`${styles.line} ${styles.hLine} ${styles.line2}`} />
                <div className={`${styles.line} ${styles.vLine} ${styles.line3}`} />
                <div className={`${styles.line} ${styles.vLine} ${styles.line4}`} />
                <div className={`${styles.line} ${styles.hLine} ${styles.line5}`} />
                <div className={`${styles.line} ${styles.vLine} ${styles.line6}`} />
            </div>

            {/* Sparks (Falling Stars) */}
            <div className={styles.sparksContainer}>
                <div className={`${styles.spark} ${styles.hSpark} ${styles.spark1}`} />
                <div className={`${styles.spark} ${styles.vSpark} ${styles.spark2}`} />
                <div className={`${styles.spark} ${styles.hSpark} ${styles.spark3}`} />
                <div className={`${styles.spark} ${styles.vSpark} ${styles.spark4}`} />
                <div className={`${styles.spark} ${styles.hSpark} ${styles.spark5}`} />
                <div className={`${styles.spark} ${styles.vSpark} ${styles.spark6}`} />
                <div className={`${styles.spark} ${styles.hSpark} ${styles.spark7}`} />
                <div className={`${styles.spark} ${styles.vSpark} ${styles.spark8}`} />
            </div>

            <div className={`${styles.orb} ${styles.orb1}`} />
            <div className={`${styles.orb} ${styles.orb2}`} />
        </div>
    );
}
