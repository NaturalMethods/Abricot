import styles from "./Button.module.css"

interface ButtonProps {
    text: string
    onClick?: () => void
    type?: "button" | "submit" | "reset"
    width?: string
    disabled?: boolean
}

export default function Button({
                                   text,
                                   onClick,
                                   type = "button",
                                   width = "",
                                   disabled
                               }: ButtonProps) {

    return (
        <button
            style={width ? { width } : undefined}
            type={type}
            className={`inter16400 ${styles.button}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}