import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Modal from "@/Components/Modal";
// Asegúrate de que estos componentes existan y estén correctamente importados
// import InputLabel from "@/Components/InputLabel";
// import TextInput from "@/Components/TextInput";
// import InputError from "@/Components/InputError";
// import PrimaryButton from "@/Components/PrimaryButton";
// import SecondaryButton from "@/Components/SecondaryButton";
import toast from "react-hot-toast";

export default function AgregarMedicoModal({
    isOpen,
    onClose,
    especialidades, // <<-- ASEGÚRATE QUE SE RECIBE AQUÍ
}) {
    const { errors } = usePage().props;

    const { data, setData, post, processing, reset, clearErrors } = useForm({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        fecha_nacimiento: "",
        sexo: "masculino", // Valor por defecto
        especialidad_id: "", // Asegúrate de que esté inicializado
        dias: [],
        franja: "Mañana", // Valor por defecto
    });

    // Resetear el formulario cuando el modal se cierra
    useEffect(() => {
        if (!isOpen) {
            reset();
            clearErrors(); // Limpia los errores de Inertia también
        }
    }, [isOpen, reset, clearErrors]); // Agrega clearErrors a las dependencias

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setData(
            "dias",
            checked
                ? [...data.dias, parseInt(value)]
                : data.dias.filter((dia) => dia !== parseInt(value))
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("medicos.store"), {
            onSuccess: () => {
                toast.success("Médico agregado con éxito.");
                onClose();
                reset();
                // Opcional: recargar la página para que la lista de médicos se actualice
                router.reload({ only: ["medicos"] });
            },
            onError: (formErrors) => {
                console.error("Errores del backend:", formErrors);
                toast.error("Error al agregar el médico. Revisa los campos.");
            },
        });
    };

    const diasSemana = [
        { id: 1, nombre: "Lunes" },
        { id: 2, nombre: "Martes" },
        { id: 3, nombre: "Miércoles" },
        { id: 4, nombre: "Jueves" },
        { id: 5, nombre: "Viernes" },
        { id: 6, nombre: "Sábado" },
        { id: 7, nombre: "Domingo" },
    ];

    return (
        <Modal show={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-xl font-bold mb-4">Agregar Médico</h2>

                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">¡Oops!</strong>
                        <span className="block sm:inline">
                            {" "}
                            Hubo problemas con tu envío. Por favor, revisa los
                            campos marcados.
                        </span>
                        {/* Puedes listar errores generales aquí si no están asociados a campos específicos */}
                        {/* <ul>{Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}</ul> */}
                    </div>
                )}

                {/* Campo Nombre */}
                <div className="mb-4">
                    <label
                        htmlFor="nombre"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Nombre
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={data.nombre}
                        className={`mt-1 block w-full border px-3 py-2 rounded ${
                            errors.nombre ? "border-red-500" : "border-gray-300"
                        }`}
                        onChange={(e) => setData("nombre", e.target.value)}
                        required
                    />
                    {errors.nombre && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.nombre}
                        </div>
                    )}
                </div>

                {/* Campo Apellido */}
                <div className="mb-4">
                    <label
                        htmlFor="apellido"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Apellido
                    </label>
                    <input
                        id="apellido"
                        type="text"
                        name="apellido"
                        value={data.apellido}
                        className={`mt-1 block w-full border px-3 py-2 rounded ${
                            errors.apellido
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        onChange={(e) => setData("apellido", e.target.value)}
                        required
                    />
                    {errors.apellido && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.apellido}
                        </div>
                    )}
                </div>

                {/* Campo DNI */}
                <div className="mb-4">
                    <label
                        htmlFor="dni"
                        className="block text-sm font-medium text-gray-700"
                    >
                        DNI
                    </label>
                    <input
                        id="dni"
                        type="text"
                        name="dni"
                        value={data.dni}
                        className={`mt-1 block w-full border px-3 py-2 rounded ${
                            errors.dni ? "border-red-500" : "border-gray-300"
                        }`}
                        onChange={(e) => setData("dni", e.target.value)}
                        required
                    />
                    {errors.dni && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.dni}
                        </div>
                    )}
                </div>

                {/* Campo Teléfono */}
                <div className="mb-4">
                    <label
                        htmlFor="telefono"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Teléfono
                    </label>
                    <input
                        id="telefono"
                        type="text"
                        name="telefono"
                        value={data.telefono}
                        className={`mt-1 block w-full border px-3 py-2 rounded ${
                            errors.telefono
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        onChange={(e) => setData("telefono", e.target.value)}
                    />
                    {errors.telefono && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.telefono}
                        </div>
                    )}
                </div>

                {/* Campo Fecha de Nacimiento */}
                <div className="mb-4">
                    <label
                        htmlFor="fecha_nacimiento"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Fecha de Nacimiento
                    </label>
                    <input
                        id="fecha_nacimiento"
                        type="date"
                        name="fecha_nacimiento"
                        value={data.fecha_nacimiento}
                        className={`mt-1 block w-full border px-3 py-2 rounded ${
                            errors.fecha_nacimiento
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        onChange={(e) =>
                            setData("fecha_nacimiento", e.target.value)
                        }
                        required
                    />
                    {errors.fecha_nacimiento && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.fecha_nacimiento}
                        </div>
                    )}
                </div>

                {/* Campo Sexo */}
                <div className="mb-4">
                    <label
                        htmlFor="sexo"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Sexo
                    </label>
                    <select
                        id="sexo"
                        name="sexo"
                        value={data.sexo}
                        onChange={(e) => setData("sexo", e.target.value)}
                        className={`mt-1 block w-full border px-3 py-2 rounded ${
                            errors.sexo ? "border-red-500" : "border-gray-300"
                        }`}
                        required
                    >
                        <option value="">Seleccionar sexo</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                    {errors.sexo && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.sexo}
                        </div>
                    )}
                </div>

                {/* <<-- SECCIÓN CLAVE PARA LAS ESPECIALIDADES -->> */}
                <div className="mb-4">
                    <label
                        htmlFor="especialidad_id"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Especialidad
                    </label>
                    <select
                        id="especialidad_id"
                        name="especialidad_id"
                        value={data.especialidad_id}
                        onChange={(e) =>
                            setData("especialidad_id", e.target.value)
                        }
                        className={`mt-1 block w-full border px-3 py-2 rounded ${
                            errors.especialidad_id
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                        required
                    >
                        <option value="">Seleccionar especialidad</option>
                        {/* Asegúrate que especialidades no sea null/undefined antes de mapear */}
                        {especialidades && especialidades.length > 0 ? (
                            especialidades.map((especialidad) => (
                                <option
                                    key={especialidad.id}
                                    value={especialidad.id}
                                >
                                    {especialidad.nombre}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>
                                Cargando especialidades o no hay disponibles
                            </option>
                        )}
                    </select>
                    {errors.especialidad_id && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.especialidad_id}
                        </div>
                    )}
                </div>
                {/* <<-- FIN SECCIÓN ESPECIALIDADES -->> */}

                {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Días de Trabajo
                    </label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                        {diasSemana.map((dia) => (
                            <label key={dia.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={dia.id}
                                    checked={data.dias.includes(dia.id)}
                                    onChange={handleCheckboxChange}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    {dia.nombre}
                                </span>
                            </label>
                        ))}
                    </div>
                    {errors.dias && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.dias}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="franja"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Franja Horaria
                    </label>
                    <select
                        id="franja"
                        name="franja"
                        value={data.franja}
                        onChange={(e) => setData("franja", e.target.value)}
                        className={`mt-1 block w-full border px-3 py-2 rounded ${
                            errors.franja ? "border-red-500" : "border-gray-300"
                        }`}
                        required
                    >
                        <option value="Mañana">Mañana</option>
                        <option value="Tarde">Tarde</option>
                    </select>
                    {errors.franja && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.franja}
                        </div>
                    )}
                </div> */}

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="ms-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={processing}
                    >
                        {processing ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
