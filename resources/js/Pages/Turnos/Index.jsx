import React, { Link, useState, useMemo, useEffect } from "react";
import { Head, router, usePage, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputConBoton from "@/Components/InputConBoton";
import SelectConLabel from "@/Components/SelectConLabel";
import DateInputConLabel from "@/Components/DateInputConLabel";
import InputConLabel from "@/Components/InputConLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import TablaTurnos from "@/Components/TablaTurnos";
import EditarTurnoModal from "@/Components/EditarTurnoModal";

// Preparamos el componente para recibir los props
export default function PaginaGestionTurnos({
    auth,
    pacienteEncontrado = null,
    medicos = [],
    turnosDelDia = [],
    flash,
    pacientes = [],
}) {
    // 1. Se elimina 'franja' de los datos del formulario
    const { data, setData, post, processing, errors, reset } = useForm({
        paciente_id: "",
        medico_id: "",
        fecha: new Date().toISOString().split("T")[0],
    });

    const [dni, setDni] = useState("");
    const [fechaError, setFechaError] = useState("");
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

    const [turnoParaEditar, setTurnoParaEditar] = useState(null);
    const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false);

    // Efecto para actualizar el paciente seleccionado y el ID en el formulario
    useEffect(() => {
        if (pacienteEncontrado) {
            setPacienteSeleccionado(pacienteEncontrado);
            setData("paciente_id", pacienteEncontrado.id);
        }
    }, [pacienteEncontrado]);

    // Efecto para buscar los turnos existentes
    useEffect(() => {
        // Solo hacemos la petición si tenemos tanto un médico como una fecha seleccionados
        if (data.medico_id && data.fecha && !fechaError) {
            router.get(
                route("turnos.index"),
                {
                    medico_id: data.medico_id,
                    fecha: data.fecha,
                },
                {
                    preserveState: true,
                    replace: true,
                    only: ["turnosDelDia"],
                }
            );
        }
    }, [data.medico_id, data.fecha, fechaError]);

    const handleBuscarClick = () => {
        router.get(
            route("turnos.index"),
            {
                dni: dni,
                medico_id: data.medico_id,
                fecha: data.fecha,
            },
            {
                preserveState: true,
                only: ["pacienteEncontrado", "flash", "turnosDelDia"],
            }
        );
    };

    const handleGuardarTurno = (e) => {
        e.preventDefault();
        post(route("turnos.store"), {
            onSuccess: () => {
                reset("paciente_id");
                setDni("");
                setPacienteSeleccionado(null);
            },
        });
    };

    const handleFechaChange = (e) => {
        setData("fecha", e.target.value);
        const diaSeleccionado = new Date(`${e.target.value}T00:00:00`);
        const diaDeLaSemana = diaSeleccionado.getDay();

        if (diaDeLaSemana === 6 || diaDeLaSemana === 0) {
            setFechaError("No se pueden seleccionar fines de semana.");
        } else {
            setFechaError("");
        }
    };

    const medicosOptions = medicos.map((medico) => ({
        value: medico.id,
        label: `${medico.nombre} ${medico.apellido}`,
    }));

    const especialidadSeleccionada = useMemo(() => {
        if (!data.medico_id) return null;
        const medicoSeleccionado = medicos.find((m) => m.id == data.medico_id);
        return medicoSeleccionado
            ? medicoSeleccionado.especialidad.nombre
            : null;
    }, [data.medico_id, medicos]);

    // 2. La condición para guardar ya no requiere una franja
    const sePuedeGuardar =
        data.paciente_id && data.medico_id && data.fecha && !fechaError;

    const abrirModalEdicion = (turno) => {
        setTurnoParaEditar(turno);
        setModalEdicionAbierto(true);
    };

    const cerrarModalEdicion = () => {
        setModalEdicionAbierto(false);
        setTurnoParaEditar(null);
    };

    return (
        <Layout
            auth={auth}
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Gestión de Turnos
                </h2>
            }
        >
            <Head title="Gestionar Turnos" />
            <EditarTurnoModal
                isOpen={modalEdicionAbierto}
                onClose={cerrarModalEdicion}
                turno={turnoParaEditar}
                medicos={medicos}
                pacientes={pacientes}
            />

            <div className="">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">
                    Gestión de Turnos
                </h1>
                <div className="w-full mx-0 px-0 space-y-2">
                    <div className="p-4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={handleGuardarTurno}
                            className="space-y-6"
                        >
                            {/* --- FILA 1 --- */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-1">
                                    <SelectConLabel
                                        label="Seleccionar Médico"
                                        id="medico_id"
                                        name="medico_id"
                                        options={medicosOptions}
                                        value={data.medico_id}
                                        onChange={(e) =>
                                            setData("medico_id", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.medico_id}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <InputConLabel
                                        label="Especialidad"
                                        id="especialidad"
                                        value={
                                            especialidadSeleccionada || "N/A"
                                        }
                                        readOnly
                                        className="bg-gray-100"
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <DateInputConLabel
                                        label="Seleccionar Fecha"
                                        id="fecha"
                                        name="fecha"
                                        value={data.fecha}
                                        onChange={handleFechaChange}
                                    />
                                    <InputError
                                        message={errors.fecha}
                                        className="mt-2"
                                    />
                                    {fechaError && (
                                        <p className="text-sm text-red-600 mt-2">
                                            {fechaError}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* --- FILA 2 --- */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                <div className="md:col-span-1">
                                    <InputConBoton
                                        label="Buscar Paciente por DNI"
                                        id="busqueda_dni"
                                        value={dni}
                                        onChange={(e) => setDni(e.target.value)}
                                        onButtonClick={handleBuscarClick}
                                        buttonLabel="Consultar"
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <InputConLabel
                                        label="Paciente Seleccionado"
                                        id="paciente_seleccionado"
                                        value={
                                            pacienteSeleccionado
                                                ? `${pacienteSeleccionado.nombre} ${pacienteSeleccionado.apellido}`
                                                : "Ningún paciente seleccionado"
                                        }
                                        readOnly
                                        className="bg-gray-100"
                                    />
                                    <InputError
                                        message={errors.paciente_id}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <PrimaryButton
                                        className="w-full justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                                        disabled={!sePuedeGuardar || processing}
                                    >
                                        {processing
                                            ? "Guardando..."
                                            : "Guardar Turno"}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* --- CAMBIO CLAVE AQUÍ --- */}
                    {/* La condición ahora usa los datos del formulario (data.medico_id y data.fecha) */}
                    {data.medico_id && data.fecha && !fechaError && (
                        <div className="p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900">
                                Agenda para el {data.fecha}
                            </h3>
                            <div className=" space-y-2">
                                {data.medico_id &&
                                    data.fecha &&
                                    !fechaError && (
                                        // 4. Le pasamos la función para abrir el modal a la tabla
                                        <TablaTurnos
                                            turnos={turnosDelDia}
                                            onEditarTurno={abrirModalEdicion}
                                        />
                                    )}
                            </div>
                        </div>
                    )}

                    {flash.error && (
                        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            {flash.error}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
