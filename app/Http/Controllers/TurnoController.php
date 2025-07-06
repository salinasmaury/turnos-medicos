<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Paciente;
use App\Models\Medico;
use App\Models\Turno;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

class TurnoController extends Controller
{
    /**
     * Muestra la página principal de gestión de turnos.
     */
    public function index(Request $request)
    {
        // --- CAMBIO CLAVE ---
        $paciente = null;
        // Solo buscamos un paciente si se nos ha proporcionado un DNI.
        if ($request->filled('dni')) {
            $paciente = Paciente::where('dni', $request->input('dni'))->first();
            // Si se buscó pero no se encontró, flasheamos el error.
            if (!$paciente) {
                $request->session()->flash('error', 'No se encontró ningún paciente con el DNI proporcionado.');
            }
        }

        $turnosDelDia = [];
        // Solo ejecutamos la consulta de turnos si AMBOS parámetros están presentes.
        if ($request->filled('medico_id') && $request->filled('fecha')) {
            $turnosDelDia = Turno::with('paciente')
                ->where('medico_id', $request->input('medico_id'))
                ->where('fecha', $request->input('fecha'))
                ->get();
        }

        // Obtenemos todos los médicos activos para el select
        $medicos = Medico::with('especialidad')->orderBy('apellido')->get();

        // Renderiza la vista, pasándole todos los props necesarios
        return Inertia::render('Turnos/Index', [
            // Si no se buscó un DNI, 'pacienteEncontrado' será null, que es lo correcto.
            'pacienteEncontrado' => $paciente,
            'medicos' => $medicos,
            'turnosDelDia' => $turnosDelDia,
        ]);
    }

    /**
     * Guarda un nuevo turno en la base de datos.
     */
    public function store(Request $request)
    {
        // 1. Validación de los datos
        $request->validate([
            'medico_id' => 'required|exists:medicos,id',
            'paciente_id' => 'required|exists:pacientes,id',
            'fecha' => 'required|date',
        ]);

        // --- LÓGICA DE NEGOCIO ACTUALIZADA ---

        // REGLA A: El paciente no puede tener dos turnos con el mismo médico el mismo día.
        $turnoPacienteExistente = Turno::where('medico_id', $request->medico_id)
                                       ->where('paciente_id', $request->paciente_id)
                                       ->where('fecha', $request->fecha)
                                       ->first();

        if ($turnoPacienteExistente) {
            return Redirect::back()->with('error', 'El paciente ya tiene un turno con este médico para esa fecha.');
        }

        // REGLA B: El médico no puede tener más de 8 turnos en un día.
        $cantidadTurnosMedico = Turno::where('medico_id', $request->medico_id)
                                     ->where('fecha', $request->fecha)
                                     ->count();
        
        if ($cantidadTurnosMedico >= 8) {
            return Redirect::back()->with('error', 'El médico ha alcanzado el límite de 8 turnos para esta fecha.');
        }

        // 3. Creación del turno
        Turno::create([
            'medico_id' => $request->medico_id,
            'paciente_id' => $request->paciente_id,
            'fecha' => $request->fecha,
            'otorgado_por_user_id' => Auth::id(),
            'estado' => 'Confirmado',
        ]);

        // 4. Redirigimos de vuelta con un mensaje de éxito, manteniendo el contexto.
        return Redirect::route('turnos.index', [
            'medico_id' => $request->medico_id,
            'fecha' => $request->fecha,
        ])->with('success', '¡Turno guardado con éxito!');
    }
}
