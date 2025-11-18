import { API_URL } from "../client";

export async function logout() {
    const token = localStorage.getItem("token");

    if (token) {
        await fetch(API_URL + "/auth/logout", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    // limpa tudo
    document.cookie = "token=; path=/; max-age=0;";
    localStorage.removeItem("token");

    // redireciona
    window.location.href = "/login";
}
