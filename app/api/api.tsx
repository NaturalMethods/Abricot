const BASE_URL = "http://localhost:8000"

export async function apiRequest(path: string, options: RequestInit) {

    try {
        const res = await fetch(`${BASE_URL}${path}`, {
            headers: {
                "Content-Type": "application/json",
            },
            ...options,
        })

        return res.json()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch (e) {
        return Response.json(
            {   success: false,
                error: "Backend unreachable" },
            { status: 503 }
        )

    }
}

export function apiFetch(
    url: string,
    method: string,
    token?: string | undefined,
    body?: unknown,
) {

    return apiRequest(url, {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        ...(method !== "GET" && body
            ? {
                body: JSON.stringify(body),
            }
            : {}),
    })
}
