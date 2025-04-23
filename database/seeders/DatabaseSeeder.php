<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Pengaturan dasar aplikasi
        \App\Models\Setting::create([
            'key' => 'show_voting_results',
            'value' => '0',
        ]);

        \App\Models\Setting::create([
            'key' => 'countdown_active',
            'value' => '1',
        ]);

        \App\Models\Setting::create([
            'key' => 'countdown_end_time',
            'value' => now()->addMinutes(10)->format('Y-m-d H:i:s'),
        ]);

        // Cek apakah admin sudah ada
        if (!User::where('email', 'admin@jayanusa.ac.id')->exists()) {
            User::create([
                'name' => 'Admin',
                'username' => 'admin',
                'email' => 'admin@jayanusa.ac.id',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]);
        }

        // Cek apakah mahasiswa contoh sudah ada
        if (!User::where('email', '2010036@jayanusa.ac.id')->exists()) {
            User::create([
                'name' => 'Mahasiswa',
                'username' => '2010036',
                'email' => '2010036@jayanusa.ac.id',
                'password' => Hash::make('password'),
                'role' => 'mahasiswa',
            ]);
        }

        $this->call([
            MahasiswaSeeder1::class,
            MahasiswaSeeder2::class,
            MahasiswaSeeder3::class,
            MahasiswaSeeder4::class,
            MahasiswaSeeder5::class,
            MahasiswaSeeder6::class,
            MahasiswaSeeder7::class,
            MahasiswaSeeder8::class,
            MahasiswaSeeder9::class,
            MahasiswaSeeder10::class,
            MahasiswaSeeder11::class,
            VoteSeeder::class,
        ]);
    }
}
