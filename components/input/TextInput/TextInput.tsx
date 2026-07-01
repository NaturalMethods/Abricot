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
    iconWidth?: number
    iconHeight?: number
    backgroundColor?: string
    ariaLabel?: string
    isAutoComplete?: boolean
    autoCompletionFunction?: any
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void

    // ✅ AJOUT
    onSelectSuggestion?: (value: string) => void
    border?: string
    borderRadius?: string
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
                                      iconWidth = 18,
                                      iconHeight = 18,
                                      backgroundColor,
                                      ariaLabel = "",
                                      isAutoComplete = false,
                                      autoCompletionFunction,
                                      onChange,
                                      onSelectSuggestion,
                                      border = "1px solid #E5E7EB",
                                      borderRadius = "8px",
                                  }: TextInputProps) {

    const [showError, setShowError] = useState(hasError)
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    useEffect(() => {
        setShowError(hasError)
    }, [hasError])

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setShowError(false)
        onChange?.(e)

        if (isAutoComplete) {
            const result = await autoCompletionFunction(e.target.value)

            console.log("Result:",result)
            setSuggestions(result)

            setShowSuggestions(
                e.target.value.trim() !== "" && result.length > 0
            )
        }
    }

    function handleSelectSuggestion(suggestion: string) {
        // 👉 envoie au parent
        onSelectSuggestion?.(suggestion)

        // reset UI
        setShowSuggestions(false)
        setSuggestions([])
    }

    const inputId = label
        ? label.toLowerCase().replace(/\s+/g, "-")
        : undefined

    return (
        <div
            className={`flex-col inter14400 ${styles["input-container"]}`}
            style={{ width, position: "relative" }}
        >
            {label && <label htmlFor={inputId}>{label}</label>}

            <div
                className={styles["input-wrapper"]}
                style={{ width, height }}
            >
                <input
                    id={inputId}
                    className={`inter14400 ${styles["input-field"]} ${
                        showError ? styles["input-error"] : ""
                    }`}
                    style={{
                        width,
                        height,
                        backgroundColor: `var(--${backgroundColor})`,
                        border: border,
                        borderRadius: borderRadius,
                    }}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    aria-label={ariaLabel}
                    onChange={handleChange}
                />

                {showIcon && (
                    <Image
                        src={iconSrc}
                        alt={altIcon ?? ""}
                        width={iconWidth}
                        height={iconHeight}
                        className={styles["input-icon"]}
                    />
                )}
            </div>

            {showSuggestions && (
                <div className={styles["autocomplete-menu"]}>
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className={styles["autocomplete-item"]}
                            onMouseDown={() =>
                                handleSelectSuggestion(suggestion)
                            }
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}