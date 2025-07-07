<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MedicoController; 
// La ruta ahora apunta al método 'index' de nuestro nuevo 'Api\MedicoController'.
Route::get('/medicos', [MedicoController::class, 'index']);
