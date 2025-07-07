import React, { createContext, useState, useContext } from 'react';

// 1. Creamos el Contexto
const ModalContext = createContext();

// 2. Creamos el "Proveedor" del Contexto. Este componente envolverá nuestra aplicación.
export function ModalProvider({ children }) {
    // Toda la lógica de estado que antes estaba en Dashboard, ahora vive aquí.
    const [mostrarModalPaciente, setMostrarModalPaciente] = useState(false);
    const [mostrarModalMedico, setMostrarModalMedico] = useState(false);
    const [mostrarModalMedicosEliminados, setMostrarModalMedicosEliminados] = useState(false);

    // Creamos un objeto con los estados y las funciones que queremos compartir
    const value = {
        // Estados de visibilidad
        modalPacienteAbierto: mostrarModalPaciente,
        modalMedicoAbierto: mostrarModalMedico,
        modalMedicosEliminadosAbierto: mostrarModalMedicosEliminados,
        // Funciones para abrir los modales
        abrirModalPaciente: () => setMostrarModalPaciente(true),
        abrirModalMedico: () => setMostrarModalMedico(true),
        abrirModalMedicosEliminados: () => setMostrarModalMedicosEliminados(true),
        // Funciones para cerrar los modales
        cerrarModalPaciente: () => setMostrarModalPaciente(false),
        cerrarModalMedico: () => setMostrarModalMedico(false),
        cerrarModalMedicosEliminados: () => setMostrarModalMedicosEliminados(false),
    };

    // El Proveedor devuelve el contexto con el 'value' a todos sus hijos.
    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}

// 3. Creamos un "hook" personalizado para usar el contexto fácilmente
export function useModal() {
    return useContext(ModalContext);
}
