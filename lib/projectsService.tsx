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