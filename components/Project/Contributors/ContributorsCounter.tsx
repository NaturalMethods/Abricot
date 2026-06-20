import styles from "@/app/(with-layout)/project/[id]/Project.module.css";
import {Project} from "@/app/types/Project";

interface ContributorsCounterProps{

    project:Project,
}

export function ContributorsCounter({project}:ContributorsCounterProps){

    return(
        <div className={`flex-row align-center gap8  ${styles.contributortitle}`}>
            <h2 className="grey800">Contributeurs</h2>
            <p className="inter16400 grey600">{(project?.members?.length ?? 0)+1} personnes</p>
        </div>


    )

}