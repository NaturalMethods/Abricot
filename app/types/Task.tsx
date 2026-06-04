import {Project} from "@/app/types/Project";

export interface Task {
    id: string
    title: string
    description: string
    status: string
    dueDate: string
    priority: "HIGH" | "MEDIUM" | "LOW"
    project: Project
    comments: Comment[]
}