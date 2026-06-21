
import styles from "@/components/dashboard/TaskList/TaskList.module.css";
import TextInput from "@/components/input/TextInput/TextInput";
import {Task} from "@/app/types/Task";
import Thumbnail from "@/components/dashboard/TaskList/Thumbnail/Thumbnail";
import {sortTasksByPriority} from "@/lib/utils";
import {useState} from "react";
import {deleteTask} from "@/lib/projectsService";

interface TaskListProps {
    tasksList: Task[]
    edTask?: (id: string) => void
    delTask?: (id: string, projectId: string)=> void

    visible?: boolean
}


export default function TaskList ({
                                      tasksList,
                                      visible = true,
                                  }: TaskListProps) {


    const [isModalCreation, setIsModalCreation] = useState(true);

    function edTask() {

        openModal(false)
    }

    function delTask(id: string, projectId: string) {
        deleteTask(id, projectId)
    }

    function openModal(isCreation: boolean) {

        if (!isCreation)
            setIsModalCreation(false)
        else
            setIsModalCreation(true)

    }


    return (
        visible && (
            <section className={`flex-col  ${styles.tasklist}`}>
                <div className={`flex-col  ${styles.tasklistcontainer}`}>
                    <div className={`flex-row align-center justify-space-between`}>
                        <div className={`flex-col justify-center  ${styles.tasklistheader}`}>
                            <h2 className="grey800">Mes tâches assignées</h2>
                            <p className="inter16400 grey600">Par ordre de priorité</p>
                        </div>
                        <TextInput showIcon={true}
                                   width={"357px"}
                                   height={"63px"}
                                   placeholder={"Rechercher une tâche"}
                                   ariaLabel={"Rechercher une tâche"}
                                   altIcon={"Icone de loupe"}
                                   label={""}/>
                    </div>

                    {sortTasksByPriority(tasksList).map((task, index) => (
                        <Thumbnail
                            key={task.id ?? index}
                            project={task.project}
                            task={task}
                            onEdit={() => edTask?.(task.id, task.project.id)}
                            onDelete={() => delTask?.(task.id, task.project.id)}
                        />
                    ))}


                </div>
            </section>))
}
