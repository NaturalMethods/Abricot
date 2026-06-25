import {NextResponse} from "next/server";
import {apiRequest} from "@/app/api/api";
import {getTokenFromCookie} from "@/lib/utilsServer";

export async function DELETE(req: Request) {

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
    const {id, projectId } = body

    const data = await apiRequest(`/projects/${projectId}/tasks/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            projectId: projectId,
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
    const {id, projectId, title, description,status, dueDate, assigneesIds } = body

    console.log("Body: ", projectId,"Id:", id)


    const data = await apiRequest(`/projects/${projectId}/tasks/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            projectId: projectId,
            title: title,
            description: description,
            status: status??"TODO",
            dueDate: dueDate,
            assigneeIds: assigneesIds
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