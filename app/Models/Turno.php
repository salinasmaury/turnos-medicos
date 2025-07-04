<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Turno extends Model
{
    use HasFactory;

    protected $fillable = [
        'medico_id',
        'paciente_id',
        'otorgado_por_user_id',
        'fecha_hora',
        'estado',
    ];

    /**
     * Un turno pertenece a UN médico.
     */
    public function medico()
    {
        return $this->belongsTo(Medico::class);
    }

    /**
     * Un turno pertenece a UN paciente.
     */
    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    /**
     * Un turno fue otorgado por UN usuario (administrativo).
     */
    public function otorgadoPor()
    {
        // El segundo argumento es necesario porque el nombre de la función ('otorgadoPor')
        // no coincide con el nombre de la columna ('otorgado_por_user_id').
        return $this->belongsTo(User::class, 'otorgado_por_user_id');
    }
}