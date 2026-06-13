
import styles from "@/components/dashboard/TaskList/Thumbnail/Thumbnail.module.css"
import reducedStyles from "@/components/dashboard/TaskList/Thumbnail/ReduceThumbnail.module.css"
import commentedStyles from "@/components/dashboard/TaskList/Thumbnail/CommentedThumbnail.module.css"
import Tags from "@/components/Tags/Tags";
import Button from "@/components/input/Button/Button";
import Image from "next/image";
import {Project} from "@/app/types/Project";
import {getInitials} from "@/lib/utils";

interface ThumbnailProps{
    taskName: string
    taskDesc?: string
    dueDate?: string
    comments?: []
    project?: Project
    format?: string
    reduced?:boolean
    commented?: boolean
    status?: string
    assignees?: []

}

export default function Thumbnail ({   taskName,
                                       taskDesc,
                                       project,
                                       dueDate,
                                       comments,
                                       status="",
                                       format="default",
                                       reduced = false,
                                       assignees,
                                        }:ThumbnailProps){


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
                            <p className="inter12400 grey600">{comments?.length}</p>
                        </div>

                    </div>
                </div>
                <div className={`flex-col align-center justify-space-between ${styles.thumbnailbutton}`}>
                    {!reduced && (<Tags label={status} width={"75px"} height={"25px"} />)}
                    {!reduced && (<Button width={"121px"} text={"Voir"} />)}
                </div>
            </div>)}

            {reducedBool && (<div className={`flex-col align-center justify-space-evenly ${styles.thumbnailcontainer}`}>

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
                                    <p className="inter12400 grey600">{comments?.length}</p>
                                </div>

                            </div>

                    </div>
                    <Button width={"121px"} text={"Voir"} />
                </div>
            </div>)}

            {commentedBool && (<div className={`flex-row align-center justify-space-between ${styles.thumbnailcontainer}`}>
                <div className={`flex-col gap30 max-w-100 ${commentedStyles.margintop}`}>
                    <div className={"flex-row justify-space-between"}>
                        <div className={"flex-col"}>
                            <div className={`flex-row align-center`}>
                                <div className={`flex-row align-center gap8`}>
                                    <h5>{taskName}</h5>
                                    <Tags label={status} width={"75px"} height={"25px"} />

                                </div>

                            </div>
                            <p className="inter14400 grey600"> {taskDesc}</p>
                        </div>
                        <Image
                            src="/dotbutton.svg"
                            alt="search"
                            width={57}
                            height={57}
                        />
                    </div>


                    <div className={"flex-col gap15"}>

                        <div className={"flex-row gap8"}>
                            <p className="inter12400 grey600">Echéance : </p>
                            <Image
                                src="/minicalendar.svg"
                                alt="icon"
                                width={18}
                                height={14}
                            />
                            <p className="inter12400 grey600">{dueDate}</p>
                        </div>
                        <div className={"flex-row align-center gap15"}>
                            <p className="inter12400 grey600">Assigné à : </p>
                            {assignees?.map((assignee, index) => (
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

                    <div className={`flex-col ${commentedStyles.comments}`}>
                        <hr className="separator" />
                        <div className="flex-row justify-space-between max-h-100 align-center">
                            <p className="inter14400 grey800">Commentaires ({comments?.length})</p>
                            <Image
                                src="/arrowup.svg"
                                alt="icon"
                                width={16}
                                height={8}
                            />
                        </div>
                    </div>
                </div>

            </div>)}

        </section>

    )
}
