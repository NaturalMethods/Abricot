import Link from "next/link"
import styles from "@/components/layout/Header.module.css"
import DashboardButton from "@/components/layout/header/DashboardButton";
import ProjectsButton from "@/components/layout/header/ProjectsButton";

export default function HeaderMenu() {
    return (
            <nav className={`flex-row align-center justify-center ${styles.menu}` }>
                <div className={`flex-row align-center justify-center ${styles.navbutton}` }>
                    <Link className="link" href="/dashboard"><DashboardButton /></Link>
                    <Link className="link" href="/projects"><ProjectsButton /></Link>
                </div>
            </nav>

    )
}