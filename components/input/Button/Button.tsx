import styles from "./Button.module.css"

interface ButtonProps {
    text: string
    onClick?: () => void
    type?: "button" | "submit" | "reset"
    width?: string
    height?: string
    disabled?: boolean
    variant?: "default" | "darkorange"
    icon?: React.ReactNode
}

export default function Button({
                                   text,
                                   onClick,
                                   type = "button",
                                   width = "",
                                    height ="",
                                   disabled,
                                   variant = "default",
                                   icon
                               }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{ width, height }}
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