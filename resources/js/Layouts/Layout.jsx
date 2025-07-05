import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';

import Sidebar from "../Components/Sidebar";
import Navbar from "@/Components/Navbar";

export default function Layout({
    children,
    onAgregarPaciente,
    onAgregarMedico,
}) {
    // 1. Obtenemos el objeto 'flash' desde las props de Inertia
    const { flash } = usePage().props;

    // 2. Usamos useEffect para reaccionar cuando 'flash' cambie
    useEffect(() => {
        // CORRECCIÓN: Primero verificamos si 'flash' existe y luego si tiene la propiedad 'success'.
        // Esto evita el error en la carga inicial de la página.
        if (flash && flash.success) {
            toast.success(flash.success);
        }

        // Hacemos la misma comprobación para los mensajes de error.
        if (flash && flash.error) {
            toast.error(flash.error);
        }
    }, [flash]); // Este efecto se ejecuta solo si 'flash' cambia

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar onRefresh={() => window.location.reload()} />
            <div className="flex flex-1">
                <Sidebar
                    onAgregarPaciente={onAgregarPaciente}
                    onAgregarMedico={onAgregarMedico}
                />
                <main className="flex-1 p-6 bg-gray-100">{children}</main>
            </div>
        </div>
    );
}
