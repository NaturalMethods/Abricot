
import styles from "@/components/dashboard/Kanban/Kanban.module.css";
import {Task} from "@/app/types/Task";
import Thumbnail from "@/components/dashboard/TaskList/Thumbnail/Thumbnail";
import {formatDate} from "@/lib/utils";




interface KanbanProps {
    tasksList: Task[]
}


export default function Kanban ({
                                      tasksList,
                                  }: KanbanProps){

    const todoTasks = tasksList.filter(task => task.status === "TODO")
    const inProgressTasks = tasksList.filter(task => task.status === "IN_PROGRESS")
    const doneTasks = tasksList.filter(task => task.status === "DONE")


    console.log(tasksList)

    return(
        <section className={`flex-col  ${styles.kanban}`}>
            <div className={`flex-col  ${styles.kanbancontainer}`}>
                <div className={`flex-col  ${styles.taskslist}`}>
                    <div className="flex-row gap8">
                        <h5>À faire</h5>
                        <p className={`inter14400 grey600 ${styles.tasknumber}`}>{todoTasks.length}</p>
                    </div>
                    {todoTasks.map((task, index) => (
                        <Thumbnail
                            key={task.id ?? index}
                            taskName={task.title}
                            taskDesc={task.description}
                            status={task.status}
                            comments={task.comments.length}
                            dueDate={formatDate(task.dueDate).toString()}
                            project={task.project} reduced={true}                        />
                    ))}

                </div>



                <div className={`flex-col  ${styles.taskslist}`}>
                    <div className="flex-row gap8">
                        <h5>En cours</h5>
                        <p className={`inter14400 grey600 ${styles.tasknumber}`}>{inProgressTasks.length}</p>
                    </div>
                    {inProgressTasks.map((task, index) => (
                        <Thumbnail
                            key={task.id ?? index}
                            taskName={task.title}
                            taskDesc={task.description}
                            status={task.status}
                            comments={task.comments.length}
                            dueDate={formatDate(task.dueDate).toString()}
                            project={task.project} reduced={true}                        />
                    ))}
                </div>


                <div className={`flex-col  ${styles.taskslist}`}>
                    <div className="flex-row gap8">
                        <h5>Terminées</h5>
                        <p className={`inter14400 grey600 ${styles.tasknumber}`}>{doneTasks.length}</p>
                    </div>
                    {doneTasks.map((task, index) => (
                        <Thumbnail
                            key={task.id ?? index}
                            taskName={task.title}
                            taskDesc={task.description}
                            status={task.status}
                            comments={task.comments.length}
                            dueDate={formatDate(task.dueDate).toString()}
                            project={task.project} reduced={true}                        />
                    ))}
                </div>

            </div>
        </section>

    )
}
