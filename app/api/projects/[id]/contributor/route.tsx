import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {apiRequest} from "@/app/api/api";

export async function POST(req: Request) {

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
        return NextResponse.json(
            {
                success: false,
                message: "Unauthorized, No Token",
            },
            {
                status: 401,
            }
        )
    }

    const body = await req.json()
    const { id, email, role } = body

    const data = await apiRequest(`/projects/${id}/contributors`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            email: email,
            role: role
        }),
    })

    if (!data.success) {
        return NextResponse.json(
            {
                success: false,
                message: data.message,
                error: data.error,
            },
            {
                status: data.status ?? 500,
            }
        )
    }


    return Response.json(data)
}