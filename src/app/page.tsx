import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="w-full py-40 mt-32 mb-40">

      {/* ---------- DUAS DIVS LADO A LADO ---------- */}
      <div className="container mx-auto px-28 flex flex-row items-center justify-between gap-40">

        {/* ESQUERDA (div menor dentro da maior + espaçamento interno) */}
        <div className="w-1/2 flex flex-col justify-center items-start mx-auto max-w-[600px] gap-12 py-10">
          <h1 className="text-6xl font-bold text-blue-800 leading-tight">
            Manual do Clique Seguro
          </h1>

          <p className="text-2xl text-gray-700 leading-relaxed">
            Um guia simples e prático criado para ajudar idosos a navegarem pela internet
            com mais segurança, evitando golpes, fraudes e riscos digitais.
          </p>
        </div>

        {/* DIREITA */}
        <div className="flex justify-center w-1/2 py-10">
          <Image
            src="/segurança-digital.jpeg"
            width={400}
            height={300}
            alt="Imagem representando segurança digital"
            className="rounded-3xl shadow-lg max-w-[350px] h-auto"
          />
        </div>

      </div>

      {/* ---------- BOTÃO EMBAIXO ---------- */}
      <div className="flex justify-center mt-40">
        <Link href="/inicio">
          <Button className="h-24 px-24 text-3xl font-semibold rounded-2xl">
            Começar
          </Button>
        </Link>
      </div>

    </div>
  );
}
