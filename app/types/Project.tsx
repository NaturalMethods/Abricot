import {Member, User} from "@/app/types/User";

export interface Project{

    id?: string
    name: string
    description?: string
    ownerId?: string
    owner?: User
    members?: Member[]
    createdAt?: string
    updatedAt?: string

}
