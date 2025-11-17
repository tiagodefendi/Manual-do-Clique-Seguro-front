import Link from "next/link";

export default function BaseFooter() {
    return (
        <footer className="w-full bg-gray-900 text-gray-200 print:hidden shadow-inner">
            <div className="container mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row justify-between gap-8">

                {/* ALUNOS */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg md:text-xl mb-2">Alunos</h3>
                    <Link
                        href="https://github.com/tiagodefendi"
                        target="_blank"
                        className="hover:underline text-gray-300"
                    >
                        Tiago Defendi - Github
                    </Link>
                    <Link
                        href="https://github.com/thiagocarbonera"
                        target="_blank"
                        className="hover:underline text-gray-300"
                    >
                        Thiago Carbonera - Github
                    </Link>
                </div>

                {/* REPOSITÓRIOS */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg md:text-xl mb-2">Repositórios do GitHub</h3>
                    <Link
                        href="https://github.com/tiagodefendi/Manual-do-Clique-Seguro-back"
                        target="_blank"
                        className="hover:underline text-gray-300"
                    >
                        Backend
                    </Link>
                    <Link
                        href="https://github.com/tiagodefendi/Manual-do-Clique-Seguro-front"
                        target="_blank"
                        className="hover:underline text-gray-300"
                    >
                        Frontend
                    </Link>
                    <Link
                        href="https://github.com/tiagodefendi/Manual-do-Clique-Seguro"
                        target="_blank"
                        className="hover:underline text-gray-300"
                    >
                        Documentation
                    </Link>
                </div>

                {/* CONTATO */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg md:text-xl mb-2">Contato</h3>
                    <p className="text-gray-300 text-sm md:text-base">
                        E-mail: <a href="mailto:tiagodefendidasilva@gmail.com" className="hover:underline">tiagodefendidasilva@gmail.com</a><br />
                        E-mail: <a href="mailto:thiagocarbonera@gmail.com" className="hover:underline">thiagocarbonera@gmail.com</a>
                    </p>
                </div>

            </div>

            {/* DIREITOS RESERVADOS COM ESPAÇO REDUZIDO */}
            <div className="text-center text-sm md:text-base text-gray-400 mt-4 pb-4">
                &copy; {new Date().getFullYear()} Manual do Clique Seguro. Todos os direitos reservados.
            </div>
        </footer>
    );
}
