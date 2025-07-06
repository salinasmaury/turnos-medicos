import React from "react";
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

/**
 * Componente de botón genérico para eliminación (soft delete por defecto).
 *
 * @param {string} routeName El nombre de la ruta de Laravel para la acción de eliminar (ej. 'medicos.destroy').
 * @param {number|string} itemId El ID del elemento a eliminar.
 * @param {string} confirmMessage Mensaje de confirmación antes de eliminar.
 * @param {string} successMessage Mensaje de éxito después de eliminar.
 * @param {string} errorMessage Mensaje de error si la eliminación falla.
 * @param {string} buttonText Texto del botón.
 * @param {string} className Clases CSS adicionales para el botón.
 * @param {boolean} forceDelete Si es true, usa forceDelete (eliminar permanentemente).
 */
export default function DeleteButton({
    routeName,
    itemId,
    confirmMessage = "¿Estás seguro de que quieres eliminar este elemento?",
    successMessage = "Elemento eliminado con éxito.",
    errorMessage = "Error al eliminar el elemento.",
    buttonText = "Eliminar",
    className = "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm",
    forceDelete = false,
}) {
    const { delete: inertiaDelete, processing } = useForm();

    const handleDelete = () => {
        if (confirm(confirmMessage)) {
            inertiaDelete(route(routeName, itemId), {
                onSuccess: () => {
                    toast.success(successMessage);
                    // Inertia recargará la página (o la prop si se usa only), actualizando la lista automáticamente.
                },
                onError: (errors) => {
                    console.error("Error al eliminar:", errors);
                    toast.error(errorMessage);
                },
            });
        }
    };

    return (
        <button
            onClick={handleDelete}
            className={className}
            disabled={processing}
        >
            {processing ? "..." : buttonText}
        </button>
    );
}
