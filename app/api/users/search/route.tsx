import { NextResponse } from "next/server"
import {apiRequest} from "@/app/api/api";
import {getTokenFromCookie} from "@/lib/utilsServer";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const name = searchParams.get("query")

        if (!name) {
            return NextResponse.json(
                { success: false, message: "Missing query" },
                { status: 400 }
            )
        }

        const token = await getTokenFromCookie()

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            )
        }

        const url = `/users/search?query=${encodeURIComponent(name)}`

        const data = await apiRequest(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return NextResponse.json(data.data.users)
    } catch (error) {
        console.error("SEARCH USERS ERROR:", error)

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        )
    }
}