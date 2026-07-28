import fs from 'fs';
import path from 'path';
import ScrollReveal from './ScrollReveal';
import styles from './Clients.module.css';

function getClientLogoPaths() {
    const clientsDir = path.join(process.cwd(), 'public', 'clients');
    if (!fs.existsSync(clientsDir)) return [];

    const allowedExt = new Set(['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif']);
    return fs
        .readdirSync(clientsDir)
        .filter((file) => allowedExt.has(path.extname(file).toLowerCase()))
        .map((file) => `/clients/${file}`);
}

function formatClientName(clientPath: string, fallbackIndex: number) {
    if (!clientPath.startsWith('/clients/')) {
        return `Client ${fallbackIndex + 1}`;
    }

    const file = clientPath.split('/').pop() ?? '';
    const rawName = file.replace(/\.[^/.]+$/, '');
    const cleanName = rawName
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    if (!cleanName) return `Client ${fallbackIndex + 1}`;

    return cleanName
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export default function Clients() {
    const clients = getClientLogoPaths();
    const visibleClients = clients;
    const fallbackClients =
        visibleClients.length > 0
            ? visibleClients
            : Array.from({ length: 8 }, (_, index) => `placeholder-${index}`);
    const third = Math.ceil(fallbackClients.length / 3);
    const topRow = fallbackClients.slice(0, third);
    const middleRow = fallbackClients.slice(third, third * 2).length
        ? fallbackClients.slice(third, third * 2)
        : fallbackClients;
    const bottomRow = fallbackClients.slice(third * 2).length
        ? fallbackClients.slice(third * 2)
        : fallbackClients;
    const topMarqueeClients = [...topRow, ...topRow];
    const middleMarqueeClients = [...middleRow, ...middleRow];
    const bottomMarqueeClients = [...bottomRow, ...bottomRow];

    return (
        <section className={styles.clients}>
            <div className="container">
                <ScrollReveal delay={0.2}>
                    <div className={styles.header}>
                        <h2 className="section-title">OUR CLIENTS</h2>
                        <p className={styles.subtitle}>
                            Trusted by leading brands across industries
                        </p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                    <div className={styles.marqueeStack}>
                        <div className={styles.marqueeWrap}>
                            <div className={styles.marqueeTrack}>
                                {topMarqueeClients.map((client, index) => {
                                    const isLogo = client.startsWith('/clients/');
                                    const clientName = formatClientName(client, index);
                                    return (
                                        <article
                                            key={`top-${client}-${index}`}
                                            className={styles.clientCard}
                                        >
                                            <span className={styles.clientName}>{clientName}</span>
                                            {isLogo ? (
                                                <img
                                                    src={client}
                                                    alt={`Client logo ${index + 1}`}
                                                    className={styles.logoImage}
                                                />
                                            ) : (
                                                <span className={styles.placeholderLabel}>
                                                    Brand Partner
                                                </span>
                                            )}
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={styles.marqueeWrap}>
                            <div className={`${styles.marqueeTrack} ${styles.reverseTrack}`}>
                                {middleMarqueeClients.map((client, index) => {
                                    const isLogo = client.startsWith('/clients/');
                                    const clientName = formatClientName(client, index + third);
                                    return (
                                        <article
                                            key={`middle-${client}-${index}`}
                                            className={styles.clientCard}
                                        >
                                            <span className={styles.clientName}>{clientName}</span>
                                            {isLogo ? (
                                                <img
                                                    src={client}
                                                    alt={`Client logo ${index + third + 1}`}
                                                    className={styles.logoImage}
                                                />
                                            ) : (
                                                <span className={styles.placeholderLabel}>
                                                    Brand Partner
                                                </span>
                                            )}
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={styles.marqueeWrap}>
                            <div className={styles.marqueeTrack}>
                                {bottomMarqueeClients.map((client, index) => {
                                    const isLogo = client.startsWith('/clients/');
                                    const clientName = formatClientName(client, index + third * 2);
                                    return (
                                        <article
                                            key={`bottom-${client}-${index}`}
                                            className={styles.clientCard}
                                        >
                                            <span className={styles.clientName}>{clientName}</span>
                                            {isLogo ? (
                                                <img
                                                    src={client}
                                                    alt={`Client logo ${index + third * 2 + 1}`}
                                                    className={styles.logoImage}
                                                />
                                            ) : (
                                                <span className={styles.placeholderLabel}>
                                                    Brand Partner
                                                </span>
                                            )}
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
