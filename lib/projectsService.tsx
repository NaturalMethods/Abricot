import {Project} from "@/app/types/Project";
import {Task} from "@/app/types/Task";

const BASE_URL = "http://localhost:3000"

export async function proxyRequest(
    path: string,
    options: RequestInit
) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    })

    return res.json()
}
export function proxyFetch(
    url: string,
    method: string,
    body?: unknown,
) {

    return proxyRequest(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        ...(method !== "GET" && body
            ? {
                body: JSON.stringify(body),
            }
            : {}),
    })
}

export async function getProjects() : Promise<Project[]> {

    const res = await proxyFetch(`/api/projects`, "GET")
    return res.data

}
export async function getProject(id: string | undefined):Promise<Project| null> {

    const res = await proxyFetch(`/api/project/${id}`, "GET")
    return res.data
}
export async function getProjectTasks(id:String):Promise<Task[]> {
    const res = await proxyFetch(`/api/project/${id}/tasks`, "GET")
    return res.data
}
export async function createProject(project: Project, contributors: string[]){

    const body = {
        name: project.name,
        description: project.description,
        contributors: contributors
    }

    return await proxyFetch(`/api/projects`, "POST", body)

}
export async function createTask(project: Project, dueDate: string, assigneeIds: string | string[] | null | undefined, status: string){

    const body = {
        id: project.id,
        name: project.name,
        description: project.description,
        dueDate: dueDate,
        assigneeIds: assigneeIds,
        status: status
    }

    return await proxyFetch(`/api/project/${project.id}/tasks`, "POST", body)

}
export async function deleteTask(id: string, projectId: string|undefined){

    if(id && projectId) {
        const body = {
            id: id,
            projectId: projectId
        }

        return await proxyFetch(`/api/project/${projectId}/tasks/${id}`, "DELETE", body)
    }
}
export async function modifyTask(project: Project, task: Task, assigneesIds: string | string[] | null | undefined){

    const body = {
        projectId: project.id,
        id: task?.id,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        assigneesIds: assigneesIds,
    }

    return await proxyFetch(`/api/project/${project.id}/tasks/${task.id}`, "PUT", body)
}


export async function createComment(id:string, taskId:string, comment: string){

    const body = {
        id: id,
        taskId:taskId,
        content: comment
    }

    return await proxyFetch(`/api/project/${id}/tasks/${taskId}/comments`, "POST", body)

}

export async function modifyProject( project:Project, contributors: string[]){

    const body = {
        id: project.id,
        name: project.name,
        description: project.description,
        contributors: contributors
    }

    return await proxyFetch(`/api/projects/${project.id}`, "PUT", body)

}

export async function addContributor(projectId: string, contributor: string, role: string){

    const body = {
        id: projectId,
        email: contributor,
        role: role
    }

    //TODO Probleme de fetch pour les contributors

    return await proxyFetch(`/api/projects/${projectId}/contributor`, "POST", body)

}

export async function searchUser(name: string) {

    return await proxyFetch(`/api/users/search?query=${encodeURIComponent(name)}`, "GET")
}

export async function askIA(prompt: string){

    const body = {
        prompt: prompt
    }

    const res = await proxyFetch(`/api/IA`, "POST", body)

    console.log("REsss:",res)

    return res
}



