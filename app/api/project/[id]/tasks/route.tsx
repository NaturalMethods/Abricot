import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { apiRequest } from "@/app/api/api"

export async function GET(request: Request,
                          context: { params: Promise<{ id: string }> }) {

    const { id } = await context.params

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const data = await apiRequest(`/projects/${id}/tasks`, {
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

    console.log(data)
    return NextResponse.json({
        success: true,
        data: data
    })
}