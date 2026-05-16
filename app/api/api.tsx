const BASE_URL = "http://localhost:8000"

export async function apiRequest(
    path: string,
    options: RequestInit
) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    })

    return res.json()
}