<?php

// --- PASO 1: CREA ESTE NUEVO CONTROLADOR EN UNA NUEVA CARPETA 'Api' ---
// Comando en la terminal: php artisan make:controller Api/MedicoController

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Medico;
use Illuminate\Http\Request;

class MedicoController extends Controller
{
    /**
     * Devuelve una lista de todos los médicos en formato JSON.
     * Este es el único método que necesitamos en este controlador por ahora.
     */
    public function index()
    {
        // La lógica es la misma: obtenemos los datos.
        $medicos = Medico::with('especialidad')->orderBy('apellido')->get();

        // La respuesta es la colección directamente, que Laravel convierte a JSON.
        return $medicos;
    }
}