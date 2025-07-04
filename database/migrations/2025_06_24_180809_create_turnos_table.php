<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('turnos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('medico_id')->constrained('medicos');
            $table->foreignId('paciente_id')->constrained('pacientes')->cascadeOnDelete();

            // Columna opcional para auditoría que discutimos
            $table->foreignId('otorgado_por_user_id')->nullable()->constrained('users');

            // --- Datos del Turno ---
            $table->dateTime('fecha_hora');
            $table->string('estado')->default('Confirmado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('turnos');
    }
};
