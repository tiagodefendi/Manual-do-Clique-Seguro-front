import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import HeaderWithoutAuth from "@/components/headers/HeaderWithoutAuth";
import HomeFooter from "@/components/footers/BaseFooter";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR">
            <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
                {/* Header sem autenticação */}
                <HeaderWithoutAuth />

                {/* Conteúdo */}
                <main className="flex-grow container mx-auto px-4 py-6">
                    {children}
                </main>

                {/* Footer */}
                <HomeFooter />
            </body>
        </html>
    );
}
