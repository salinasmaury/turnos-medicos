import React, { useState, useEffect } from "react"; // Importa los hooks necesarios de React:
//   - useState: Para manejar el estado local del componente (aunque lo reemplazaremos mayormente con useForm).
//   - useEffect: Para ejecutar efectos secundarios, como limpiar el formulario cuando el modal se cierra.
import { useForm, usePage } from "@inertiajs/react"; // Importa los hooks específicos de Inertia.js:
//   - useForm: Hook principal para manejar estados de formulario, envíos y validación con Inertia.
//   - usePage: Hook para acceder a las props de la página de Inertia, incluyendo los errores de validación y mensajes flash.

export default function AgregarMedicoModal({ isOpen, onClose, especialidades }) {
    // Este es un componente funcional de React que recibe tres props:
    //   - isOpen: Booleano que controla si el modal es visible o no.
    //   - onClose: Función que se llama para cerrar el modal.
    //   - especialidades: Array de objetos de especialidades, pasado desde el controlador Laravel
    //                   para popular el selector de especialidades.

    // 1. Acceso a los errores de validación de Inertia
    // `usePage().props.errors` es un objeto que Inertia automáticamente poblado
    // con los errores de validación que vienen del backend de Laravel.
    // Si, por ejemplo, el campo 'nombre' falla la validación, errors.nombre contendrá el mensaje de error.
    const { errors } = usePage().props;

    // 2. Inicialización del formulario con useForm de Inertia
    // Este hook de Inertia maneja todo lo relacionado con el estado del formulario,
    // el envío de datos al backend, y la gestión de la interfaz de usuario durante ese proceso.
    const {
        data, // 'data' es un objeto que contiene el estado actual de todos los campos del formulario.
        setData, // 'setData' es la función para actualizar los valores de los campos en 'data'.
        post, // 'post' es la función para enviar el formulario vía POST a una ruta de Laravel.
        processing, // 'processing' es un booleano que es 'true' mientras se envía el formulario (útil para deshabilitar botones).
        reset, // 'reset' es una función para restablecer todos los campos del formulario a sus valores iniciales.
        clearErrors // 'clearErrors' es una función para limpiar los mensajes de error de validación de Inertia.
    } = useForm({
        // Define los campos iniciales del formulario.
        // Los nombres de las propiedades aquí deben coincidir con los nombres
        // de los campos que esperas en tu controlador de Laravel.
        nombre: "",
        apellido: "",
        dni: "", // Agregado: Campo DNI, crucial para el médico.
        telefono: "",
        fecha_nacimiento: "",
        sexo: "", // Agregado: Campo Sexo para el médico.
        especialidad_id: "", // Cambiado: Ahora se espera el ID de la especialidad, no el nombre.
        dias: [], // Array para almacenar los IDs de los días seleccionados.
        franja: "", // Cambiado: Ahora es 'franja' para coincidir con HorarioMedico.
    });

    // 3. Datos estáticos para los días de la semana
    // Este array se usa para renderizar los checkboxes de los días.
    // Se usan objetos con 'id' y 'nombre' para facilitar el manejo de los valores y el mapeo.
    const diasSemana = [
        { id: 1, nombre: "Lunes" },
        { id: 2, nombre: "Martes" },
        { id: 3, nombre: "Miércoles" },
        { id: 4, nombre: "Jueves" },
        { id: 5, nombre: "Viernes" },
        { id: 6, nombre: "Sábado" },
        { id: 7, nombre: "Domingo" },
    ];

    // 4. Función para manejar los cambios en los inputs del formulario
    // Se invoca cada vez que un usuario escribe en un input o selecciona una opción.
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target; // Desestructura las propiedades del evento del input.

        if (name === "dias") {
            // Lógica específica para los checkboxes de los días de la semana.
            if (checked) {
                // Si el checkbox fue marcado, añade el ID del día al array 'dias' en el estado del formulario.
                setData("dias", [...data.dias, parseInt(value)]); // `parseInt(value)` asegura que sea un número.
            } else {
                // Si el checkbox fue desmarcado, filtra el día del array 'dias'.
                setData(
                    "dias",
                    data.dias.filter((d) => d !== parseInt(value))
                );
            }
        } else {
            // Para todos los demás inputs (texto, fecha, select), actualiza el campo correspondiente en 'data'.
            setData(name, value);
        }
    };

    // 5. Función para manejar el envío del formulario
    // Esta función se activa cuando el usuario hace clic en el botón de "Guardar" o presiona Enter.
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario HTML (recargar la página).

        // 'post' es el método de Inertia para enviar el formulario.
        //   - Primer argumento: La ruta de Laravel a la que enviar los datos (debes definirla en web.php).
        //   - Segundo argumento: Un objeto de opciones con callbacks para éxito y error.
        post(route("medicos.store"), {
            // Callback 'onSuccess': Se ejecuta si la petición HTTP es exitosa (ej. 200 OK, 302 Redirect).
            onSuccess: () => {
                reset(); // Restablece todos los campos del formulario a sus valores iniciales (vacíos).
                onClose(); // Cierra el modal después de un envío exitoso.
                // Importante: El toast de éxito (ej. "Médico agregado con éxito")
                // será manejado automáticamente por el componente FlashMessages.jsx
                // global que creaste y conectaste en tu Layout principal.
            },
            // Callback 'onError': Se ejecuta si la petición HTTP falla (ej. 422 Unprocessable Entity por validación).
            onError: (formErrors) => {
                // Cuando hay errores de validación desde Laravel, Inertia automáticamente
                // actualiza el objeto 'errors' accesible a través de `usePage().props.errors`.
                // Por lo tanto, no necesitas escribir código aquí para mostrar los mensajes bajo los campos,
                // ya que eso se maneja en el JSX más abajo.
                // Puedes usar console.error para depuración, o añadir un toast general si lo deseas.
                console.error("Errores de validación:", formErrors);
                // Ejemplo de toast general para errores:
                // toast.error("Por favor, revisa los campos con errores.");
            },
        });
    };

    // 6. Efecto para limpiar el formulario y los errores al abrir/cerrar el modal
    // Este useEffect se ejecuta cada vez que el valor de `isOpen` cambia.
    useEffect(() => {
        if (!isOpen) {
            // Si el modal se está cerrando (`isOpen` es false),
            reset(); // Limpia todos los datos del formulario.
            clearErrors(); // Borra cualquier mensaje de error de validación que pudiera estar visible.
            // Esto asegura que cuando el modal se reabra, esté limpio y sin errores de intentos anteriores.
        }
    }, [isOpen, reset, clearErrors]); // Dependencias del efecto: Se re-ejecuta si 'isOpen', 'reset' o 'clearErrors' cambian.

    // 7. Renderizado condicional del modal
    // Si `isOpen` es falso, el componente no renderiza nada (`null`), ocultando el modal.
    if (!isOpen) return null;

    // 8. Estructura del Modal (JSX)
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Overlay semitransparente que cubre toda la pantalla */}
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-auto">
                {/* Contenedor principal del modal: fondo blanco, esquinas redondeadas, sombra, padding.
                    max-h-[90vh] y overflow-auto para que sea scrollable si el contenido es muy largo. */}
                <h2 className="text-xl font-bold mb-4">Agregar Médico</h2>
                {/* Título del modal */}
                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Formulario que maneja el envío con handleSubmit */}

                    {/* Mensaje de error general (opcional, si hay errores no específicos de un campo) */}
                    {Object.keys(errors).length > 0 && (
                        // Si el objeto 'errors' tiene alguna clave (es decir, hay al menos un error de validación),
                        // muestra un mensaje de alerta general en la parte superior del formulario.
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            <strong className="font-bold">¡Oops!</strong>
                            <span className="block sm:inline"> Hubo problemas con tu envío.</span>
                            {/* Puedes expandir esto para listar todos los errores si lo prefieres,
                                pero para un formulario largo, mostrarlo campo por campo es mejor UX. */}
                        </div>
                    )}

                    {/* Campo Nombre */}
                    <div>
                        <input
                            name="nombre" // El atributo 'name' debe coincidir con la clave en 'data' y en la validación de Laravel.
                            placeholder="Nombre"
                            value={data.nombre} // El valor del input está controlado por el estado 'data.nombre'.
                            onChange={handleChange} // Cuando el input cambia, se llama a handleChange para actualizar el estado.
                            // Clase condicional: Si errors.nombre existe, añade un borde rojo para resaltar el error.
                            className={`w-full border px-3 py-2 rounded ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                            required // Atributo HTML5 para validación básica en el navegador.
                        />
                        {/* Muestra el mensaje de error específico para 'nombre' */}
                        {errors.nombre && <div className="text-red-500 text-sm mt-1">{errors.nombre}</div>}
                    </div>

                    {/* Campo Apellido (similar al nombre) */}
                    <div>
                        <input
                            name="apellido"
                            placeholder="Apellido"
                            value={data.apellido}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${errors.apellido ? 'border-red-500' : 'border-gray-300'}`}
                            required
                        />
                        {errors.apellido && <div className="text-red-500 text-sm mt-1">{errors.apellido}</div>}
                    </div>

                    {/* Campo DNI (similar, pero con su propio manejo de error) */}
                    <div>
                        <input
                            name="dni"
                            placeholder="DNI"
                            value={data.dni}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${errors.dni ? 'border-red-500' : 'border-gray-300'}`}
                            required
                        />
                        {errors.dni && <div className="text-red-500 text-sm mt-1">{errors.dni}</div>}
                    </div>

                    {/* Campo Teléfono (puede ser opcional, por eso no 'required' en HTML) */}
                    <div>
                        <input
                            name="telefono"
                            placeholder="Teléfono"
                            value={data.telefono}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
                            // 'required' se quitaría si es 'nullable' en la migración
                        />
                        {errors.telefono && <div className="text-red-500 text-sm mt-1">{errors.telefono}</div>}
                    </div>

                    {/* Campo Fecha de Nacimiento */}
                    <div>
                        <input
                            type="date"
                            name="fecha_nacimiento"
                            value={data.fecha_nacimiento}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${errors.fecha_nacimiento ? 'border-red-500' : 'border-gray-300'}`}
                            required
                        />
                        {errors.fecha_nacimiento && <div className="text-red-500 text-sm mt-1">{errors.fecha_nacimiento}</div>}
                    </div>

                    {/* Campo Sexo */}
                    <div>
                        <select
                            name="sexo"
                            value={data.sexo}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${errors.sexo ? 'border-red-500' : 'border-gray-300'}`}
                            required
                        >
                            <option value="">Seleccionar sexo</option>
                            <option value="masculino">Masculino</option> {/* Valores que espera tu base de datos */}
                            <option value="femenino">Femenino</option> {/* Valores que espera tu base de datos */}
                        </select>
                        {errors.sexo && <div className="text-red-500 text-sm mt-1">{errors.sexo}</div>}
                    </div>

                    {/* Campo Especialidad */}
                    <div>
                        <select
                            name="especialidad_id" // Nombre de campo para el ID de la especialidad
                            value={data.especialidad_id}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${errors.especialidad_id ? 'border-red-500' : 'border-gray-300'}`}
                            required
                        >
                            <option value="">Seleccionar especialidad</option>
                            {/* Mapea las especialidades pasadas por props para crear las opciones */}
                            {especialidades.length > 0 &&  especialidades.map((especialidad) => (
                                <option key={especialidad.id} value={especialidad.id}>
                                    {especialidad}
                                </option>
                            ))}
                        </select>
                        {errors.especialidad_id && <div className="text-red-500 text-sm mt-1">{errors.especialidad_id}</div>}
                    </div>

                    {/* Campo Días que trabaja (checkboxes) */}
                    <div>
                        <label className="block font-semibold mb-1">
                            Días que trabaja:
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {diasSemana.map((dia) => (
                                <label
                                    key={dia.id} // Usa el ID del día como key
                                    className="inline-flex items-center space-x-2"
                                >
                                    <input
                                        type="checkbox"
                                        name="dias"
                                        value={dia.id} // El valor enviado es el ID del día
                                        checked={data.dias.includes(dia.id)} // Marca si el ID está en el array 'data.dias'
                                        onChange={handleChange}
                                        className="form-checkbox"
                                    />
                                    <span>{dia.nombre}</span>
                                </label>
                            ))}
                        </div>
                        {/* Muestra el error de validación para el array 'dias' completo */}
                        {errors.dias && <div className="text-red-500 text-sm mt-1">{errors.dias}</div>}
                    </div>

                    {/* Campo Turno (Franja horaria) */}
                    <div>
                        <label className="block font-semibold mb-1">
                            Franja Horaria:
                        </label>
                        <select
                            name="franja" // Nombre de campo para la franja horaria
                            value={data.franja}
                            onChange={handleChange}
                            className={`w-full border px-3 py-2 rounded ${errors.franja ? 'border-red-500' : 'border-gray-300'}`}
                            required
                        >
                            <option value="">Seleccionar franja</option>
                            <option value="Mañana">Mañana</option>
                            <option value="Tarde">Tarde</option>
                        </select>
                        {errors.franja && <div className="text-red-500 text-sm mt-1">{errors.franja}</div>}
                    </div>

                    {/* Botones de acción */}
                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button" // Es de tipo 'button' para no enviar el formulario
                            onClick={onClose} // Llama a la función onClose para cerrar el modal
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit" // Es de tipo 'submit' para enviar el formulario
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            disabled={processing} // Deshabilita el botón mientras la petición está en curso.
                                                  // Esto previene envíos múltiples accidentales.
                        >
                            {processing ? "Guardando..." : "Guardar"} {/* Texto dinámico */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
