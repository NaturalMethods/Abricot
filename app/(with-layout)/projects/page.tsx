"use client"

import ProjectGrid from "@/components/Projects/ProjectGrid";
import styles from "@/app/(with-layout)/projects/Projects.module.css"
import {useEffect, useState} from "react";
import {Project} from "@/app/types/Project";
import {getProjects} from "@/lib/projectsService";
import Button from "@/components/input/Button/Button";
import ModalProject from "@/components/Modal/Project/ModalProject";
import {setPageTitle} from "@/lib/utils";

export default function ProjectsPage (){

    const [projects, setProjects] = useState<Project[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)

    function refreshProjects() {
        setRefreshKey((k) => k + 1)
    }

    useEffect(() => {
        setPageTitle("Projets")
        async function fetchTasks() {
            try {
                const fetchProjects = await getProjects()
                setProjects(fetchProjects)
            } catch (error) {
                console.error(error)
            }
        }

        fetchTasks()
    }, [refreshKey])

    return(
        <section className={`flex-col align-center ${styles.projectpage}`}>
            <div className={`flex-col align-start ${styles.projectcontainer}`}>

                <div className={`flex-row align-center justify-space-between ${styles.projectheader}`}>
                        <div className={`flex-col  ${styles.dashboardheadertext}`}>
                            <h1 className="grey800">Mes projets</h1>
                            <p className="inter18400">Gérez vos projets</p>
                        </div>

                    <Button text={"+ Créer un projet"} onClick={() => setIsOpen(true)} />
                    <ModalProject isOpen={isOpen} onCloseAction={() => refreshProjects()} setIsOpen={setIsOpen} isCreation={true}/>

                </div>
                <ProjectGrid projects={projects}/>
            </div>

        </section>
    )
}
