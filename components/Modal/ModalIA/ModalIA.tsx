import Modal from "@/components/Modal/Modal";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../Modal.module.css";
import {Project} from "@/app/types/Project";
import Thumbnail from "@/components/dashboard/TaskList/Thumbnail/Thumbnail";
import TextInput from "@/components/input/TextInput/TextInput";
import {askIA} from "@/lib/projectsService";
import {LoadingSpinner} from "@/components/LoadingSpinner/LoadingSpinner";

interface ModalIAProps{

    isOpen: any,
    setIsOpen? : any,
    onCloseAction : () => void,
    project?:Project,

}

export default function ModalIA({
                                         isOpen,
                                         setIsOpen,
                                         onCloseAction,
                                         project,
                                     }: ModalIAProps) {

    const [prompt, setPrompt] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setIATasks] = useState()
    const [loading, setLoading] = useState(false)

    function closeModal() {
        onCloseAction();
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();



        async function getTasksFromIa() {
            setLoading(true)
            setPrompt("")
            try {
                setIATasks(await askIA(prompt))
            }finally{
                setLoading(false);

            }
        }
        getTasksFromIa()
    }

    return (
        <Modal isOpen={isOpen} onCloseAction={() => setIsOpen(false)}>

                <div className={`flex-col align-center gap15 ${styles.padding}`}>
                    <form onSubmit={handleSubmit}>

                        <div className="flex-row flex-row-end max-w-100">
                            <Image loading={"eager"}
                                src="/cross.svg"
                                width={15}
                                height={15}
                                alt="close"
                                onClick={closeModal}
                                style={{ cursor: "pointer" }}
                            />
                        </div>

                        <div className="flex-col gap56">

                            <div className="flex-col max-w-100 gap30">

                                <div className={"flex-row gap8 align-center"}>
                                    <Image loading={"lazy"} width={21} height={21} src={"/Star1.svg"} alt={"Twinkle twinkle little star"}/>
                                    <h2>Créer une tâche</h2>
                                </div>
                                <div className={"flex-col gap24 max-w-100"}>

                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : tasks && tasks.length > 0 ? (
                                        tasks.map((task, index) => (
                                            <div key={index} className="h-fit sm:h-[146px]">
                                                <Thumbnail
                                                    task={task}
                                                    format="IA"
                                                    height="100%"
                                                    project={project}
                                                    onCloseAction={onCloseAction}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex-col gap24 max-w-100">
                                            <Thumbnail format="IA" height="146px" />
                                            <Thumbnail format="IA" height="146px" />
                                            <Thumbnail format="IA" height="146px" />
                                        </div>
                                    )}

                                </div>

                                <div className={"w-full"}>
                                    <TextInput width={"100%"}
                                               label={""}
                                               placeholder={"Décrivez les tâches que vous souhaitez ajouter..."}
                                               altIcon={"Petite étoile"}
                                               iconSrc={"/IA Button.svg"}
                                               iconWidth={24}
                                               iconHeight={24}
                                               showIcon={true}
                                               backgroundColor={"grey-50"}
                                               border={"none"}
                                               borderRadius={"80px"}
                                               value={prompt}
                                               onChange={(e) => {
                                                   setPrompt(e.target.value)
                                               }}
                                    />
                                </div>

                            </div>

                        </div>

                    </form>
                </div>

        </Modal>
    );
}