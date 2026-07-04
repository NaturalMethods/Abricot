import styles from "@/components/input/Chips/Chips.module.css";
import Image from "next/image";

interface ChipsProps {
    text: string
    onClick?: () => void
    width?: string
    height?: string
    active?: boolean
    srcIcon?: string
}

export default function Chips ({
                                   text,
                                   onClick,
                                   width = "",
                                   height = "",
                                   active = false,
                                   srcIcon="/listicon.svg",
                               }: ChipsProps) {

    return(
        <div className={`flex-row align-center justify-center ${styles.listchips} ${active ? styles.activelistchips : styles.nonactivelistchips}`}
             onClick={onClick}
             style={{width: width,
                     height: height}}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={srcIcon}
                alt="icon"
                width={16}
                height={16}
            />
            <p className="hidden lg:block inter14400 dark-orange">{text}</p>
        </div>
    )
}