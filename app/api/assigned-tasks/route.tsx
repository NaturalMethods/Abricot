import {getTokenFromCookie} from "@/lib/utilsServer";
import {apiFetch} from "@/lib/projectsService";
import {NextResponse} from "next/server";

export async function GET() {

    const token = await getTokenFromCookie()

    const data2 = await apiFetch(
        "/dashboard/assigned-tasks",
        "GET",
        token)

    if (!data2.success) {
        return NextResponse.json(
            {
                success: false,
                message: "Unauthorized",
                error: data2?.error ?? null,
            },
            { status: 401 }
        )
    }

    return NextResponse.json({
        success: true,
        data: data2
    })
}