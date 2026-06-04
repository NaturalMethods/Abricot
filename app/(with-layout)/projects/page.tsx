"use client"

import ProjectGrid from "@/components/Projects/ProjectGrid";
import styles from "@/app/(with-layout)/projects/Projects.module.css"
import {useEffect, useState} from "react";
import {Project} from "@/app/types/Project";
import {getProjects} from "@/lib/projectsService";
import Button from "@/components/input/Button/Button";

export default function ProjectsPage (){

    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        async function fetchTasks() {
            try {
                const data = await getProjects()
                setProjects(data.projects)
            } catch (error) {
                console.error(error)
            }
        }

        fetchTasks()
    }, [])

    return(
        <section className={`flex-col align-center ${styles.projectpage}`}>
            <div className={`flex-col align-start ${styles.projectcontainer}`}>

                <div className={`flex-row align-center justify-space-between ${styles.projectheader}`}>
                        <div className={`flex-col  ${styles.dashboardheadertext}`}>
                            <h4 className="grey800">Mes projets</h4>
                            <p className="inter18400">Gérez vos projets</p>
                        </div>

                        <Button text={"+ Créer un projet"} />
                </div>
                <ProjectGrid projects={projects}/>
            </div>

        </section>
    )
}
