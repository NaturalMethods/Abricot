
export interface User{
    id: string
    email: string
    name: string
    createdAt: string
    updatedAt: string
}

export interface Member{
    id: string
    role: string
    joinedAt: string
    projectId: string
    user: Author
    userId: string
}

export interface Assignee{

    assignedAt: string
    id: string
    user: User

}

export interface Author{

    email: string
    id: string
    name : string
}