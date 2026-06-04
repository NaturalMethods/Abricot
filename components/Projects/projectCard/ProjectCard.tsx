
import styles from "@/components/Projects/projectCard/ProjectCard.module.css";
import Image from "next/image";
import {Project} from "@/app/types/Project";

interface ProjectCardProps{

    project: Project

}

export default function ProjectCard ({project}: ProjectCardProps){

    return(
        <section className={`flex-col ${styles.card} `}>

            <div className={`flex-col  `}>
                <h5>{project.name}</h5>
                <p>Description du projet</p>
            </div>

            <div className={`flex-col`}>
                <div className={`flex-row`}>
                    <p className="inter12400 grey600">Progression</p>
                    <p>ProgressBAR------------------</p>
                    <p className="inter12400 grey800">0%</p>

                </div>
                <p className="inter10400 grey600">0/2 tâches terminées</p>
            </div>

            <div className={`flex-col`}>
                <div className={`flex-row`}>
                    <Image
                        src="/team.svg"
                        alt="icon"
                        width={18}
                        height={14}
                    />
                    <p className="inter10400 grey600">Équipe (3)</p>
                </div>
                <div className={`flex-row`}>


                </div>


            </div>


        </section>

    )
}
