"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Defina a URL base do seu backend (ajuste se necessário)
const API_BASE_URL = "http://localhost:3001";

export default function Dashboard() {
    // Estado para guardar a lista de IDs dos módulos (ex: [1, 2, 3])
    const [modules, setModules] = useState<number[]>([]);

    // Estado para saber qual módulo está expandido no momento (null = nenhum)
    const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);

    // Estado para armazenar as aulas carregadas (Cache).
    // Formato: { "1": [1, 2, 3], "2": [5, 6] }
    const [classesCache, setClassesCache] = useState<Record<number, number[]>>({});

    // Carrega os módulos assim que a página abre
    useEffect(() => {
        fetch(`${API_BASE_URL}/classes/modules`)
            .then((res) => res.json())
            .then((data) => setModules(data))
            .catch((err) => console.error("Erro ao buscar módulos:", err));
    }, []);

    // Função para abrir/fechar o módulo e buscar as aulas se necessário
    const toggleModule = async (moduleId: number) => {
        // Se clicar no módulo já aberto, fecha ele
        if (expandedModuleId === moduleId) {
            setExpandedModuleId(null);
            return;
        }

        // Abre o módulo clicado
        setExpandedModuleId(moduleId);

        // Se ainda não temos as aulas desse módulo no cache, busca no backend
        if (!classesCache[moduleId]) {
            try {
                const res = await fetch(`${API_BASE_URL}/classes/module/${moduleId}/classes`);
                const data = await res.json();

                setClassesCache((prev) => ({
                    ...prev,
                    [moduleId]: data // Salva no cache: módulo X tem aulas Y
                }));
            } catch (error) {
                console.error(`Erro ao buscar aulas do módulo ${moduleId}:`, error);
            }
        }
    };

    return (
        <div className="p-20 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Bem-vindo!</h1>
            <p className="text-lg mb-10 text-gray-600">
                Este é o painel de controle onde você pode acessar suas aulas.
            </p>

            <h2 className="text-3xl font-bold mb-6 text-gray-800">Módulos Disponíveis</h2>

            <div className="space-y-4">
                {modules.length === 0 && (
                    <p className="text-gray-500">Carregando módulos...</p>
                )}

                {modules.map((moduleId) => (
                    <div key={moduleId} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        {/* Botão do Cabeçalho do Módulo */}
                        <button
                            onClick={() => toggleModule(moduleId)}
                            className={`w-full text-left p-5 flex justify-between items-center transition-colors ${
                                expandedModuleId === moduleId
                                    ? "bg-blue-600 text-white"
                                    : "bg-white hover:bg-gray-50 text-gray-800"
                            }`}
                        >
                            <span className="text-xl font-semibold">Módulo {moduleId}</span>
                            <span>
                                {expandedModuleId === moduleId ? "−" : "+"}
                            </span>
                        </button>

                        {/* Lista de Aulas (Só aparece se expandido) */}
                        {expandedModuleId === moduleId && (
                            <div className="bg-gray-50 p-5 border-t border-gray-100">
                                {classesCache[moduleId] ? (
                                    <ul className="space-y-3">
                                        {classesCache[moduleId].length > 0 ? (
                                            classesCache[moduleId].map((classId) => (
                                                <li key={classId}>
                                                    <Link
                                                        href={`/class/${moduleId}/${classId}`}
                                                        className="block p-3 bg-white rounded border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm group"
                                                    >
                                                        <span className="font-medium">Aula {classId}</span>
                                                        <span className="float-right text-gray-400 group-hover:text-blue-500">→</span>
                                                    </Link>
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 italic">Nenhuma aula encontrada neste módulo.</p>
                                        )}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">Carregando aulas...</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
