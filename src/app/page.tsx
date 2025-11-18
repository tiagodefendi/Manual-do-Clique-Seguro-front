import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeaderWithoutAuth from "@/components/headers/HeaderWithoutAuth";
import BaseFooter from "@/components/footers/BaseFooter";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderWithoutAuth />

      <main className="flex-grow w-full py-20 px-4 md:px-6 flex flex-col items-center">

        {/* Hero */}
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
          {/* Esquerda */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start max-w-lg md:max-w-md gap-6 md:gap-8">
            <h1 className="text-3xl md:text-5xl font-bold text-blue-800 leading-tight md:leading-snug">
              Manual do Clique Seguro
            </h1>
            <p className="text-base md:text-xl text-gray-700 leading-relaxed md:leading-loose">
              Um guia simples e prático criado para ajudar idosos a navegarem pela internet
              com mais segurança, evitando golpes, fraudes e riscos digitais.
            </p>
          </div>

          {/* Direita */}
          <div className="w-full md:w-1/2 flex justify-center py-6 md:py-0">
            <Image
              src="/segurança-digital.jpeg"
              width={500}
              height={400}
              alt="Imagem representando segurança digital"
              className="rounded-3xl shadow-lg w-full max-w-md md:max-w-lg h-auto"
            />
          </div>
        </div>

        {/* Botão */}
        <div className="flex justify-center mt-12 md:mt-20">
          <Link href="/dashboard">
            <Button className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-2xl font-semibold rounded-full">
              Começar
            </Button>
          </Link>
        </div>
      </main>

      <BaseFooter />
    </div>
  );
}
