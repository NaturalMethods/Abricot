
import styles from "@/components/layout/Header.module.css"

interface UserButtonProps {
    firstName?: string | null
    lastName?: string | null
}

export default function UserButton({ firstName, lastName }: UserButtonProps) {
    const initials =
        firstName && lastName
            ? `${firstName[0]}${lastName[0]}`.toUpperCase()
            : ""

    return (
        <section className={`flex-col align-center justify-center w-[30px] h-[30px] sm:w-[65px] sm:h-[65px] ${styles["user-button"]}`}>
            <p className="inter10400 sm:inter14400UP grey950">{initials}</p>
        </section>

    )
}