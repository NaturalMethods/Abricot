import Modal from "@/components/Modal/Modal";
import React from "react";
import TextInput from "@/components/input/TextInput/TextInput";
import Button from "@/components/input/Button/Button";
import Image from "next/image";
import styles from "../Modal.module.css"

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isCreation?: boolean
    isModification?: boolean

}


export default function ModalProject({isOpen, setIsOpen, isCreation,isModification}:ModalProps){



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
                    <h2>Créer un projet</h2>
                    <TextInput label={"Titre*"} width={"452px"}/>
                    <TextInput label={"Description*"} width={"452px"} />
                    <TextInput label={"Contributeurs"} width={"452px"} />
                </div>
                <Button type={"submit"} text={"Ajouter un projet"} width={"181px"} />
            </div>
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
                    <TextInput label={"Titre*"} width={"452px"}/>
                    <TextInput label={"Description*"} width={"452px"} />
                    <TextInput label={"Contributeurs"} width={"452px"} />
                </div>
                <Button type={"submit"} text={"Enregistrer"} width={"181px"} />
            </div>
        </div>}
    </Modal>

)}