"use client"

import Modal from "@/components/Modal/Modal"
import React, {useContext, useState} from "react"
import TextInput from "@/components/input/TextInput/TextInput"
import Button from "@/components/input/Button/Button"
import Image from "next/image"
import styles from "../Modal.module.css"
import Thumbnail from "@/components/dashboard/TaskList/Thumbnail/Thumbnail"
import { Task } from "@/app/types/Task"
import Dropdown, { Option } from "@/components/input/Dropdown/Dropdown"
import { Project } from "@/app/types/Project"
import {createTask, deleteTask, modifyTask} from "@/lib/projectsService"
import {Status, TagsSelect} from "@/components/Tags/TagsSelect";
import CalendarInput from "@/components/input/TextInput/CalendarInput";
import {RefreshContext} from "@/app/contexts/RefreshContext/RefreshContext";

type ModalProps = {
    isOpen: boolean
    onCloseAction: () => void
    isCreation?: boolean
    isModification?: boolean
    isShow?: boolean
    project?: Project
    task?: Task
}

export default function ModalTask({
                                      isOpen,
                                      isCreation,
                                      isShow,
                                      isModification,
                                      project,
                                      onCloseAction,
                                      task,
                                  }: ModalProps) {

    const projectId = project?.id

    const assignedToOptions: Option[] = Array.from(
        new Map(
            [
                ...(project?.owner
                    ? [{
                        label: project.owner.name,
                        value: project.owner.id,
                    }]
                    : []),
                ...(project?.members?.map((member) => ({
                    label: member.name,
                    value: member.id,
                })) ?? []),
            ].map((option) => [option.value, option])
        ).values()
    );

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [assignedTo, setAssignedTo] = useState<string|null|string[]>()
    const [status, setStatus] = useState<Status | null>(null)


    function isFormValid():boolean
    {
        if(isModification && (title.trim().length > 0 ||
            description.trim().length > 0 ||
            dueDate.trim().length > 0
            )) return true

        if(isCreation && (title.trim().length > 0 &&
            description.trim().length > 0 &&
            dueDate.trim().length > 0)) return true

        return false;

    }

    function closeModal() {
        setTitle("")
        setDescription("")
        setDueDate("")

        onCloseAction()
    }

    const {refresh} = useContext(RefreshContext);
    function edTask(){
        refresh()
    }
    async function delTask(taskId: string){
        await deleteTask(taskId, project?.id)
        refresh()
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!isFormValid()) return
        if (!projectId) return
        if(isCreation) {
            const resp = await createTask({
                id: projectId,
                name: title.trim(),
                description: description.trim(),
            }, dueDate,assignedTo ,status??"TODO")
            if (resp?.success) {
                closeModal()
                refresh()
            }
        }

        if (isModification) {

            const resp = await modifyTask(
                { id: projectId, name: project.name },
                {
                    id: task?.id ??"",
                    title: title !== "" ? title : task?.title ?? "",
                    description: description !== "" ? description : task?.description ?? "",
                    status: status ?? task?.status ?? "TODO",
                    dueDate: dueDate !== "" ? dueDate : task?.dueDate ?? "",
                },
                assignedTo
            );

            if (resp?.success) {
                closeModal();
            }
        }

    }

    return (
        <Modal isOpen={isOpen} onCloseAction={closeModal}>
            {isCreation && (
                <div className={`flex-col align-center gap15 ${styles.padding}`}>
                    <form onSubmit={handleSubmit}>
                        {/* CLOSE */}
                        <div className="flex-row flex-row-end max-w-100">
                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Fermer la fenêtre"
                            >
                                <Image
                                    src="/cross.svg"
                                    width={15}
                                    height={15}
                                    alt=""
                                />
                            </button>
                        </div>

                        <div className="flex-col gap56">
                            <div className="flex-col gap30">
                                <h2 className={"sm:w-[452px]"}>Créer une tâche</h2>

                                <TextInput
                                    label="Titre*"
                                    value={title}
                                    width="100%"
                                    ariaLabel="Titre"
                                    onChange={(e) => setTitle(e.target.value)}
                                                                 />

                                <TextInput
                                    label="Description*"
                                    value={description}
                                    width="100%"
                                    ariaLabel="Description"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />

                                <CalendarInput
                                    label="Échéance*"
                                    value={dueDate}
                                    width="100%"
                                    ariaLabel="Date d'échéance"
                                    onChange={setDueDate}
                                    iconSrc="/minicalendar.svg"
                                    altIcon="Icone de calendrier"
                                />

                                <Dropdown
                                    multiSelect
                                    label="Assigné à :"
                                    width="100%"
                                    justify="space-between"
                                    options={assignedToOptions}
                                    placeHolder="Choisir un ou plusieurs collaborateurs"
                                    onChange={(userIds) => {
                                        setAssignedTo(userIds)
                                    }}
                                />

                                <TagsSelect value={status} onChange={setStatus} />
                            </div>

                            <Button
                                type="submit"
                                text="+ Ajouter une tâche"
                                width="181px"
                                disabled={!isFormValid()}
                            />
                        </div>
                    </form>
                </div>
            )}

            {isShow && (
                <div className={`flex-col align-center gap15 ${styles.padding}`}>
                    <Thumbnail task={task} isModal format="commented"
                               project={project}
                               onEdit={() => edTask()}
                               onDelete={() => delTask(task?.id ?? "")}/>

                </div>
            )}

            {isModification && (
                <div className={`flex-col align-center gap15 ${styles.padding}`}>
                    <form onSubmit={handleSubmit}>
                        {/* CLOSE */}
                        <div className="flex-row flex-row-end max-w-100">
                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Fermer la fenêtre"
                            >
                                <Image
                                    src="/cross.svg"
                                    width={15}
                                    height={15}
                                    alt=""
                                />
                            </button>
                        </div>

                        <div className="flex-col gap56">
                            <div className="flex-col gap30">
                                <h2 className={"sm:w-[452px]"}>Modifier une tâche</h2>

                                <TextInput
                                    label="Titre*"
                                    value={title}
                                    width="100%"
                                    ariaLabel="Titre"
                                    placeholder={task?.title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                />

                                <TextInput
                                    label="Description*"
                                    value={description}
                                    width="100%"
                                    placeholder={task?.description}
                                    ariaLabel="Description"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />

                                <CalendarInput
                                    label="Échéance*"
                                    value={dueDate}
                                    width="100%"
                                    ariaLabel="Date d'échéance"
                                    onChange={setDueDate}
                                    iconSrc="/minicalendar.svg"
                                    altIcon="Icone de calendrier"
                                />

                                <Dropdown
                                    multiSelect
                                    label="Assigné à :"
                                    width="100%"
                                    justify="space-between"
                                    options={assignedToOptions}
                                    placeHolder="Choisir un ou plusieurs collaborateurs"
                                    onChange={(userIds) => {
                                        setAssignedTo(userIds)
                                    }}
                                />

                                <TagsSelect value={status} onChange={setStatus} />

                            </div>

                            <Button
                                type="submit"
                                text="Enregistrer"
                                width="181px"
                                disabled={!isFormValid()}
                            />
                        </div>
                    </form>
                </div>
            )}

        </Modal>
    )
}