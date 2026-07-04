import styles from "@/components/dashboard/TaskList/TaskList.module.css";
import Chips from "@/components/input/Chips/Chips";
import Dropdown from "@/components/input/Dropdown/Dropdown";
import TextInput from "@/components/input/TextInput/TextInput";

interface AssignedTasksHeaderProps {
    panelVisibilityState: boolean,
    setPanelState: any,
    setStatusFilter: any,
}

export function AssignedTasksHeader({panelVisibilityState, setPanelState, setStatusFilter}:AssignedTasksHeaderProps) {

    function switchPanel(){
        if(panelVisibilityState) setPanelState(false)
        else setPanelState(true);
    }

    return(
        <div className={`flex-col gap-2 sm:gap-0 lg:flex-row align-center sm:justify-space-between`}>
            <div className={`flex-col w-full items-center justify-center  ${styles.tasklistheader}`}>
                <h2 className="grey800">Tâches</h2>
                <p className="inter16400 grey600">Par ordre de priorité</p>
            </div>
            <div className="flex-col sm:flex-row align-center gap15">
                <div className={"flex-row"}>
                <Chips text={"Liste"} height={"17px"} onClick={switchPanel} active={!panelVisibilityState}/>
                <Chips text={"Calendrier"} srcIcon={"/orangeminical.svg"} height={"17px"} onClick={switchPanel} active={panelVisibilityState}/>
                </div>
                <Dropdown onChange={setStatusFilter} />

                <div className={"w-[250px] lg:w-[357px]"} >
                    <TextInput showIcon={true}
                               altIcon={"Icône de loupe"}
                               width={"100%"}
                               height={"63px"}
                               placeholder={"Rechercher une tâche"}
                               ariaLabel={"Rechercher une tâche"}
                               label={""} />
                </div>
            </div>
        </div>
    )

}