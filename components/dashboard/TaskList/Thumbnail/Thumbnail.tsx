
import styles from "@/components/dashboard/TaskList/Thumbnail/Thumbnail.module.css"
import reducedStyles from "@/components/dashboard/TaskList/Thumbnail/ReduceThumbnail.module.css"
import commentedStyles from "@/components/dashboard/TaskList/Thumbnail/CommentedThumbnail.module.css"
import Tags from "@/components/Tags/Tags";
import Button from "@/components/input/Button/Button";
import Image from "next/image";
import {Project} from "@/app/types/Project";
import {formatCommentDate, formatDate, getInitials} from "@/lib/utils";
import {useEffect, useState} from "react";
import {useUser} from "@/app/contexts/useUser";
import TextInput from "@/components/input/TextInput/TextInput";
import ModalTask from "@/components/Modal/Task/ModalTask";
import {Task} from "@/app/types/Task";
import DotMenu from "@/components/input/DotMenu/DotMenu";

interface ThumbnailProps{
    project?: Project
    format?: string
    reduced?:boolean
    commented?: boolean
    isModal?: boolean
    task?: Task

    onEdit?: (id: string|undefined) => void;
    onDelete?: (id : string|undefined) => void;

}

export default function Thumbnail ({   project,
                                       format="default",
                                       reduced = false,
                                        isModal = false,
                                        task,
                                        onEdit,
                                        onDelete
                                        }:ThumbnailProps){


    const {user} = useUser()
    const [commentsVisible, setCommentsVisible] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [comment, setComment] = useState("");

    useEffect(() => {


    }, [commentsVisible]);

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
                            <Image
                                src="/minicalendar.svg"
                                alt="icone de calendrier"
                                width={18}
                                height={14}
                            />
                            <p className="inter12400 grey600">{formatDate(task?.dueDate).toString()}</p>
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
                    {!isModal && <ModalTask task={task} isOpen={isOpen} onCloseAction={() => setIsOpen(false)} setIsOpen={setIsOpen} isShow={true}/>
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
                    {!isModal && <ModalTask task={task} isOpen={isOpen} onCloseAction={() => setIsOpen(false)} setIsOpen={setIsOpen} isShow={true}/>
                    }
                </div>
            </div>)}

            {commentedBool && (<div className={`flex-row align-center justify-space-between ${styles.thumbnailcontainer}`}>
                <div className={`flex-col gap30 max-w-100 ${commentedStyles.margintop}`}>
                    <div className={"flex-row justify-space-between"}>
                        <div className={"flex-col"}>
                            <div className={`flex-row align-center`}>
                                <div className={`flex-row align-center gap8`}>
                                    <h2>{task?.title}</h2>
                                    <Tags label={task?.status} width={"75px"} height={"25px"} />

                                </div>

                            </div>
                            <p className="inter14400 grey600"> {task?.description}</p>
                        </div>
                        <DotMenu
                            onEditAction={() => onEdit?.(task?.id)}
                            onDeleteAction={() => onDelete?.(task?.id)}
                        />
                    </div>


                    <div className={"flex-col gap15"}>

                        <div className={"flex-row gap8"}>
                            <p className="inter12400 grey600">Echéance : </p>
                            <Image
                                src="/minicalendar.svg"
                                alt="icone de calendrier"
                                width={18}
                                height={14}
                            />
                            <p className="inter12400 grey600">{formatDate(task?.dueDate).toString()}</p>
                        </div>
                        <div className={"flex-row align-center gap15"}>
                            <p className="inter12400 grey600">Assigné à : </p>
                            {task?.assignees?.map((assignee, index) => (
                                <div className="flex-row gap8" key={index}>
                                    <Tags
                                        label={getInitials(assignee.user.name) ?? ""}
                                        font="inter10400"
                                        padding="8px 5px"
                                        width="17px"
                                        height="12px"
                                        backgroundColor="grey-200"
                                        textColor="grey-950"
                                        border="1px solid #FFFFFF"
                                        style={{
                                            marginLeft: index === 0 ? 0 : "-10px",
                                            zIndex: index + 1,
                                            position: "relative",
                                        }}
                                    />
                                    <Tags
                                        label={assignee.user.name}
                                        padding="8px 16px"
                                        height="12px"
                                        backgroundColor="grey-200"
                                        textColor="grey600"
                                    />
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className={`flex-col gap10 ${commentedStyles.comments}`}>
                        <hr className="separator" />

                        <div
                            className="flex-row justify-space-between max-h-100 align-center"
                            onClick={() => setCommentsVisible(!commentsVisible)}
                            style={{ cursor: "pointer" }}
                        >
                            <p className="inter14400 grey800">
                                Commentaires ({task?.comments?.length})
                            </p>

                            <Image
                                src={commentsVisible ? "/arrowdown.svg" : "/arrowup.svg"}
                                alt="Ouvrir/Fermer les commentaires"
                                width={16}
                                height={8}
                            />
                        </div>

                        <div
                            className={`${commentedStyles.commentsContent} ${
                                commentsVisible ? commentedStyles.open : ""
                            }`}
                        >
                            <div className={"flex-col gap10"}>

                                {task?.comments?.map((taskComment, index) => (
                                    <div className={"flex-row gap15"} key={index}>
                                        <Tags
                                            label={getInitials(taskComment.author.name) ?? ""}
                                            font="inter10400"
                                            padding="8px 5px"
                                            width="17px"
                                            height="12px"
                                            backgroundColor="grey-200"
                                            textColor="grey-950"
                                            border="1px solid #FFFFFF"
                                        />

                                        <div className={`flex-col justify-center gap10 max-w-100 ${commentedStyles.commentbackground}`}>
                                            <div className={"flex-row justify-space-between"}>
                                                <p className={"inter14400"}>
                                                    {taskComment.author.name}
                                                </p>
                                                <p className={"inter10400 grey600"}>
                                                    {formatCommentDate(taskComment.createdAt)}
                                                </p>
                                            </div>

                                            <p className={"inter10400"}>
                                                {taskComment.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <div className={"flex-row gap15"}>
                                    <Tags
                                        label={getInitials(
                                            ` ${user?.firstName} ${user?.lastName}`
                                        ) ?? ""}
                                        font="inter10400"
                                        padding={"8px 5px"}
                                        width={"17px"}
                                        height={"12px"}
                                        backgroundColor={"light-orange"}
                                        textColor={"grey950"}
                                    />

                                    <TextInput
                                        label=""
                                        placeholder="Ajouter un commentaire"
                                        width="100%"
                                        height={"83px"}
                                        backgroundColor={"grey-50"}
                                        value={comment}
                                        ariaLabel={"ajouter un commentaire"}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>

                                <div className={"flex-col max-w-100 flex-end marginbot10"}>
                                    <Button
                                        width={"209px"}
                                        text={"Envoyer"}
                                        disabled={comment.trim() === ""}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>)}

        </section>

    )
}
