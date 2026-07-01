import styles from "@/components/Projects/ProjectGrid.module.css";
import {Project} from "@/app/types/Project";
import ProjectCard from "@/components/Projects/projectCard/ProjectCard";

interface ProjectGridProps{
    projects: Project[]
}

export default function ProjectGrid ({ projects,}   :ProjectGridProps){

    return(
        <section className={`align-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${styles.gridsection} `}>

            {projects.map((project,index) => (

                <ProjectCard key={project.id ?? index} project={project} />

            ))}

        </section>

    )
}
