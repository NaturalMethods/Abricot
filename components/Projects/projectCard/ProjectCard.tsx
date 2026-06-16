"use client";

import styles from "@/components/Projects/projectCard/ProjectCard.module.css";
import Image from "next/image";
import { Project } from "@/app/types/Project";
import Tags from "@/components/Tags/Tags";
import { getInitials } from "@/lib/utils";
import { useUser } from "@/app/contexts/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProject } from "@/lib/projectsService";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const { user } = useUser();
    const router = useRouter();

    const [projectData, setProjectData] = useState<Project | null>(null);

    useEffect(() => {
        async function fetchProject() {
            try {
                const data = await getProject(project.id);
                setProjectData(data.project);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProject();
    }, [project.id]);

    // 🔥 PROGRESS LOGIC
    const tasks = projectData?.tasks ?? [];

    const total = tasks.length;

    const done = tasks.filter(
        t => t.status?.toLowerCase().trim() === "done"
    ).length;

    const percent = total === 0 ? 0 : (done / total) * 100;

    const isComplete = done === total && total > 0;

    const barColor = isComplete ? "var(--green)" : "var(--warning-orange)";

    // ⛔ évite render si pas chargé (optionnel mais propre UX)
    if (!projectData) {
        return (
            <section className={styles.card}>
                <p>Chargement...</p>
            </section>
        );
    }

    return (
        <section
            style={{ cursor: "pointer" }}
            className={`flex-col gap56 ${styles.card}`}
            onClick={() => router.push(`/project/${project.id}`)}
        >
            {/* HEADER */}
            <div className={`flex-col gap8 ${styles.headercard}`}>
                <h2>{projectData.name}</h2>
                <p className="inter14400 grey600">
                    {projectData.description}
                </p>
            </div>

            {/* PROGRESS */}
            <div className="flex-col gap15">
                <div className="flex-row justify-space-between">
                    <p className="inter12400 grey600">Progression</p>
                    <p className="inter12400 grey800">
                        {Math.round(percent)}%
                    </p>
                </div>

                <div className="flex-col gap8">
                    <div className={`${styles["progress-container"]}`}>
                        <div
                            className={`${styles["progress-bar"]}`}
                            style={{
                                width: `${percent}%`,
                                backgroundColor: barColor,
                            }}
                        />
                    </div>

                    <p className="inter10400 grey600">
                        {done}/{total} tâches terminées
                    </p>
                </div>
            </div>

            {/* TEAM */}
            <div className="flex-col gap15">
                <div className="flex-row">
                    <Image
                        src="/team.svg"
                        alt="icon"
                        width={18}
                        height={14}
                    />
                    <p className="inter10400 grey600">
                        Équipe ({(projectData.members?.length ?? 0) + 1})
                    </p>
                </div>

                <div className="flex-row gap8">
                    <Tags
                        label={
                            getInitials(
                                `${user?.firstName} ${user?.lastName}`
                            ) ?? ""
                        }
                        font="inter10400"
                        padding="8px 5px"
                        width="17px"
                        height="12px"
                        backgroundColor="light-orange"
                        textColor="grey950"
                    />

                    <Tags
                        label={projectData.owner.name}
                        padding="8px 16px"
                        height="12px"
                        backgroundColor="light-orange"
                        textColor="warning-orange"
                    />

                    <div className={`flex-row ${styles.members}`}>
                        {projectData.members?.map((member, index) => (
                            <Tags
                                key={member.id ?? index}
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
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}