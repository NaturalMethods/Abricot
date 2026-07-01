"use client"
import {useParams} from "next/navigation"
import React, {useContext, useEffect, useState} from "react";
import {Project} from "@/app/types/Project";
import {getProject, getProjectTasks} from "@/lib/projectsService";
import styles from "@/app/(with-layout)/project/[id]/Project.module.css";
import {fetchDatas, multipleFetch, setPageTitle} from "@/lib/utils";
import AssignedTasks from "@/components/Projects/AssignedTasks/AssignedTasks";
import {ProjectHeader} from "@/components/Project/ProjectHeader";
import {ContributorsHeader} from "@/components/Project/Contributors/Contributors";
import {Task} from "@/app/types/Task";
import { RefreshContext } from "@/app/contexts/RefreshContext/RefreshContext";
import {LoadingSpinner} from "@/components/LoadingSpinner/LoadingSpinner";
import {RefreshProvider} from "@/app/contexts/RefreshContext/RefreshProvider";

export default function SingleProjectContent (){

    const params = useParams()

    const id = params.id as string
    const [project, setProject] = useState<Project>()
    const [projectTasks, setProjectTasks] = useState<Task[]>([])

    const [loading, setLoading] = useState(true)

    const { reloadKey } = useContext(RefreshContext);


    useEffect(() => {
        multipleFetch(
            [
                () => fetchDatas(() => getProject(id), setProject),
                () => fetchDatas(() => getProjectTasks(id), setProjectTasks)
            ],
            setLoading
        );
    }, [reloadKey]);

    useEffect(() => {
        setPageTitle(project?.name ?? "Projet")
    }, [project])

    if(!project) return

    return(
            <section className={`flex-col align-center ${styles.projectpage}`}>
                {loading ? (
                    <LoadingSpinner />
                ) :(
                    <div className={`flex-col align-start gap30 ${styles.projectcontainer}`}>

                        <ProjectHeader project={project} />
                        <ContributorsHeader project={project}/>
                        <AssignedTasks project={project} projectTasks={projectTasks} id={id} />

                    </div>
                )}
            </section>


    )
}
