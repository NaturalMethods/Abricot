"use client"

import Button from "@/components/input/Button/Button";
import styles from "@/app/(with-layout)/dashboard/Dashboard.module.css";
import {useUser} from "@/app/contexts/useUser";
import TaskList from "@/components/dashboard/TaskList/TaskList";
import {useEffect, useState} from "react";
import Chips from "@/components/input/Chips/Chips";
import {getTasksList} from "@/lib/dashboardService";
import {Task} from "@/app/types/Task";
import Kanban from "@/components/dashboard/Kanban/Kanban";
import ModalProject from "@/components/Modal/Project/ModalProject";
import {setPageTitle} from "@/lib/utils";


export default function DashboardPage (){

    const [kanbanVisible, setKanbanVisible] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    function setKanbanPanelVisible(){
        setKanbanVisible(true)
    }
    function setListPanelVisible(){
        setKanbanVisible(false)
    }


    const [tasksList, setTasksList] = useState<Task[]>([])

    useEffect(() => {
        setPageTitle("Tableau de bord")
        async function fetchTasks() {
            try {
                const data = await getTasksList()
                setTasksList(data.tasks)
            } catch (error) {
                console.error(error)
            }
        }

        fetchTasks()
    }, [])

    const {user} = useUser()
    return(
        <section className={`flex-col align-center ${styles.dashboardpage}`}>

            <div className={`flex-col align-center ${styles.dashboardcontainer}`}>
                <div className={`flex-row align-center justify-space-between ${styles.dashboardheader}`}>
                    <div className={`flex-col  ${styles.dashboardheadertext}`}>
                        <h1 className="grey800">Tableau de bord</h1>
                        <p className="inter18400">Bonjour {user?.firstName} {user?.lastName}, voici un aperçu de vos projets et tâches</p>
                    </div>

                    <Button text={"+ Créer un projet"} onClick={() => setIsOpen(true)} />
                    <ModalProject isOpen={isOpen} onClose={() => setIsOpen(false)} setIsOpen={setIsOpen} isCreation={true}/>
                </div>

                <div className={`flex-row flex-start gap10 ${styles.chips}`}>
                    <Chips text={"Liste"} onClick={setListPanelVisible} active={!kanbanVisible}/>
                    <Chips text={"Kanban"} onClick={setKanbanPanelVisible} active={kanbanVisible}/>
                </div>
                {!kanbanVisible && (
                    <TaskList tasksList={tasksList} />
                )}
                {kanbanVisible && (<Kanban tasksList={tasksList} />)}


            </div>

        </section>

    )
}
