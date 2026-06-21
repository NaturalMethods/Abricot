import {Project} from "@/app/types/Project";
import {Task} from "@/app/types/Task";
import {apiRequest} from "@/app/api/api";

export async function getProjects() : Promise<Project[]> {
    const response = await fetch(
        "/api/projects",
        {
            method: "GET",
            headers: {
                "Content-Type":
                    "application/json",
            },
        }
    )

    const data = await response.json()
    if (!response.ok) {
        throw new Error("Impossible de récupérer les projets")
    }

    return data.data.data.projects

}

export async function getProject(id: string | undefined):Promise<Project| null> {
        const response = await fetch(
            `/api/project/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/json",
                },
            }
        )

        const data = await response.json()
        if (!response.ok) {
        return null
    }
    return data.data.data.project

}
export async function getProjectTasks(id:String):Promise<Task[]> {

    const response = await fetch(
        `/api/project/${id}/tasks`,
        {
            method: "GET",
            headers: {
                "Content-Type":
                    "application/json",
            },
        }
    )


    const data = await response.json()
    if (!response.ok) {
        throw new Error("Impossible de récupérer le projet")
    }
    return data.data.data.tasks

}

export async function createProject(project: Project, contributors: string[]){

    console.log("Contributors", contributors)

    const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: project.name,
            description: project.description,
            contributors: contributors
        }),
    })

    const data = await response.json()

    if (!response.ok) {
        return {
            ok: false,
            data,
        }
    }
    return data
}

export async function createTask(project: Project, dueDate: string ,assigneeIds: string[],status: string){

    console.log("assigneeIds:", assigneeIds)

    const response = await fetch(`/api/project/${project.id}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: project.id,
            name: project.name,
            description: project.description,
            dueDate: dueDate,
            assigneeIds: assigneeIds,
            status: status
        }),
    })

    const data = await response.json()


    if (!response.ok) {
        return {
            ok: false,
            data,
        }
    }
    return data
}

export async function deleteTask(id: string, projectId: string|undefined){

    if(id && projectId){

        const response = await fetch(`/api/project/${projectId}/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id : id,
                projectId: projectId
            }),
        })

        const data = await response.json()


        if (!response.ok) {
            return {
                ok: false,
                data,
            }
        }
        return data
    }
}

export async function modifyTask( project:Project,task: Task, assigneesIds: string[]){


    const response = await fetch(`/api/project/${project.id}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            projectId: project.id,
            id: task?.id,
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate,
            assigneesIds: assigneesIds,
        }),
    })

    const data = await response.json()

    console.log("Tâche créé:", data)

    if (!response.ok) {
        return {
            ok: false,
            data,
        }
    }
    return data
}



export function apiFetch(
    url: string,
    method: string,
    token: string | undefined,
    body?: unknown,
) {


    return apiRequest(url, {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        ...(method !== "GET" && body
            ? {
                body: JSON.stringify(body),
            }
            : {}),
    })
}

export async function createComment(id:string, taskId:string, comment: string){

    const response = await fetch(`/api/project/${id}/tasks/${taskId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            taskId:taskId,
            content: comment
        }),
    })

    const data = await response.json()

    console.log("Commentaire envoyé:", data)

    if (!response.ok) {
        return {
            ok: false,
            data,
        }
    }
    return data
}

export async function searchUser(name: string) {
    const response = await fetch(
        `/api/users/search?query=${encodeURIComponent(name)}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )

    if (!response.ok) {
        return null
    }

    const data = await response.json()

    console.log("userssss:", data)

    return data.data.users
}