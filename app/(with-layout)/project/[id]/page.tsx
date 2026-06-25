"use client"
import {useParams} from "next/navigation"
import {useEffect, useState} from "react";
import {Project} from "@/app/types/Project";
import {getProject, getProjectTasks} from "@/lib/projectsService";
import styles from "@/app/(with-layout)/project/[id]/Project.module.css";
import {fetchDatas,setPageTitle} from "@/lib/utils";
import AssignedTasks from "@/components/Projects/AssignedTasks/AssignedTasks";
import {ProjectHeader} from "@/components/Project/ProjectHeader";
import {ContributorsHeader} from "@/components/Project/Contributors/Contributors";
import {Task} from "@/app/types/Task";
import { RefreshContext } from "@/app/contexts/TaskContext/TaskContext";

export default function singleProjectsPage (){

    const params = useParams()

    const id = params.id as string
    const [project, setProject] = useState<Project>()


    const [projectTasks, setProjectTasks] = useState<Task[]>([])
    const [reloadKey, setReloadKey] = useState(0);
    const refresh = () => {
        setReloadKey(k => k + 1);
    };
    useEffect(() => {
        fetchDatas(() => getProjectTasks(id), setProjectTasks);
        fetchDatas(() => getProject(id), setProject);
        console.log("project data:", projectTasks)
    }, [reloadKey]);


    useEffect(() => {
        fetchDatas(()=> getProject(id),setProject)
        setPageTitle(project?.name)

    }, [])

    if(!project) return

    return(
        <section className={`flex-col align-center ${styles.projectpage}`}>
            <div className={`flex-col align-start gap30 ${styles.projectcontainer}`}>
                <RefreshContext.Provider value={refresh}>
                    <ProjectHeader project={project} />
                    <ContributorsHeader project={project}/>
                    <AssignedTasks project={project} projectTasks={projectTasks} id={id} />
                </RefreshContext.Provider>
            </div>

        </section>


    )
}
