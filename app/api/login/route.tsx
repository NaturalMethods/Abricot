import { NextResponse } from "next/server"
import { apiRequest } from "@/app/api/api"

export async function POST(req: Request) {

    try {
        const body = await req.json()
        const { email, password } = body

        const data = await apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
        })

        if (!data.success) {
            return NextResponse.json({
                success: false,
                message: "Identifiants invalides",
                error: data?.error ?? null,
            })
        }

        const token = data.data.token
        const user = data.data.user

        const response = NextResponse.json({
            success: true,
            data: {
                user,
            },
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        })

        return response

    } catch (e) {
        console.error("Erreur login :", e)

        return NextResponse.json(
            {
                success: false,
                message: "Erreur serveur",
            },
            {
                status: 500,
            }
        )
    }
}