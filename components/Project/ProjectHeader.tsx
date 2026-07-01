import styles from "@/app/(with-layout)/project/[id]/Project.module.css";
import Button from "@/components/input/Button/Button";
import ModalTask from "@/components/Modal/Task/ModalTask";
import Image from "next/image";
import {Project} from "@/app/types/Project";
import {useContext, useState} from "react";
import {RefreshContext} from "@/app/contexts/RefreshContext/RefreshContext";
import ModalProject from "@/components/Modal/Project/ModalProject";
import ModalIA from "@/components/Modal/ModalIA/ModalIA";


interface ProjectHeaderProps {
    project: Project,
}

export function ProjectHeader({project}: ProjectHeaderProps){

    const [isCreationTaskModalOpen, setIsCreationTaskModalOpen] = useState(false);
    const [isModalProjectOpen, setModalProjectOpen] = useState(false);
    const [isModalIAOpen, setModalIAOpen] = useState(false);

    const {refresh} = useContext(RefreshContext);

    // Function called when closing the modal, hide the modal and refresh the page components
    function modalCloseAction(){

        if(isCreationTaskModalOpen)
            setIsCreationTaskModalOpen(false)


        if(isModalProjectOpen) {
            setModalProjectOpen(false)
        }

        if(isModalIAOpen){
            setModalIAOpen(false)
        }

        refresh()
    }

    return (
        <div className={`flex-row align-center justify-space-between ${styles.projectheader}`}>
            <div className={`flex-col  ${styles.dashboardheadertext}`}>
                <div className={"flex-row align-center gap8"}>
                    <h1 className="grey800">{project?.name}</h1>
                    <p className={"inter14400 dark-orange underline"} onClick={()=> setModalProjectOpen(true)}>Modifier</p>
                    <ModalProject isOpen={isModalProjectOpen}
                                  onCloseAction={() => modalCloseAction()}
                                  setIsOpen={setModalProjectOpen}
                                  isModification={true}
                                  isCreation={false}
                                  project={project}
                    />

                </div>
                <p className="inter18400 grey600">{project?.description}</p>
            </div>
            <div className="flex-row gap15">
                <Button text={"Créer une tâche"} width={"141px"} onClick={() => setIsCreationTaskModalOpen(true)} />
                <ModalTask project={project}
                           isOpen={isCreationTaskModalOpen}
                           onCloseAction={modalCloseAction}
                           isCreation={true} />


                <Button text={"IA"}
                        width={"94px"}
                        icon={
                            <Image
                                src="/star.svg"
                                alt="search"
                                width={16}
                                height={16}
                            />
                        } variant={"darkorange"}
                        onClick={() => setModalIAOpen(true)}
                />
                <ModalIA isOpen={isModalIAOpen} setIsOpen={setModalIAOpen} onCloseAction={modalCloseAction}/>
            </div>


        </div>
    )

}


