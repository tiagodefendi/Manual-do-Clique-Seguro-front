// ------------------------------------------------------------
// BaseHeader.tsx
// ------------------------------------------------------------
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BaseHeaderProps {
    isAuth: boolean;
    onLogout?: () => void; // função opcional para logout
}

export default function BaseHeader({ isAuth, onLogout }: BaseHeaderProps) {
    return (
        <header className="w-full bg-gray-200 shadow-sm print:hidden">
            <div className="container mx-auto flex flex-row justify-between items-center flex-wrap px-4 py-4 gap-4">

                {/* LOGO */}
                <Link
                    href="/"
                    className="text-xl md:text-2xl font-bold text-blue-800 hover:text-blue-900 transition-colors"
                >
                    Manual do Clique Seguro
                </Link>

                {/* Navegação */}
                <nav className="flex flex-row items-center gap-2 md:gap-4">
                    {isAuth ? (
                        <Button
                            className="h-8 md:h-10 px-3 md:px-4 text-sm md:text-base font-semibold rounded-full whitespace-nowrap"
                            onClick={onLogout}
                        >
                            Sair
                        </Button>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button
                                    variant="outline"
                                    className="h-8 md:h-10 px-3 md:px-4 text-sm md:text-base font-semibold rounded-full whitespace-nowrap"
                                >
                                    Entrar
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button
                                    className="h-8 md:h-10 px-3 md:px-4 text-sm md:text-base font-semibold rounded-full whitespace-nowrap"
                                >
                                    Registrar
                                </Button>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
