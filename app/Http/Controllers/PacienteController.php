<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia; // No olvides importar Inertia

class PacienteController extends Controller
{
    /**
     * Muestra la lista de pacientes.
     * Este método es necesario para que la página inicial se cargue.
     */
    public function index()
    {
        // Aquí iría la lógica para mostrar tu página principal de pacientes
        // Por ejemplo:
        $pacientes = Paciente::latest()->paginate(10);

        return Inertia::render('Pacientes/Index', [
            'pacientes' => $pacientes,
        ]);
    }


    /**
     * Guarda un nuevo paciente en la base de datos.
     * Este método es llamado por el formulario del modal.
     */
    public function store(Request $request)
    {
        // 1. VALIDACIÓN
        // Las reglas de validación se basan en tu migración y en los datos que envía el formulario.
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:50',
            'dni' => 'required|string|max:12|unique:pacientes,dni',
            'fecha_nacimiento' => 'required|date',
            'telefono' => 'nullable|string|max:15',
            'sexo' => 'required|string|in:M,F', // Valida los valores del <select>
        ]);

        // 2. TRANSFORMACIÓN DE DATOS
        // Como el frontend envía 'M'/'F' y la base de datos espera 'masculino'/'femenino',
        // transformamos el valor ANTES de guardarlo.
        if ($validatedData['sexo'] === 'M') {
            $validatedData['sexo'] = 'masculino';
        } elseif ($validatedData['sexo'] === 'F') {
            $validatedData['sexo'] = 'femenino';
        }

        // 3. CREACIÓN DEL REGISTRO
        // Se crea el paciente con los datos ya validados y transformados.
        Paciente::create($validatedData);

        // 4. REDIRECCIÓN A LA PÁGINA ANTERIOR
        // En lugar de redirigir a una ruta específica, usamos Redirect::back().
        // Esto recarga la página actual (la que está detrás del modal) y le pasa el mensaje de éxito.
        // Es la forma ideal de manejar envíos de formularios en modales con Inertia.
        return Redirect::back()->with('success', 'Paciente agregado con éxito.');
    }

    // Aquí podrías agregar los otros métodos del controlador (show, edit, update, destroy)...
}
