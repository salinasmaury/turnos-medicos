import { useState } from "react";

export default function BusquedaLucas({ onSearch }) {
    const [profesional, setProfesional] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [fecha, setFecha] = useState("");

    // Datos de ejemplo (pueden venir de props o de una API)
    const profesionales = [
        "Dra. López, Cardiologa",
        "Dr. García, Neurologa",
        "Lic. Fernández, Pediatra",
    ];
    const especialidades = ["Cardiología", "Neurología", "Pediatría"];
    const fechas = ["2023-10-01", "2023-10-02", "2023-10-03"];
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ profesional, especialidad, fecha });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded shadow mb-6"
        >
            {/* Select profesional */}
            <select
                value={profesional}
                onChange={(e) => setProfesional(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 flex-1"
            >
                <option value="">Seleccionar profesional</option>
                {profesionales.map((p, index) => (
                    <option key={index} value={p}>
                        {p}
                    </option>
                ))}
            </select>

            {/* Select especialidad */}
            <select
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 flex-1"
            >
                <option value="">Seleccionar especialidad</option>
                {especialidades.map((e, index) => (
                    <option key={index} value={e}>
                        {e}
                    </option>
                ))}
            </select>

            {/* Input de fecha */}
            <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
            />

            {/* Botón de búsqueda */}
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Buscar
            </button>
        </form>
    );
}
