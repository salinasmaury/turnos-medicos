import React from "react";
// No necesitamos Link para el botón de "Ver Médicos Eliminados" si abre un modal
// Asegúrate de que si usas Link en otros componentes, lo importes allí.

export default function Sidebar({
    onAgregarPaciente,
    onAgregarMedico,
    onVerMedicosEliminados,
}) {
    return (
        <aside className="w-64 bg-gray-800 text-white p-4 space-y-4 flex flex-col">
            {/* Sección Superior: Botones de Agregar */}
            <div className="space-y-2 mb-auto">
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
            </div>

            {/* Sección Inferior: Botón para Ver Médicos Eliminados */}
            <div className="pt-4 border-t border-gray-700 space-y-2">
                <button // Ahora es un botón normal
                    onClick={onVerMedicosEliminados} // Nueva prop para abrir el modal
                    className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-200 text-center block"
                >
                    Ver Médicos Eliminados
                </button>
            </div>
        </aside>
    );
}
