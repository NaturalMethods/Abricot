import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

export async function proxy(req: NextRequest) {

    const token = req.cookies.get("token")?.value

    if (!token) {
        return NextResponse.redirect(
            new URL("/", req.url)
        )
    }

    try {

        await jwtVerify(
            token,
            new TextEncoder().encode(
                process.env.JWT_SECRET
            )
        )

        return NextResponse.next()

    } catch {

        const response = NextResponse.redirect(
            new URL("/", req.url)
        )

        console.log("Erreur")
        response.cookies.delete("token")

        return response
    }
}

export const config = {
    matcher: [
        "/account/:path*",
        "/dashboard/:path*",
        "/projects/:path*",
        "/project/:path*"
    ]
}