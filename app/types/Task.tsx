import {Project} from "@/app/types/Project";
import {Assignee, Author} from "@/app/types/User";
import type {Comment} from "@/app/types/Comment"

export interface Task {

    assignees?: Assignee[]
    comments?: Comment[]
    createdAt?: string
    creator?: Author
    creatorId?: string
    description?: string
    dueDate?: string
    id?: string
    priority?: "HIGH"|"MEDIUM"|"LOW"
    project?: Project
    projectId?: string
    status?: "TODO"|"IN_PROGRESS"|"DONE"
    title: string
    updatedAt?: string

}
