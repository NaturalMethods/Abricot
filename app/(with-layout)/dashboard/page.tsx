"use client"

import styles from "@/app/(with-layout)/dashboard/Dashboard.module.css";
import {useUser} from "@/app/contexts/useUser";
import TaskList from "@/components/dashboard/TaskList/TaskList";
import {useEffect, useState} from "react";
import Chips from "@/components/input/Chips/Chips";
import {getTasksList} from "@/lib/dashboardService";
import {Task} from "@/app/types/Task";
import Kanban from "@/components/dashboard/Kanban/Kanban";
import {fetchDatas, setPageTitle} from "@/lib/utils";
import {DashboardHeader} from "@/components/dashboard/Header/DashboardHeader";


export default function DashboardPage (){

    const [kanbanVisible, setKanbanVisible] = useState(false)
    const [tasksList, setTasksList] = useState<Task[]>([])

    function switchPanel(){
        if(kanbanVisible) setKanbanVisible(false)
        else setKanbanVisible(true)
    }

    useEffect(() => {
        setPageTitle("Tableau de bord")
        fetchDatas(() => getTasksList(), setTasksList)
    }, [])

    const {user} = useUser()
    return(
        <section className={`flex-col align-center ${styles.dashboardpage}`}>

            <div className={`flex-col align-center ${styles.dashboardcontainer}`}>
                <DashboardHeader firstName={user?.firstName} lastName={user?.lastName} />

                <div className={`flex-row flex-start gap10 ${styles.chips}`}>
                    <Chips text={"Liste"} onClick={switchPanel} active={!kanbanVisible}/>
                    <Chips text={"Kanban"} onClick={switchPanel} active={kanbanVisible}/>
                </div>

                <TaskList tasksList={tasksList} visible={!kanbanVisible} />
                <Kanban tasksList={tasksList} visible={kanbanVisible}  />

            </div>
        </section>

    )
}
