
import styles from "@/components/dashboard/TaskList/Thumbnail/Thumbnail.module.css"
import reducedStyles from "@/components/dashboard/TaskList/Thumbnail/ReduceThumbnail.module.css"
import commentedStyles from "@/components/dashboard/TaskList/Thumbnail/CommentedThumbnail.module.css"
import Tags from "@/components/Tags/Tags";
import Button from "@/components/input/Button/Button";
import Image from "next/image";
import {Project} from "@/app/types/Project";
import {formatDate} from "@/lib/utils";
import {useState} from "react";
import ModalTask from "@/components/Modal/Task/ModalTask";
import {Task} from "@/app/types/Task";
import {DueDate} from "@/components/dashboard/TaskList/Thumbnail/SubComponents/DueDate";
import {CommentedThumbnail} from "@/components/dashboard/TaskList/Thumbnail/CommentedThumbnail";

interface ThumbnailProps{
    project?: Project
    format?: string
    reduced?:boolean
    commented?: boolean
    isModal?: boolean
    task?: Task

    onEdit?: () => void;
    onDelete?: (id : string|undefined) => void;

}

export default function Thumbnail ({   project,
                                       format="default",
                                       reduced = false,
                                        isModal = false,
                                        task,
                                        onEdit,
                                        onDelete,
                                        }:ThumbnailProps){


    const [isOpen, setIsOpen] = useState(false)

    let thumbnailClass = styles.thumbnail
    let reducedBool = false
    let commentedBool = false
    let defaultBool: boolean

    switch(format){

        case "reduced" : thumbnailClass = reducedStyles.thumbnail;
                         reducedBool = true;
                         defaultBool = false;
            break;

        case "commented" : thumbnailClass = commentedStyles.thumbnail;
            commentedBool = true;
            defaultBool = false;
            break;

        default : defaultBool = true;
                  break;
    }


    return(
        <section className={`flex-col align-center justify-space-between ${thumbnailClass}`}>

            {defaultBool && (<div className={`flex-row align-center justify-space-between ${styles.thumbnailcontainer}`}>
                <div className={"flex-col gap30"}>
                    <div className={"flex-col gap8"}>
                        <div className={`flex-row align-center justify-space-between`}>
                            <h2>{task?.title}</h2>
                        </div>
                        <p className="inter14400 grey600"> {task?.description}</p>
                    </div>
                    <div className={"flex-row align-center gap15"}>
                        <div className={"flex-row gap8"}>
                            <Image
                                src="/greydirectoryicon.svg"
                                alt="icone de repertoire"
                                width={18}
                                height={14}
                            />
                            <p className="inter12400 grey600">{project?.name ?? ""}</p>
                        </div>
                        <span>|</span>
                        <div className={"flex-row gap8"}>
                            <DueDate date={task?.dueDate} isDisplay />
                        </div>
                        <span>|</span>
                        <div className={"flex-row gap8"}>
                            <Image
                                src="/chaticon.svg"
                                alt="icon de message"
                                width={18}
                                height={14}
                            />
                            <p className="inter12400 grey600">{task?.comments?.length}</p>
                        </div>

                    </div>
                </div>
                <div className={`flex-col align-center justify-space-between ${styles.thumbnailbutton}`}>
                    {!reduced && (<Tags label={task?.status} width={"75px"} height={"25px"} />)}
                    {!reduced && (<Button width={"121px"} text={"Voir"} onClick={() => setIsOpen(true)}  />)}
                    {!isModal && <ModalTask project={task?.project} task={task} isOpen={isOpen} onCloseAction={() => setIsOpen(false)} isShow={true}/>
                    }
                </div>
            </div>)}

            {reducedBool && (<div className={`flex-col align-center justify-space-evenly ${styles.thumbnailcontainer}`}>

                <div className={`flex-col gap30`}>
                    <div className="flex-col align-center gap30">
                        <div className="flex-row align-center max-w-100">
                                <div className={`flex-col align-center  max-w-100`}>

                                    <div className={`flex-col  gap8 ${styles.thumbnailheader}`}>

                                        <div className={`flex-row justify-space-between`}>
                                            <h2 className={` truncate ${styles.thumbnailtitle}`}>{task?.title}</h2>
                                            <Tags label={task?.status} width={"75px"} height={"25px"} />

                                        </div>
                                        <p className={`inter14400 grey600 truncate ${styles.thumbnaildesc}`}> {task?.description}</p>

                                    </div>

                                </div>
                            </div>
                        <div className={`flex-row align-center gap8 ${styles.thumbnailinfos}`}>
                                <div className={"flex-row gap8"}>
                                    <Image
                                        src="/greydirectoryicon.svg"
                                        alt="icone de repertoire"
                                        width={18}
                                        height={14}
                                    />
                                    <p className="truncate inter12400 grey600">{project?.name ?? ""}</p>
                                </div>
                                <span>|</span>
                                <div className={"flex-row gap8"}>
                                    <Image
                                        src="/minicalendar.svg"
                                        alt="icone de calendrier"
                                        width={18}
                                        height={14}
                                    />
                                    <p className=" truncate inter12400 grey600">{formatDate(task?.dueDate).toString()}</p>
                                </div>
                                <span>|</span>
                                <div className={"flex-row gap8"}>
                                    <Image
                                        src="/chaticon.svg"
                                        alt="icone de message"
                                        width={18}
                                        height={14}
                                    />
                                    <p className="inter12400 grey600">{task?.comments?.length}</p>
                                </div>

                            </div>

                    </div>
                    <Button width={"121px"} text={"Voir"} onClick={() => setIsOpen(true)}  />
                    {!isModal && <ModalTask project={project} task={task} isOpen={isOpen} onCloseAction={() => setIsOpen(false)} isShow={true}/>
                    }
                </div>
            </div>)}

            {commentedBool && (<CommentedThumbnail project={project} task={task} onEdit={onEdit} onDelete={onDelete} />)}

        </section>

    )
}
