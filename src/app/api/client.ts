export const API_URL = "http://localhost:3001"; // coloque seu backend

export async function api(path: string, options: RequestInit = {}) {
    const res = await fetch(API_URL + path, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) throw new Error(data.message || "Erro na API");

    return data;
}
