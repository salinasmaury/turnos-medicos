export default function Navbar({ onRefresh }) {
    return (
        <header className="w-full bg-white shadow p-4 flex items-center justify-left space-x-4">
            {/* Botón a la izquierda */}
            <button
                onClick={onRefresh}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Actualizar
            </button>
            <button
                onClick={() => (window.location.href = "/")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Ir a Inicio
            </button>

            {/* Título centrado o a la derecha */}
            <h1 className="text-lg font-semibold text-gray-700 flex-1 text-right">
                Gestion Turnos
            </h1>

            {/* Podés agregar más elementos a la derecha si querés */}
        </header>
    );
}
