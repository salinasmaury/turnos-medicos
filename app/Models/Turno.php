<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turno extends Model
{
    use HasFactory;

    /**
     * Los atributos que se pueden asignar de forma masiva.
     */
    protected $fillable = [
        'medico_id',
        'paciente_id',
        'otorgado_por_user_id',
        'fecha',
        'franja', // <-- AÑADIDO DE NUEVO
        'estado',
    ];

    /**
     * Relación: Un turno pertenece a UN médico.
     */
    public function medico()
    {
        return $this->belongsTo(Medico::class);
    }

    /**
     * Relación: Un turno pertenece a UN paciente.
     */
    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    /**
     * Relación: Un turno fue otorgado por UN usuario (administrativo).
     */
    public function otorgadoPor()
    {
        // El segundo argumento 'otorgado_por_user_id' es necesario porque el nombre de la función
        // no sigue la convención estándar de Laravel para el nombre de la columna.
        return $this->belongsTo(User::class, 'otorgado_por_user_id');
    }
}
