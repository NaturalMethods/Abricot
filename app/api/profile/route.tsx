import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { apiRequest } from "@/app/api/api"

export async function GET() {

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const data = await apiRequest("/auth/profile", {
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
        data: {
            user: data.data.user,
        }
    })
}
export async function PUT(req: Request) {

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const body = await req.json()
    const { name, email } = body

    const data = await apiRequest("/auth/profile", {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name,email }),
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
        data: {
            user: data.data.user,
        }
    })

}