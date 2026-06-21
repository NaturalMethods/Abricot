"use client"

import Tags from "@/components/Tags/Tags"
import React from "react"

export type Status = "TODO" | "IN_PROGRESS" | "DONE"

interface TagsSelectProps {
    value: Status | null
    onChange: (value: Status) => void
}

export function TagsSelect({ value, onChange }: TagsSelectProps) {
    const options: Status[] = ["TODO", "IN_PROGRESS", "DONE"]

    return (
        <div className="flex-col gap15">
            <p className="inter14400">Statut:</p>

            <div className="flex-row gap8">
                {options.map((status) => {
                    const isSelected = value === status

                    return (
                        <div
                            key={status}
                            onClick={() => onChange(status)}
                            style={{ cursor: "pointer" }}
                        >
                            <Tags
                                label={status}
                                width="75px"
                                height="25px"
                                border={
                                    isSelected
                                        ? "2px solid #FF7A00"
                                        : "1px solid transparent"
                                }
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}