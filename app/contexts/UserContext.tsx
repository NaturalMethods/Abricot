
import { createContext } from "react"

export interface User {
    firstName: string | null
    lastName: string | null
    mail: string
}

interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void
}

export const UserContext = createContext<UserContextValue | null>(null)