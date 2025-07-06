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
        Schema::create('medicos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 50);
            $table->string('apellido', 50);
            $table->string('dni', 12)->unique();
            $table->date('fecha_nacimiento');
            $table->string('telefono', 15)->nullable();
            $table->enum('sexo', ['masculino', 'femenino']);
            $table->foreignId('especialidad_id')->constrained('especialidades');
            $table->timestamps();
            $table->softDeletes(); // <<-- ASEGÚRATE QUE ESTA LÍNEA ESTÉ AQUÍ
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicos');
    }
};
