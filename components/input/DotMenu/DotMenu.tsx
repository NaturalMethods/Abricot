"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"

type Props = {
    onEditAction?: () => void
    onDeleteAction?: () => void
}

export default function DotMenu({
                                    onEditAction,
                                    onDeleteAction,
                                }: Props) {

    const [open, setOpen] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const firstItemRef = useRef<HTMLButtonElement>(null)

    function close() {
        setOpen(false)
        buttonRef.current?.focus()
    }

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )
    }, [])

    useEffect(() => {
        if (!open) return

        firstItemRef.current?.focus()

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                close()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () =>
            document.removeEventListener(
                "keydown",
                handleKeyDown
            )
    }, [open])

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                display: "inline-block",
            }}
        >

            <button
                ref={buttonRef}
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Ouvrir le menu"
                onClick={() => setOpen(prev => !prev)}
                style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                }}
            >
                <Image
                    loading="eager"
                    src="/dotbutton.svg"
                    alt=""
                    width={57}
                    height={57}
                />
            </button>

            {open && (
                <div
                    role="menu"
                    className="inter14400"
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
                    }}
                >

                    <button
                        ref={firstItemRef}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                            onEditAction?.()
                            close()
                        }}
                        style={{
                            width: "100%",
                            padding: "12px 14px",
                            textAlign: "left",
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                            e.currentTarget.style.background = "#f5f5f5"
                        }
                        onMouseLeave={(e) =>
                            e.currentTarget.style.background = "transparent"
                        }
                    >
                        Modifier
                    </button>

                    <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                            onDeleteAction?.()
                            close()
                        }}
                        style={{
                            width: "100%",
                            padding: "12px 14px",
                            textAlign: "left",
                            border: "none",
                            background: "transparent",
                            color: "#d11a2a",
                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                            e.currentTarget.style.background = "#fff0f0"
                        }
                        onMouseLeave={(e) =>
                            e.currentTarget.style.background = "transparent"
                        }
                    >
                        Supprimer
                    </button>

                </div>
            )}

        </div>
    )
}