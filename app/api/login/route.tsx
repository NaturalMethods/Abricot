import { NextResponse } from "next/server"
import {apiRequest} from "@/app/api/api";

export async function POST(req: Request) {
    const body = await req.json()

    const { email, password } = body

    // Appel à ton backend externe
    const res = apiRequest("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    })

    const data = await res

    // Gestion erreur login
    if (!data.success) {
        return NextResponse.json(
            { error: "Identifiants invalides" },
            { status: 401 }
        )
    }

    const token = data.data.token

    // Réponse + cookie sécurisé
    const response = NextResponse.json({
        user: data.data.user,
    })

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: true, // mets false en local si besoin
        sameSite: "strict",
        path: "/",
    })

    return response
}