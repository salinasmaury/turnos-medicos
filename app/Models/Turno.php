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
        'fecha',
        'estado',
    ];

    public function medico()
    {
        return $this->belongsTo(Medico::class);
    }

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    public function otorgadoPor()
    {
        return $this->belongsTo(User::class, 'otorgado_por_user_id');
    }
}