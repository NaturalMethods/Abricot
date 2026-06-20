"use client"
import {useParams, useRouter} from "next/navigation"
import {useEffect, useState} from "react";
import {Project} from "@/app/types/Project";
import {deleteTask, getProject} from "@/lib/projectsService";
import styles from "@/app/(with-layout)/project/[id]/Project.module.css";
import {fetchDatas,setPageTitle} from "@/lib/utils";
import AssignedTasks from "@/components/Projects/AssignedTasks/AssignedTasks";
import {ProjectHeader} from "@/components/Project/ProjectHeader";
import {ContributorsHeader} from "@/components/Project/Contributors/Contributors";

export default function singleProjectsPage (){

    const params = useParams()

    const id = params.id as string
    const [project, setProject] = useState<Project|null>()
    const [isOpen, setIsOpen] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)
    const [isModalCreation, setIsModalCreation] = useState(true);

    function refreshTasks() {
        setRefreshKey((k) => k + 1)
    }

    function edTask(){

        openModal(false)
        console.log("Ed")
        refreshTasks()
    }
    function delTask(id: string){
        console.log("Del ")
        deleteTask(id, project?.id)
        refreshTasks()
    }

    function closeModal() {
        refreshTasks()
    }

    function openModal(isCreation: boolean) {

        if(!isCreation)
            setIsModalCreation(false)
        else
            setIsModalCreation(true)

        setIsOpen(true)
    }

    useEffect(() => {
        fetchDatas(()=> getProject(id),setProject)
        setPageTitle(project?.name)

    }, [])

    return(
        <section className={`flex-col align-center ${styles.projectpage}`}>
            <div className={`flex-col align-start gap30 ${styles.projectcontainer}`}>

                <ProjectHeader project={project} />

                <ContributorsHeader project={project}/>

                <AssignedTasks id={id} refreshKey={refreshKey} edTask={edTask} delTask={delTask} />
            </div>

        </section>


    )
}
