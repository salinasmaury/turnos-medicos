import Sidebar from "../Components/Sidebar";
import Navbar from "@/Components/NavbarLucas";

export default function Layout({
    children,
    onAgregarPaciente,
    onAgregarMedico,
}) {
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
