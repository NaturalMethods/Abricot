import styles from "@/components/dashboard/TaskList/Thumbnail/Thumbnail.module.css";
import commentedStyles from "@/components/dashboard/TaskList/Thumbnail/CommentedThumbnail.module.css";
import Tags from "@/components/Tags/Tags";
import DotMenu from "@/components/input/DotMenu/DotMenu";
import {DueDate} from "@/components/dashboard/TaskList/Thumbnail/SubComponents/DueDate";
import {getInitials} from "@/lib/utils";
import {CommentSection} from "@/components/dashboard/TaskList/Thumbnail/SubComponents/CommentSection";
import {Task} from "@/app/types/Task";
import {useState} from "react";
import ModalTask from "@/components/Modal/Task/ModalTask";
import {Project} from "@/app/types/Project";

interface CommentedThumbnailProps{

    project?: Project
    task?: Task
    onEdit: (() => void )| undefined
    onDelete: ((id:string |undefined) => void) | undefined
}

export function CommentedThumbnail({project, task, onEdit, onDelete}: CommentedThumbnailProps){

    const [isModalOpen, setModalOpen] = useState(false);

    function closeAction(){
        setModalOpen(false)
        if (onEdit) {
            onEdit()
        }
    }

    return (

        <div className={`flex-row align-center pt-6 pb-6 pl-10 pr-10 w-full justify-space-between ${styles.thumbnailcontainer}`}>
            <div className={`flex-col gap30 w-full ${commentedStyles.margintop}`}>
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
                        onEditAction={() => setModalOpen(true)}
                        onDeleteAction={() => onDelete?.(task?.id)}
                    />

                    <ModalTask project={project} task={task} isOpen={isModalOpen} onCloseAction={()=> closeAction()} isModification={true}/>


                </div>


                <div className={"flex-col gap15"}>

                    <div className={"flex-row gap8"}>
                        <p className="inter12400 grey600">Echéance : </p>
                        <DueDate date={task?.dueDate} isDisplay />
                    </div>
                    <div className={"flex-row align-center gap15"}>
                        <p className="inter12400 grey600">Assigné à : </p>
                        {task?.assignees?.map((assignee, index) => (
                            <div className="flex-row gap8" key={index}>
                                <Tags
                                    label={getInitials(assignee.user.name) ?? ""}
                                    font="inter10400"
                                    padding="8px 5px"
                                    width="27px"
                                    height="27px"
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
                                    height="25px"
                                    backgroundColor="grey-200"
                                    textColor="grey600"
                                />
                            </div>
                        ))}

                    </div>
                </div>
                <CommentSection task={task} project={project}/>

            </div>

        </div>

    )

}