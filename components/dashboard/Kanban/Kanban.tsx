
import styles from "@/components/dashboard/Kanban/Kanban.module.css";
import {Task} from "@/app/types/Task";
import Thumbnail from "@/components/dashboard/TaskList/Thumbnail/Thumbnail";

interface KanbanProps {
    tasksList: Task[]
    visible ?: boolean
}


export default function Kanban ({
                                      tasksList,
                                      visible = true
                                  }: KanbanProps){

    const todoTasks = tasksList.filter(task => task.status === "TODO")
    const inProgressTasks = tasksList.filter(task => task.status === "IN_PROGRESS")
    const doneTasks = tasksList.filter(task => task.status === "DONE")


    console.log(tasksList)

    if(!visible) return null

    return(
        <section className={`flex-col  ${styles.kanban}`}>
            <div className={`flex-col  ${styles.kanbancontainer}`}>
                <div className={`flex-col  ${styles.taskslist}`}>
                    <div className="flex-row gap8">
                        <h2>À faire</h2>
                        <p className={`inter14400 grey600 ${styles.tasknumber}`}>{todoTasks.length}</p>
                    </div>
                    {todoTasks.map((task, index) => (
                        <Thumbnail
                            format={"reduced"}
                            key={task.id ?? index}
                            project={task.project} reduced={true}
                            task={task}
                        />
                    ))}

                </div>



                <div className={`flex-col  ${styles.taskslist}`}>
                    <div className="flex-row gap8">
                        <h2>En cours</h2>
                        <p className={`inter14400 grey600 ${styles.tasknumber}`}>{inProgressTasks.length}</p>
                    </div>
                    {inProgressTasks.map((task, index) => (
                        <Thumbnail
                            format = {"reduced"}
                            key={task.id ?? index}
                            project={task.project} reduced={true}
                            task={task}/>
                    ))}
                </div>


                <div className={`flex-col  ${styles.taskslist}`}>
                    <div className="flex-row gap8">
                        <h2>Terminées</h2>
                        <p className={`inter14400 grey600 ${styles.tasknumber}`}>{doneTasks.length}</p>
                    </div>
                    {doneTasks.map((task, index) => (
                        <Thumbnail
                            format={"reduced"}
                            key={task.id ?? index}
                            project={task.project} reduced={true}
                            task={task}
                        />
                    ))}
                </div>

            </div>
        </section>

    )
}
