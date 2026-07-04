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
import {error} from "next/dist/build/output/log";
import {router} from "next/client";

export default function SingleProjectContent (){

    const params = useParams()

    const id = params.id as string
    const [project, setProject] = useState<Project>()
    const [projectTasks, setProjectTasks] = useState<Task[]>([])

    const [loading, setLoading] = useState(true)

    const { reloadKey } = useContext(RefreshContext);


    useEffect(() => {
        try {
            multipleFetch(
                [
                    () => fetchDatas(() => getProject(id), setProject),
                    () => fetchDatas(() => getProjectTasks(id), setProjectTasks)
                ],
                setLoading
            );
        }catch(error) {
            if(error instanceof Error && error.message === "Unauthorized") router.push("/dashboard")
        }
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
                    <div className={`flex-col ml-8 mr-8 mt-16 align-start gap-8 lg:w-[clamp(1000px,100%,1300px)] pb-[50px]`}>

                        <ProjectHeader project={project} />
                        <ContributorsHeader project={project}/>
                        <AssignedTasks project={project} projectTasks={projectTasks} id={id} />

                    </div>
                )}
            </section>


    )
}
