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
    altIcon?: string
    backgroundColor?: string
    ariaLabel?: string
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
                                      altIcon,
                                      backgroundColor,
                                      ariaLabel="",
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

    const inputId = label ? label.toLowerCase().replace(/\s+/g, "-") : undefined;

    return (
        <div
            className={`flex-col inter14400 ${styles["input-container"]}`}
            style={{ width: width}}
        >
            {label && <label htmlFor={inputId}>{label}</label>}

            <div
                className={styles["input-wrapper"]}
                style={{width, height }}
            >
                <input
                    id={inputId}
                    className={`inter14400 ${styles["input-field"]} ${
                        showError ? styles["input-error"] : ""
                    }`}
                    style={{ width,height, backgroundColor:`var(--${backgroundColor})`}}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    aria-label={ariaLabel}
                    onChange={handleChange}
                />

                {showIcon && (
                    <Image
                        src={iconSrc}
                        alt={altIcon}
                        width={18}
                        height={18}
                        className={styles["input-icon"]}
                    />
                )}
            </div>
        </div>
    )
}
