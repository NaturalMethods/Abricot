
import styles from "./Header.module.css"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className={`flex-row  justify-space-between ${styles.footer}`}>
            <div className={`flex-row align-center justify-space-between ${styles.footerdiv} `}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className={styles["logo-black"]}
                    src="/Logo.svg"
                    alt="Website black Logo"
                    width={101}
                    height={32}
                />
                <p className="inter16400">Abricot 2026</p>
            </div>
        </footer>
    )
}