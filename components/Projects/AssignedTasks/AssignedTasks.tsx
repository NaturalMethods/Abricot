
import styles from "@/components/dashboard/TaskList/TaskList.module.css";
import TextInput from "@/components/input/TextInput/TextInput";
import {Task} from "@/app/types/Task";
import Thumbnail from "@/components/dashboard/TaskList/Thumbnail/Thumbnail";
import {sortTasksByPriority} from "@/lib/utils";
import Chips from "@/components/input/Chips/Chips";
import {useEffect, useState} from "react";
import Dropdown from "@/components/input/Dropdown/Dropdown";
import {getProjectTasks} from "@/lib/projectsService";

interface AssignedTasksProps {
    id: string
    refreshKey: number
    edTask?: (id: string) => void
    delTask?: (id: string)=> void
}


export default function AssignedTasks ({id, refreshKey, edTask, delTask}: AssignedTasksProps){

    const [calendarVisible, setCalendarVisible] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

    function setCalendarPanelVisible(){
        setCalendarVisible(true)
    }
    function setListPanelVisible(){
        setCalendarVisible(false)
    }

    const [projectTasks, setProjectTasks] = useState<Task[]>([])

    useEffect(() => {

        console.log("Key:", refreshKey)
        async function fetchTasks() {
            try {
                const tasks = await getProjectTasks(id)
                setProjectTasks(tasks)
            } catch (error) {
                console.error(error)
            }
        }
            fetchTasks()

    }, [refreshKey])

    return(
        <section className={`flex-col  ${styles.tasklist}`}>
            <div className={`flex-col  ${styles.tasklistcontainer}`}>
                <div className={`flex-row align-center justify-space-between`}>
                    <div className={`flex-col justify-center  ${styles.tasklistheader}`}>
                        <h2 className="grey800">Tâches</h2>
                        <p className="inter16400 grey600">Par ordre de priorité</p>
                    </div>
                    <div className="flex-row align-center gap15">
                        <Chips text={"Liste"} height={"17px"} onClick={setListPanelVisible} active={!calendarVisible}/>
                        <Chips text={"Calendrier"} height={"17px"} onClick={setCalendarPanelVisible} active={calendarVisible}/>
                        <Dropdown onChange={setSelectedStatus} />
                        <TextInput showIcon={true}
                                   altIcon={"Icône de loupe"}
                                   width={"357px"}
                                   height={"63px"}
                                   placeholder={"Rechercher une tâche"}
                                   ariaLabel={"Rechercher une tâche"}
                                   label={""} />
                    </div>
                </div>
                {sortTasksByPriority(projectTasks ?? []).filter((task) => {
                    if (!selectedStatus) return true
                    return task.status === selectedStatus
                })
                    ?.map((task, index) => (
                    <Thumbnail
                        key={task.id ?? index}
                        project={task.project}
                        format={"commented"}
                        task={task}
                        onEdit={() => edTask?.(task.id)}
                        onDelete={() => delTask?.(task.id)}
                    />
                ))}
            </div>
        </section>

    )
}
