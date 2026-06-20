"use client"

import Modal from "@/components/Modal/Modal"
import React, { useState } from "react"
import TextInput from "@/components/input/TextInput/TextInput"
import Button from "@/components/input/Button/Button"
import Image from "next/image"
import styles from "../Modal.module.css"
import Thumbnail from "@/components/dashboard/TaskList/Thumbnail/Thumbnail"
import { Task } from "@/app/types/Task"
import Tags from "@/components/Tags/Tags"
import Dropdown, { Option } from "@/components/input/Dropdown/Dropdown"
import { Project } from "@/app/types/Project"
import {createTask, modifyTask} from "@/lib/projectsService"
import { useRouter } from "next/navigation"

type ModalProps = {
    isOpen: boolean
    onCloseAction: () => void
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isCreation?: boolean
    isModification?: boolean
    isShow?: boolean
    project?: Project
    task?: Task
}

export default function ModalTask({
                                      isOpen,
                                      setIsOpen,
                                      isCreation,
                                      isShow,
                                      isModification,
                                      project,
                                      onCloseAction,
                                      task,
                                  }: ModalProps) {

    const router = useRouter()

    const projectId = project?.id

    const assignedToOptions: Option[] = [
        ...(project?.owner
            ? [
                {
                    label: project.owner.name,
                    value: project.owner.id,
                },
            ]
            : []),
        ...(project?.members?.map((member) => ({
            label: member.user.name,
            value: member.user.id,
        })) || []),
    ]

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")

    const isFormValid = title.trim().length > 0

    function closeModal() {
        setTitle("")
        setDescription("")
        setDueDate("")
        setIsOpen(false)
        onCloseAction()
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!isFormValid) return
        if (!projectId) return

        if(isCreation) {
            const resp = await createTask({
                id: projectId,
                name: title.trim(),
                description: description.trim(),
            })
            if (resp?.success) {
                closeModal()
                router.push(`/project/${projectId}`)
            }
        }
        if(isModification) {

            const resp = await modifyTask({
                id: projectId,
                name: title.trim(),
                description: description.trim(),
            },task?.id)
            if (resp?.success) {
                closeModal()
                router.push(`/project/${projectId}`)
            }

        }

    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            {isCreation && (
                <div className={`flex-col align-center gap15 ${styles.padding}`}>
                    <form onSubmit={handleSubmit}>
                        {/* CLOSE */}
                        <div className="flex-row flex-row-end max-w-100">
                            <Image
                                src="/cross.svg"
                                width={15}
                                height={15}
                                alt="Close modal"
                                onClick={closeModal}
                                style={{ cursor: "pointer" }}
                            />
                        </div>

                        <div className="flex-col gap56">
                            <div className="flex-col gap30">
                                <h2>Créer une tâche</h2>

                                <TextInput
                                    label="Titre*"
                                    value={title}
                                    width="452px"
                                    ariaLabel="Titre"
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                />

                                <TextInput
                                    label="Description*"
                                    value={description}
                                    width="452px"
                                    ariaLabel="Description"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />

                                <TextInput
                                    label="Échéance*"
                                    value={dueDate}
                                    width="452px"
                                    ariaLabel="Date d'échéance"
                                    showIcon
                                    iconSrc="/minicalendar.svg"
                                    altIcon="Icone de calendrier"
                                    onChange={(e) =>
                                        setDueDate(e.target.value)
                                    }
                                />

                                <Dropdown
                                    label="Assigné à :"
                                    width="100%"
                                    justify="space-between"
                                    options={assignedToOptions}
                                    placeHolder="Choisir un ou plusieurs collaborateurs"
                                />

                                <div className="flex-col gap15">
                                    <p className="inter14400">Statut:</p>
                                    <div className="flex-row gap8">
                                        <Tags label="TODO" width="75px" height="25px" />
                                        <Tags label="IN_PROGRESS" width="75px" height="25px" />
                                        <Tags label="DONE" width="75px" height="25px" />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                text="+ Ajouter une tâche"
                                width="181px"
                                disabled={!isFormValid}
                            />
                        </div>
                    </form>
                </div>
            )}

            {isShow && (
                <div className={`flex-col align-center gap15 ${styles.padding}`}>
                    <Thumbnail task={task} isModal format="commented" />
                </div>
            )}

            {isModification && (
                <div className={`flex-col align-center gap15 ${styles.padding}`}>
                    <form onSubmit={handleSubmit}>
                        {/* CLOSE */}
                        <div className="flex-row flex-row-end max-w-100">
                            <Image
                                src="/cross.svg"
                                width={15}
                                height={15}
                                alt="Close modal"
                                onClick={closeModal}
                                style={{ cursor: "pointer" }}
                            />
                        </div>

                        <div className="flex-col gap56">
                            <div className="flex-col gap30">
                                <h2>Modifier une tâche</h2>

                                <TextInput
                                    label="Titre*"
                                    value={title}
                                    width="452px"
                                    ariaLabel="Titre"
                                    placeholder={task?.title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                />

                                <TextInput
                                    label="Description*"
                                    value={description}
                                    width="452px"
                                    placeholder={task?.description}
                                    ariaLabel="Description"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />

                                <TextInput
                                    label="Échéance*"
                                    value={dueDate}
                                    width="452px"
                                    ariaLabel="Date d'échéance"
                                    showIcon
                                    placeholder={task?.dueDate}
                                    iconSrc="/minicalendar.svg"
                                    altIcon="Icone de calendrier"
                                    onChange={(e) =>
                                        setDueDate(e.target.value)
                                    }
                                />

                                <Dropdown
                                    label="Assigné à :"
                                    width="100%"
                                    justify="space-between"
                                    options={assignedToOptions}
                                    placeHolder="Choisir un ou plusieurs collaborateurs"
                                />

                                <div className="flex-col gap15">
                                    <p className="inter14400">Statut:</p>
                                    <div className="flex-row gap8">
                                        <Tags label="TODO" width="75px" height="25px" />
                                        <Tags label="IN_PROGRESS" width="75px" height="25px" />
                                        <Tags label="DONE" width="75px" height="25px" />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                text="+ Ajouter une tâche"
                                width="181px"
                                disabled={!isFormValid}
                            />
                        </div>
                    </form>
                </div>
            )}

        </Modal>
    )
}