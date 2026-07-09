import { askGemini } from "@/lib/utilsServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json()

    let text;
    try {
        text = await askGemini(body.prompt)

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim()

        const start = cleaned.indexOf("[")
        const end = cleaned.lastIndexOf("]")


        const json = JSON.parse(cleaned.slice(start, end + 1))

        return NextResponse.json(json)
    } catch {
        return NextResponse.json(
            {
                error: "Invalid JSON returned by Gemini",
                raw: text,
            },
            { status: 500 }
        )
    }
}

