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
    <header className="w-full bg-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.1)] print:hidden mb-52">
      <div className="container mx-auto flex flex-row justify-between items-center flex-wrap px-28 py-32 gap-20">

        {/* LOGO + Início */}
        <div className="flex flex-row items-center gap-16 flex-wrap">
          <Link
            href="/"
            className="text-5xl font-bold text-blue-800 hover:text-blue-900 transition-colors"
          >
            Manual do Clique Seguro
          </Link>

          <Link
            href="/"
            className="text-2xl text-gray-700 hover:text-blue-800 transition-colors px-8 py-5 rounded-xl hover:bg-gray-300 hidden md:inline-block"
          >
            Início
          </Link>
        </div>

        {/* Navegação (botões à direita) */}
        <nav className="flex flex-row items-center gap-20">

          <Link href="/login">
            <Button
              variant="outline"
              className="h-24 px-20 text-3xl font-semibold rounded-l-lg whitespace-nowrap"
            >
              Entrar
            </Button>
          </Link>

          <Link href="/singup">
            <Button
              className="h-24 px-24 text-3xl font-semibold rounded-l-lg whitespace-nowrap"
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
    <footer className="w-full bg-gray-900 text-gray-200 mt-72 print:hidden shadow-[inset_0_4px_8px_rgba(0,0,0,0.2)]">
      <div className="container mx-auto px-20 text-center pt-40 pb-20">
        <p className="text-xl">
          &copy; {new Date().getFullYear()} Manual do Clique Seguro.
        </p>
        <p className="text-lg mt-6">
          Um projeto de Objeto de Aprendizagem focado na segurança digital da terceira idade.
        </p>
      </div>
    </footer>
  );
}

// ------------------------------------------------------------
// ROOT LAYOUT (TEM QUE SER UM COMPONENTE)
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

        <main className="flex-grow container mx-auto px-28 pb-16 mt-40">
          {children}
        </main>


        <Footer />
      </body>
    </html>
  );
}
