import { NextResponse } from "next/server"
import { apiRequest } from "@/app/api/api"
import {getTokenFromCookie} from "@/lib/utilsServer";

export async function GET(request: Request,
                          context: { params: Promise<{ id: string }> }) {

    const { id } = await context.params

    const token = await getTokenFromCookie()

    const data = await apiRequest(`/projects/${id}`, {
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
        data: data.data.project
    })
}