import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';

import Sidebar from "../Components/Sidebar";
import Navbar from "@/Components/Navbar";

// Recibe 'auth' para pasarlo al Navbar.
// Recibe 'children' que es la página actual (ej. Dashboard, Turnos).
// Recibe el resto de props (...props) para pasarlos al Sidebar (ej. onAgregarPaciente).
export default function Layout({ auth, children, ...props }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash && flash.success) {
            toast.success(flash.success);
        }
        if (flash && flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Pasamos la información del usuario al Navbar */}
            <Navbar user={auth.user} />
            <div className="flex flex-1">
                {/* Pasamos todas las funciones de los modales al Sidebar */}
                <Sidebar {...props} />
                {/* Aquí se renderizará el contenido de la página actual */}
                <main className="flex-1 p-6 bg-gray-100">{children}</main>
            </div>
        </div>
    );
}
