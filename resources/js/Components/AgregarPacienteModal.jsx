import { useForm } from "@inertiajs/react";

// La prop onGuardar ya no es necesaria, la eliminamos
export default function AgregarPacienteModal({ isOpen, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: "",
        apellido: "",
        dni: "",
        fecha_nacimiento: "",
        telefono: "",
        sexo: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pacientes.store"), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Agregar Paciente</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* CORRECCIÓN: El valor ahora debe ser data.nombre, no el antiguo 'form.nombre' */}
                    <div>
                        <input
                            name="nombre"
                            placeholder="Nombre"
                            value={data.nombre}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                        {errors.nombre && <div className="text-red-500 text-sm mt-1">{errors.nombre}</div>}
                    </div>

                    <div>
                        <input
                            name="apellido"
                            placeholder="Apellido"
                            value={data.apellido}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                         {errors.apellido && <div className="text-red-500 text-sm mt-1">{errors.apellido}</div>}
                    </div>

                    <div>
                        <input
                            name="dni"
                            placeholder="DNI"
                            value={data.dni}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                         {errors.dni && <div className="text-red-500 text-sm mt-1">{errors.dni}</div>}
                    </div>

                    <div>
                        <input
                            type="date"
                            name="fecha_nacimiento"
                            value={data.fecha_nacimiento}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                        {errors.fecha_nacimiento && <div className="text-red-500 text-sm mt-1">{errors.fecha_nacimiento}</div>}
                    </div>

                    <div>
                        <input
                            name="telefono"
                            placeholder="Teléfono"
                            value={data.telefono}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                        {errors.telefono && <div className="text-red-500 text-sm mt-1">{errors.telefono}</div>}
                    </div>

                    <div>
                        <select
                            name="sexo"
                            value={data.sexo}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        >
                            <option value="">Seleccionar sexo</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="X">Otro</option>
                        </select>
                        {errors.sexo && <div className="text-red-500 text-sm mt-1">{errors.sexo}</div>}
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            {processing ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
