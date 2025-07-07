import { Head } from '@inertiajs/react';
import Layout from "@/Layouts/Layout";
import DeleteButton from "@/Components/DeleteButton";

export default function Dashboard({ auth, pacientes, medicos, especialidades }) {
    // ¡Ya no hay ningún useState para los modales aquí!
    return (
        // Simplemente se envuelve en el Layout y le pasa los props que este necesita
        <Layout auth={auth} especialidades={especialidades}>
            <Head title="Dashboard" />

            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Panel de Gestión</h1>
                <div className="p-4 sm:p-6 bg-white shadow-sm rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Lista de Médicos Activos</h2>
                    <ul className="divide-y divide-gray-200">
                        {medicos && medicos.length > 0 ? (
                            medicos.map((medico) => (
                                <li key={medico.id} className="py-3 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-900">{medico.nombre} {medico.apellido}</p>
                                        <p className="text-sm text-gray-600">{medico.especialidad?.nombre || "Sin especialidad"}</p>
                                    </div>
                                    <div>
                                        <DeleteButton routeName="medicos.destroy" itemId={medico.id} />
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="py-3 text-gray-500">No hay médicos activos registrados.</li>
                        )}
                    </ul>
                </div>
                <div className="p-4 sm:p-6 bg-white shadow-sm rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Lista de Pacientes</h2>
                    <ul className="divide-y divide-gray-200">
                        {pacientes && pacientes.length > 0 ? (
                            pacientes.map((paciente) => (
                                <li key={paciente.id} className="py-2">
                                    {paciente.nombre} {paciente.apellido} - <span className="text-gray-500">DNI: {paciente.dni}</span>
                                </li>
                            ))
                        ) : (
                             <li className="py-2 text-gray-500">No hay pacientes registrados.</li>
                        )}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
