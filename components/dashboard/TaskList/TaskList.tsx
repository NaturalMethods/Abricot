
import styles from "@/components/dashboard/TaskList/TaskList.module.css";
import TextInput from "@/components/input/TextInput/TextInput";
import Thumbnail from "@/components/dashboard/TaskList/Thumbnail/Thumbnail";



export default function TaskList (){


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

                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />
                <Thumbnail />



            </div>
        </section>

    )
}
