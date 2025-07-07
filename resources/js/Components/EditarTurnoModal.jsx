import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import DateInputConLabel from './DateInputConLabel';
import SelectConLabel from './SelectConLabel';
import InputError from './InputError';

/**
 * Modal para editar solo la fecha y el estado de un turno existente.
 *
 * @param {boolean} isOpen - Controla si el modal está visible.
 * @param {function} onClose - Función para cerrar el modal.
 * @param {object} turno - El objeto del turno que se está editando. Debe incluir los objetos anidados 'medico' y 'paciente'.
 */
export default function EditarTurnoModal({ isOpen, onClose, turno }) {
    
    // 1. El formulario ahora solo gestiona los campos que se pueden editar.
    const { data, setData, patch, processing, errors, reset } = useForm({
        fecha: '',
        estado: '',
    });

    // 2. useEffect rellena el formulario cuando se abre el modal.
    useEffect(() => {
        if (turno) {
            setData({
                fecha: turno.fecha,
                estado: turno.estado,
            });
        }
    }, [turno]);

    // 3. La función de envío ahora hace una petición PATCH a la ruta de actualización.
    const submit = (e) => {
        e.preventDefault();
        // Se asegura de que 'turno' no sea nulo antes de intentar obtener el id.
        if (!turno) return;
        
        patch(route('turnos.update', turno.id), {
            onSuccess: () => {
                onClose(); // Cierra el modal si la actualización fue exitosa.
            },
        });
    };

    // Las opciones para el menú desplegable de estado.
    const estadosOptions = [
        { value: 'Confirmado', label: 'Confirmado' },
        { value: 'Cancelado', label: 'Cancelado' },
        { value: 'Completado', label: 'Completado' },
        { value: 'Ausente', label: 'Ausente' },
    ];

    // Si no hay un turno seleccionado, no renderiza nada para evitar errores.
    if (!turno) {
        return null;
    }

    return (
        <Modal show={isOpen} onClose={onClose}>
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Editar Turno
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Modifica la fecha o el estado del turno. El médico y el paciente no pueden ser cambiados.
                </p>

                {/* --- SECCIÓN DE INFORMACIÓN (SOLO LECTURA) --- */}
                <div className="mt-6 space-y-2 p-4 bg-gray-50 rounded-md border">
                    <div>
                        <span className="font-semibold text-gray-700">Médico: </span>
                        <span>{turno.medico.nombre} {turno.medico.apellido}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-700">Paciente: </span>
                        <span>{turno.paciente.nombre} {turno.paciente.apellido}</span>
                    </div>
                </div>

                {/* --- SECCIÓN DE EDICIÓN --- */}
                <div className="mt-6 space-y-4">
                    <DateInputConLabel
                        label="Fecha"
                        id="edit_fecha"
                        name="fecha"
                        value={data.fecha}
                        onChange={(e) => setData('fecha', e.target.value)}
                    />
                    <InputError message={errors.fecha} className="mt-2" />

                    <SelectConLabel
                        label="Estado del Turno"
                        id="edit_estado"
                        name="estado"
                        options={estadosOptions}
                        value={data.estado}
                        onChange={(e) => setData('estado', e.target.value)}
                    />
                    <InputError message={errors.estado} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton type="button" onClick={onClose}>Cancelar</SecondaryButton>
                    <PrimaryButton className="ms-3" disabled={processing}>
                        {processing ? 'Guardando...' : 'Guardar Cambios'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
