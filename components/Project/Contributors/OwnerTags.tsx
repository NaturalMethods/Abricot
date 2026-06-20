import {getInitials} from "@/lib/utils";
import Tags from "@/components/Tags/Tags";
import {Project} from "@/app/types/Project";

interface OwnerTagsProps{
    project: Project,
}

export function OwnerTags({project}:OwnerTagsProps){

    return(
        <div className="flex-row gap5">
            <Tags label={getInitials(` ${project?.owner?.name}`) ?? ""} font ="inter10400" padding={"8px 5px"} width={"17px"} height={"12px"} backgroundColor={"light-orange"} textColor={"grey950"}/>
            <Tags label={"Propriétaire"}  padding={"8px 16px"}  height={"12px"} backgroundColor={"light-orange"} textColor={"dark-orange2"}/>
        </div>

    )

}