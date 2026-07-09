import {cookies} from "next/headers";

export async function getTokenFromCookie(){

    const cookieStore = await cookies()
    return cookieStore.get("token")?.value

}
export async function askGemini(prompt: string) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text:`Donne 3 tâches JSON strict (title, description <200 chars) rien d'autre: ${prompt}`,
                            },
                        ],
                    },
                ],
            }),
        }
    );



    const data = await response;

    console.log("askDATA", data)

    const json = data.json();

    console.log("askGemini", json)

    const text = json.candidates[0].content.parts[0].text

    return text;
}