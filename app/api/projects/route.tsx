import {NextResponse} from "next/server"
import {cookies} from "next/headers"
import {apiRequest} from "@/app/api/api"

export async function GET() {

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const data = await apiRequest("/projects", {
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
    const { name, description } = body

    console.log("name:",name, "desc:", description)

    const data = await apiRequest("/projects", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            description: description,
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