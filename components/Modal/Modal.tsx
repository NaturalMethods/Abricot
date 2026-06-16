"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import styles from "./Modal.module.css"

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

export default function Modal({
                                  isOpen,
                                  onClose,
                                  children,
                              }: ModalProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("keydown", handleEscape)

        return () =>
            document.removeEventListener("keydown", handleEscape)
    }, [onClose])

    if (!mounted || !isOpen) return null

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    )
}