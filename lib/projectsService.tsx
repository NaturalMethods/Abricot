import {Project} from "@/app/types/Project";

export async function getProjects(
) : Promise<{
    projects: Project[]
}> {
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
    console.log("data:",data.data.data.projects)
    if (!response.ok) {
        throw new Error("Impossible de récupérer les projets")
    }

    return data.data.data

}

export async function getProject(id: string | undefined):Promise<{ project: Project }> {
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
        throw new Error("Impossible de récupérer le projet")
    }

    return data.data.data

}
export async function getProjectTasks(id:String):Promise<{
    project: Project
}> {
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
    console.log("data:",data)
    return data.data.data

}