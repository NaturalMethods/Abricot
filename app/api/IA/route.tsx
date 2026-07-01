import { askGemini } from "@/lib/utilsServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const text = await askGemini(body.prompt);

    console.log("Gemini raw text:", text);

    let json;

    try {
        json = JSON.parse(text);
    } catch (e) {
        return NextResponse.json(
            {
                error: "Invalid JSON returned by Gemini",
                raw: text,
            },
            { status: 500 }
        );
    }

    return NextResponse.json(json);
}