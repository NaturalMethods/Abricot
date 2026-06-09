
import styles from "@/components/dashboard/TaskList/Thumbnail/Thumbnail.module.css"
import reducedStyles from "@/components/dashboard/TaskList/Thumbnail/ReduceThumbnail.module.css"
import Tags from "@/components/Tags/Tags";
import Button from "@/components/input/Button/Button";
import Image from "next/image";
import {Project} from "@/app/types/Project";

interface ThumbnailProps{
    taskName: string
    taskDesc?: string
    dueDate?: string
    comments?: number
    project?: Project
    reduced?:boolean
    status?: string
}

export default function Thumbnail ({   taskName,
                                       taskDesc,
                                       project,
                                       dueDate,
                                       comments,
                                       status="",
                                       reduced = false}:ThumbnailProps){

    const thumbnailClass = reduced
        ? reducedStyles.thumbnail
        : styles.thumbnail

    return(
        <section className={`flex-col align-center justify-space-between ${thumbnailClass}`}>

            {!reduced && (<div className={`flex-row align-center justify-space-between ${styles.thumbnailcontainer}`}>
                <div className={"flex-col gap30"}>
                    <div className={"flex-col gap8"}>
                        <div className={`flex-row align-center justify-space-between`}>
                            <h5>{taskName}</h5>
                        </div>
                        <p className="inter14400 grey600"> {taskDesc}</p>
                    </div>
                    <div className={"flex-row align-center gap15"}>
                        <div className={"flex-row gap8"}>
                            <Image
                                src="/greydirectoryicon.svg"
                                alt="icon"
                                width={18}
                                height={14}
                            />
                            <p className="inter12400 grey600">{project?.name ?? ""}</p>
                        </div>
                        <span>|</span>
                        <div className={"flex-row gap8"}>
                            <Image
                                src="/minicalendar.svg"
                                alt="icon"
                                width={18}
                                height={14}
                            />
                            <p className="inter12400 grey600">{dueDate}</p>
                        </div>
                        <span>|</span>
                        <div className={"flex-row gap8"}>
                            <Image
                                src="/chaticon.svg"
                                alt="icon"
                                width={18}
                                height={14}
                            />
                            <p className="inter12400 grey600">{comments}</p>
                        </div>

                    </div>
                </div>
                <div className={`flex-col align-center justify-space-between ${styles.thumbnailbutton}`}>
                    {!reduced && (<Tags label={status} width={"75px"} height={"25px"} />)}
                    {!reduced && (<Button width={"121px"} text={"Voir"} />)}
                </div>
            </div>)}

            {reduced && (<div className={`flex-col align-center justify-space-evenly ${styles.thumbnailcontainer}`}>

                <div className={`flex-col gap30`}>
                    <div className="flex-col align-center gap30">
                        <div className="flex-row align-center max-w-100">
                                <div className={`flex-col align-center  max-w-100`}>

                                    <div className={`flex-col  gap8 ${styles.thumbnailheader}`}>

                                        <div className={`flex-row justify-space-between`}>
                                            <h5 className={` ${styles.thumbnailtitle}`}>{taskName.slice(0,25)}</h5>
                                            <Tags label={status} width={"75px"} height={"25px"} />

                                        </div>
                                        <p className={`inter14400 grey600 truncate ${styles.thumbnaildesc}`}> {taskDesc}</p>

                                    </div>

                                </div>
                            </div>
                        <div className={`flex-row align-center gap8 ${styles.thumbnailinfos}`}>
                                <div className={"flex-row gap8"}>
                                    <Image
                                        src="/greydirectoryicon.svg"
                                        alt="icon"
                                        width={18}
                                        height={14}
                                    />
                                    <p className="truncate inter12400 grey600">{project?.name ?? ""}</p>
                                </div>
                                <span>|</span>
                                <div className={"flex-row gap8"}>
                                    <Image
                                        src="/minicalendar.svg"
                                        alt="icon"
                                        width={18}
                                        height={14}
                                    />
                                    <p className=" truncate inter12400 grey600">{dueDate}</p>
                                </div>
                                <span>|</span>
                                <div className={"flex-row gap8"}>
                                    <Image
                                        src="/chaticon.svg"
                                        alt="icon"
                                        width={18}
                                        height={14}
                                    />
                                    <p className="inter12400 grey600">{comments}</p>
                                </div>

                            </div>

                    </div>
                    <Button width={"121px"} text={"Voir"} />
                </div>
            </div>)}
        </section>

    )
}
