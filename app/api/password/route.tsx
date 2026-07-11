import {apiRequest} from "@/app/api/api";
import {NextResponse} from "next/server";
import {getTokenFromCookie} from "@/lib/utilsServer";

export async function PUT(req: Request) {

    const token = await getTokenFromCookie()

    const body = await req.json()
    const { currentPassword, newPassword } = body

    const data = await apiRequest("/auth/password", {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword: currentPassword, newPassword: newPassword }),
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
            message: data.message,
        }
    })

}