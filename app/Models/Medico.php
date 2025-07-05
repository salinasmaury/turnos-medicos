<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // <-- 1. Importar SoftDeletes

class Medico extends Model
{
    use HasFactory, SoftDeletes; // <-- 2. Usar el trait


    protected $fillable = [
        'nombre',
        'apellido',
        'dni',
        'fecha_nacimiento',
        'telefono',
        'sexo',
        'especialidad_id',
    ];

    /**
     * Relación: Un médico pertenece a UNA especialidad.
     */
    public function especialidad()
    {
        return $this->belongsTo(Especialidad::class);
    }

    /**
     * Relación: Un médico atiende MUCHOS turnos.
     */
    public function turnos()
    {
        return $this->hasMany(Turno::class);
    }
}
