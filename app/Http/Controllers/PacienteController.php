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


   
    public function store(Request $request)
    {
       
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:50',
            'dni' => 'required|string|max:12|unique:pacientes,dni',
            'fecha_nacimiento' => 'required|date',
            'telefono' => 'nullable|string|max:15',
            'sexo' => 'required|string|in:M,F', // Valida los valores del <select>
        ]);

       
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
       
        // Es la forma ideal de manejar envíos de formularios en modales con Inertia.
        return Redirect::back()->with('success', 'Paciente agregado con éxito.');
    }

    // Aquí podrías agregar los otros métodos del controlador (show, edit, update, destroy)...
}
