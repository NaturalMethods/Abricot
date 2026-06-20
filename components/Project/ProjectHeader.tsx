import styles from "@/app/(with-layout)/project/[id]/Project.module.css";
import Button from "@/components/input/Button/Button";
import ModalTask from "@/components/Modal/Task/ModalTask";
import Image from "next/image";
import {Project} from "@/app/types/Project";
import {useState} from "react";


interface ProjectHeaderProps {
    project: Project,
}

export function ProjectHeader({project}: ProjectHeaderProps){

    const [isCreationTaskModalOpen, setIsCreationTaskModalOpen] = useState(false);

    return (
        <div className={`flex-row align-center justify-space-between ${styles.projectheader}`}>
            <div className={`flex-col  ${styles.dashboardheadertext}`}>
                <h1 className="grey800">{project?.name}</h1>
                <p className="inter18400 grey600">{project?.description}</p>
            </div>
            <div className="flex-row gap15">
                <Button text={"Créer une tâche"} onClick={() => setIsCreationTaskModalOpen(true)} />
                <ModalTask project={project}
                           isOpen={isCreationTaskModalOpen}
                           onCloseAction={() => setIsCreationTaskModalOpen(false)}
                           setIsOpen={setIsCreationTaskModalOpen}
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
                        } variant={"darkorange"} />
            </div>


        </div>
    )

}


