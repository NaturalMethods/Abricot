"use client"

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    startTransition,
} from "react"
import Image from "next/image"
import styles from "./TextInput.module.css"

interface CalendarInputProps {
    label: string
    value?: string
    onChange?: (iso: string) => void
    width?: string
    height?: string
    ariaLabel?: string
    iconSrc?: string
    altIcon?: string
}

/* =========================
   Utils SAFE (no timezone bug)
========================= */
function toISODateLocal(date: Date) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    return `${y}-${m}-${d}`
}

function formatDisplayDate(iso?: string) {
    if (!iso) return ""

    const d = new Date(iso)
    return `${String(d.getDate()).padStart(2, "0")}/${String(
        d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`
}

/* =========================
   COMPONENT
========================= */
export default function CalendarInput({
                                          label,
                                          value,
                                          onChange,
                                          width = "300px",
                                          height = "53px",
                                          ariaLabel = "",
                                          iconSrc = "/minicalendar.svg",
                                          altIcon = "calendar",
                                      }: CalendarInputProps) {
    const ref = useRef<HTMLDivElement>(null)

    const [open, setOpen] = useState(false)
    const [viewDate, setViewDate] = useState(() => new Date())
    const [focusedDay, setFocusedDay] = useState<number | null>(null)

    /* =========================
       Derived state (MEMO)
    ========================= */
    const { year, month, daysInMonth, firstDayIndex, days } = useMemo(() => {
        const y = viewDate.getFullYear()
        const m = viewDate.getMonth()

        return {
            year: y,
            month: m,
            daysInMonth: new Date(y, m + 1, 0).getDate(),
            firstDayIndex: new Date(y, m, 1).getDay(),
            days: Array.from(
                { length: new Date(y, m + 1, 0).getDate() },
                (_, i) => i + 1
            ),
        }
    }, [viewDate])

    const selectedDate = useMemo(
        () => (value ? new Date(value) : null),
        [value]
    )

    /* =========================
       SAFE handlers
    ========================= */
    const selectDay = useCallback(
        (day: number) => {
            const date = new Date(year, month, day)
            const iso = toISODateLocal(date)

            setOpen(false)

            // 🔥 concurrent-safe boundary
            startTransition(() => {
                onChange?.(iso)
            })
        },
        [year, month, onChange]
    )

    const changeMonth = useCallback((offset: number) => {
        setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1))
    }, [])

    const isToday = useCallback(
        (day: number) => {
            const now = new Date()
            return (
                now.getDate() === day &&
                now.getMonth() === month &&
                now.getFullYear() === year
            )
        },
        [month, year]
    )

    const isSelected = useCallback(
        (day: number) => {
            if (!selectedDate) return false
            return (
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year
            )
        },
        [selectedDate, month, year]
    )

    const isPast = useCallback(
        (day: number) => {
            const today = new Date()
            const d = new Date(year, month, day)

            today.setHours(0, 0, 0, 0)
            d.setHours(0, 0, 0, 0)

            return d < today
        },
        [year, month]
    )

    /* =========================
       GLOBAL EVENTS (SAFE CLEANUP)
    ========================= */
    useEffect(() => {
        function onMouseDown(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        function onKeyDown(e: KeyboardEvent) {
            if (!open) return

            if (e.key === "Escape") {
                setOpen(false)
                return
            }

            setFocusedDay((prev) => {
                const current = prev ?? 1
                const max = daysInMonth

                switch (e.key) {
                    case "ArrowRight":
                        return Math.min(current + 1, max)
                    case "ArrowLeft":
                        return Math.max(current - 1, 1)
                    case "ArrowDown":
                        return Math.min(current + 7, max)
                    case "ArrowUp":
                        return Math.max(current - 7, 1)
                    case "Enter":
                        selectDay(current)
                        return current
                    default:
                        return current
                }
            })
        }

        document.addEventListener("mousedown", onMouseDown)
        document.addEventListener("keydown", onKeyDown)

        return () => {
            document.removeEventListener("mousedown", onMouseDown)
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [open, daysInMonth, selectDay])

    useEffect(() => {
        if (open) setFocusedDay(1)
    }, [open])

    /* =========================
       RENDER
    ========================= */
    return (
        <div
            ref={ref}
            className={`flex-col inter14400 ${styles["input-container"]}`}
            style={{ width, position: "relative" }}
        >
            {label && <label>{label}</label>}

            {/* INPUT */}
            <div
                className={styles["input-wrapper"]}
                style={{ width, height, cursor: "pointer" }}
                onClick={() => setOpen((v) => !v)}
            >
                <div
                    className={styles["input-field"]}
                    style={{
                        width,
                        height,
                        display: "flex",
                        alignItems: "center",
                    }}
                    aria-label={ariaLabel}
                >
                    {value ? formatDisplayDate(value) : "Choisir une date"}
                </div>

                <Image
                    src={iconSrc}
                    alt={altIcon ?? ""}
                    width={18}
                    height={18}
                    className={styles["input-icon"]}
                />
            </div>

            {/* CALENDAR */}
            <div
                style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: 260,
                    marginTop: 6,
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    zIndex: 100,

                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0px)" : "translateY(-6px)",
                    pointerEvents: open ? "auto" : "none",
                    transition: "all 160ms ease",
                }}
            >
                {/* HEADER */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button onClick={() => changeMonth(-1)}>&lt;</button>
                    <strong>
                        {viewDate.toLocaleString("default", {
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
                        gap: 4,
                        marginTop: 10,
                    }}
                >
                    {Array(firstDayIndex)
                        .fill(null)
                        .map((_, i) => (
                            <div key={i} />
                        ))}

                    {days.map((day) => {
                        const disabled = isPast(day)
                        const selected = isSelected(day)
                        const today = isToday(day)
                        const focused = focusedDay === day

                        return (
                            <div
                                key={day}
                                onClick={() => !disabled && selectDay(day)}
                                style={{
                                    textAlign: "center",
                                    padding: 6,
                                    borderRadius: 6,
                                    cursor: disabled ? "not-allowed" : "pointer",
                                    opacity: disabled ? 0.3 : 1,

                                    background: selected
                                        ? "#dbeafe"
                                        : focused
                                            ? "#eff6ff"
                                            : "transparent",

                                    border: focused
                                        ? "1px solid #3b82f6"
                                        : "none",

                                    position: "relative",
                                }}
                            >
                                {day}

                                {today && (
                                    <span
                                        style={{
                                            position: "absolute",
                                            top: 2,
                                            right: 2,
                                            fontSize: 9,
                                            background: "#111",
                                            color: "#fff",
                                            borderRadius: 4,
                                            padding: "1px 3px",
                                        }}
                                    >
                                        today
                                    </span>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}