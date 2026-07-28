"use client";

import { motion } from "framer-motion";
import { FaPaintBrush, FaBullhorn, FaChartLine } from "react-icons/fa";
import styles from "./CoreServices.module.css";

const services = [
    {
        icon: <FaPaintBrush />,
        title: "Creative Design Agency",
        description: "Brands create impression. We make brands become iconic with stunning designs and strategic campaigns."
    },
    {
        icon: <FaBullhorn />,
        title: "360° Digital Marketing",
        description: "Fully-integrated and measurable digital marketing solutions to optimize, communicate and advocate your brand."
    },
    {
        icon: <FaChartLine />,
        title: "Lead Generation",
        description: "We help businesses grow fast with proven real-time leads using cutting-edge tools to find the right target audiences."
    }
];

export default function CoreServices() {
    return (
        <section className={styles.coreServices}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className={styles.iconWrapper}>
                                {service.icon}
                            </div>
                            <h3 className={styles.title}>{service.title}</h3>
                            <p className={styles.description}>{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
