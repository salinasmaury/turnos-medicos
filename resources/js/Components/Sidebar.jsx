import React from "react";
import { Link, usePage } from '@inertiajs/react';
import { useModal } from '@/Context/ModalContext'; // <-- 1. Importamos nuestro hook

// El Sidebar ya no recibe props para los modales
export default function Sidebar() {
    const { url } = usePage();
    // 2. Obtenemos las funciones para ABRIR los modales directamente del contexto
    const { abrirModalPaciente, abrirModalMedico, abrirModalMedicosEliminados } = useModal();

    const isActive = (path) => url.startsWith(path);

    return (
        <aside className="w-64 bg-gray-800 text-white p-4 space-y-4 flex flex-col">
            <div className="space-y-2">
                <Link
                    href={route('dashboard')}
                    className={`w-full text-left block font-bold py-2 px-4 rounded transition duration-200 ${isActive('/dashboard') ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                >
                    Inicio / Médicos
                </Link>
                <Link
                    href={route('turnos.index')}
                    className={`w-full text-left block font-bold py-2 px-4 rounded transition duration-200 ${isActive('/turnos') ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                >
                    Gestionar Turnos
                </Link>
            </div>
            <div className="space-y-2 mt-auto pt-4 border-t border-gray-700">
                {/* 3. Los botones ahora llaman a las funciones del contexto */}
                <button onClick={abrirModalPaciente} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
                    + Agregar Paciente
                </button>
                <button onClick={abrirModalMedico} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200">
                    + Agregar Médico
                </button>
                <button onClick={abrirModalMedicosEliminados} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200 text-center block">
                    Ver Médicos Eliminados
                </button>
            </div>
        </aside>
    );
}