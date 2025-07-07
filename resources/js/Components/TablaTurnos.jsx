import React from "react";
import { router } from "@inertiajs/react";
import DeleteButton from "./DeleteButton"; // Usamos tu componente para borrar

/**
 * Componente para mostrar una lista de turnos en una tabla con todas las acciones.
 *
 * @param {Array} turnos - El array de turnos a mostrar.
 * @param {function} onEditarTurno - La función que se llama al hacer clic en "Editar".
 */
export default function TablaTurnos({ turnos = [], onEditarTurno }) {
    // Función para marcar/desmarcar un turno como completado
    const handleToggleComplete = (turno) => {
        const nuevoEstado =
            turno.estado === "Completado" ? "Confirmado" : "Completado";

        // Usamos router.patch para una actualización parcial y eficiente
        router.patch(
            route("turnos.update", turno.id),
            { estado: nuevoEstado },
            {
                preserveScroll: true, // Evita que la página salte al inicio
            }
        );
    };

    // Función para dar estilo al estado del turno según su valor
    const getEstadoClass = (estado) => {
        switch (estado) {
            case "Completado":
                return "bg-blue-100 text-blue-800";
            case "Cancelado":
                return "bg-red-100 text-red-800";
            case "Ausente":
                return "bg-red-100 text-red-800";
            default: // Confirmado
                return "bg-green-100 text-green-800";
        }
    };

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-4 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 ">
                    {/* Agenda del Día */}
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Paciente
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    DNI
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Estado
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Completado
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {turnos.length > 0 ? (
                                turnos.map((turno) => (
                                    <tr
                                        key={turno.id}
                                        className="hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {turno.paciente.nombre}{" "}
                                            {turno.paciente.apellido}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {turno.paciente.dni}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoClass(
                                                    turno.estado
                                                )}`}
                                            >
                                                {turno.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    turno.estado ===
                                                    "Completado"
                                                }
                                                onChange={() =>
                                                    handleToggleComplete(turno)
                                                }
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                                title="Marcar como Completado/Confirmado"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                            <button
                                                onClick={() =>
                                                    onEditarTurno(turno)
                                                }
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Editar
                                            </button>
                                            <DeleteButton
                                                routeName="turnos.destroy"
                                                itemId={turno.id}
                                                buttonText="Cancelar"
                                                className="text-red-600 hover:text-red-900"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        No hay turnos agendados para esta
                                        selección.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
