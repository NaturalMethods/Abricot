import {Task} from "@/app/types/Task";

export function formatDate(dateString: string | undefined) {
    if (dateString === undefined) return ""
    return new Intl.DateTimeFormat("fr-FR", {
        day: "numeric",
        month: "long",
    }).format(new Date(dateString))
}
type Priority = "HIGH" | "MEDIUM" | "LOW"
const priorityOrder: Record<Priority, number> = {
    HIGH: 0,
    MEDIUM: 1,
    LOW: 2,
}
export function formatCommentDate(dateString: string): string {
    const date = new Date(dateString);

    const datePart = date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
    });

    const timePart = date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${datePart}, ${timePart}`;
}
export function sortTasksByPriority(tasks: Task[]): Task[] {

    return [...tasks].sort(
        (a, b) =>
            priorityOrder[a.priority as Priority] -
            priorityOrder[b.priority as Priority]
    )
}
export function getInitials(fullName?: string): string {
    if (!fullName) return ""

    return fullName
        .trim()
        .split(/\s+/)
        .map(word => word[0].toUpperCase())
        .join("")
}
export function setPageTitle(title: string | undefined) {
    document.title = `${title} - Abricot`;
}
export async function fetchDatas(functionToUse: () => any, saveState: any, setLoadingState?: (value:boolean) => void) {



    setLoadingState?.(true)
        const data = await functionToUse()
        saveState(data)

    setTimeout(() => {
            setLoadingState?.(false);
        }, 400);


}
export async function multipleFetch(functions: (() => Promise<any>)[],  setLoadingState?: (value:boolean) => void) {
    try {
        setLoadingState?.(true)
        await Promise.all(
            functions.map(fn => fn())
        );
    } catch (e) {
        console.error(e);
    }finally{
        setTimeout(() => {
            setLoadingState?.(false);
        }, 400);
    }
}



