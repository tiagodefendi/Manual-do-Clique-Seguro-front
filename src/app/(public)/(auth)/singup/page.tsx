import Link from "next/link"
import { Metadata } from "next"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata: Metadata = {
    title: "Signup",
    description: "Create your account",
}

export default function SignupPage() {
    return (
        <div className="container mx-auto flex h-screen w-full flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">

                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Criar Conta</h1>
                    <p className="text-sm text-muted-foreground">
                        Preencha os dados para criar sua conta
                    </p>
                </div>

                <UserAuthForm mode="signup" />

                <p className="px-8 text-center text-sm text-muted-foreground">
                    Ja possui conta?{" "}
                    <Link
                        href="/login"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Entrar
                    </Link>
                </p>
            </div>
        </div>
    )
}
