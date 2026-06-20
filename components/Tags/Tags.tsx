
import styles from "@/components/Tags/Tags.module.css";

interface TagsProps{

    label?:string
    width?: string
    height?: string
    backgroundColor?:string
    textColor?:string
    font?: string
    padding?: string
    border?: string
    style?: React.CSSProperties
}

export default function Tags ({style, label="",
                                  padding="0",
                                  width,
                                  height,
                                  border="0",
                                  font="inter14400",
                                  backgroundColor,
                                  textColor}:TagsProps){

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

    if(backgroundColor && textColor){
        backgroundColors = backgroundColor
        textColors = textColor
    }

    return(
        <div style={{
            backgroundColor: `var(--${backgroundColors})`,
            width: width ?? "fit-content",
            height: height ?? "fit-content",
            padding: padding,
            border: border,
            position: "relative",
            zIndex: style?.zIndex,
            marginLeft: style?.marginLeft,
        }}
             className={`flex-col align-center justify-center ${styles.tags}` }>
            <span className={`${font} ${textColors}`}>{label}</span>
        </div>

    )
}
