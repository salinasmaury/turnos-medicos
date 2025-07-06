<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\MedicoController;
use App\Models\Especialidad; // Asegúrate de importar el modelo Especialidad aquí
use App\Models\Paciente;     // Asegúrate de importar el modelo Paciente aquí
use App\Models\Medico;       // Asegúrate de importar el modelo Medico aquí
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
// La ruta POST para crear pacientes
Route::post('/pacientes', [PacienteController::class, 'store'])->name('pacientes.store');
// Si tienes una ruta GET para listar pacientes directamente, sin autenticación:
// Route::get('/pacientes', [PacienteController::class, 'index'])->name('pacientes.index');


// Rutas para Médicos
// Ruta para la página principal de gestión de médicos (o para obtener datos de médicos)
Route::get('/medicos', [MedicoController::class, 'index'])->name('medicos.index');
// Ruta POST para almacenar nuevos médicos y sus horarios
Route::post('/medicos', [MedicoController::class, 'store'])->name('medicos.store');


// Ruta de la Vista de Prueba (tu página principal de gestión)
// Esta ruta carga datos de pacientes, médicos y especialidades de la DB y los pasa a la vista.
Route::get('/VistaPrueba', function () {
    // Obtener datos de la base de datos
    $pacientes = Paciente::all(); // Obtener todos los pacientes
    $medicos = Medico::with('especialidad')->get(); // Obtener médicos con su especialidad (para listar o pasar al modal si fuera necesario)
    $especialidades = Especialidad::all(); // Obtener TODAS las especialidades de la base de datos

    // Renderizar el componente Inertia 'VistaPrueba' y pasarle las props
    return Inertia::render('VistaPrueba', [
        'pacientes' => $pacientes,
        'medicos' => $medicos,
        'especialidades' => $especialidades, // Pasar las especialidades para el modal de médico
    ]);
})->name('vista_prueba'); // Nombre de la ruta para referenciarla en el frontend (ej. route('vista_prueba'))


// Ruta para el formulario de login (si usas una vista de login personalizada)
Route::get('/loginForm', function () {
    return Inertia::render('LoginForm');
})->name('loginForm');


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
});

// Incluye las rutas de autenticación de Laravel Breeze/Jetstream (login, register, logout, etc.)
require __DIR__.'/auth.php';
