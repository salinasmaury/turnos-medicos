<?php
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\MedicoController;
use App\Models\Especialidad; // <<-- Asegúrate de importar el modelo Especialidad aquí
use App\Models\Paciente;     // <<-- Asegúrate de importar el modelo Paciente aquí
use App\Models\Medico;       // <<-- Asegúrate de importar el modelo Medico aquí
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//Prueba de Crear paciente (esta ruta debe estar protegida por autenticación despues)
Route::post('/pacientes', [PacienteController::class, 'store'])->name('pacientes.store');


// Rutas para Médicos <<-- AGREGAMOS ESTAS RUTAS
    Route::get('/medicos', [MedicoController::class, 'index'])->name('medicos.index'); // Ruta para la página principal de médicos
    Route::post('/medicos', [MedicoController::class, 'store'])->name('medicos.store'); // Ruta que tu modal usa para guardar
    // Puedes agregar más rutas para médicos (show, edit, update, destroy) aquí si las necesitas



     Route::get('/VistaPrueba', function () {
        $pacientes = Paciente::all(); // Obtener todos los pacientes
        $medicos = Medico::with('especialidad')->get(); // Obtener médicos con su especialidad
        $especialidades = Especialidad::all(); // <<-- OBTENER TODAS LAS ESPECIALIDADES

        return Inertia::render('VistaPrueba', [
            'pacientes' => $pacientes,
            'medicos' => $medicos,
            'especialidades' => $especialidades, // <<-- PASAR LAS ESPECIALIDADES COMO PROP
        ]);
    })->name('vista_prueba');


// vista de prueba>
Route::get('/VistaPrueba', function () {
    return Inertia::render('VistaPrueba');
});

//vista de login
Route::get('/loginLucas', function () {
    return Inertia::render('VistaLoginLucas');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
