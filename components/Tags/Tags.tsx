
import styles from "@/components/Tags/Tags.module.css";

interface TagsProps{

    label:string
}

export default function Tags ({label}:TagsProps){


    return(
        <div className={`flex-col align-center justify-center ${styles.tags}`}>
            <label className="inter14400 flashy-red">{label}</label>
        </div>

    )
}
