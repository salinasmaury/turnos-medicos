<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'apellido',
        'dni',
        'fecha_nacimiento',
        'telefono',
        'sexo',
    ];

    /**
     * Un paciente puede tener muchos turnos.
     */
    public function turnos()
    {
        return $this->hasMany(Turno::class);
    }
}