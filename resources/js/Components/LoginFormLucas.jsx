import { useState } from "react";

export default function VistaLoginLucas() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // Acá va la lógica de login
        console.log("Login:", usuario, password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="bg-white bg-opacity-90 p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
                    Inicio de Sesión
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Usuario</label>
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">
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
                        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                    >
                        Iniciar Sesión
                    </button>

                    <div className="text-center mt-4">
                        <a
                            href="/registro"
                            className="text-sm text-red-600 hover:underline"
                        >
                            Crear nueva cuenta
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
