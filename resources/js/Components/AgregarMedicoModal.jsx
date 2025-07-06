import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function AgregarMedicoModal({
    isOpen,
    onClose,
    especialidades,
}) {
    // <-- Recibe 'especialidades' como prop
    const { errors } = usePage().props;

    const { data, setData, post, processing, reset, clearErrors } = useForm({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        fecha_nacimiento: "",
        sexo: "",
        especialidad_id: "",
        dias: [],
        franja: "",
    });

    const diasSemana = [
        { id: 1, nombre: "Lunes" },
        { id: 2, nombre: "Martes" },
        { id: 3, nombre: "Miércoles" },
        { id: 4, nombre: "Jueves" },
        { id: 5, nombre: "Viernes" },
        { id: 6, nombre: "Sábado" },
        { id: 7, nombre: "Domingo" },
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "dias") {
            if (checked) {
                setData("dias", [...data.dias, parseInt(value)]);
            } else {
                setData(
                    "dias",
                    data.dias.filter((d) => d !== parseInt(value))
                );
            }
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("medicos.store"), {
            onSuccess: () => {
                reset();
                onClose();
            },
            onError: (formErrors) => {
                console.error("Errores de validación:", formErrors);
            },
        });
    };

    useEffect(() => {
        if (!isOpen) {
            reset();
            clearErrors();
        }
    }, [isOpen, reset, clearErrors]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-bold mb-4">Agregar Médico</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            <strong className="font-bold">¡Oops!</strong>
                            <span className="block sm:inline">
                                {" "}
                                Hubo problemas con tu envío.
                            </span>
                        </div>
                    )}

                    {/* Campo Nombre */}
                    <div>
                        <input
                            name="nombre"
                            placeholder="Nombre"
                            value={data.nombre}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${
                                errors.nombre
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            required
                        />
                        {errors.nombre && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.nombre}
                            </div>
                        )}
                    </div>

                    {/* Campo Apellido */}
                    <div>
                        <input
                            name="apellido"
                            placeholder="Apellido"
                            value={data.apellido}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${
                                errors.apellido
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            required
                        />
                        {errors.apellido && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.apellido}
                            </div>
                        )}
                    </div>

                    {/* Campo DNI */}
                    <div>
                        <input
                            name="dni"
                            placeholder="DNI"
                            value={data.dni}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${
                                errors.dni
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            required
                        />
                        {errors.dni && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.dni}
                            </div>
                        )}
                    </div>

                    {/* Campo Teléfono */}
                    <div>
                        <input
                            name="telefono"
                            placeholder="Teléfono"
                            value={data.telefono}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${
                                errors.telefono
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        {errors.telefono && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.telefono}
                            </div>
                        )}
                    </div>

                    {/* Campo Fecha de Nacimiento */}
                    <div>
                        <input
                            type="date"
                            name="fecha_nacimiento"
                            value={data.fecha_nacimiento}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${
                                errors.fecha_nacimiento
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            required
                        />
                        {errors.fecha_nacimiento && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.fecha_nacimiento}
                            </div>
                        )}
                    </div>

                    {/* Campo Sexo */}
                    <div>
                        <select
                            name="sexo"
                            value={data.sexo}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${
                                errors.sexo
                                    ? "border-red-500"
                                    : "border-gray-300"
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

                    {/* Campo Especialidad */}
                    <div>
                        <select
                            name="especialidad_id"
                            value={data.especialidad_id}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${
                                errors.especialidad_id
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            required
                        >
                            <option value="">Seleccionar especialidad</option>
                            {/* MODIFICACIÓN CRUCIAL: Usar especialidad.nombre para mostrar el texto */}
                            {especialidades &&
                                especialidades.length > 0 &&
                                especialidades.map((especialidad) => (
                                    <option
                                        key={especialidad.id}
                                        value={especialidad.id}
                                    >
                                        {especialidad.nombre}{" "}
                                        {/* <<-- CAMBIO AQUÍ */}
                                    </option>
                                ))}
                        </select>
                        {errors.especialidad_id && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.especialidad_id}
                            </div>
                        )}
                    </div>

                    {/* Campo Días que trabaja (checkboxes) */}
                    <div>
                        <label className="block font-semibold mb-1">
                            Días que trabaja:
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {diasSemana.map((dia) => (
                                <label
                                    key={dia.id}
                                    className="inline-flex items-center space-x-2"
                                >
                                    <input
                                        type="checkbox"
                                        name="dias"
                                        value={dia.id}
                                        checked={data.dias.includes(dia.id)}
                                        onChange={handleChange}
                                        className="form-checkbox"
                                    />
                                    <span>{dia.nombre}</span>
                                </label>
                            ))}
                        </div>
                        {errors.dias && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.dias}
                            </div>
                        )}
                    </div>

                    {/* Campo Turno (Franja horaria) */}
                    <div>
                        <label className="block font-semibold mb-1">
                            Franja Horaria:
                        </label>
                        <select
                            name="franja"
                            value={data.franja}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${
                                errors.franja
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                            required
                        >
                            <option value="">Seleccionar franja</option>
                            <option value="Mañana">Mañana</option>
                            <option value="Tarde">Tarde</option>
                        </select>
                        {errors.franja && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.franja}
                            </div>
                        )}
                    </div>

                    {/* Botones de acción */}
                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            disabled={processing}
                        >
                            {processing ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
