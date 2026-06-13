"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import {useEffect, useState} from "react";
import {Project} from "@/app/types/Project";
import {getProject} from "@/lib/projectsService";
import styles from "@/app/(with-layout)/project/[id]/Project.module.css";
import Button from "@/components/input/Button/Button";
import Tags from "@/components/Tags/Tags";
import {getInitials} from "@/lib/utils";
import AssignedTasks from "@/components/Projects/AssignedTasks/AssignedTasks";

export default function singleProjectsPage (){

    const params = useParams()

    const id = params.id as string
    console.log("id22", id)
    const [project, setProject] = useState<Project>()

    useEffect(() => {
        async function fetchTasks() {
            try {
                const data = await getProject(id)
                setProject(data.project)
            } catch (error) {
                console.error(error)
            }
        }

        fetchTasks()
    }, [])

    return(
        <section className={`flex-col align-center ${styles.projectpage}`}>
            <div className={`flex-col align-start gap30 ${styles.projectcontainer}`}>

                <div className={`flex-row align-center justify-space-between ${styles.projectheader}`}>
                    <div className={`flex-col  ${styles.dashboardheadertext}`}>
                        <h4 className="grey800">{project?.name}</h4>
                        <p className="inter18400 grey600">{project?.description}</p>
                    </div>
                    <div className="flex-row gap15">
                        <Button text={"Créer une tâche"} />
                        <Button text={"IA"}
                                width={"94px"}
                                icon={
                                <Image
                                    src="/star.svg"
                                    alt="search"
                                    width={16}
                                    height={16}
                                />
                        } variant={"darkorange"} />
                    </div>


                </div>
                <div className={`flex-row align-center justify-space-between ${styles.contributor}`}>

                    <div className={`flex-row align-center gap8  ${styles.contributortitle}`}>
                        <h5 className="grey800">Contributeurs</h5>
                        <p className="inter16400 grey600">{project?.members?.length+1} personnes</p>
                    </div>
                    <div className={`flex-row  align-center gap8 ${styles.contributorlist}`}>
                        <div className="flex-row gap5">
                            <Tags label={getInitials(` ${project?.owner?.name}`) ?? ""} font ="inter10400" padding={"8px 5px"} width={"17px"} height={"12px"} backgroundColor={"light-orange"} textColor={"grey950"}/>
                            <Tags label={"Propriétaire"}  padding={"8px 16px"}  height={"12px"} backgroundColor={"light-orange"} textColor={"dark-orange"}/>
                        </div>
                        <div className={`flex-row gap15 ${styles.contributorlist}`}>
                            {project?.members?.map((member, index) => (
                                <div
                                    key={member.id ?? index}
                                    className="flex-row gap5"
                                >
                                    <Tags
                                        label={getInitials(member.user.name) ?? ""}
                                        font="inter10400"
                                        padding="8px 5px"
                                        width="17px"
                                        height="12px"
                                        backgroundColor="grey-200"
                                        textColor="grey-950"
                                        border="1px solid #FFFFFF"
                                        style={{
                                            marginLeft: index === 0 ? 0 : "-10px",
                                            zIndex: index + 1,
                                            position: "relative",
                                        }}
                                    />
                                    <Tags
                                        label={member.user.name}
                                        padding="8px 16px"
                                        height="12px"
                                        backgroundColor="grey-200"
                                        textColor="grey600"
                                    />
                                </div>
                            ))}
                            <div className={styles.contributorspace}/>
                        </div>

                    </div>
                </div>

                <AssignedTasks id={id} tasks={project?.tasks} />
            </div>

        </section>


    )
}
