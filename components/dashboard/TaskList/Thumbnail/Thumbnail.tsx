
import styles from "@/components/dashboard/TaskList/Thumbnail/Thumbnail.module.css";
import Tags from "@/components/Tags/Tags";
import Button from "@/components/input/Button/Button";
import Image from "next/image";



export default function Thumbnail (){


    return(
        <section className={`flex-col align-center justify-space-between ${styles.thumbnail}`}>
            <div className={`flex-row align-center justify-space-between ${styles.thumbnailcontainer}`}>
                <div className={"flex-col gap30"}>
                    <div className={"flex-col"}>
                    <h5>Nom de la tâche</h5>
                    <p className="inter14400 grey600"> Description de la tâche</p>
                    </div>
                    <div className={"flex-row align-center gap15"}>
                        <div className={"flex-row gap8"}>
                            <Image
                                src="/greydirectoryicon.svg"
                                alt="icon"
                                width={18}
                                height={14}
                            />
                            <p className="inter12400 grey600">Nom du projet</p>
                        </div>
                        <span>|</span>
                        <div className={"flex-row gap8"}>
                            <Image
                                src="/minicalendar.svg"
                                alt="icon"
                                width={18}
                                height={14}
                            />
                            <p className="inter12400 grey600">9 mars</p>
                        </div>
                        <span>|</span>
                        <div className={"flex-row gap8"}>
                            <Image
                                src="/chaticon.svg"
                                alt="icon"
                                width={18}
                                height={14}
                            />
                            <p className="inter12400 grey600">2</p>
                        </div>

                    </div>
                </div>
                <div className={`flex-col align-center justify-space-between ${styles.thumbnailbutton}`}>
                    <Tags label={"A faire"} />
                    <Button width={"121px"} text={"Voir"}/>
                </div>
            </div>

        </section>

    )
}
