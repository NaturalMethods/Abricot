import {Task} from "@/app/types/Task";

export interface Project{

    description?: string
    id?: string
    name?: string
    _count?:[]
    tasks: Task[]
    members?: []
    owner: string
}