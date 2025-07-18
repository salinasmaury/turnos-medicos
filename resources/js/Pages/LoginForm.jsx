import { useState } from "react";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";

export default function VistaLogin() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // Acá va la lógica de login
        console.log("Login:", usuario, password);
    };

    return (
        <>
        {/* <Navbar></Navbar> */}
        
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="bg-white bg-opacity-90 p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-secondary mb-6">
                    Inicio de Sesión
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-label">Usuario</label>
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            required
                            />
                    </div>

                    <div>
                        <label className="block text-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            required
                            />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-secondary text-primary py-2 rounded hover:bg-gray-900 transition"
                        >
                        Iniciar Sesión
                    </button>

                    <div className="text-center mt-4">
                        <a
                            href="/registro"
                            className="text-sm text-secondary hover:underline"
                            >
                            Crear nueva cuenta
                        </a>
                    </div>
                </form>
            </div>
        </div>
     </>
    );
}
