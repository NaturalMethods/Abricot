"use client"

import ProjectGrid from "@/components/Projects/ProjectGrid";
import styles from "@/app/(with-layout)/projects/Projects.module.css"
import {useContext, useEffect, useState} from "react";
import {Project} from "@/app/types/Project";
import {getProjects} from "@/lib/projectsService";
import Button from "@/components/input/Button/Button";
import ModalProject from "@/components/Modal/Project/ModalProject";
import {fetchDatas, setPageTitle} from "@/lib/utils";
import { RefreshContext } from "@/app/contexts/RefreshContext/RefreshContext";

export default function ProjectsContent (){

    const [projects, setProjects] = useState<Project[]>([])
    const [isOpen, setIsOpen] = useState(false)

    const { refresh, reloadKey } = useContext(RefreshContext);

    useEffect(() => {
        fetchDatas(() => getProjects(), setProjects);
    }, [reloadKey]);

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
    }, [])

    function modalCloseAction(){
        setIsOpen(false)
        refresh()
    }

    return(
        <section className={`flex-col align-center ${styles.projectpage}`}>
            <div className={`flex-col align-start w-full max-w-[1300px] mx-auto px-4 ${styles.projectcontainer}`}>

                <div className={`flex-col gap-2 sm:gap-0 sm:flex-row align-center justify-space-between sm:h-[70px] ${styles.projectheader}`}>
                    <div className={`flex-col  ${styles.dashboardheadertext}`}>
                        <h1 className="grey800">Mes projets</h1>
                        <p className="inter18400">Gérez vos projets</p>
                    </div>

                    <Button width={"180px"} height={"50px"} text={"+ Créer un projet"} onClick={() => setIsOpen(true)} />
                    <ModalProject isOpen={isOpen} onCloseAction={() => modalCloseAction()} setIsOpen={setIsOpen}
                                  isCreation={true} isModification={false} />

                </div>
                    <ProjectGrid projects={projects}/>
            </div>

        </section>
    )
}
