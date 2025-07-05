import ApplicationLogo from "./ApplicationLogo";

export default function Navbar({ onRefresh }) {
    return (
        <>
        <header className="w-full bg-background shadow p-4 flex items-center justify-left space-x-4">
            {/* Botón a la izquierda */}
            <ApplicationLogo></ApplicationLogo>
            <button
                onClick={() => (window.location.href = "/")}
                className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary"
                >
                Ir a Inicio
            </button>

            {/* Título centrado o a la derecha */}
            <h1 className="text-lg font-semibold text-gray-700 flex-1 text-right">
                Gestion Turnos
            </h1>

            {/* Podés agregar más elementos a la derecha si querés */}
        </header>
        </>
    );
}
