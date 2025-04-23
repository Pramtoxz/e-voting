<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Tambahkan pengaturan countdown untuk hasil voting
        DB::table('settings')->insert([
            [
                'key' => 'countdown_end_time',
                'value' => now()->addDays(1)->toDateTimeString(), // Default 1 hari dari sekarang
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'countdown_active',
                'value' => '1', // 1 berarti aktif, 0 berarti nonaktif
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('settings')->whereIn('key', ['countdown_end_time', 'countdown_active'])->delete();
    }
};
