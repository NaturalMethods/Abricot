"use client"

import styles from "@/app/(with-layout)/dashboard/Dashboard.module.css";
import {useUser} from "@/app/contexts/useUser";
import TaskList from "@/components/dashboard/TaskList/TaskList";
import React, {useContext, useEffect, useState} from "react";
import Chips from "@/components/input/Chips/Chips";
import {getTasksList} from "@/lib/dashboardService";
import {Task} from "@/app/types/Task";
import Kanban from "@/components/dashboard/Kanban/Kanban";
import {fetchDatas, setPageTitle} from "@/lib/utils";
import {DashboardHeader} from "@/components/dashboard/Header/DashboardHeader";
import { RefreshContext } from "@/app/contexts/RefreshContext/RefreshContext";
import {LoadingSpinner} from "@/components/LoadingSpinner/LoadingSpinner";
import {RefreshProvider} from "@/app/contexts/RefreshContext/RefreshProvider";

export default function DashboardContent (){

    const [kanbanVisible, setKanbanVisible] = useState(false)
    const [tasksList, setTasksList] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)

    function switchPanel(){
        if(kanbanVisible) setKanbanVisible(false)
        else setKanbanVisible(true)
    }

    const {reloadKey} = useContext(RefreshContext)

    useEffect(() => {

        fetchDatas(() => getTasksList(), setTasksList, setLoading);

    }, [reloadKey]);

    useEffect(() => {
        setPageTitle("Tableau de bord")
    }, [])

    const {user} = useUser()
    return(
        <section className={`flex flex-col items-center w-full  min-h-screen  ${styles.dashboardpage}`}>
            <>
                {loading ? (
                    <LoadingSpinner />
                ) :(
                    <div className={`flex flex-col items-center lg:w-[90vw] lg:min-w-[700px] lg:max-w-[1300px] pb-[50px]`}>
                        <DashboardHeader firstName={user?.firstName} lastName={user?.lastName} />


                        <div className={`flex flex-row justify-start gap-2.5 w-full pb-6 `}>
                            <Chips text={"Liste"} onClick={switchPanel} active={!kanbanVisible}/>
                            <Chips text={"Kanban"} srcIcon={"/orangeminical.svg"} onClick={switchPanel} active={kanbanVisible}/>
                        </div>

                        <TaskList tasksList={tasksList} visible={!kanbanVisible} />
                        <Kanban tasksList={tasksList} visible={kanbanVisible}  />


                    </div>
                )}
            </>
        </section>

    )
}
