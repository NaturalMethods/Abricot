import Modal from "@/components/Modal/Modal";
import React, {useState} from "react";
import TextInput from "@/components/input/TextInput/TextInput";
import Button from "@/components/input/Button/Button";
import Image from "next/image";
import styles from "../Modal.module.css"
import Dropdown from "@/components/input/Dropdown/Dropdown";
import {createProject} from "@/lib/projectsService";

type ModalProps = {
    isOpen: boolean
    onCloseAction: () => void
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isCreation?: boolean
    isModification?: boolean


}


export default function ModalProject({isOpen, setIsOpen, onCloseAction, isCreation,isModification}:ModalProps){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [contributors, setContributors] = useState<string[]>();

    const isFormValid =
        title.trim().length > 0 &&
        description.trim().length > 0;

    function closeModal() {

        setTitle("");
        setDescription("");
        onCloseAction()
        setIsOpen(false)
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!isFormValid) return

        async function postProject() {

            const resp = await createProject({
                name: title.trim(),
                description: description.trim(),

            })
            console.log("Reussi")
            if (resp?.success) {

                closeModal()
            }
        }
        postProject()
    }

return (

    <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
    >
        { isCreation && <div className={`flex-col  align-center gap15 ${styles.padding}`}>
            <form onSubmit={handleSubmit}>
                <div className={"flex-row flex-row-end max-w-100 "}>
                    <Image src={"/cross.svg"}
                           width={15}
                           height={15}
                           alt={"Close modal"}
                           onClick={() => closeModal()}
                           style={{ cursor: "pointer" }}
                    />
                </div>
                <div className={"flex-col gap56"}>
                    <div className={"flex-col gap30"}>
                        <h2>Créer un projet</h2>
                        <TextInput label={"Titre*"} value={title} width={"452px"} onChange={(e) => setTitle(e.target.value)}/>
                        <TextInput label={"Description*"} value={description} width={"452px"} onChange={(e) => setDescription(e.target.value)} />
                        <Dropdown
                            multiSelect
                            width={"100%"}
                            justify={"space-between"}
                            label="Contributeurs"
                            placeHolder="Choisir un ou plusieurs collaborateurs"

                            onChange={(userIds) => {
                                console.log(userIds)
                            }}
                        />
                    </div>
                    <Button type={"submit"} text={"Ajouter un projet"} width={"181px"} disabled={!isFormValid} />
                </div>
            </form>
        </div>}

        { isModification && <div className={`flex-col  align-center gap15 ${styles.padding}`}>
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
                    <h2>Créer un projet</h2>
                    <TextInput label={"Titre*"} width={"452px"} onChange={(e) => setTitle(e.target.value)}/>
                    <TextInput label={"Description*"} width={"452px"} onChange={(e) => setDescription(e.target.value)} />
                    <TextInput label={"Contributeurs"} width={"452px"} />
                </div>
                <Button type={"submit"} text={"Enregistrer"} width={"181px"} disabled={!isFormValid} />
            </div>
        </div>}
    </Modal>

)}