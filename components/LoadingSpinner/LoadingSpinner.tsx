import styles from "@/components/LoadingSpinner/LoadingSpinner.module.css";
import React from "react";


export function LoadingSpinner() {

    return (
        <div className="flex-row align-center justify-center" style={{ minHeight: "146px" }}>
            <div className={`${styles.loader}`} />
        </div>

    )

}