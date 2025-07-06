<?php

namespace App\Http\Controllers;

use App\Models\Medico;
use App\Models\HorarioMedico;
use App\Models\Especialidad;
use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class MedicoController extends Controller
{
    /**
     * Muestra la lista de médicos activos (o puede redirigir a VistaPrueba).
     */
    public function index()
    {
        $medicos = Medico::with('especialidad')->latest()->paginate(10);
        $especialidades = Especialidad::all();

        return Inertia::render('Medicos/Index', [
            'medicos' => $medicos,
            'especialidades' => $especialidades,
            'viewMode' => 'active',
        ]);
    }

    /**
     * Almacena un nuevo médico y sus horarios asociados.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:50',
            'apellido' => 'required|string|max:50',
            'dni' => 'required|string|max:12|unique:medicos,dni',
            'fecha_nacimiento' => 'required|date',
            'telefono' => 'nullable|string|max:15',
            'sexo' => 'required|string|in:masculino,femenino',
            'especialidad_id' => 'required|exists:especialidades,id',
            'dias' => 'required|array|min:1',
            'dias.*' => 'integer|between:1,7',
            'franja' => 'required|string|in:Mañana,Tarde',
        ], [
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

        DB::beginTransaction();
        try {
            $medico = Medico::create([
                'nombre' => $validatedData['nombre'],
                'apellido' => $validatedData['apellido'],
                'dni' => $validatedData['dni'],
                'fecha_nacimiento' => $validatedData['fecha_nacimiento'],
                'telefono' => $validatedData['telefono'],
                'sexo' => $validatedData['sexo'],
                'especialidad_id' => $validatedData['especialidad_id'],
            ]);

            foreach ($validatedData['dias'] as $dia_id) {
                HorarioMedico::create([
                    'medico_id' => $medico->id,
                    'dia_semana' => $dia_id,
                    'franja' => $validatedData['franja'],
                ]);
            }

            DB::commit();
            return Redirect::back()->with('success', 'Médico agregado con éxito.');

        } catch (\Exception $e) {
            DB::rollBack();
            return Redirect::back()->with('error', 'Error al agregar el médico: ' . $e->getMessage());
        }
    }

    /**
     * Elimina suavemente un médico de la base de datos.
     */
    public function destroy(Medico $medico)
    {
        try {
            $medico->delete();
            return Redirect::back()->with('success', 'Médico eliminado (suavemente) con éxito.');
        } catch (\Exception $e) {
            return Redirect::back()->with('error', 'Error al eliminar el médico: ' . $e->getMessage());
        }
    }

    /**
     * Devuelve los médicos eliminados suavemente como JSON.
     * Este método es el que tu modal llamará para obtener los datos.
     */
    public function getTrashedMedicos()
    {
        $medicosEliminados = Medico::onlyTrashed()->with('especialidad')->get();
        return response()->json([
            'medicos' => $medicosEliminados
        ]);
    }

    /**
     * Restaura un médico eliminado suavemente.
     */
    public function restore($id)
    {
        $medico = Medico::withTrashed()->findOrFail($id);
        try {
            $medico->restore();
            return response()->json(['success' => 'Médico restaurado con éxito.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al restaurar el médico: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Elimina permanentemente un médico (force delete).
     */
    public function forceDelete($id)
    {
        $medico = Medico::withTrashed()->findOrFail($id);
        try {
            $medico->forceDelete();
            return response()->json(['success' => 'Médico eliminado permanentemente.']);
        } catch (\Exception | \Throwable $e) {
            return response()->json(['error' => 'Error al eliminar el médico permanentemente: ' . $e->getMessage()], 500);
        }
    }
}
