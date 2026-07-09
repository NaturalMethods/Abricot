import {Task} from "@/app/types/Task";
import {proxyFetch} from "@/lib/projectsService";

export async function getTasksList(): Promise<{ tasks: Task[] }> {

    const res = await proxyFetch(`/api/assigned-tasks`, "GET")


    return res.data.tasks

}