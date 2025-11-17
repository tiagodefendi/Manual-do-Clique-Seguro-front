import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manual do Clique Seguro",
  description: "Ensinando boas práticas de cibersegurança para idosos.",
};

// ------------------------------------------------------------
// HEADER
// ------------------------------------------------------------
function Header() {
  return (
    <header className="w-full bg-gray-200 shadow-sm print:hidden">
      <div className="container mx-auto flex flex-row justify-between items-center flex-wrap px-4 py-4 gap-4">

        {/* LOGO + Início */}
        <div className="flex flex-row items-center gap-4 flex-wrap">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-blue-800 hover:text-blue-900 transition-colors"
          >
            Manual do Clique Seguro
          </Link>
        </div>

        {/* Navegação (botões à direita) */}
        <nav className="flex flex-row items-center gap-2 md:gap-4">

          <Link href="/login">
            <Button
              variant="outline"
              className="h-8 md:h-10 px-3 md:px-4 text-sm text-black md:text-base font-semibold rounded-full whitespace-nowrap"
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

        </nav>

      </div>
    </header>
  );
}

// ------------------------------------------------------------
// FOOTER
// ------------------------------------------------------------
function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 print:hidden shadow-inner">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} Manual do Clique Seguro.
        </p>
        <p className="text-xs md:text-sm mt-1">
          Um projeto de Objeto de Aprendizagem focado na segurança digital da terceira idade.
        </p>
      </div>
    </footer>
  );
}

// ------------------------------------------------------------
// ROOT LAYOUT
// ------------------------------------------------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <Header />

        <main className="flex-grow container mx-auto px-4 py-6">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
