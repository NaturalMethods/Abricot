"use client"

import React, { useEffect, useRef, useState } from "react"
import styles from "./Dropdown.module.css"

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
    multiSelect?: boolean
    onChange?: (value: string | null | string[]) => void
}

export default function Dropdown({
                                     width = "152px",
                                     height = "63px",
                                     justify = "space-evenly",
                                     options = defaultOptions,
                                     placeHolder = "Statut",
                                     label,
                                     multiSelect = false,
                                     onChange,
                                 }: Props) {

    const [open, setOpen] = useState(false)

    const [selected, setSelected] = useState<Option | null>(null)

    const [selectedOptions, setSelectedOptions] =
        useState<Option[]>([])

    const ref = useRef<HTMLDivElement>(null)

    const firstOptionRef = useRef<HTMLButtonElement>(null)


    function handleSingleSelect(option: Option) {

        setSelected(option)
        setOpen(false)

        onChange?.(option.value)
    }


    function handleMultiSelect(option: Option) {

        const exists = selectedOptions.some(
            item => item.value === option.value
        )


        const updated = exists
            ? selectedOptions.filter(
                item => item.value !== option.value
            )
            : [...selectedOptions, option]


        setSelectedOptions(updated)


        onChange?.(
            updated
                .map(item => item.value)
                .filter(
                    (value): value is string =>
                        value !== null
                )
        )
    }



    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {

            if(
                ref.current &&
                !ref.current.contains(event.target as Node)
            ){
                setOpen(false)
            }

        }


        document.addEventListener(
            "mousedown",
            handleClickOutside
        )


        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )


    }, [])



    useEffect(() => {

        if(open){

            setTimeout(() => {
                firstOptionRef.current?.focus()
            },0)

        }


    },[open])



    useEffect(() => {


        function handleKeyboard(e:KeyboardEvent){

            if(!open) return


            const items = Array.from(
                ref.current?.querySelectorAll(
                    "[data-dropdown-item]"
                ) ?? []
            ) as HTMLButtonElement[]


            const active =
                document.activeElement


            const index =
                items.indexOf(active as HTMLButtonElement)



            if(e.key === "Escape"){

                setOpen(false)

                return
            }



            if(index === -1)
                return



            let next = index


            switch(e.key){

                case "ArrowDown":

                    e.preventDefault()

                    next = Math.min(
                        index + 1,
                        items.length - 1
                    )

                    items[next]?.focus()

                    break



                case "ArrowUp":

                    e.preventDefault()

                    next = Math.max(
                        index - 1,
                        0
                    )

                    items[next]?.focus()

                    break



                case "Enter":

                    e.preventDefault()

                    items[index]?.click()

                    break

            }

        }



        document.addEventListener(
            "keydown",
            handleKeyboard
        )


        return () =>
            document.removeEventListener(
                "keydown",
                handleKeyboard
            )


    },[open])



    const inputId = label
        ? label.toLowerCase().replace(/\s+/g, "-")
        : undefined



    const displayText = multiSelect
        ? selectedOptions.length > 0
            ? `${selectedOptions.length} collaborateur${
                selectedOptions.length > 1 ? "s" : ""
            }`
            : placeHolder

        : selected
            ? selected.label
            : placeHolder



    const numericWidth = parseInt(width,10)

    const isSmall = numericWidth < 152


    const finalWidth = width
        ? Math.max(parseInt(width,10),152)
        : 152



    return (

        <div
            ref={ref}
            className={styles.wrapper}
            style={{
                width,
                height
            }}
        >

            {
                label && (

                    <label
                        className="inter14400"
                        htmlFor={inputId}
                    >
                        {label}
                    </label>

                )
            }



            <button

                type="button"

                id={inputId}

                className={`inter14400 ${styles.button}`}

                style={{
                    width,
                    height,
                    justifyContent:justify,
                    paddingLeft:isSmall ? 10 : 0,
                    paddingRight:isSmall ? 10 : 0,
                }}


                aria-expanded={open}

                onClick={() =>
                    setOpen(prev => !prev)
                }


                onKeyDown={(e)=>{

                    if(
                        e.key === "Enter" ||
                        e.key === " "
                    ){

                        e.preventDefault()

                        setOpen(prev=>!prev)

                    }

                }}

            >

                <p>
                    {displayText}
                </p>


                <img
                    src="/arrowdown.svg"
                    width={16}
                    height={8}
                    alt=""
                />

            </button>




            {
                open && (

                    <div
                        className={styles.menu}
                        style={{
                            width:`${finalWidth}px`
                        }}
                    >

                        {
                            options.map((option,index)=>{


                                const isSelected =
                                    multiSelect

                                        ? selectedOptions.some(
                                            item =>
                                                item.value === option.value
                                        )

                                        : selected?.value === option.value



                                return (

                                    <button

                                        key={`${option.label}-${option.value}`}

                                        ref={
                                            index === 0
                                                ? firstOptionRef
                                                : undefined
                                        }


                                        data-dropdown-item


                                        type="button"


                                        className={styles.item}


                                        onClick={()=>{

                                            multiSelect

                                                ? handleMultiSelect(option)

                                                : handleSingleSelect(option)

                                        }}

                                    >

                                        <span>
                                            {option.label}
                                        </span>


                                        {
                                            isSelected && (
                                                <span>
                                                    ✓
                                                </span>
                                            )
                                        }

                                    </button>

                                )

                            })
                        }

                    </div>

                )
            }


        </div>

    )
}