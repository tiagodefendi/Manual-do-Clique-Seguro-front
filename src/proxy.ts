import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();

    const token = request.cookies.get("token")?.value;

    // Rotas privadas
    const privateRoutes = ["/dashboard"];

    const isPrivate = privateRoutes.some((route) =>
        url.pathname.startsWith(route)
    );

    if (isPrivate && !token) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Habilita o proxy para rotas especificas
export const config = {
    matcher: ["/dashboard/:path*"],
};
