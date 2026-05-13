
import styles from "@/components/layout/Header.module.css"

export default function UserButton() {
    return (
        <section className={`flex-col align-center justify-center ${styles["user-button"]}`}>
            <p className="inter14400UP grey950">AD</p>
        </section>

    )
}