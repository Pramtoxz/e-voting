<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset semua setting ke default
        // Delete semua setting yang sudah ada
        DB::table('settings')->truncate();

        // Insert ulang semua setting dengan nilai default
        DB::table('settings')->insert([
            [
                'key' => 'show_voting_results',
                'value' => '0', // Hasil voting disembunyikan secara default
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'countdown_active',
                'value' => '0', // Countdown nonaktif secara default
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'countdown_end_time',
                'value' => Carbon::now()->addDay()->toDateTimeString(), // Default 1 hari dari sekarang
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $this->command->info('Settings reset to default values!');
    }
}
