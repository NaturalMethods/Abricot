
import styles from "@/components/dashboard/TaskList/TaskList.module.css";
import TextInput from "@/components/input/TextInput/TextInput";
import {Task} from "@/app/types/Task";
import Thumbnail from "@/components/dashboard/TaskList/Thumbnail/Thumbnail";
import {formatDate, sortTasksByPriority} from "@/lib/utils";
import Chips from "@/components/input/Chips/Chips";
import {useEffect, useState} from "react";
import Dropdown from "@/components/input/Dropdown/Dropdown";
import {getProjectTasks} from "@/lib/projectsService";

interface AssignedTasksProps {
    id: string
}


export default function AssignedTasks ({
                                      id,
                                  }: AssignedTasksProps){

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
        async function fetchTasks() {
            try {
                const data = await getProjectTasks(id)
                setProjectTasks(data.tasks)
            } catch (error) {
                console.error(error)
            }
        }

        fetchTasks()
    }, [])

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
                                   altIcon={"Icone de loupe"}
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
                        taskName={task.title}
                        taskDesc={task.description}
                        comments={task.comments}
                        status={task.status}
                        dueDate={formatDate(task.dueDate).toString()}
                        project={task.project}
                        format={"commented"}
                        assignees={task.assignees}
                        task={task}
                    />
                ))}
            </div>
        </section>

    )
}
