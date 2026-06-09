import {Task} from "@/app/types/Task";

export function formatDate(dateString: string) {
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