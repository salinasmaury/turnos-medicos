export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-white p-6">
            <nav className="flex flex-col space-y-4">
                <a href="#" className="hover:bg-gray-700 p-2 rounded">
                    Agregar Pacientes
                </a>
                <a href="#" className="hover:bg-gray-700 p-2 rounded">
                    Agregar Medicos
                </a>
            </nav>
        </aside>
    );
}
