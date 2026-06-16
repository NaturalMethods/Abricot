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
    onChange?: (value: string | null) => void
}

export default function Dropdown({ width="152px",
                                     height="63px",
                                     justify="space-evenly",
                                     options= defaultOptions,
                                     placeHolder="Statut",
                                    label,
                                     onChange,
                                 }: Props) {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Option | null>(null)

    const ref = useRef<HTMLDivElement>(null)

    function handleSelect(option: Option) {
        setSelected(option)
        setOpen(false)
        onChange?.(option.value)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const inputId = label ? label.toLowerCase().replace(/\s+/g, "-") : undefined;


    return (
        <div ref={ref} className={styles.wrapper} style={{width, height}}>
            {label && <label className={"inter14400"} htmlFor={inputId}>{label}</label>}
            <button
                id={inputId}
                className={`inter14400 ${styles.button}`}
                style={{width,height, justifyContent: justify }}
                onClick={() => setOpen((v) => !v)}
            >
                <p>{selected ? selected.label : placeHolder}</p>

                <Image src="/arrowdown.svg" width={16} height={8} alt="" />
            </button>

            {open && (
                <div className={styles.menu} style={{width}}>
                    {options.map((option) => (
                        <div
                            key={option.label}
                            className={styles.item}
                            onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}