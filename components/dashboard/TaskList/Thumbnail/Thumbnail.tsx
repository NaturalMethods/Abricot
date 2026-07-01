
import styles from "@/components/dashboard/TaskList/Thumbnail/Thumbnail.module.css"
import reducedStyles from "@/components/dashboard/TaskList/Thumbnail/ReduceThumbnail.module.css"
import commentedStyles from "@/components/dashboard/TaskList/Thumbnail/CommentedThumbnail.module.css"
import IAStyles from "@/components/dashboard/TaskList/Thumbnail/IAThumbnail.module.css"
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
import {ThumbnailInfos} from "@/components/dashboard/TaskList/Thumbnail/SubComponents/ThumbnailInfos";

interface ThumbnailProps{
    project?: Project
    format?: string
    reduced?:boolean
    commented?: boolean
    isModal?: boolean
    task?: Task

    onEdit?: () => void;
    onDelete?: (id : string|undefined) => void;

    width ?: string
    height ?: string

}

export default function Thumbnail ({   project,
                                       format="default",
                                       reduced = false,
                                        isModal = false,
                                        task,
                                        onEdit,
                                        onDelete,
                                        width = "95%",
                                        height = "100%"
                                        }:ThumbnailProps){


    const [isOpen, setIsOpen] = useState(false)

    let thumbnailClass = styles.thumbnail
    let reducedBool = false
    let commentedBool = false
    let IaBool = false
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

        case "IA" : thumbnailClass = IAStyles.thumbnail
                    IaBool = true;
                    defaultBool = false;
                    break;

        default : defaultBool = true;
                  break;
    }


    return(
        <section className={`flex-col items-center border w-full border-[#E5E7EB] rounded-[10px]
                             justify-space-between h-fit min-h-[162px] ${thumbnailClass}`}>

            {defaultBool && (<div className={`flex-col md:flex-row align-center min-h-[162px] mt-2 mb-2 sm:mt-6 sm:mb-6  gap-7  pl-6 pr-6 justify-space-between w-full ${styles.thumbnailcontainer}`}>
                <div className={"flex-col gap30"}>
                    <div className={"flex-col gap8"}>
                        <div className={`flex-row align-center justify-space-between`}>
                            <h2>{task?.title}</h2>
                            <div className={"sm:hidden block "}>
                                <Tags label={task?.status} width={"75px"} height={"25px"} />
                            </div>
                        </div>
                        <p className=" inter10400 sm:inter14400 grey600"> {task?.description}</p>
                    </div>

                    <ThumbnailInfos project={project} task={task}/>

                </div>
                <div className={`flex-row w-full md:w-fit md:flex-col sm:items-center justify-space-between ${styles.thumbnailbutton}`}>
                    <div className={"hidden sm:block"}>
                        {!reduced && (<Tags label={task?.status} width={"75px"} height={"25px"} />)}
                    </div>
                    <div className={"w-full flex flex-col items-center sm:w-auto sm:items-start"}>
                    {!reduced && (<Button width={"121px"} text={"Voir"} onClick={() => setIsOpen(true)}  />)}
                    </div>
                    {!isModal && <ModalTask project={task?.project} task={task} isOpen={isOpen} onCloseAction={() => setIsOpen(false)} isShow={true}/>
                    }
                </div>
            </div>)}

            {reducedBool && (<div className={`flex-col align-center justify-space-evenly mt-2 mb-2 mr-6 ml-6 sm:mt-6 sm:mb-6 sm:ml-10 sm:mr-10 ${styles.thumbnailcontainer}`}>

                <div className={`flex-col w-full gap30`}>
                    <div className="flex-col align-center gap30">
                        <div className="flex-row align-center max-w-100">
                                <div className={`flex-col align-center  max-w-100`}>

                                    <div className={`flex-col  gap8 ${styles.thumbnailheader}`}>

                                        <div className={`flex-row w-full justify-space-between`}>
                                            <h2 className={` ${styles.thumbnailtitle}`}>{task?.title}</h2>
                                            <Tags label={task?.status} width={"75px"} height={"25px"} />

                                        </div>
                                        <p className={`inter10400 sm:inter14400 grey600 ${styles.thumbnaildesc}`}> {task?.description}</p>

                                    </div>

                                </div>
                            </div>
                        <ThumbnailInfos project={project} task={task} />
                    </div>
                    <div className={"w-full flex flex-col items-center sm:w-auto sm:items-start "}>
                        <Button width={"121px"} text={"Voir"} onClick={() => setIsOpen(true)}  />
                    </div>
                    {!isModal && <ModalTask project={project} task={task} isOpen={isOpen} onCloseAction={() => setIsOpen(false)} isShow={true}/>
                    }
                </div>
            </div>)}

            {commentedBool && (<CommentedThumbnail project={project} task={task} onEdit={onEdit} onDelete={onDelete} />)}

            {IaBool && (<div className={`flex-row align-center justify-space-between` }
                             style={{height: height ?? "100%",
                                     width: width ?? "95%"
                             }} >
                <div className={"flex-col gap30"}>
                    <div className={"flex-col gap8"}>
                        <div className={`flex-row align-center justify-space-between`}>
                            <h2>{task?.title ?? "Title"}</h2>
                        </div>
                        <p className="inter14400 grey600"> {task?.description ?? "Description"}</p>
                    </div>
                    <div className={"flex-row align-center gap15"}>
                        <div className={"flex-row gap8"}>
                            <Image src={"/TrashCan.svg"} alt={"Icône de poubelle"} width={15} height={15} />
                            <p className="inter12400 grey600">Supprimer</p>
                        </div>
                        <span>|</span>
                        <div className={"flex-row gap8"} onClick={() => setIsOpen(true)} >
                            <Image src={"/Crayon.svg"} alt={"Icône de crayon"} width={15} height={15} />
                            <p className="inter12400 grey600">Modifier</p>
                            {!isModal && <ModalTask project={task?.project} task={task} isOpen={isOpen} onCloseAction={() => setIsOpen(false)} isShow={true}/>
                            }
                        </div>

                    </div>
                </div>

            </div>)}

        </section>

    )
}
