import {Task} from "@/app/types/Task";

export async function getTasksList(
) : Promise<{
    tasks: Task[]
}> {
    const response = await fetch(
            "/api/assigned-tasks",
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
            throw new Error("Impossible de récupérer les tâches")
        }

        return data.data.data.tasks

}