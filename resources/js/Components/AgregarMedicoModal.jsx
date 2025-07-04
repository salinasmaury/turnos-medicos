import { useState } from "react";

export default function AgregarMedicoModal({ isOpen, onClose, onGuardar }) {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        fecha_nacimiento: "",
        especialidad: "",
        dias: [],
        turno: "",
    });

    const diasSemana = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "dias") {
            if (checked) {
                setForm({ ...form, dias: [...form.dias, value] });
            } else {
                setForm({
                    ...form,
                    dias: form.dias.filter((d) => d !== value),
                });
            }
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGuardar(form);
        setForm({
            nombre: "",
            apellido: "",
            telefono: "",
            fecha_nacimiento: "",
            especialidad: "",
            dias: [],
            turno: "",
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-bold mb-4">Agregar Médico</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="nombre"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    <input
                        name="apellido"
                        placeholder="Apellido"
                        value={form.apellido}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    <input
                        name="telefono"
                        placeholder="Teléfono"
                        value={form.telefono}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    <input
                        type="date"
                        name="fecha_nacimiento"
                        value={form.fecha_nacimiento}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />

                    {/* Campo Especialidad */}
                    <select
                        name="especialidad"
                        value={form.especialidad}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">Seleccionar especialidad</option>
                        <option value="Cardiología">Cardiología</option>
                        <option value="Neurología">Neurología</option>
                        <option value="Pediatría">Pediatría</option>
                        <option value="Psiquiatra">Psiquiatria</option>
                        {/* Agregá más especialidades si querés */}
                    </select>

                    <div>
                        <label className="block font-semibold mb-1">
                            Días que trabaja:
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {diasSemana.map((dia) => (
                                <label
                                    key={dia}
                                    className="inline-flex items-center space-x-2"
                                >
                                    <input
                                        type="checkbox"
                                        name="dias"
                                        value={dia}
                                        checked={form.dias.includes(dia)}
                                        onChange={handleChange}
                                        className="form-checkbox"
                                    />
                                    <span>{dia}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Turno:
                        </label>
                        <select
                            name="turno"
                            value={form.turno}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        >
                            <option value="">Seleccionar turno</option>
                            <option value="Mañana">Mañana</option>
                            <option value="Tarde">Tarde</option>
                        </select>
                    </div>

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
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
