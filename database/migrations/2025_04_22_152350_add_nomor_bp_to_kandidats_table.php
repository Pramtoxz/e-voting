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
        Schema::table('kandidats', function (Blueprint $table) {
            $table->string('nomor_bp_presiden', 20)->after('nama_presiden');
            $table->string('nomor_bp_wakil', 20)->after('nama_wakil');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kandidats', function (Blueprint $table) {
            $table->dropColumn(['nomor_bp_presiden', 'nomor_bp_wakil']);
        });
    }
};
