"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Interface para o Módulo
interface ModuleData {
    id: number;
    titulo: string;
    descricao: string;
}

// Interface para a Aula
interface ClassData {
    id: number;
    titulo: string;
}

export default function Dashboard() {
    const [modules, setModules] = useState<ModuleData[]>([]);
    const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);

    // Cache: guarda as aulas carregadas por módulo
    const [classesCache, setClassesCache] = useState<Record<number, ClassData[]>>({});

    const [loadingModules, setLoadingModules] = useState(true);
    const [loadingClasses, setLoadingClasses] = useState(false);

    // 1. Carrega Módulos ao iniciar
    useEffect(() => {
        const fetchModulesData = async () => {
            try {
                // Usa API_BASE_URL vinda do .env
                const resIds = await fetch(`${API_BASE_URL}/classes/modules`);
                const ids: number[] = await resIds.json();

                const modulesDetails = await Promise.all(
                    ids.map(async (id) => {
                        try {
                            const res = await fetch(`${API_BASE_URL}/classes/module/${id}`);
                            const data = await res.json();
                            return {
                                id: id,
                                titulo: data.titulo,
                                descricao: data.descrição
                            };
                        } catch (error) {
                            console.error(`Erro módulo ${id}`, error);
                            return { id, titulo: `Módulo ${id}`, descricao: "" };
                        }
                    })
                );

                setModules(modulesDetails);
            } catch (err) {
                console.error("Erro geral módulos:", err);
            } finally {
                setLoadingModules(false);
            }
        };

        fetchModulesData();
    }, []);

    // 2. Função ao clicar no Módulo (Expandir)
    const toggleModule = async (moduleId: number) => {
        if (expandedModuleId === moduleId) {
            setExpandedModuleId(null);
            return;
        }

        setExpandedModuleId(moduleId);

        if (!classesCache[moduleId]) {
            setLoadingClasses(true);
            try {
                const res = await fetch(`${API_BASE_URL}/classes/module/${moduleId}/classes`);
                const classIds: number[] = await res.json();

                const classesDetails = await Promise.all(
                    classIds.map(async (classId) => {
                        try {
                            const resClass = await fetch(`${API_BASE_URL}/classes/module/${moduleId}/class/${classId}`);
                            const dataClass = await resClass.json();

                            return {
                                id: classId,
                                titulo: dataClass.titulo
                            };
                        } catch (err) {
                            console.error(`Erro aula ${classId}`, err);
                            return { id: classId, titulo: "Aula" };
                        }
                    })
                );

                setClassesCache((prev) => ({
                    ...prev,
                    [moduleId]: classesDetails
                }));
            } catch (error) {
                console.error(`Erro ao buscar aulas do módulo ${moduleId}:`, error);
            } finally {
                setLoadingClasses(false);
            }
        }
    };

    return (
        <div className="p-10 max-w-5xl mx-auto min-h-screen bg-white">
            <h1 className="text-4xl font-bold mb-4 text-blue-900">Manual do Clique Seguro</h1>
            <p className="text-lg mb-10 text-gray-600">
                Selecione um módulo abaixo para ver as aulas disponíveis.
            </p>

            <div className="space-y-6">
                {loadingModules && (
                    <p className="text-gray-500 animate-pulse">Carregando módulos...</p>
                )}

                {!loadingModules && modules.map((mod) => (
                    <div key={mod.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">

                        {/* Cabeçalho do Módulo */}
                        <button
                            onClick={() => toggleModule(mod.id)}
                            className={`w-full text-left p-6 flex justify-between items-center transition-colors ${
                                expandedModuleId === mod.id
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                            }`}
                        >
                            <span className="text-xl font-bold">
                                Módulo {mod.id} - {mod.titulo}
                            </span>
                            <span className="text-2xl font-bold">
                                {expandedModuleId === mod.id ? "−" : "+"}
                            </span>
                        </button>

                        {/* Área Expandida */}
                        {expandedModuleId === mod.id && (
                            <div className="bg-white p-6 border-t border-gray-100">

                                {/* Descrição do Módulo */}
                                {mod.descricao && (
                                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                        <p className="text-gray-700 leading-relaxed">
                                            {mod.descricao}
                                        </p>
                                    </div>
                                )}

                                {/* Lista de Aulas */}
                                {classesCache[mod.id] ? (
                                    <ul className="space-y-3">
                                        {classesCache[mod.id].length > 0 ? (
                                            classesCache[mod.id].map((cls) => (
                                                <li key={cls.id}>
                                                    <Link
                                                        href={`/class/${mod.id}/${cls.id}`}
                                                        className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-semibold text-gray-800 group-hover:text-blue-600">
                                                                Aula {cls.id} - {cls.titulo}
                                                            </span>
                                                            <span className="text-gray-300 group-hover:text-blue-500 text-xl">
                                                                →
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 italic">Nenhuma aula encontrada.</p>
                                        )}
                                    </ul>
                                ) : (
                                    <div className="flex items-center space-x-3 text-gray-500 py-4">
                                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        <span>Carregando títulos das aulas...</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
