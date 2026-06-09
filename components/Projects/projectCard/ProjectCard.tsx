
import styles from "@/components/Projects/projectCard/ProjectCard.module.css";
import Image from "next/image";
import {Project} from "@/app/types/Project";
import Tags from "@/components/Tags/Tags";
import {getInitials} from "@/lib/utils";
import {useUser} from "@/app/contexts/useUser";
import {useRouter} from "next/navigation";

interface ProjectCardProps{

    project: Project

}

export default function ProjectCard ({project}: ProjectCardProps){

    const {user} = useUser()
    const router = useRouter()

    return(
        <section style={{ cursor: "pointer" }}
                 className={`flex-col gap56 ${styles.card} `}
                 onClick={() => router.push(`/project/${project.id}`)}>

            <div className={`flex-col gap8 ${styles.headercard} `}>
                <h5>{project.name}</h5>
                <p className={"inter14400 grey600"}>{project.description}</p>
            </div>

            <div className={`flex-col gap15`}>
                <div className={`flex-row justify-space-between`}>
                    <p className="inter12400 grey600">Progression</p>
                    <p className="inter12400 grey800">0%</p>
                </div>
                <div className={`flex-col gap8`}>
                    <div className={`flex-col ${styles.progressbar}`}></div>
                    <p className="inter10400 grey600">0/{project["_count"]?.tasks ?? 0 } tâches terminées</p>
                </div>
            </div>

            <div className={`flex-col gap15`}>
                <div className={`flex-row`}>
                    <Image
                        src="/team.svg"
                        alt="icon"
                        width={18}
                        height={14}
                    />
                    <p className="inter10400 grey600">Équipe ({project.members?.length+1})</p>
                </div>
                <div className={`flex-row gap8`}>

                    <Tags label={getInitials(` ${user?.firstName} ${user?.lastName}`) ?? ""} font ="inter10400" padding={"8px 5px"} width={"17px"} height={"12px"} backgroundColor={"light-orange"} textColor={"grey950"}/>
                    <Tags label={project.owner.name}  padding={"8px 16px"}  height={"12px"} backgroundColor={"light-orange"} textColor={"warning-orange"}/>
                    <div className={`flex-row ${styles.members}`} >
                        {project.members?.map((member, index) => (
                            <Tags
                                key={member.id ?? index}
                                label={getInitials(member.user.name) ?? ""}
                                font="inter10400"
                                padding="8px 5px"
                                width="17px"
                                height="12px"
                                backgroundColor="grey-200"
                                textColor="grey-950"
                                border={"1px solid #FFFFFF"}

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

    )
}
