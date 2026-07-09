"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styles from "./Modal.module.css"

type ModalProps = {
    isOpen: boolean
    onCloseAction: () => void
    children: React.ReactNode
}

export default function Modal({
                                  isOpen,
                                  onCloseAction,
                                  children,
                              }: ModalProps) {
    const [mounted, setMounted] = useState(false)

    const modalRef = useRef<HTMLDivElement>(null)
    const previousFocusRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Gestion du focus ouverture / fermeture
    useEffect(() => {
        if (!isOpen) {
            previousFocusRef.current?.focus()
            previousFocusRef.current = null
            return
        }

        previousFocusRef.current = document.activeElement as HTMLElement

        setTimeout(() => {
            modalRef.current?.focus()
        }, 0)

    }, [isOpen])


    // Escape + Focus trap
    useEffect(() => {
        if (!isOpen) return

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onCloseAction()
                return
            }

            if (e.key !== "Tab") return

            const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
                [
                    "a[href]",
                    "button:not(:disabled)",
                    "textarea",
                    "input:not(:disabled)",
                    "select",
                    "[tabindex]:not([tabindex='-1'])"
                ].join(",")
            )

            if (!focusableElements || focusableElements.length === 0) {
                e.preventDefault()
                modalRef.current?.focus()
                return
            }

            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            const activeElement = document.activeElement

            // Shift + Tab depuis le premier élément
            if (e.shiftKey && activeElement === firstElement) {
                e.preventDefault()
                lastElement.focus()
            }

            // Tab depuis le dernier élément
            else if (!e.shiftKey && activeElement === lastElement) {
                e.preventDefault()
                firstElement.focus()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, onCloseAction])


    if (!mounted || !isOpen) return null

    return createPortal(
        <div
            className={styles.overlay}
            onClick={onCloseAction}
        >
            <div
                ref={modalRef}
                className={styles.modal}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    )
}