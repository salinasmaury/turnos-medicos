import { useState } from "react";
import Layout from "../Layouts/Layout";
import BusquedaLucas from "@/Components/Busqueda";
import AgregarPacienteModal from "@/Components/AgregarPacienteModal";
import AgregarMedicoModal from "@/Components/AgregarMedicoModal";
import DeleteButton from "@/Components/DeleteButton";
import VerMedicosEliminadosModal from "@/Components/VerMedicosEliminadosModal"; // <<-- IMPORTA EL NUEVO MODAL
import toast from "react-hot-toast"; // Asegúrate de importar toast

export default function VistaPrueba({
    auth,
    pacientes,
    medicos,
    especialidades,
    viewMode = "active",
}) {
    const [resultados, setResultados] = useState([]);
    const [mostrarModalPaciente, setMostrarModalPaciente] = useState(false);
    const [mostrarModalMedico, setMostrarModalMedico] = useState(false);
    const [mostrarModalMedicosEliminados, setMostrarModalMedicosEliminados] =
        useState(false); // <<-- NUEVO ESTADO

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
            } // <<-- PASA LA FUNCIÓN AL LAYOUT/SIDEBAR
        >
            <AgregarPacienteModal
                isOpen={mostrarModalPaciente}
                onClose={() => setMostrarModalPaciente(false)}
            />

            <AgregarMedicoModal
                isOpen={mostrarModalMedico}
                onClose={() => setMostrarModalMedico(false)}
                especialidades={especialidades}
            />

            {/* Renderiza el nuevo modal de médicos eliminados */}
            <VerMedicosEliminadosModal
                isOpen={mostrarModalMedicosEliminados}
                onClose={() => setMostrarModalMedicosEliminados(false)}
            />

            <h1 className="text-2xl font-bold text-blue-600 mb-4">
                Gestión Principal de Médicos
            </h1>

            <BusquedaLucas onSearch={handleSearch} />

            {/* Sección de listado de Médicos (siempre activos en esta vista) */}
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