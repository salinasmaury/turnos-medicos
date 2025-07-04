export default function Sidebar({ onAgregarPaciente, onAgregarMedico }) {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-white p-6">
            <nav className="flex flex-col space-y-4">
                <button
                    onClick={onAgregarPaciente}
                    className="text-left hover:bg-gray-700 p-2 rounded"
                >
                    Agregar Pacientes
                </button>
                <button
                    onClick={onAgregarMedico}
                    className="text-left hover:bg-gray-700 p-2 rounded"
                >
                    Agregar Médicos
                </button>
            </nav>
        </aside>
    );
}
