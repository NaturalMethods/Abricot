import { useEffect, useState } from "react"
import styles from "./TextInput.module.css"

interface TextInputProps {
    label: string
    placeholder?: string
    type?: string
    width?: string
    value?: string
    hasError?: boolean
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void
}

export default function TextInput({
                                      label,
                                      placeholder = "",
                                      type = "text",
                                      width = "300px",
                                      value,
                                      hasError = false,
                                      onChange,
                                  }: TextInputProps) {
    const [showError, setShowError] = useState(hasError)

    useEffect(() => {
        setShowError(hasError)
    }, [hasError])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setShowError(false)
        onChange?.(e)
    }

    return (
        <div
            className={`flex-col inter14400 ${styles["input-container"]}`}
            style={{ width }}
        >
            <label>{label}</label>

            <input
                className={`inter12400 ${styles["input-field"]} ${showError ? styles["input-error"] : ""}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}
