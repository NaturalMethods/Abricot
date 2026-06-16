import styles from "@/components/Projects/ProjectGrid.module.css";
import {Project} from "@/app/types/Project";
import ProjectCard from "@/components/Projects/projectCard/ProjectCard";

interface ProjectGridProps{
    projects: Project[]
}

export default function ProjectGrid ({ projects,}   :ProjectGridProps){

    console.log(projects);

    return(
        <section className={`flex-col align-center ${styles.gridsection} `}>

            {projects.map((project,index) => (

                <ProjectCard key={project.id ?? index} project={project} />

            ))}

        </section>

    )
}
