<?php

namespace App\Http\Controllers;

use App\Models\Medico;
use App\Models\Paciente;
use App\Models\Turno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Validation\Rule; // Importamos Rule para validaciones avanzadas

class TurnoController extends Controller
{
    /**
     * Muestra la página principal de gestión de turnos.
     */
    public function index(Request $request)
    {
        $paciente = null;
        if ($request->filled('dni')) {
            $paciente = Paciente::where('dni', $request->input('dni'))->first();
            if (!$paciente) {
                $request->session()->flash('error', 'No se encontró ningún paciente con el DNI proporcionado.');
            }
        }

        $turnosDelDia = [];
        if ($request->filled('medico_id') && $request->filled('fecha')) {
            $turnosDelDia = Turno::with(['paciente', 'medico']) // Cargamos la info de paciente Y médico
                ->where('medico_id', $request->input('medico_id'))
                ->where('fecha', $request->input('fecha'))
                ->get();
        }

        $medicos = Medico::with('especialidad')->orderBy('apellido')->get();
        // --- AJUSTE AÑADIDO ---
        // Obtenemos todos los pacientes para pasarlos al modal de edición.
        $pacientes = Paciente::orderBy('apellido')->get();

        return Inertia::render('Turnos/Index', [
            'pacienteEncontrado' => $paciente,
            'medicos' => $medicos,
            'pacientes' => $pacientes, // <-- Se pasan los pacientes a la vista
            'turnosDelDia' => $turnosDelDia,
        ]);
    }

    /**
     * Guarda un nuevo turno en la base de datos.
     */
    public function store(Request $request)
    {
        $request->validate([
            'medico_id' => 'required|exists:medicos,id',
            'paciente_id' => 'required|exists:pacientes,id',
            'fecha' => 'required|date',
        ]);

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

        Turno::create([
            'medico_id' => $request->medico_id,
            'paciente_id' => $request->paciente_id,
            'fecha' => $request->fecha,
            'otorgado_por_user_id' => Auth::id(),
            'estado' => 'Confirmado',
        ]);

        return Redirect::route('turnos.index', [
            'medico_id' => $request->medico_id,
            'fecha' => $request->fecha,
        ])->with('success', '¡Turno guardado con éxito!');
    }


    /**
     * Muestra el formulario para editar un turno.
     * Con el enfoque de modal, este método no se utiliza directamente al hacer clic,
     * pero es una buena práctica mantenerlo por si se necesita una página de edición dedicada.
     */
    public function edit(Turno $turno)
    {
        // Esta función se deja por convención de 'resource'.
        // No es necesaria para el flujo del modal que hemos implementado.
    }


    /**
     * Actualiza un turno existente en la base de datos.
     */
    public function update(Request $request, Turno $turno)
    {
        // Hacemos la validación más flexible con 'sometimes'
        // para que funcione tanto con el modal de edición como con el checkbox de estado.
        $request->validate([
            'fecha' => 'sometimes|required|date',
            'estado' => ['sometimes', 'required', Rule::in(['Confirmado', 'Cancelado', 'Completado', 'Ausente'])],
            // Podríamos añadir validación para medico_id y paciente_id si permitiéramos cambiarlos.
        ]);

        // Lógica de negocio para evitar conflictos al cambiar la fecha
        if ($request->has('fecha') && $request->fecha != $turno->fecha) {
            $cantidadTurnosMedico = Turno::where('medico_id', $turno->medico_id)
                                         ->where('fecha', $request->fecha)
                                         ->count();
            if ($cantidadTurnosMedico >= 8) {
                return Redirect::back()->with('error', 'El médico ya tiene 8 turnos para la nueva fecha seleccionada.');
            }
        }

        // Actualizamos solo los campos que llegaron en la petición.
        $turno->update($request->all());

        return Redirect::back()->with('success', 'Turno actualizado con éxito.');
    }


    /**
     * Elimina (cancela) un turno específico.
     */
    public function destroy(Turno $turno)
    {
        $turno->delete();

        return Redirect::back()->with('success', 'Turno cancelado con éxito.');
    }
}
