import { Inter } from "next/font/google";
import HeaderAuth from "@/components/headers/HeaderAuth";
import HomeFooter from "@/components/footers/BaseFooter";

const inter = Inter({ subsets: ["latin"] });

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
                {/* Header com autenticação */}
                <HeaderAuth />

                {/* Conteúdo do grupo private */}
                <main className="flex-grow container mx-auto px-4 py-6">
                    {children}
                </main>

                {/* Footer */}
                <HomeFooter />
            </body>
        </html>
    );
}
