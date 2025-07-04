<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bloqueo extends Model
{
    use HasFactory;

    protected $fillable = [
        'medico_id',
        'fecha_inicio',
        'fecha_fin',
        'motivo',
    ];

    /**
     * Un bloqueo pertenece a UN médico.
     */
    public function medico()
    {
        return $this->belongsTo(Medico::class);
    }
}