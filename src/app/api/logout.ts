import { API_URL } from "./client";

export async function logout() {
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch(API_URL + "/auth/logout", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    localStorage.removeItem("token");
    window.location.href = "/login";
}
