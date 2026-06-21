import styles from "@/app/(with-layout)/project/[id]/Project.module.css";
import {Project} from "@/app/types/Project";
import {ContributorsCounter} from "@/components/Project/Contributors/ContributorsCounter";
import {OwnerTags} from "@/components/Project/Contributors/OwnerTags";
import {ContributorsTags} from "@/components/Project/Contributors/ContributorsTags";

interface ContributorsHeaderProps{
    project: Project,
}

export function ContributorsHeader({project}: ContributorsHeaderProps){
    return(
        <div className={`flex-row align-center justify-space-between ${styles.contributor}`}>

           <ContributorsCounter project={project}/>
            <div className={`flex-row  align-center gap8 ${styles.contributorlist}`}>
                <OwnerTags project={project}/>
                <ContributorsTags project={project}/>
            </div>
        </div>


    )

}