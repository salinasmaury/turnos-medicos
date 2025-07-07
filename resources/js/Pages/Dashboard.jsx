import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import BusquedaLucas from "@/Components/Busqueda";
import AgregarPacienteModal from "@/Components/AgregarPacienteModal";
import AgregarMedicoModal from "@/Components/AgregarMedicoModal";
import DeleteButton from "@/Components/DeleteButton";
import VerMedicosEliminadosModal from "@/Components/VerMedicosEliminadosModal";
import toast from "react-hot-toast";
import { router, Head } from "@inertiajs/react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export default function Dashboard({
    auth,
    pacientes,
    medicos,
    especialidades,
    turnos,
    selectedDate: initialSelectedDate,
    viewMode = "active",
}) {
    const [resultados, setResultados] = useState([]);
    const [mostrarModalPaciente, setMostrarModalPaciente] = useState(false);
    const [mostrarModalMedico, setMostrarModalMedico] = useState(false);
    const [mostrarModalMedicosEliminados, setMostrarModalMedicosEliminados] =
        useState(false);

    const [selectedDate, setSelectedDate] = useState(
        initialSelectedDate || format(new Date(), "yyyy-MM-dd")
    );

    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setSelectedDate(newDate);
        router.get(
            route("dashboard", { date: newDate }),
            {},
            { preserveState: true }
        );
    };

    const formattedDisplayDate = format(
        parseISO(selectedDate),
        "EEEE dd 'de' MMMM 'de'yyyy",
        { locale: es }
    );

    const handleSearch = ({ profesional, especialidad, fecha }) => {
        // ... tu lógica de búsqueda
    };

    return (
        <Layout
            auth={auth}
            onAgregarPaciente={() => setMostrarModalPaciente(true)}
            onAgregarMedico={() => setMostrarModalMedico(true)}
            onVerMedicosEliminados={() =>
                setMostrarModalMedicosEliminados(true)
            }
        >
            <Head title="Dashboard de Gestión" />

            <AgregarPacienteModal
                isOpen={mostrarModalPaciente}
                onClose={() => setMostrarModalPaciente(false)}
            />

            <AgregarMedicoModal
                isOpen={mostrarModalMedico}
                onClose={() => setMostrarModalMedico(false)}
                especialidades={especialidades}
            />

            <VerMedicosEliminadosModal
                isOpen={mostrarModalMedicosEliminados}
                onClose={() => setMostrarModalMedicosEliminados(false)}
            />

            <h1 className="text-2xl font-bold text-blue-600 mb-4">Dashboard</h1>

            {/* <<-- SECCIÓN DE TURNOS -->> */}
            <div className="p-4 bg-white shadow rounded mb-4">
                <h2 className="text-xl font-bold mb-2">
                    Turnos Agendados para {formattedDisplayDate}
                </h2>

                <div className="mb-4">
                    <label
                        htmlFor="turnosDatePicker"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Seleccionar Fecha de Turnos:
                    </label>
                    <input
                        type="date"
                        id="turnosDatePicker"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    />
                </div>

                {turnos && turnos.length > 0 ? (
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
                                        Médico que Atiende
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Teléfono Paciente
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Hora
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Agendado Por
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {turnos.map((turno) => (
                                    <tr key={turno.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {turno.paciente
                                                ? `${turno.paciente.nombre} ${turno.paciente.apellido}`
                                                : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {turno.medico
                                                ? `${turno.medico.nombre} ${turno.medico.apellido}`
                                                : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {turno.paciente
                                                ? turno.paciente.telefono
                                                : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {/* Formatear solo la hora de la columna 'fecha' */}
                                            {turno.fecha // <<-- Usando turno.fecha
                                                ? format(
                                                      parseISO(turno.fecha),
                                                      "HH:mm"
                                                  )
                                                : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {turno.otorgado_por
                                                ? turno.otorgado_por.name
                                                : "Desconocido"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600 text-center py-8">
                        No hay turnos agendados para {formattedDisplayDate}.
                    </p>
                )}
            </div>
            {/* <<-- FIN DE LA SECCIÓN DE TURNOS -->> */}

            {/* <BusquedaLucas onSearch={handleSearch} /> comente para sacar la barra de busqueda                     */}

            {/* Sección de listado de Médicos Activos */}
            <div className="p-4 bg-white shadow rounded mt-4">
                <h2 className="text-xl font-bold mb-2">
                    Lista de Médicos Activos
                </h2>
                <ul>
                    {medicos && medicos.length > 0 ? (
                        medicos.map((medico) => (
                            <li
                                key={medico.id}
                                className="border-b py-2 flex justify-between items-center"
                            >
                                <span>
                                    {medico.nombre} {medico.apellido} -{" "}
                                    {medico.especialidad
                                        ? medico.especialidad.nombre
                                        : "Sin especialidad"}
                                </span>
                                <div>
                                    <DeleteButton
                                        routeName="medicos.destroy"
                                        itemId={medico.id}
                                        confirmMessage="¿Estás seguro de que quieres eliminar este médico (se eliminará suavemente)?"
                                        successMessage="Médico eliminado suavemente con éxito."
                                        errorMessage="Error al eliminar el médico."
                                        buttonText="Eliminar"
                                    />
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="py-2 text-gray-500">
                            No hay médicos registrados.
                        </li>
                    )}
                </ul>
            </div>

            {/* Sección de listado de Pacientes */}
            <div className="p-4 bg-white shadow rounded mt-4">
                <h2 className="text-xl font-bold mb-2">Lista de Pacientes</h2>
                <ul>
                    {pacientes &&
                        pacientes.map((paciente) => (
                            <li key={paciente.id}>
                                {paciente.nombre} {paciente.apellido}
                            </li>
                        ))}
                </ul>
            </div>

            {/* Sección de Resultados de Búsqueda */}
            <div className="p-4 bg-white shadow rounded mt-4">
                <h2 className="text-xl font-bold mb-2">
                    Resultados de Búsqueda
                </h2>
                {/* ... tu sección de resultados de búsqueda ... */}
            </div>
        </Layout>
    );
}
