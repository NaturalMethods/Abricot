import styles from "./Button.module.css"

interface ButtonProps {
    text: string
    onClick?: () => void
    type?: "button" | "submit" | "reset"
    width?: string
    disabled?: boolean
    variant?: "default" | "darkorange"
    icon?: React.ReactNode
}

export default function Button({
                                   text,
                                   onClick,
                                   type = "button",
                                   width = "",
                                   disabled,
                                   variant = "default",
                                   icon
                               }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{ width }}
            className={`
                inter16400 
                ${styles.button} 
                ${styles[variant]}
            `}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {text}
        </button>
    )
}