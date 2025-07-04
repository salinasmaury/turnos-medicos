import { useState } from "react";
import Layout from "../Layouts/Layout";
import BusquedaLucas from "@/Components/BusquedaLucas";
import AgregarPacienteModal from "@/Components/AgregarPacienteModal";
import AgregarMedicoModal from "@/Components/AgregarMedicoModal";

export default function VistaPrueba() {
    const [resultados, setResultados] = useState([]);
    const [mostrarModalPaciente, setMostrarModalPaciente] = useState(false);
    const [mostrarModalMedico, setMostrarModalMedico] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);

    const datosEjemplo = [
        {
            nombre: "Dra. López, Cardiologa",
            especialidad: "Cardiología",
            fecha: "2025-07-01",
        },
        {
            nombre: "Dr. García, Neurologa",
            especialidad: "Neurología",
            fecha: "2025-07-03",
        },
        {
            nombre: "Lic. Fernández, Pediatra",
            especialidad: "Pediatría",
            fecha: "2025-07-01",
        },
    ];

    const handleAgregarPaciente = (paciente) => {
        setPacientes([...pacientes, paciente]);
    };

    const handleAgregarMedico = (medico) => {
        setMedicos([...medicos, medico]);
    };

    const handleSearch = ({ profesional, especialidad, fecha }) => {
        const filtrados = datosEjemplo.filter((item) => {
            const coincideProfesional =
                !profesional || item.nombre === profesional;
            const coincideEspecialidad =
                !especialidad || item.especialidad === especialidad;
            const coincideFecha = !fecha || item.fecha === fecha;
            return coincideProfesional && coincideEspecialidad && coincideFecha;
        });

        setResultados(filtrados);
    };

    return (
        <Layout
            onAgregarPaciente={() => setMostrarModalPaciente(true)}
            onAgregarMedico={() => setMostrarModalMedico(true)}
        >
            <AgregarPacienteModal
                isOpen={mostrarModalPaciente}
                onClose={() => setMostrarModalPaciente(false)}
                onGuardar={handleAgregarPaciente}
            />

            <AgregarMedicoModal
                isOpen={mostrarModalMedico}
                onClose={() => setMostrarModalMedico(false)}
                onGuardar={handleAgregarMedico}
            />

            <h1 className="text-2xl font-bold text-blue-600 mb-4">
                Vista Prueba
            </h1>

            <BusquedaLucas onSearch={handleSearch} />

            <div className="p-4 bg-white shadow rounded mt-4">
                <h2 className="text-xl font-bold mb-2">Resultados</h2>

                {resultados.length === 0 ? (
                    <p>No hay resultados para mostrar</p>
                ) : (
                    <ul className="space-y-2">
                        {resultados.map((item, index) => (
                            <li key={index} className="border p-3 rounded">
                                <p>
                                    <strong>Nombre:</strong> {item.nombre}
                                </p>
                                <p>
                                    <strong>Especialidad:</strong>{" "}
                                    {item.especialidad}
                                </p>
                                <p>
                                    <strong>Fecha:</strong> {item.fecha}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
}
