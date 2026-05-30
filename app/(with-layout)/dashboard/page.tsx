"use client"

import Button from "@/components/input/Button/Button";
import styles from "@/app/(with-layout)/dashboard/Dashboard.module.css";
import {useUser} from "@/app/contexts/useUser";
import TaskList from "@/components/dashboard/TaskList/TaskList";



export default function DashboardPage (){

    const {user} = useUser()

    return(
        <section className={`flex-col align-center ${styles.dashboardpage}`}>

            <div className={`flex-col align-center ${styles.dashboardcontainer}`}>
                <div className={`flex-row align-center justify-space-between ${styles.dashboardheader}`}>
                    <div className={`flex-col  ${styles.dashboardheadertext}`}>
                        <h4 className="grey800">Tableau de bord</h4>
                        <p className="inter18400">Bonjour {user?.firstName} {user?.lastName}, voici un aperçu de vos projets et tâches</p>
                    </div>

                    <Button text={"+ Créer un projet"}/>
                </div>

                <TaskList />

            </div>

        </section>

    )
}
