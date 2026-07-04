"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"

type Props = {
    onEditAction?: () => void
    onDeleteAction?: () => void
}

export default function DotMenu({ onEditAction, onDeleteAction }: Props) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    function close() {
        setOpen(false)
    }

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                close()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () =>
            document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
            {/* BUTTON */}
            <Image loading={"eager"}
                src="/dotbutton.svg"
                alt="Menu"
                width={57}
                height={57}
                onClick={() => setOpen((v) => !v)}
                style={{
                    cursor: "pointer",
                    userSelect: "none",
                }}
            />

            {/* MENU */}
            {open && (
                <div
                    className={"inter14400"}
                    style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        marginTop: "8px",
                        background: "#fff",
                        border: "1px solid #e5e5e5",
                        borderRadius: "10px",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                        zIndex: 1000,
                        minWidth: "160px",

                        // animation
                        opacity: 1,
                        transform: "translateY(0)",
                        transition: "all 0.15s ease",
                    }}
                >
                    {/* EDIT */}
                    <div
                        onClick={() => {
                            onEditAction?.()
                            close()
                        }}
                        style={{
                            padding: "12px 14px",
                            cursor: "pointer",
                            transition: "background 0.15s ease",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#f5f5f5")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                        }
                    >
                        Modifier
                    </div>

                    {/* DELETE */}
                    <div
                        onClick={() => {
                            onDeleteAction?.()
                            close()
                        }}
                        style={{
                            padding: "12px 14px",
                            cursor: "pointer",
                            color: "#d11a2a",
                            transition: "background 0.15s ease",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#fff0f0")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                        }
                    >
                        Supprimer
                    </div>
                </div>
            )}
        </div>
    )
}