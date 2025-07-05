<?php

namespace App\Http\Controllers;

use App\Models\Medico;
use App\Models\HorarioMedico;
use App\Models\Especialidad; // Importa el modelo Especialidad
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Para transacciones de base de datos
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class MedicoController extends Controller
{
    /**
     * Muestra la lista de médicos con sus especialidades.
     * También pasa las especialidades para el formulario del modal.
     */
    public function index()
    {
        $medicos = Medico::with('especialidad')->latest()->paginate(10);
        $especialidades = Especialidad::all(); // Obtén todas las especialidades

        return Inertia::render('Medicos/Index', [
            'medicos' => $medicos,
            'especialidades' => $especialidades, // Pasa las especialidades al frontend
        ]);
    }

    /**
     * Almacena un nuevo médico y sus horarios asociados.
     */
    public function store(Request $request)
    {
        // 1. VALIDACIÓN DE LOS DATOS DEL MÉDICO Y LOS HORARIOS
        // Es crucial que las reglas de validación coincidan con los nombres
        // de los campos que envías desde el modal (data.nombre, data.dni, data.especialidad_id, data.dias, data.franja).
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:50',
            'dni' => 'required|string|max:12|unique:medicos,dni', // Asegura DNI único
            'fecha_nacimiento' => 'required|date',
            'telefono' => 'nullable|string|max:15',
            'sexo' => 'required|string|in:masculino,femenino', // Asegura los valores esperados por tu ENUM
            'especialidad_id' => 'required|exists:especialidades,id', // Debe ser un ID existente
            'dias' => 'required|array|min:1', // Debe ser un array con al menos un día
            'dias.*' => 'integer|between:1,7', // Cada elemento del array 'dias' debe ser un entero entre 1 y 7
            'franja' => 'required|string|in:Mañana,Tarde', // Debe ser 'Mañana' o 'Tarde'
        ], [
            // Mensajes personalizados de error (opcional pero recomendado)
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

        // 2. USO DE TRANSACCIONES: Asegura que si falla la creación del horario, el médico no se cree.
        DB::beginTransaction();
        try {
            // 3. CREACIÓN DEL MÉDICO
            $medico = Medico::create([
                'nombre' => $validatedData['nombre'],
                'apellido' => $validatedData['apellido'],
                'dni' => $validatedData['dni'],
                'fecha_nacimiento' => $validatedData['fecha_nacimiento'],
                'telefono' => $validatedData['telefono'],
                'sexo' => $validatedData['sexo'],
                'especialidad_id' => $validatedData['especialidad_id'],
            ]);

            // 4. CREACIÓN DE LOS HORARIOS DEL MÉDICO
            // Itera sobre los días seleccionados y crea un registro HorarioMedico para cada uno.
            foreach ($validatedData['dias'] as $dia_id) {
                HorarioMedico::create([
                    'medico_id' => $medico->id,
                    'dia_semana' => $dia_id, // El ID del día (1 a 7)
                    'franja' => $validatedData['franja'],
                ]);
            }

            DB::commit(); // Confirma la transacción si todo fue exitoso

            // 5. REDIRECCIÓN CON MENSAJE DE ÉXITO
            // Inertia.js interceptará esta redirección y actualizará la página de forma SPA-like.
            // El mensaje 'success' será capturado por tu componente FlashMessages.jsx.
            return Redirect::back()->with('success', 'Médico y horarios agregados con éxito.');

        } catch (\Exception $e) {
            DB::rollBack(); // Revierte la transacción si algo salió mal
            // 6. REDIRECCIÓN CON MENSAJE DE ERROR GENERAL
            // Si hay una excepción no manejada por la validación, envía un mensaje de error.
            return Redirect::back()->with('error', 'Error al agregar el médico: ' . $e->getMessage());
        }
    }

    // Aquí irían otros métodos como show, edit, update, destroy para el Medico.
}
