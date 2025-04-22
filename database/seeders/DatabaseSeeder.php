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
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'email' => 'admin@jayanusa.ac.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);
    
        User::create([
            'name' => 'Mahasiswa',
            'username' => '2010036',
            'email' => '2010036@jayanusa.ac.id',
            'password' => Hash::make('password'),
            'role' => 'mahasiswa',
        ]);
    }
}
