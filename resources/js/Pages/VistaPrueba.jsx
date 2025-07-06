import { useState } from "react";
import Layout from "../Layouts/Layout"; // Asumimos que tu Layout está aquí
import BusquedaLucas from "@/Components/Busqueda";
import AgregarPacienteModal from "@/Components/AgregarPacienteModal";
import AgregarMedicoModal from "@/Components/AgregarMedicoModal";

// Con Inertia, los datos como 'pacientes' y 'medicos' vienen como props desde el controlador.
// MODIFICACIÓN: Asegúrate de que 'especialidades' se reciba como prop
export default function VistaPrueba({ pacientes, medicos, especialidades }) {
    const [resultados, setResultados] = useState([]);
    // El estado para mostrar/ocultar los modales se mantiene, ya que es un estado de UI.
    const [mostrarModalPaciente, setMostrarModalPaciente] = useState(false);
    const [mostrarModalMedico, setMostrarModalMedico] = useState(false);

    const datosEjemplo = [
        // ... (tus datos de ejemplo para la búsqueda se mantienen igual)
    ];

    // La función de búsqueda local se mantiene igual.
    const handleSearch = ({ profesional, especialidad, fecha }) => {
        // ...
    };

    return (
        // El Layout recibe las funciones para abrir los modales.
        // Estas funciones se pasarán internamente al Sidebar.
        <Layout
            onAgregarPaciente={() => setMostrarModalPaciente(true)}
            onAgregarMedico={() => setMostrarModalMedico(true)}
        >
            {/* El modal ya no necesita la prop 'onGuardar'. */}
            {/* Se encarga de su propio envío de datos con el hook 'useForm'. */}
            <AgregarPacienteModal
                isOpen={mostrarModalPaciente}
                onClose={() => setMostrarModalPaciente(false)}
            />

            <AgregarMedicoModal
                isOpen={mostrarModalMedico}
                onClose={() => setMostrarModalMedico(false)}
                // MODIFICACIÓN: Usa la prop 'especialidades' que viene del controlador
                especialidades={especialidades}
            />

            <h1 className="text-2xl font-bold text-blue-600 mb-4">
                Vista Prueba
            </h1>

            <BusquedaLucas onSearch={handleSearch} />

            <div className="p-4 bg-white shadow rounded mt-4">
                <h2 className="text-xl font-bold mb-2">
                    Resultados de Búsqueda
                </h2>
                {/* ... (la sección de resultados se mantiene igual) ... */}
            </div>

            {/* Mostramos la lista de pacientes que viene desde el controlador */}
            <div className="p-4 bg-white shadow rounded mt-4">
                <h2 className="text-xl font-bold mb-2">Lista de Pacientes</h2>
                <ul>
                    {/* Asegúrate de que 'pacientes' no sea null antes de mapear */}
                    {pacientes &&
                        pacientes.map((paciente) => (
                            <li key={paciente.id}>
                                {paciente.nombre} {paciente.apellido}
                            </li>
                        ))}
                </ul>
            </div>

            {/* Opcional: Mostrar la lista de médicos (para verificar que los datos llegan) */}
            <div className="p-4 bg-white shadow rounded mt-4">
                <h2 className="text-xl font-bold mb-2">Lista de Médicos</h2>
                <ul>
                    {/* Asegúrate de que 'medicos' no sea null antes de mapear */}
                    {medicos &&
                        medicos.map((medico) => (
                            <li key={medico.id}>
                                {medico.nombre} {medico.apellido} -{" "}
                                {medico.especialidad
                                    ? medico.especialidad.nombre
                                    : "Sin especialidad"}
                            </li>
                        ))}
                </ul>
            </div>
        </Layout>
    );
}
