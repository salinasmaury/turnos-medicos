import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';

import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";
import { useModal } from '@/Context/ModalContext'; // <-- 1. Importamos nuestro hook
import AgregarPacienteModal from '@/Components/AgregarPacienteModal';
import AgregarMedicoModal from '@/Components/AgregarMedicoModal';
import VerMedicosEliminadosModal from '@/Components/VerMedicosEliminadosModal';

// El layout ya no necesita recibir las funciones de los modales como props
export default function Layout({ auth, children, especialidades }) {
    const { flash } = usePage().props;

    // 2. Obtenemos el estado y las funciones de CIERRE desde el contexto global
    const {
        modalPacienteAbierto, cerrarModalPaciente,
        modalMedicoAbierto, cerrarModalMedico,
        modalMedicosEliminadosAbierto, cerrarModalMedicosEliminados
    } = useModal();

    useEffect(() => {
        if (flash && flash.success) { toast.success(flash.success); }
        if (flash && flash.error) { toast.error(flash.error); }
    }, [flash]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar user={auth.user} />
            <div className="flex flex-1">
                {/* El Sidebar ahora obtiene las funciones por sí mismo */}
                <Sidebar />
                <main className="flex-1 p-4 sm:p-6">{children}</main>
            </div>

            {/* 3. Renderizamos los modales aquí, en el nivel más alto,
                   controlados por el estado del contexto. */}
            <AgregarPacienteModal
                isOpen={modalPacienteAbierto}
                onClose={cerrarModalPaciente}
            />
            <AgregarMedicoModal
                isOpen={modalMedicoAbierto}
                onClose={cerrarModalMedico}
                especialidades={especialidades} // Pasamos las especialidades si las necesita
            />
            <VerMedicosEliminadosModal
                isOpen={modalMedicosEliminadosAbierto}
                onClose={cerrarModalMedicosEliminados}
            />
        </div>
    );
}
