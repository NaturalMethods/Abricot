import {getTokenFromCookie} from "@/lib/utilsServer";
import {NextResponse} from "next/server";
import {apiFetch} from "@/app/api/api";


/**
 * Fetch all assigned tasks for the authenticated user (Auth token required).
 * @constructor
 */
export async function GET() {

    const token = await getTokenFromCookie()

    const data2 = await apiFetch("/dashboard/assigned-tasks", "GET", token)

    if (!data2.success) {
        return NextResponse.json(data2, { status: data2.status })
    }

    return NextResponse.json({
        success: true,
        data: data2.data
    })
}