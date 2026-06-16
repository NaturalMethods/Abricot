
import styles from "@/components/layout/Header.module.css"

export default function ProjectsButton() {
    return (
        <section className={`flex-row align-center justify-center ${styles["header-button"]}`}>
            <img className="logo" src="/directoryicon.svg" alt="icône projets" width={24} />
            <p className="inter16400 dark-orange">Projets</p>
        </section>

    )
}