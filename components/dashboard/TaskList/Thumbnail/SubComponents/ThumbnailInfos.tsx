import Image from "next/image";
import {DueDate} from "@/components/dashboard/TaskList/Thumbnail/SubComponents/DueDate";
import {Project} from "@/app/types/Project";
import {Task} from "@/app/types/Task";

interface ThumbnailInfosProps{

    project?: Project
    task?: Task
}

export function ThumbnailInfos({project,task}:ThumbnailInfosProps){

    return(

        <div className={"flex-col  sm:flex-row w-full sm:items-center sm:justify-items-start gap-3"}>
            <div className={"flex-row lg:max-w-[120px] gap8"}>
                <Image
                    src="/greydirectoryicon.svg"
                    alt="icone de repertoire"
                    width={18}
                    height={14}
                />
                <p className="truncate inter12400 grey600">{project?.name ?? ""}</p>
            </div>
            <span className={"hidden sm:block"}>|</span>
            <div className={"flex-row gap8"}>
                <DueDate date={task?.dueDate} isDisplay />
            </div>
            <span className={"hidden sm:block"}>|</span>
            <div className={"flex-row gap8"}>
                <Image
                    src="/chaticon.svg"
                    alt="icon de message"
                    width={18}
                    height={14}
                />
                <p className="inter12400 grey600">{task?.comments?.length}</p>
            </div>

        </div>



    )

}