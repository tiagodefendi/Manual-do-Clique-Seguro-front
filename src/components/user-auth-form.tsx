"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    mode?: "login" | "signup"
}

export function UserAuthForm({ mode = "login", className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        // aqui voce vai chamar seu backend NestJS depois
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }

    return (
        <div
            className={cn(
                "w-full max-w-sm mx-auto p-6 rounded-xl border bg-card shadow-md",
                className
            )}
            {...props}
        >
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Input
                        id="email"
                        placeholder="email@example.com"
                        type="email"
                        autoComplete="email"
                        disabled={isLoading}
                    />

                    {/* Campo de senha para ambos */}
                    <Input
                        id="password"
                        placeholder="senha"
                        type="password"
                        autoComplete={mode === "signup" ? "new-password" : "current-password"}
                        disabled={isLoading}
                    />

                    {/* Campo extra somente no SIGNUP */}
                    {mode === "signup" && (
                        <Input
                            id="confirmPassword"
                            placeholder="confirmar senha"
                            type="password"
                            autoComplete="new-password"
                            disabled={isLoading}
                        />
                    )}
                </div>

                <Button className="w-full" disabled={isLoading}>
                    {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    {mode === "login" ? "Entrar" : "Criar conta"}
                </Button>
            </form>
        </div>
    )
}
