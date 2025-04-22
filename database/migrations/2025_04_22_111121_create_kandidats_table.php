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
        Schema::create('kandidats', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_urut');
            $table->string('nama_presiden');
            $table->string('nama_wakil');
            $table->enum('prodi_presiden', ['SI', 'MI', 'SK']);
            $table->enum('prodi_wakil', ['SI', 'MI', 'SK']);
            $table->string('foto_presiden')->nullable();
            $table->string('foto_wakil')->nullable();
            $table->text('visi');
            $table->text('misi');
            $table->string('periode', 9); // Format: 2025/2026
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kandidats');
    }
};
