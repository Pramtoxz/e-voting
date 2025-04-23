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
        Schema::create('kuesioners', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->foreign('username')->references('username')->on('users');
            $table->integer('nilai_tampilan')->comment('1-5');
            $table->integer('nilai_kemudahan')->comment('1-5');
            $table->integer('nilai_keamanan')->comment('1-5');
            $table->integer('nilai_kecepatan')->comment('1-5');
            $table->integer('nilai_keseluruhan')->comment('1-5');
            $table->text('saran')->nullable();
            $table->text('kesan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kuesioners');
    }
};
