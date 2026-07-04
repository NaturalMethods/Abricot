import Tags from "@/components/Tags/Tags";
import styles from "@/app/(with-layout)/project/[id]/Project.module.css";
import {Project} from "@/app/types/Project";
import {getInitials} from "@/lib/utils";

interface ContributorsTagsProps{
    project: Project,
}

export function ContributorsTags({project}:ContributorsTagsProps,){

    return(
        <div className={`flex-col lg:flex-row gap15 ${styles.contributorlist}`}>
            {project?.members?.map((member, index) => (
                <div
                    key={member.id ?? index}
                    className="flex-row gap5"
                >
                    <Tags
                        label={getInitials(member.name) ?? ""}
                        font="inter10400"
                        padding="8px 5px"
                        width="25px"
                        height="25px"
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
                        label={member.name}
                        padding="8px 16px"
                        height="25px"
                        backgroundColor="grey-200"
                        textColor="grey600"
                    />
                </div>
            ))}
            <div className={styles.contributorspace}/>
        </div>

    )

}