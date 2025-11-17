import BaseHeader from "./BaseHeader";
import { logout } from "@/app/api/logout";

export default function HeaderAuth() {
    return <BaseHeader isAuth={true} onLogout={logout} />;
}
