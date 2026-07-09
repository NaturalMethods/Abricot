"use client"

import { useEffect, useRef, useState } from "react"
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
    autoCompletionFunction?: (value: string) => Promise<string[]>
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
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
    const [activeSuggestion, setActiveSuggestion] = useState(-1)

    const inputRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        setShowError(hasError)
    }, [hasError])


    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setShowError(false)

        onChange?.(e)

        if (isAutoComplete && autoCompletionFunction) {
            const result = await autoCompletionFunction(e.target.value)

            setSuggestions(result)

            setShowSuggestions(
                e.target.value.trim() !== "" &&
                result.length > 0
            )

            setActiveSuggestion(-1)
        }
    }


    function handleSelectSuggestion(suggestion: string) {
        onSelectSuggestion?.(suggestion)

        setShowSuggestions(false)
        setSuggestions([])
        setActiveSuggestion(-1)

        // Retour du focus sur l'input
        setTimeout(() => {
            inputRef.current?.focus()
        }, 0)
    }


    function handleKeyDown(
        e: React.KeyboardEvent<HTMLInputElement>
    ) {
        if (!showSuggestions) return


        if (e.key === "ArrowDown") {
            e.preventDefault()

            setActiveSuggestion(prev =>
                prev < suggestions.length - 1
                    ? prev + 1
                    : 0
            )
        }


        if (e.key === "ArrowUp") {
            e.preventDefault()

            setActiveSuggestion(prev =>
                prev > 0
                    ? prev - 1
                    : suggestions.length - 1
            )
        }


        if (
            e.key === "Enter" &&
            activeSuggestion >= 0
        ) {
            e.preventDefault()

            handleSelectSuggestion(
                suggestions[activeSuggestion]
            )
        }


        if (e.key === "Escape") {
            setShowSuggestions(false)
            setActiveSuggestion(-1)
        }
    }


    const inputId = label
        ? label.toLowerCase().replace(/\s+/g, "-")
        : undefined


    return (
        <div
            className={`flex-col inter14400 ${styles["input-container"]}`}
            style={{
                width,
                position: "relative"
            }}
        >

            {label && (
                <label htmlFor={inputId}>
                    {label}
                </label>
            )}


            <div
                className={styles["input-wrapper"]}
                style={{
                    width,
                    height
                }}
            >

                <input
                    ref={inputRef}
                    id={inputId}
                    className={`
                        inter14400 
                        ${styles["input-field"]}
                        ${showError ? styles["input-error"] : ""}
                    `}
                    style={{
                        width,
                        height,
                        backgroundColor: backgroundColor
                            ? `var(--${backgroundColor})`
                            : undefined,
                        border,
                        borderRadius,
                    }}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    aria-label={ariaLabel}
                    role={
                        isAutoComplete
                            ? "combobox"
                            : undefined
                    }
                    aria-autocomplete={
                        isAutoComplete
                            ? "list"
                            : undefined
                    }
                    aria-expanded={
                        isAutoComplete
                            ? showSuggestions
                            : undefined
                    }
                    aria-controls={
                        isAutoComplete
                            ? "autocomplete-list"
                            : undefined
                    }
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />


                {showIcon && (
                    <Image
                        loading="lazy"
                        src={iconSrc}
                        alt={altIcon ?? ""}
                        width={iconWidth}
                        height={iconHeight}
                        className={styles["input-icon"]}
                    />
                )}

            </div>


            {showSuggestions && (
                <div
                    id="autocomplete-list"
                    role="listbox"
                    className={styles["autocomplete-menu"]}
                >

                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            type="button"
                            role="option"
                            aria-selected={
                                activeSuggestion === index
                            }
                            className={`
                                ${styles["autocomplete-item"]}
                                ${
                                activeSuggestion === index
                                    ? styles.active
                                    : ""
                            }
                            `}
                            onClick={() =>
                                handleSelectSuggestion(suggestion)
                            }
                        >
                            {suggestion}
                        </button>
                    ))}

                </div>
            )}

        </div>
    )
}