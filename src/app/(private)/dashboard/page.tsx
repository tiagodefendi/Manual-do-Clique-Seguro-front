"use client";
import { logout } from "@/app/api/logout";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    return (
        <div className="p-20">
            <h1 className="text-4xl font-bold mb-10">Bem-vindo!</h1>

            <Button className="h-14 w-52 text-xl" onClick={logout}>
                Sair
            </Button>
        </div>
    );
}
