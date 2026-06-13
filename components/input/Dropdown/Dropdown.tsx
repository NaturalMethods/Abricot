"use client"

import { useState } from "react"
import styles from "./Dropdown.module.css"
import Image from "next/image"

const options = [
    { label: "À faire", value: "TODO" },
    { label: "En cours", value: "IN_PROGRESS" },
    { label: "Terminée", value: "DONE" },
]

export default function Dropdown() {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<any>(null)

    function handleSelect(option: any) {
        setSelected(option)
        setOpen(false)
    }

    return (
        <div className={styles.wrapper}>
            <button
                className={`inter14400 ${styles.button}`}
                onClick={() => setOpen(!open)}
            >
                {selected ? selected.label : "Statut"}

                <Image
                    src={"/arrowdown.svg"}
                    width={16}
                    height={8}
                    alt=""
                />
            </button>

            {open && (
                <div className={styles.menu}>
                    {options.map((option) => (
                        <div
                            key={option.value}
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