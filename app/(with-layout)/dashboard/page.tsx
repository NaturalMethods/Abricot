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


export default function DashboardPage (){

    const [kanbanVisible, setKanbanVisible] = useState(false)

    function setKanbanPanelVisible(){
        setKanbanVisible(true)
    }
    function setListPanelVisible(){
        setKanbanVisible(false)
    }


    const [tasksList, setTasksList] = useState<Task[]>([])

    useEffect(() => {
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
                        <h4 className="grey800">Tableau de bord</h4>
                        <p className="inter18400">Bonjour {user?.firstName} {user?.lastName}, voici un aperçu de vos projets et tâches</p>
                    </div>

                    <Button text={"+ Créer un projet"} />
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
