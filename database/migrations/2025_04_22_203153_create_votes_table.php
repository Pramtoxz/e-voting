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
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('nomor_urut');
            $table->string('foto_bukti')->nullable();
            $table->timestamps();

            // Foreign key untuk nomor_urut ke tabel kandidats
            $table->foreign('nomor_urut')->references('nomor_urut')->on('kandidats');

            // Unique constraint agar satu user hanya bisa vote sekali
            $table->unique('username');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('votes');
    }
};
