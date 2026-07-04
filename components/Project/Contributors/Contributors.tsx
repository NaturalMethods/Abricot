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
        <div className={`flex-col lg:flex-row w-full align-center justify-space-between pt-4 pb-4 md:pt-0 md:pb-0 lg:h-[67px] ${styles.contributor}`}>

           <ContributorsCounter project={project}/>
            <div className={`flex-col lg:flex-row  align-center gap8 ${styles.contributorlist}`}>
                <OwnerTags project={project}/>
                <ContributorsTags project={project}/>
            </div>
        </div>


    )

}