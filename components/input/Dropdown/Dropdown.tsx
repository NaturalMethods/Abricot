"use client"

import React, { useEffect, useRef, useState } from "react"
import styles from "./Dropdown.module.css"
import Image from "next/image"

const defaultOptions = [
    { label: "Statut", value: null },
    { label: "À faire", value: "TODO" },
    { label: "En cours", value: "IN_PROGRESS" },
    { label: "Terminée", value: "DONE" },
]

export type Option = {
    label: string
    value: string | null
}

type Props = {
    width?: string
    height?: string
    justify?: string
    options?: Option[]
    placeHolder?: string
    label?: string
    multiSelect?: boolean
    onChange?: (value: string | null | string[]) => void
}

export default function Dropdown({
                                     width = "152px",
                                     height = "63px",
                                     justify = "space-evenly",
                                     options = defaultOptions,
                                     placeHolder = "Statut",
                                     label,
                                     multiSelect = false,
                                     onChange,
                                 }: Props) {
    const [open, setOpen] = useState(false)

    const [selected, setSelected] = useState<Option | null>(null)

    const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

    const ref = useRef<HTMLDivElement>(null)

    function handleSingleSelect(option: Option) {
        setSelected(option)
        setOpen(false)
        onChange?.(option.value)
    }

    function handleMultiSelect(option: Option) {
        const exists = selectedOptions.some(
            (item) => item.value === option.value
        )

        const updated = exists
            ? selectedOptions.filter(
                (item) => item.value !== option.value
            )
            : [...selectedOptions, option]

        setSelectedOptions(updated)

        onChange?.(
            updated
                .map((item) => item.value)
                .filter(
                    (value): value is string =>
                        value !== null
                )
        )
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                ref.current &&
                !ref.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        )

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )
        }
    }, [])

    const inputId = label
        ? label.toLowerCase().replace(/\s+/g, "-")
        : undefined

    const displayText = multiSelect
        ? selectedOptions.length > 0
            ? `${selectedOptions.length} collaborateur${
                selectedOptions.length > 1 ? "s" : ""
            }`
            : placeHolder
        : selected
            ? selected.label
            : placeHolder

    const numericWidth = parseInt(width, 10);
    const isSmall = numericWidth < 152;

    const finalWidth = width
        ? Math.max(parseInt(width, 10), 152)
        : 152;

    return (
        <div
            ref={ref}
            className={styles.wrapper}
            style={{ width, height }}
        >
            {label && (
                <label
                    className="inter14400"
                    htmlFor={inputId}
                >
                    {label}
                </label>
            )}

            <button
                type="button"
                id={inputId}
                className={`inter14400 ${styles.button}`}
                style={{
                    width,
                    height,
                    justifyContent: justify,
                    paddingLeft: isSmall ? 10 : 0,
                    paddingRight: isSmall ? 10 : 0,
                }}
                onClick={() =>
                    setOpen((prev) => !prev)
                }
            >
                <p className={""}>{displayText}</p>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/arrowdown.svg"
                    width={16}
                    height={8}
                    alt=""
                />
            </button>

            {open && (
                <div
                    className={styles.menu}
                    style={{
                        width: `${finalWidth}px`,
                    }}
                >
                    {options.map((option) => {
                        const isSelected = multiSelect
                            ? selectedOptions.some(
                                (item) =>
                                    item.value ===
                                    option.value
                            )
                            : selected?.value ===
                            option.value

                        return (
                            <div
                                key={`${option.label}-${option.value}`}
                                className={styles.item}
                                onClick={() =>
                                    multiSelect
                                        ? handleMultiSelect(
                                            option
                                        )
                                        : handleSingleSelect(
                                            option
                                        )
                                }
                            >
                                <span>
                                    {option.label}
                                </span>

                                {isSelected && (
                                    <span>✓</span>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}