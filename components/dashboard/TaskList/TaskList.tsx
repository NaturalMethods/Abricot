
import styles from "@/components/dashboard/TaskList/TaskList.module.css";
import TextInput from "@/components/input/TextInput/TextInput";
import {Task} from "@/app/types/Task";
import Thumbnail from "@/components/dashboard/TaskList/Thumbnail/Thumbnail";
import {formatDate, sortTasksByPriority} from "@/lib/utils";

interface TaskListProps {
    tasksList: Task[]
}


export default function TaskList ({
                                      tasksList,
                                  }: TaskListProps){

    return(
        <section className={`flex-col  ${styles.tasklist}`}>
            <div className={`flex-col  ${styles.tasklistcontainer}`}>
                <div className={`flex-row align-center justify-space-between`}>
                    <div className={`flex-col justify-center  ${styles.tasklistheader}`}>
                        <h5 className="grey800">Mes tâches assignées</h5>
                        <p className="inter16400 grey600">Par ordre de priorité</p>
                    </div>
                    <TextInput showIcon={true} width={"357px"} height={"63px"} placeholder={"Rechercher une tâche"} label={""} />
                </div>

                {sortTasksByPriority(tasksList).map((task, index) => (
                    <Thumbnail
                        key={task.id ?? index}
                        taskName={task.title}
                        taskDesc={task.description}
                        status={task.status}
                        comments={task.comments.length}
                        dueDate={formatDate(task.dueDate).toString()}
                        project={task.project}
                    />
                ))}


            </div>
        </section>

    )
}
