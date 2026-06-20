import {Author} from "@/app/types/User";

export interface Comment {
    author: Author
    id: string
    content: string
    createdAt: string
    updatedAt: string
}

