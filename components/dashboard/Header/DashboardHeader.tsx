
import styles from "@/app/(with-layout)/dashboard/Dashboard.module.css";
import Button from "@/components/input/Button/Button";
import ModalProject from "@/components/Modal/Project/ModalProject";
import {useState} from "react";

interface DashboardHeaderProps{

    firstName: string|undefined|null
    lastName: string|undefined|null

}

export function DashboardHeader({firstName, lastName}:DashboardHeaderProps){

    const [isModalOpen, setIsModalOpen] = useState(false);

    return(

        <div className={`flex-row align-center justify-space-between ${styles.dashboardheader}`}>

            <div className={`flex-col  ${styles.dashboardheadertext}`}>
                <h1 className="grey800">Tableau de bord</h1>
                <p className="inter18400">Bonjour {firstName} {lastName}, voici un aperçu de vos projets et tâches</p>
            </div>

            <Button text={"+ Créer un projet"} onClick={() => setIsModalOpen(true)} />
            <ModalProject isOpen={isModalOpen} onCloseAction={() => setIsModalOpen(false)} setIsOpen={setIsModalOpen} isCreation={true}/>
        </div>


    )
}