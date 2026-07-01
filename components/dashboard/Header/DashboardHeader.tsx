
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

        <div className={`flex flex-col gap-4 md:flex-row items-center md:justify-between w-full pt-[75px] pb-[75px] md:h-[70px] pl-2 pr-2 sm:ml-0 sm:mr-0`}>

            <div className={`flex flex-col  gap-[14px] items-center sm:items-start `}>
                <h1 className="grey800">Tableau de bord</h1>
                <p className="inter18400">Bonjour {firstName} {lastName}, voici un aperçu de vos projets et tâches</p>
            </div>

            <Button width={"180px"} text={"+ Créer un projet"} onClick={() => setIsModalOpen(true)} />
            <ModalProject isOpen={isModalOpen} onCloseAction={() => setIsModalOpen(false)} setIsOpen={setIsModalOpen} isCreation={true}/>
        </div>


    )
}