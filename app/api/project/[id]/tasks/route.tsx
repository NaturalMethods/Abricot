import { NextResponse } from "next/server"
import { apiRequest } from "@/app/api/api"
import {getTokenFromCookie} from "@/lib/utilsServer";

export async function GET(request: Request,
                          context: { params: Promise<{ id: string }> }) {

    const { id } = await context.params

    const token = await getTokenFromCookie()

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

    return NextResponse.json({
        success: true,
        data: data.data.tasks
    })
}

export async function POST(req: Request) {

    const token = await getTokenFromCookie()

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
    const {id, name, description, dueDate,assigneeIds, status } = body

    const data = await apiRequest(`/projects/${id}/tasks`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: name,
            description: description,
            dueDate: dueDate,
            assigneeIds: assigneeIds,
            status: status
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

