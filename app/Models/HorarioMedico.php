<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HorarioMedico extends Model
{
    use HasFactory;

    /**
     * El nombre de la tabla asociada con el modelo.
     */
    protected $table = 'horario_medicos';

    /**
     * Los atributos que se pueden asignar de forma masiva.
     */
    protected $fillable = [
        'medico_id',
        'dia_semana',
        'franja',
    ];

    /**
     * Cada registro de horario pertenece a UN médico.
     */
    public function medico()
    {
        return $this->belongsTo(Medico::class);
    }
}