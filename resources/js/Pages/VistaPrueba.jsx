import { useState } from "react";
import Layout from "../Layouts/Layout";
import BusquedaLucas from "@/Components/BusquedaLucas";

export default function VistaPrueba() {
    const [resultados, setResultados] = useState([]);

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
        <Layout>
            <h1 className="text-2xl font-bold text-blue-600 mb-4">
                Vista Prueba
            </h1>

            {/* Barra de búsqueda */}
            <BusquedaLucas onSearch={handleSearch} />

            {/* Resultados */}
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
