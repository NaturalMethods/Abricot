import Modal from "@/components/Modal/Modal";
import React from "react";
import TextInput from "@/components/input/TextInput/TextInput";
import Button from "@/components/input/Button/Button";
import Image from "next/image";
import styles from "../Modal.module.css"
import Thumbnail from "@/components/dashboard/TaskList/Thumbnail/Thumbnail";
import {Task} from "@/app/types/Task";
import Tags from "@/components/Tags/Tags";
import Dropdown from "@/components/input/Dropdown/Dropdown";

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isCreation?: boolean
    isModification?: boolean
    isShow?: boolean
    project?:[]
    task?: Task
}


export default function ModalTask({isOpen, setIsOpen, isCreation, isShow, project, task}:ModalProps){

    const assignedToOptions = [
        { label: "", value: null },
        {label: project?.owner?.name, value: project?.owner?.id},
        ...(project?.members?.map(member => ({
            label: member.user.name, // ou member.name
            value: member.user.id        // ou member.username
        })) || [])
    ];

    return (

        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        >
            { isCreation && <div className={`flex-col  align-center gap15 ${styles.padding}`}>
                <div className={"flex-row flex-row-end max-w-100 "}>
                    <Image src={"/cross.svg"}
                           width={15}
                           height={15}
                           alt={"Close modal"}
                           onClick={() => setIsOpen(false)}
                           style={{ cursor: "pointer" }}
                    />
                </div>
                <div className={"flex-col gap56"}>
                    <div className={"flex-col gap30"}>
                        <h2>Créer une tâche</h2>
                        <TextInput label={"Titre*"} width={"452px"} ariaLabel={"Titre"}/>
                        <TextInput label={"Description*"} width={"452px"} ariaLabel={"Description"} />
                        <TextInput label={"Echéance*"} width={"452px"} ariaLabel={"Date d'échéance"} showIcon={true} iconSrc={"/minicalendar.svg"} altIcon={"Icone de calendrier"}/>

                        <div className={"flex-col gap8"}>
                            <Dropdown label={"Assigné à :"} width={"100%"} justify={"flex-end"} options={assignedToOptions} placeHolder={" "} />
                        </div>
                        <div className={"flex-col gap15"}>
                            <p className={"inter14400"}>Statut:</p>
                            <div className={"flex-row gap8"}>
                                <Tags label={"TODO"} width={"75px"} height={"25px"} />
                                <Tags label={"IN_PROGRESS"} width={"75px"} height={"25px"} />
                                <Tags label={"DONE"} width={"75px"} height={"25px"} />
                            </div>
                        </div>
                    </div>
                    <Button type={"submit"} text={"+ Ajouter une tâche"} width={"181px"} />
                </div>
            </div>}

            { isShow && <div className={`flex-col  align-center gap15 ${styles.padding}`}>
                <Thumbnail task={task} isModal={true} format={"commented"}/>
            </div>}
        </Modal>

    )}