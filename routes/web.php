<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\MedicoController;
use App\Http\Controllers\TurnoController;
use App\Models\Especialidad; // <<-- Asegúrate de importar el modelo Especialidad aquí
use App\Models\Paciente;     // <<-- Asegúrate de importar el modelo Paciente aquí
use App\Models\Medico;       // <<-- Asegúrate de importar el modelo Medico aquí
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Ruta de bienvenida principal (sin autenticación)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Rutas accesibles sin autenticación por ahora (para desarrollo)
// **NOTA:** En producción, considera proteger estas rutas con middleware 'auth'.

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


// Ruta de la Vista de Prueba (tu página principal de gestión de médicos activos por defecto)
Route::get('/VistaPrueba', function () {
    $pacientes = Paciente::all();
    $medicos = Medico::with('especialidad')->get(); // <<-- SIEMPRE PASA MÉDICOS ACTIVOS AQUÍ
    $especialidades = Especialidad::all();

    return Inertia::render('VistaPrueba', [
        'pacientes' => $pacientes,
        'medicos' => $medicos,
        'especialidades' => $especialidades,
        'viewMode' => 'active', // Siempre 'active' para esta ruta
    ]);
})->name('vista_prueba');


// Ruta para el formulario de login (si usas una vista de login personalizada)
Route::get('/loginForm', function () {
    return Inertia::render('LoginForm');
})->name('loginForm');

Route::get('/nosotros', function () {
    return Inertia::render('Nosotros');
})->name('nosotros');


// Rutas que SI requieren autenticación (manteniendo la protección original)
Route::middleware(['auth', 'verified'])->group(function () {
    // Ruta del Dashboard (ejemplo de ruta protegida)
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Rutas de Perfil de usuario (normalmente siempre protegidas)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');




    Route::get('/turnos', [TurnoController::class, 'index'])->name('turnos.index');
    Route::post('/turnos', [TurnoController::class, 'store'])->name('turnos.store');
    
});

require __DIR__.'/auth.php';
