import React, { useState, useEffect } from "react";
import Modal from "@/Components/Modal"; // Asegúrate de tener un componente Modal genérico
import DeleteButton from "@/Components/DeleteButton"; // Reutilizamos DeleteButton
import toast from "react-hot-toast"; // Para mensajes
import { router } from "@inertiajs/react"; // Para recargar la página principal si es necesario

export default function VerMedicosEliminadosModal({ isOpen, onClose }) {
    const [medicosEliminados, setMedicosEliminados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener el token CSRF
    const getCsrfToken = () => {
        return document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
    };

    // Función para cargar los médicos eliminados
    const fetchMedicosEliminados = async () => {
        setLoading(true);
        setError(null);
        try {
            // Llama a la ruta medicos.getTrashed que devuelve JSON
            const response = await fetch(route("medicos.getTrashed"));
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMedicosEliminados(data.medicos);
        } catch (err) {
            console.error("Error al cargar médicos eliminados:", err);
            setError("No se pudieron cargar los médicos eliminados.");
            toast.error("Error al cargar médicos eliminados.");
        } finally {
            setLoading(false);
        }
    };

    // Cargar médicos eliminados cuando el modal se abre
    useEffect(() => {
        if (isOpen) {
            fetchMedicosEliminados();
        }
    }, [isOpen]);

    // Función para manejar la restauración de un médico
    const handleRestoreMedico = async (id) => {
        if (confirm("¿Estás seguro de que quieres restaurar este médico?")) {
            try {
                const response = await fetch(route("medicos.restore", id), {
                    method: "POST", // Usa POST para restaurar
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": getCsrfToken(), // Asegúrate de enviar el token CSRF
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error ||
                            `HTTP error! status: ${response.status}`
                    );
                }

                const data = await response.json();
                toast.success(data.success);
                fetchMedicosEliminados(); // Vuelve a cargar la lista para actualizar el modal
                router.reload({ only: ["medicos"] }); // Recarga solo la prop 'medicos' en VistaPrueba para actualizar la lista principal
            } catch (err) {
                console.error("Error al restaurar el médico:", err);
                toast.error("Error al restaurar el médico: " + err.message);
            }
        }
    };

    // La eliminación permanente se maneja con el DeleteButton,
    // que ya tiene su propia lógica de éxito/error y recarga la página.
    // Solo necesitamos asegurarnos de que el DeleteButton llame a la ruta correcta.

    return (
        <Modal show={isOpen} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Médicos Eliminados
                </h2>

                {loading && <p>Cargando médicos eliminados...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading &&
                    !error &&
                    (medicosEliminados.length > 0 ? (
                        <ul>
                            {medicosEliminados.map((medico) => (
                                <li
                                    key={medico.id}
                                    className="border-b py-2 flex justify-between items-center"
                                >
                                    <span>
                                        {medico.nombre} {medico.apellido} -{" "}
                                        {medico.especialidad
                                            ? medico.especialidad.nombre
                                            : "Sin especialidad"}
                                        <span className="ml-2 text-sm text-red-500">
                                            (Eliminado:{" "}
                                            {new Date(
                                                medico.deleted_at
                                            ).toLocaleDateString()}
                                            )
                                        </span>
                                    </span>
                                    <div>
                                        <button
                                            onClick={() =>
                                                handleRestoreMedico(medico.id)
                                            }
                                            className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                                        >
                                            Restaurar
                                        </button>
                                        {/* <DeleteButton
                                            routeName="medicos.forceDelete" // Ruta para eliminar permanentemente
                                            itemId={medico.id}
                                            confirmMessage="¡ADVERTENCIA! ¿Estás seguro de que quieres ELIMINAR PERMANENTEMENTE este médico? Esta acción no se puede deshacer."
                                            successMessage="Médico eliminado permanentemente con éxito."
                                            errorMessage="Error al eliminar el médico permanentemente."
                                            buttonText="Eliminar Permanente"
                                            className="ml-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
                                            forceDelete={true}
                                            // Cuando DeleteButton tiene éxito, recargará la página (Inertia.reload)
                                            // y el modal se actualizará automáticamente si isOpen se mantiene true
                                            // o se cerrará y reabrirá para una nueva carga.
                                        /> */}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay médicos eliminados.</p>
                    ))}

                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </Modal>
    );
}
