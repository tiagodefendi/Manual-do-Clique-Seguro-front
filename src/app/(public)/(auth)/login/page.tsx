import Link from "next/link"
import { Metadata } from "next"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata: Metadata = {
    title: "Login",
    description: "Login into your account",
}

export default function LoginPage() {
    return (
        <div className="container mx-auto flex h-screen w-full flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">

                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
                    <p className="text-sm text-muted-foreground">
                        Digite suas credenciais para entrar
                    </p>
                </div>

                <UserAuthForm mode="login" />

                <p className="px-8 text-center text-sm text-muted-foreground">
                    Nao possui conta?{" "}
                    <Link
                        href="/signup"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Criar conta
                    </Link>
                </p>
            </div>
        </div>
    )
}
