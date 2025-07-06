<?php

namespace App\Http\Controllers;

use App\Models\Medico;
use App\Models\HorarioMedico;
use App\Models\Especialidad; // Asegúrate de importar Especialidad
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Para transacciones
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia; // Para Inertia::render en index

class MedicoController extends Controller
{
    /**
     * Muestra la lista de médicos.
     * Este método es el que se llamará cuando navegues a /medicos (si lo usas como una página dedicada).
     * Si 'VistaPrueba' es tu panel principal, quizás esta función no la uses directamente,
     * pero es una buena práctica tenerla.
     */
    public function index()
    {
        $medicos = Medico::with('especialidad')->latest()->paginate(10);
        $especialidades = Especialidad::all(); // Obtén las especialidades para pasar al frontend

        return Inertia::render('Medicos/Index', [ // Asumiendo que tendrás una página Medicos/Index
            'medicos' => $medicos,
            'especialidades' => $especialidades,
        ]);
    }

    /**
     * Almacena un nuevo médico y sus horarios asociados.
     */
    public function store(Request $request)
    {
        // 1. VALIDACIÓN
        // Las reglas de validación deben coincidir exactamente con los nombres de los campos en tu modal.
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:50',
            'dni' => 'required|string|max:12|unique:medicos,dni', // 'unique:tabla,columna'
            'fecha_nacimiento' => 'required|date',
            'telefono' => 'nullable|string|max:15',
            'sexo' => 'required|string|in:masculino,femenino', // Debe coincidir con los valores de tu ENUM
            'especialidad_id' => 'required|exists:especialidades,id', // Debe ser un ID de especialidad existente
            'dias' => 'required|array|min:1', // Un array con al menos un elemento
            'dias.*' => 'integer|between:1,7', // Cada elemento del array debe ser un entero de 1 a 7 (para Lunes-Domingo)
            'franja' => 'required|string|in:Mañana,Tarde', // Debe coincidir con los valores de tu ENUM
        ], [
            // Mensajes personalizados de error para mejor UX
            'dni.unique' => 'Ya existe un médico con este DNI.',
            'especialidad_id.required' => 'La especialidad es obligatoria.',
            'especialidad_id.exists' => 'La especialidad seleccionada no es válida.',
            'dias.required' => 'Debes seleccionar al menos un día de trabajo.',
            'dias.array' => 'Los días de trabajo deben ser un array.',
            'dias.min' => 'Debes seleccionar al menos un día de trabajo.',
            'dias.*.integer' => 'El día de la semana debe ser un número entero.',
            'dias.*.between' => 'El día de la semana debe estar entre 1 (Lunes) y 7 (Domingo).',
            'franja.required' => 'La franja horaria es obligatoria.',
            'franja.in' => 'La franja horaria debe ser "Mañana" o "Tarde".',
            'sexo.in' => 'El sexo debe ser "masculino" o "femenino".',
        ]);

        // Iniciar una transacción de base de datos
        DB::beginTransaction();
        try {
            // Crear el Médico
            $medico = Medico::create([
                'nombre' => $validatedData['nombre'],
                'apellido' => $validatedData['apellido'],
                'dni' => $validatedData['dni'],
                'fecha_nacimiento' => $validatedData['fecha_nacimiento'],
                'telefono' => $validatedData['telefono'],
                'sexo' => $validatedData['sexo'],
                'especialidad_id' => $validatedData['especialidad_id'],
            ]);

            // Crear los Horarios del Médico (uno por cada día seleccionado)
            foreach ($validatedData['dias'] as $dia_id) {
                HorarioMedico::create([
                    'medico_id' => $medico->id,
                    'dia_semana' => $dia_id, // El ID del día (1 al 7)
                    'franja' => $validatedData['franja'],
                ]);
            }

            DB::commit(); // Confirmar la transacción

            // Redirigir de vuelta a la página anterior con un mensaje de éxito
            return Redirect::back()->with('success', 'Médico agregado con éxito.');

        } catch (\Exception $e) {
            DB::rollBack(); // Revertir la transacción si algo sale mal
            // Redirigir de vuelta con un mensaje de error general
            return Redirect::back()->with('error', 'Error al agregar el médico: ' . $e->getMessage());
        }
    }

    // ... otros métodos del controlador (edit, update, destroy) si los necesitas
}
