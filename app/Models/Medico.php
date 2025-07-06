<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Medico extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nombre',
        'apellido',
        'dni',
        'fecha_nacimiento',
        'telefono',
        'sexo',
        'especialidad_id',
    ];

    public function especialidad()
    {
        return $this->belongsTo(Especialidad::class);
    }

    public function turnos()
    {
        return $this->hasMany(Turno::class);
    }
}