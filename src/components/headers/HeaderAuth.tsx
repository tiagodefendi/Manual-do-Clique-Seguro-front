"use client";

import BaseHeader from "./BaseHeader";
import { logout } from "@/app/api/auth/logout";

export default function HeaderAuth() {
    return <BaseHeader isAuth={true} onLogout={logout} />;
}
