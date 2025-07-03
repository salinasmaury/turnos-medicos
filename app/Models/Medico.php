<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medico extends Model
{
    use HasFactory;

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
     * Un médico pertenece a UNA especialidad.
     */
    public function especialidad()
    {
        return $this->belongsTo(Especialidad::class);
    }

    /**
     * Un médico tiene MUCHAS asignaciones de horario.
     */
    public function horarioMedico()
    {
        return $this->hasMany(HorarioMedico::class);
    }

    /**
     * Un médico tiene MUCHOS bloqueos en su agenda.
     */
    public function bloqueos()
    {
        return $this->hasMany(Bloqueo::class);
    }

    /**
     * Un médico atiende MUCHOS turnos.
     */
    public function turnos()
    {
        return $this->hasMany(Turno::class);
    }
}