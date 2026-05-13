
import styles from "@/components/layout/Header.module.css"

export default function DashboardButton() {
    return (
        <section className={`flex-row align-center justify-center ${styles["header-button"]}`}>
            <img className="logo" src="/dashboardicon.svg" alt="icône tableau de bord" width={24} />
            <p className="inter16400 dark-orange">Tableau de bord</p>
        </section>

    )
}