"use client"

import { ReactNode, useEffect, useState } from "react"
import { User, UserContext } from "./UserContext"
import {usePathname} from "next/navigation";

interface UserProviderProps {
    children: ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const pathname = usePathname()

    // Fetch at the init of the app to set the user infos
    useEffect(() => {

        if (pathname === "/") {
            return
        }

        async function fetchUser() {
            const response = await fetch("/api/profile")

            if (!response.ok) {
                setUser(null)
                return
            }

            const data = await response.json()
            const name = data.data.user.name?.trim() ?? ""

            const fullName = name.length > 0
                ? name.split(" ")
                : []

            setUser({
                firstName: fullName[0] || "John",
                lastName: fullName[1] || "Doe",
                mail: data.data.user.email,
                id: data.data.user.id,
            })
        }


        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}