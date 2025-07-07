<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\MedicoController;
use App\Http\Controllers\TurnoController;
use App\Models\Especialidad;
use App\Models\Paciente;
use App\Models\Medico;
use App\Models\Turno;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Carbon\Carbon;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// Rutas para Pacientes
Route::post('/pacientes', [PacienteController::class, 'store'])->name('pacientes.store');

// Rutas para Médicos
Route::get('/medicos', [MedicoController::class, 'index'])->name('medicos.index');
Route::post('/medicos', [MedicoController::class, 'store'])->name('medicos.store');

// RUTA PARA ELIMINAR SUAVEMENTE UN MÉDICO
Route::delete('/medicos/{medico}', [MedicoController::class, 'destroy'])->name('medicos.destroy');

// RUTA PARA OBTENER MÉDICOS ELIMINADOS COMO JSON (para el modal)
// ESTA ES LA ÚNICA RUTA GET PARA MÉDICOS ELIMINADOS
Route::get('/api/medicos/eliminados', [MedicoController::class, 'getTrashedMedicos'])->name('medicos.getTrashed');

// Rutas para restaurar y eliminar permanentemente (estas se llamarán desde el modal)
Route::post('/medicos/{id}/restaurar', [MedicoController::class, 'restore'])->name('medicos.restore');
Route::delete('/medicos/{id}/forceDelete', [MedicoController::class, 'forceDelete'])->name('medicos.forceDelete');


// Ruta para el formulario de login (si usas una vista de login personalizada)
Route::get('/loginForm', function () {
    return Inertia::render('LoginForm');
})->name('loginForm');

Route::get('/nosotros', function () {
    return Inertia::render('Nosotros');
})->name('nosotros');


// Rutas que requieren autenticacion 
Route::middleware(['auth', 'verified'])->group(function () {
    //RUTA DEL DASHBOARD (MODIFICADA PARA CARGAR TODOS LOS DATOS)
    Route::get('/dashboard/{date?}', function ($date = null) {
        // Si no se proporciona una fecha, usa la fecha actual
        $selectedDate = $date ? Carbon::parse($date) : Carbon::today();

        // Obtener los turnos para la fecha seleccionada
        $turnos = Turno::with(['paciente', 'medico', 'otorgadoPor'])
            ->whereDate('fecha', $selectedDate->toDateString())
            ->orderBy('fecha')
            ->get();


        $pacientes = Paciente::all();
        $medicos = Medico::with('especialidad')->get();
        $especialidades = Especialidad::all();
        // <<-- FIN DE LA VERIFICACIÓN -->>

        return Inertia::render('Dashboard', [
            'turnos' => $turnos,
            'selectedDate' => $selectedDate->toDateString(),
            'pacientes' => $pacientes,        // <<-- PASAR PACIENTES
            'medicos' => $medicos,            // <<-- PASAR MÉDICOS
            'especialidades' => $especialidades, // <<-- PASAR ESPECIALIDADES
            'viewMode' => 'active', // Si lo usas en tu Dashboard.jsx
        ]);
    })->name('dashboard');

    Route::get('/turnos', [TurnoController::class, 'index'])->name('turnos.index');
    Route::post('/turnos', [TurnoController::class, 'store'])->name('turnos.store');
    // <<-- ESTAS SON LAS RUTAS DEL PERFIL QUE DEBEN ESTAR -->>
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('turnos', TurnoController::class);
    // <<-- FIN RUTAS DEL PERFIL -->>
});

require __DIR__ . '/auth.php';
