"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { api } from "@/app/api/client";

export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await api("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            let accessToken = data.session?.access_token;
            if (!accessToken) {
                toast.error("Token nao recebido da API");
                return;
            }

            document.cookie = `token=${accessToken}; path=/; max-age=86400;`;
            localStorage.setItem("token", accessToken);
            window.location.href = "/dashboard";

            toast.success("Login realizado com sucesso!");

            router.push("/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Erro inesperado");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Entre com seu email e senha para acessar sua conta.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="******"
                            required
                            disabled={loading}
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Entrando..." : "Entrar"}
                    </Button>
                </form>

                <div className="text-center text-sm mt-4">
                    Nao tem uma conta?{" "}
                    <Link href="/signup" className="underline">
                        Criar conta
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
