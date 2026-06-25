import {getTokenFromCookie} from "@/lib/utilsServer";
import {NextResponse} from "next/server";
import {apiRequest} from "@/app/api/api";

export async function PUT(req: Request) {

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
    const {id, name, description, contributors} = body

    console.log("id:", id)

    const data = await apiRequest(`/projects/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            name: name,
            description: description,
            members: contributors
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