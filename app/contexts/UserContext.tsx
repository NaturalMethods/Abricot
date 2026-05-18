
import { createContext } from "react"

export interface User {
    firstName: string
    lastName: string
    mail: string
}

interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void
}

export const UserContext = createContext<UserContextValue | null>(null)