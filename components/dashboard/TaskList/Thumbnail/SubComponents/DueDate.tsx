"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { formatDate } from "@/lib/utils"

interface DueDateProps {
    date?: string
    onChange?: (date: string) => void
    isDisplay?: boolean
}

export function DueDate({ date, onChange, isDisplay = false }: DueDateProps) {
    const isReadOnly = isDisplay

    const [open, setOpen] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())

    const ref = useRef<HTMLDivElement>(null)

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayIndex = new Date(year, month, 1).getDay()

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    function selectDay(day: number) {
        if (isReadOnly) return

        const newDate = new Date(year, month, day)
        const iso = newDate.toISOString().split("T")[0]

        onChange?.(iso)
        setOpen(false)
    }

    function changeMonth(offset: number) {
        if (isReadOnly) return
        setCurrentDate(new Date(year, month + offset, 1))
    }

    // Close with mouse
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Close with Escape
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setOpen(false)
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            )
        }
    }, [])

    // 🔥 MODE DISPLAY FORCÉ
    if (isDisplay) {
        return (
            <div style={{whiteSpace: 'nowrap', display: "flex", alignItems: "center" , gap: 8 }}>
                <Image
                    src="/minicalendar.svg"
                    alt="calendar"
                    width={18}
                    height={14}
                />

                <p className="inter12400 grey600">
                    {date ? formatDate(date) : "Date à définir"}
                </p>
            </div>
        )
    }

    // 🔥 MODE EDIT / VIEW NORMAL
    return (
        <div ref={ref} style={{ display: "flex", gap: 8, position: "relative" }}>
            {/* ICON */}
            <button
                type="button"
                aria-label="Ouvrir le calendrier"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}
                style={{
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Image
                    src="/minicalendar.svg"
                    alt=""
                    width={18}
                    height={14}
                />
            </button>

            {/* DISPLAY */}
            <p className="inter12400 grey600">
                {date ? formatDate(date) : "Choisir une date"}
            </p>

            {/* CALENDAR */}
            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: 30,
                        background: "white",
                        border: "1px solid #ddd",
                        padding: 10,
                        borderRadius: 8,
                        zIndex: 100,
                        width: 220,
                    }}
                >
                    {/* HEADER */}
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button onClick={() => changeMonth(-1)}>&lt;</button>
                        <strong>
                            {currentDate.toLocaleString("default", {
                                month: "long",
                                year: "numeric",
                            })}
                        </strong>
                        <button onClick={() => changeMonth(1)}>&gt;</button>
                    </div>

                    {/* GRID */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(7, 1fr)",
                            gap: 5,
                            marginTop: 10,
                        }}
                    >
                        {Array(firstDayIndex).fill(null).map((_, i) => (
                            <div key={i} />
                        ))}

                        {days.map((day) => (
                            <button
                                key={day}
                                type="button"
                                onClick={() => selectDay(day)}
                                style={{
                                    textAlign: "center",
                                    cursor: "pointer",
                                    padding: 4,
                                    border: "none",
                                    background: "transparent",
                                }}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}