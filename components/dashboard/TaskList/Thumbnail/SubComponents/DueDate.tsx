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

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // 🔥 MODE DISPLAY FORCÉ
    if (isDisplay) {
        return (
            <div style={{whiteSpace: 'nowrap', display: "flex", alignItems: "center" , gap: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
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
            <div
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(v => !v)}
            >
                <Image loading={"lazy"}
                    src="/minicalendar.svg"
                    alt="calendar"
                    width={18}
                    height={14}
                />
            </div>

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
                            <div
                                key={day}
                                onClick={() => selectDay(day)}
                                style={{
                                    textAlign: "center",
                                    cursor: "pointer",
                                    padding: 4,
                                }}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}