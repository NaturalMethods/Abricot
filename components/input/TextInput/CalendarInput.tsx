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
   Utils SAFE
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
    const firstDayRef = useRef<HTMLButtonElement>(null)

    const [open, setOpen] = useState(false)
    const [viewDate, setViewDate] = useState(() => new Date())


    const {
        year,
        month,
        daysInMonth,
        firstDayIndex,
        days
    } = useMemo(() => {

        const y = viewDate.getFullYear()
        const m = viewDate.getMonth()

        return {
            year: y,
            month: m,
            daysInMonth: new Date(y, m + 1, 0).getDate(),
            firstDayIndex: new Date(y, m, 1).getDay(),
            days: Array.from(
                {
                    length: new Date(y, m + 1, 0).getDate()
                },
                (_, i) => i + 1
            )
        }

    }, [viewDate])


    const selectedDate = useMemo(
        () => value ? new Date(value) : null,
        [value]
    )


    const selectDay = useCallback(
        (day:number) => {

            const date = new Date(year, month, day)
            const iso = toISODateLocal(date)

            setOpen(false)

            startTransition(() => {
                onChange?.(iso)
            })

        },
        [year, month, onChange]
    )


    const changeMonth = useCallback(
        (offset:number) => {

            setViewDate(prev =>
                new Date(
                    prev.getFullYear(),
                    prev.getMonth() + offset,
                    1
                )
            )

        },
        []
    )


    const isToday = useCallback(
        (day:number) => {

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
        (day:number) => {

            if(!selectedDate) return false

            return (
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year
            )

        },
        [selectedDate, month, year]
    )


    const isPast = useCallback(
        (day:number) => {

            const today = new Date()
            const d = new Date(year, month, day)

            today.setHours(0,0,0,0)
            d.setHours(0,0,0,0)

            return d < today

        },
        [year, month]
    )


    /*
        Fermeture extérieure + Escape
    */

    useEffect(() => {

        function onMouseDown(e:MouseEvent){

            if(
                ref.current &&
                !ref.current.contains(e.target as Node)
            ){
                setOpen(false)
            }

        }


        function onKeyDown(e:KeyboardEvent){

            if(!open) return


            if(e.key === "Escape"){
                setOpen(false)
                return
            }

            const active = document.activeElement

            if(!(active instanceof HTMLButtonElement)){
                return
            }


            const buttons = Array.from(
                ref.current?.querySelectorAll(
                    "button[data-day]"
                ) ?? []
            ) as HTMLButtonElement[]


            const index = buttons.indexOf(active)


            if(index === -1) return


            let nextIndex = index


            switch(e.key){

                case "ArrowRight":
                    nextIndex = Math.min(
                        index + 1,
                        buttons.length - 1
                    )
                    break


                case "ArrowLeft":
                    nextIndex = Math.max(
                        index - 1,
                        0
                    )
                    break


                case "ArrowDown":
                    nextIndex = Math.min(
                        index + 7,
                        buttons.length - 1
                    )
                    break


                case "ArrowUp":
                    nextIndex = Math.max(
                        index - 7,
                        0
                    )
                    break


                default:
                    return
            }


            e.preventDefault()

            buttons[nextIndex]?.focus()

        }


        document.addEventListener(
            "mousedown",
            onMouseDown
        )

        document.addEventListener(
            "keydown",
            onKeyDown
        )


        return () => {

            document.removeEventListener(
                "mousedown",
                onMouseDown
            )

            document.removeEventListener(
                "keydown",
                onKeyDown
            )

        }


    },[open])


    /*
        Focus premier jour ouverture
    */

    useEffect(() => {

        if(open){
            setTimeout(() => {
                firstDayRef.current?.focus()
            },0)
        }

    },[open])


    return (

        <div
            ref={ref}
            className={`flex-col inter14400 ${styles["input-container"]}`}
            style={{
                width,
                position:"relative"
            }}
        >

            {label && (
                <label>
                    {label}
                </label>
            )}


            {/* OUVERTURE */}

            <div
                className={`border border-[#E5E7EB] rounded-[8px] ${styles["input-wrapper"]}`}
                style={{
                    width,
                    height,
                    cursor:"pointer"
                }}

                tabIndex={0}
                role="button"
                aria-label={ariaLabel || "Choisir une date"}
                aria-expanded={open}

                onClick={() =>
                    setOpen(v=>!v)
                }

                onKeyDown={(e)=>{

                    if(
                        e.key === "Enter" ||
                        e.key === " "
                    ){
                        e.preventDefault()
                        setOpen(v=>!v)
                    }

                }}
            >

                <div
                    className={styles["input-field"]}
                    style={{
                        width,
                        height,
                        display:"flex",
                        alignItems:"center",
                    }}
                >

                    {
                        value
                            ? formatDisplayDate(value)
                            : "Choisir une date"
                    }

                </div>


                <Image
                    loading="lazy"
                    src={iconSrc}
                    alt={altIcon}
                    width={18}
                    height={18}
                    className={styles["input-icon"]}
                />

            </div>



            {/* CALENDRIER */}

            {
                open && (

                    <div
                        style={{
                            position:"absolute",
                            top:"100%",
                            left:0,
                            width:260,
                            marginTop:6,
                            background:"white",
                            border:"1px solid #ddd",
                            borderRadius:8,
                            zIndex:100,
                            padding:10
                        }}
                    >


                        <div
                            style={{
                                display:"flex",
                                justifyContent:"space-between"
                            }}
                        >

                            <button
                                type="button"
                                onClick={() => changeMonth(-1)}
                            >
                                &lt;
                            </button>


                            <strong>
                                {
                                    viewDate.toLocaleString(
                                        "default",
                                        {
                                            month:"long",
                                            year:"numeric"
                                        }
                                    )
                                }
                            </strong>


                            <button
                                type="button"
                                onClick={() => changeMonth(1)}
                            >
                                &gt;
                            </button>


                        </div>



                        <div
                            style={{
                                display:"grid",
                                gridTemplateColumns:"repeat(7,1fr)",
                                gap:4,
                                marginTop:10
                            }}
                        >

                            {
                                Array(firstDayIndex)
                                    .fill(null)
                                    .map((_,i)=>(
                                        <div key={i}/>
                                    ))
                            }



                            {
                                days.map(day=>{

                                    const disabled = isPast(day)
                                    const selected = isSelected(day)
                                    const today = isToday(day)


                                    return (

                                        <button
                                            key={day}
                                            ref={
                                                day === 1
                                                    ? firstDayRef
                                                    : undefined
                                            }

                                            data-day

                                            type="button"

                                            disabled={disabled}

                                            onClick={() =>
                                                selectDay(day)
                                            }

                                            style={{
                                                position:"relative",
                                                padding:6,
                                                borderRadius:6,
                                                cursor:
                                                    disabled
                                                        ? "not-allowed"
                                                        : "pointer",

                                                opacity:
                                                    disabled
                                                        ? 0.3
                                                        : 1,

                                                background:
                                                    selected
                                                        ? "#dbeafe"
                                                        : "transparent",

                                                border:
                                                    "1px solid transparent"
                                            }}

                                        >

                                            {day}


                                            {
                                                today && (

                                                    <span
                                                        style={{
                                                            position:"absolute",
                                                            top:2,
                                                            right:2,
                                                            fontSize:9
                                                        }}
                                                    >
                                                        today
                                                    </span>

                                                )
                                            }

                                        </button>

                                    )

                                })
                            }


                        </div>

                    </div>

                )
            }


        </div>

    )
}