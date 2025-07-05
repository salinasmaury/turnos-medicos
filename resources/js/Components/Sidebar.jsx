export default function Sidebar({ onAgregarPaciente, onAgregarMedico }) {
    return (
        <aside className="w-64 h-screen bg-background text-primary p-6">
            <nav className="flex flex-col space-y-4">
                <button
                    onClick={onAgregarPaciente}
                    className="text-left hover:bg-secondary p-2 rounded"
                >
                    Agregar Pacientes
                </button>
                <button
                    onClick={onAgregarMedico}
                    className="text-left hover:bg-secondary p-2 rounded"
                >
                    Agregar Médicos
                </button>
            </nav>
        </aside>
    );
}
