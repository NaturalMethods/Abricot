"use client"
import { useEffect, useState } from "react"
import styles from "./TextInput.module.css"
import Image from "next/image"

interface TextInputProps {
    label: string
    placeholder?: string
    type?: string
    width?: string
    height?: string
    value?: string
    hasError?: boolean
    showIcon?: boolean
    iconSrc?: string
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void
}

export default function TextInput({
                                      label,
                                      placeholder = "",
                                      type = "text",
                                      width = "300px",
                                      height = "53px",
                                      value,
                                      hasError = false,
                                      showIcon = false,
                                      iconSrc = "/search.svg",
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

            <div
                className={styles["input-wrapper"]}
                style={{width, height }}
            >
                <input
                    className={`inter14400 ${styles["input-field"]} ${
                        showError ? styles["input-error"] : ""
                    }`}
                    style={{ width,height }}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />

                {showIcon && (
                    <Image
                        src={iconSrc}
                        alt="icon"
                        width={18}
                        height={18}
                        className={styles["input-icon"]}
                    />
                )}
            </div>
        </div>
    )
}
