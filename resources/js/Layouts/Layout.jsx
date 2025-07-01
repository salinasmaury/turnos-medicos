import Sidebar from "../Components/Sidebar";
import Navbar from "@/Components/NavbarLucas";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar onRefresh={() => window.location.reload()} />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6 bg-gray-100">
                    {children}{" "}
                    {/* ← Solo acá se muestra lo que tenga VistaPrueba */}
                </main>
            </div>
        </div>
    );
}
