
import styles from "@/components/Tags/Tags.module.css";

interface TagsProps{

    label:string
}

export default function Tags ({label =""}:TagsProps){

    let backgroundColors = "light-red"
    let textColors = "flashy-red"

    switch (label) {
        case "IN_PROGRESS":
            label = "En cours"
            backgroundColors = "light-orange"
            textColors = "warning-orange"
            break

        case "TODO":
            label = "À faire"
            backgroundColors = "light-red"
            textColors = "flashy-red"
            break

        case "DONE":
            label = "Terminée"
            backgroundColors = "light-green"
            textColors = "green"
            break

        default:
            break
    }



    return(
        <div style={{ backgroundColor: `var(--${backgroundColors})` }}  className={`flex-col align-center justify-center ${styles.tags}` }>
            <label className={`inter14400 ${textColors}`}>{label}</label>
        </div>

    )
}
