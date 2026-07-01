
import styles from "@/components/dashboard/TaskList/TaskList.module.css";
import {Task} from "@/app/types/Task";
import Thumbnail from "@/components/dashboard/TaskList/Thumbnail/Thumbnail";
import {sortTasksByPriority} from "@/lib/utils";
import {useContext, useEffect, useState} from "react";
import {deleteTask} from "@/lib/projectsService";
import {AssignedTasksHeader} from "@/components/Projects/AssignedTasks/AssignedTasksHeader";
import {Project} from "@/app/types/Project";
import { RefreshContext } from "@/app/contexts/RefreshContext/RefreshContext";

interface AssignedTasksProps {
    project: Project,
    projectTasks: Task[]
    id: string
    refreshExternKey?: number;
}


export default function AssignedTasks ({project, projectTasks, id}: AssignedTasksProps){

    const {refresh} = useContext(RefreshContext);
    const [calendarVisible, setCalendarVisible] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<string>()

    function edTask(){
        refresh()
    }
    async function delTask(taskId: string){
        await deleteTask(taskId, id)
        refresh()
    }

    useEffect(() => {


    }, [projectTasks]);

    return(


        <section className={`flex-col w-full p-10 
                           bg-white border border-[#E5E7EB] rounded-[10px] ${styles.tasklist}`}>



            <div className={`flex-col  gap-10 ${styles.tasklistcontainer}`}>
                <AssignedTasksHeader panelVisibilityState={calendarVisible} setPanelState={setCalendarVisible} setStatusFilter={setSelectedStatus}/>

                <div className={" flex-col pr-10 pl-10 gap-4"}>
                    {projectTasks.length > 0 && sortTasksByPriority(projectTasks ?? []).filter((task) => {
                        if (!selectedStatus) return true
                        return task.status === selectedStatus
                    })
                        ?.map((task, index) => (
                        <Thumbnail
                            key={task.id ?? index}
                            project={project}
                            format={"commented"}
                            task={task}
                            onEdit={() => edTask()}
                            onDelete={() => delTask(task.id)}
                        />
                    ))}
                </div>
            </div>
        </section>

    )
}
