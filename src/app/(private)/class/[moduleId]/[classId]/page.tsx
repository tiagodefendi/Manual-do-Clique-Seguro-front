"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Adicionei useRouter
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface AlternativaDetalhe {
    texto: string;
    explicacao: string;
}

interface Pergunta {
    enunciado: string;
    alternativas: {
        [key: string]: AlternativaDetalhe;
    };
    resposta_correta: string;
}

interface ClassData {
    titulo: string;
    conteudo: string;
    exemplo_ludico: string;
    explicacao_contextualizada: string;
    pergunta: Pergunta;
}

export default function ClassPage() {
    const params = useParams();
    const router = useRouter();
    const moduleId = params.moduleId as string;
    const classId = params.classId as string;

    const [classData, setClassData] = useState<ClassData | null>(null);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'conteudo' | 'exercicio'>('conteudo');

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (!moduleId || !classId) return;

        const fetchClassData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/classes/module/${moduleId}/class/${classId}`);

                if (!response.ok) throw new Error("Aula não encontrada");

                const data = await response.json();
                setClassData(data);

                // Resetar estados
                setSelectedOption(null);
                setIsSubmitted(false);
                setView('conteudo');
            } catch (error) {
                console.error("Erro ao carregar aula:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchClassData();
    }, [moduleId, classId]);

    const handleOptionSelect = (key: string) => {
        if (!isSubmitted) {
            setSelectedOption(key);
        }
    };

    const handleSubmit = () => {
        if (selectedOption) {
            setIsSubmitted(true);
        }
    };

    if (loading) return <div className="p-20 text-center text-gray-500">Carregando aula...</div>;
    if (!classData) return <div className="p-20 text-center text-red-500">Erro ao carregar dados. Verifique a conexão com o backend.</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header de Navegação */}
            <div className="bg-white border-b p-4 px-4 md:px-20 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
                <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
                    &larr; Voltar
                </Link>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500 text-sm font-medium">Módulo {moduleId} &gt; Aula {classId}</span>
            </div>

            <main className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-sm mt-6 rounded-xl border border-gray-100">

                <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 tracking-tight">
                    {classData.titulo}
                </h1>

                {/* Abas */}
                <div className="flex border-b mb-8 gap-6">
                    <button
                        onClick={() => setView('conteudo')}
                        className={`pb-3 text-lg font-medium transition-colors ${
                            view === 'conteudo' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        Conteúdo
                    </button>
                    <button
                        onClick={() => setView('exercicio')}
                        className={`pb-3 text-lg font-medium transition-colors ${
                            view === 'exercicio' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'
                        }`}
                    >
                        Exercício
                    </button>
                </div>

                {/* --- CONTEÚDO --- */}
                {view === 'conteudo' && (
                    <div className="space-y-8 animate-fade-in">
                        <section className="prose max-w-none text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                            {classData.conteudo}
                        </section>

                        {classData.exemplo_ludico && (
                            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg">
                                <h3 className="text-indigo-800 font-bold text-lg mb-2">💡 Exemplo Prático</h3>
                                <p className="text-indigo-900 italic">{classData.exemplo_ludico}</p>
                            </div>
                        )}

                        {classData.explicacao_contextualizada && (
                            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                                <h3 className="text-emerald-800 font-bold text-lg mb-2">🌍 Contexto</h3>
                                <p className="text-emerald-900">{classData.explicacao_contextualizada}</p>
                            </div>
                        )}

                        <div className="flex justify-end pt-4">
                            <button
                                onClick={() => setView('exercicio')}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md"
                            >
                                Vamos Praticar &rarr;
                            </button>
                        </div>
                    </div>
                )}

                {/* --- EXERCÍCIO --- */}
                {view === 'exercicio' && classData.pergunta && (
                    <div className="animate-fade-in max-w-2xl mx-auto">
                        <div className="mb-6">
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 block">Desafio</span>
                            <h3 className="text-xl font-bold text-gray-900">{classData.pergunta.enunciado}</h3>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(classData.pergunta.alternativas).map(([key, alt]) => {
                                const isSelected = selectedOption === key;
                                const isCorrectAnswer = classData.pergunta.resposta_correta === key;

                                // Lógica de Estilização
                                let borderClass = "border-gray-200 hover:border-blue-400";
                                let bgClass = "bg-white";

                                if (!isSubmitted && isSelected) {
                                    borderClass = "border-blue-600 ring-1 ring-blue-600";
                                    bgClass = "bg-blue-50";
                                } else if (isSubmitted) {
                                    if (isCorrectAnswer) {
                                        borderClass = "border-green-500 bg-green-50"; // Sempre destaca a correta no final
                                    } else if (isSelected && !isCorrectAnswer) {
                                        borderClass = "border-red-500 bg-red-50"; // Destaca o erro
                                    } else {
                                        borderClass = "border-gray-100 opacity-50"; // Apaga as outras
                                    }
                                }

                                return (
                                    <div key={key}>
                                        <button
                                            onClick={() => handleOptionSelect(key)}
                                            disabled={isSubmitted}
                                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-start gap-3 ${borderClass} ${bgClass}`}
                                        >
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs font-bold shrink-0 mt-0.5
                                                ${(isSelected || (isSubmitted && isCorrectAnswer)) ? 'border-current' : 'border-gray-300 text-gray-500'}
                                            `}>
                                                {key.toUpperCase()}
                                            </div>
                                            <span className="text-gray-700 font-medium">{alt.texto}</span>
                                        </button>

                                        {/* AQUI ESTÁ A LÓGICA PEDIDA: */}
                                        {/* Mostra explicação se: foi selecionada OU se é a resposta correta (para ensinar mesmo se errou) */}
                                        {isSubmitted && (isSelected || isCorrectAnswer) && (
                                            <div className={`mt-2 ml-2 pl-4 border-l-2 text-sm p-3 rounded mb-2
                                                ${isCorrectAnswer ? 'border-green-500 text-green-800 bg-green-50/50' : 'border-red-500 text-red-800 bg-red-50/50'}
                                            `}>
                                                <span className="font-bold block mb-1">
                                                    {isCorrectAnswer ? '✅ Por que esta é a correta:' : '❌ Por que esta está incorreta:'}
                                                </span>
                                                {alt.explicacao}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {!isSubmitted ? (
                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedOption}
                                    className={`px-6 py-3 rounded-lg font-bold shadow-sm transition-all
                                        ${selectedOption
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                                    `}
                                >
                                    Confirmar Resposta
                                </button>
                            </div>
                        ) : (
                            // BOTÃO VOLTAR AO DASHBOARD (Só aparece após responder)
                            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col items-center animate-fade-in">
                                <p className="text-gray-500 mb-4">Aula concluída! O que deseja fazer?</p>
                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-black transition font-semibold shadow-md flex items-center gap-2"
                                >
                                    &larr; Voltar para o Dashboard
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
