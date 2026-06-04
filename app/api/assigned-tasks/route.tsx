import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { apiRequest } from "@/app/api/api"

export async function GET() {

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const data = await apiRequest("/dashboard/assigned-tasks", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!data.success) {
        return NextResponse.json(
            {
                success: false,
                message: "Unauthorized",
                error: data?.error ?? null,
            },
            { status: 401 }
        )
    }

    return NextResponse.json({
        success: true,
        data: data
    })
}