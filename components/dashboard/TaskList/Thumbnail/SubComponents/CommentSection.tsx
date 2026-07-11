import commentedStyles from "@/components/dashboard/TaskList/Thumbnail/CommentedThumbnail.module.css";
import React, {useContext, useEffect, useState} from "react";
import {formatCommentDate, getInitials} from "@/lib/utils";
import Tags from "@/components/Tags/Tags";
import TextInput from "@/components/input/TextInput/TextInput";
import Button from "@/components/input/Button/Button";
import {Task} from "@/app/types/Task";
import {useUser} from "@/app/contexts/useUser";
import {createComment} from "@/lib/projectsService";
import {Project} from "@/app/types/Project";
import {RefreshContext} from "@/app/contexts/RefreshContext/RefreshContext";

interface CommentSectionProps{

    project?: Project,
    task?: Task
}

export function CommentSection({project,task}:CommentSectionProps){

    const [commentsVisible, setCommentsVisible] = useState(false)
    const [comment, setComment] = useState("");

    const {refresh} = useContext(RefreshContext);

    const {user} = useUser()

    useEffect(() => {



    }, [commentsVisible]);

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault()
        if(comment.trim().length > 0) {
            await createComment(project.id, task?.id, comment)
            refresh()
            setComment("");
        }
    }

    return(

        <div className={`flex-col gap10 ${commentedStyles.comments}`}>
            <hr className="separator" />

            <button
                type="button"
                className="flex-row justify-space-between max-h-100 align-center"
                onClick={() => setCommentsVisible(prev => !prev)}
                aria-expanded={commentsVisible}
                aria-label={
                    commentsVisible
                        ? "Masquer les commentaires"
                        : "Afficher les commentaires"
                }
                style={{
                    cursor: "pointer",
                    width: "100%",
                    border: "none",
                    background: "transparent",
                    padding: 0,
                }}
            >
                <p className="inter14400 grey800">
                    Commentaires ({task?.comments?.length})
                </p>

                <img
                    src={commentsVisible ? "/arrowdown.svg" : "/arrowup.svg"}
                    alt=""
                    width={16}
                    height={8}
                />
            </button>

            <div
                className={`${commentedStyles.commentsContent} ${
                    commentsVisible ? commentedStyles.open : ""
                }`}
            >
                <form className={"flex-col gap10"} onSubmit={handleSubmit}>

                    {task?.comments?.map((taskComment, index) => (
                        <div className={"flex-row gap15"} key={index}>
                            <Tags
                                label={getInitials(taskComment.author.name) ?? ""}
                                font="inter10400"
                                padding="8px 5px"
                                width="27px"
                                height="27px"
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

                    <div className={"flex-row margintop10 gap15"}>
                        <Tags
                            label={getInitials(
                                ` ${user?.firstName} ${user?.lastName}`
                            ) ?? ""}
                            font="inter10400"
                            padding={"8px 5px"}
                            width={"27px"}
                            height={"27px"}
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
                            type={"submit"}
                            disabled={comment.trim() === ""}
                        />
                    </div>

                </form>
            </div>
        </div>
    )

}