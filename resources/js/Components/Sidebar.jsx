import React from "react";
import { Link } from '@inertiajs/react'; // <-- Importamos Link para la navegación

// Recibe todas las funciones para los modales
export default function Sidebar({
    onAgregarPaciente,
    onAgregarMedico,
    onVerMedicosEliminados,
}) {
    return (
        <aside className="w-64 bg-gray-800 text-white p-4 space-y-4 flex flex-col">
            <div className="space-y-2">
                {/* --- ENLACES DE NAVEGACIÓN --- */}
                <Link
                    href={route('dashboard')}
                    className="w-full text-left block hover:bg-gray-700 font-bold py-2 px-4 rounded transition duration-200"
                >
                    Inicio / Médicos
                </Link>
                <Link
                    href={route('turnos.index')}
                    className="w-full text-left block hover:bg-gray-700 font-bold py-2 px-4 rounded transition duration-200"
                >
                    Gestionar Turnos
                </Link>
            </div>

            {/* --- BOTONES DE ACCIÓN (MODALES) --- */}
            <div className="space-y-2 mt-auto pt-4 border-t border-gray-700">
                <button
                    onClick={onAgregarPaciente}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                    + Agregar Paciente
                </button>
                <button
                    onClick={onAgregarMedico}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                    + Agregar Médico
                </button>
                <button
                    onClick={onVerMedicosEliminados}
                    className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-200 text-center block"
                >
                    Ver Médicos Eliminados
                </button>
            </div>
        </aside>
    );
}
