
import styles from "./Header.module.css"

export default function Footer() {
    return (
        <footer className={`flex-row  justify-space-between ${styles.footer}`}>
            <div className={`flex-row  justify-space-between ${styles.footerdiv} `}>
                <img className={`${styles["logo-black"]}`} src="/Logo.svg" alt="Logo" width={101} />
                <p className="inter16400">Abricot 2026</p>
            </div>
        </footer>
    )
}