<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder10 extends Seeder
{
    public function run()
    {
        $mahasiswa = [
            ['username' => '2220006', 'name' => 'SILVY ADINDA PUTRI', 'password' => '751daee2e2d519167c5004d7d2cb4a9c'],
            ['username' => '2220002', 'name' => 'SYAIDATUN NISA', 'password' => '2b5c4ab2977131aa2a836608105a1464'],
            ['username' => '2120003', 'name' => 'AYU LINDA', 'password' => '2728476ab86a3dd2cf704ce4157ed79b'],
            ['username' => '2120004', 'name' => 'CHRISTIAN NAZARA', 'password' => '144e413785bea54310bc08f5f9e88614'],
            ['username' => '2220012', 'name' => 'MUHAMMAD FIKRI', 'password' => '440273bc38a7df78cd9d1fa0693f09ab'],
            ['username' => '2320015', 'name' => 'M. YOSAZIKRI IKHSAN', 'password' => '54ef1e7f8d221189a8cb79ac2804b36a'],
            ['username' => '2120013', 'name' => 'MUHAMMAD RAFI', 'password' => '4496b2313efc87ad0354524439daab0b'],
            ['username' => '2320007', 'name' => 'Risfiatul Adawiyah', 'password' => '44d643128a0a27eb416e3420cd335ed1'],
            ['username' => '2420001', 'name' => 'FARHAN RAMADHAN', 'password' => '0196d580603ce838084a9bad4b7b5bfd'],
            ['username' => '2320005', 'name' => 'PUTRA MUHAMAD AKBAR', 'password' => '665639fbd85a90f0e0eb727d9fb4b256'],
            ['username' => '1920010', 'name' => 'MUHAMMAD FADHEL', 'password' => '178d52a8802f7390bb922c546952131c'],
            ['username' => '2220027', 'name' => 'YUDHA BIMA SAKTI', 'password' => 'c3520a45d2581afe03150c33d454ae1d'],
            ['username' => '2120018', 'name' => 'RANDI FADILLAH', 'password' => '91c4c6663c98496fa549bec9cd74af19'],
            ['username' => '2420009', 'name' => 'MHD. AIDIL PUTRA', 'password' => '61d7e5fa81be95055d9a4fa71e1c7f3d'],
            ['username' => '2220004', 'name' => 'ORIA KUDANG', 'password' => '32f57420eef194dcec9cb7077a45e347'],
            ['username' => '2320004', 'name' => 'MUHAMMAD RONAL AFENDI', 'password' => '2d07434de034d12f238812c4b3305acc'],
            ['username' => '2320003', 'name' => 'ISMA BAHARI', 'password' => '9dd733119a6572e554925d653f84b4c2'],
            ['username' => '2120019', 'name' => 'RINA TRIMURTI', 'password' => '0640a395e3fb2acf00e2451f5966251b'],
            ['username' => '2320001', 'name' => 'Alber Deco', 'password' => 'bd49e999469336d4435f04e5eec4a990'],
            ['username' => '2420005', 'name' => 'SYALMAN ALFARITSI', 'password' => '7513fa9f0b43eb914569205ed7f046ed'],
            ['username' => '2120020', 'name' => 'ZANDY ALFITRA', 'password' => '31b961bc150c7c4ac6f7a2bf819375f5'],
            ['username' => '2120005', 'name' => 'ELZA AFRIANITA', 'password' => 'fb2715a331093cb73aeb3eb2d70dfec3'],
            ['username' => '2220010', 'name' => 'ZIZI SEPTI DWI ERINDA', 'password' => '93c63281804ce4167daec828fe1c370a'],
            ['username' => '2220026', 'name' => 'BETA JULIANSYAH', 'password' => '0674b492519ebb2233f17c128aa8111e'],
            ['username' => '2020008', 'name' => 'NADYA ANEVA', 'password' => '3b7d85fbbb0b118bdbb955619cb51819'],
        ];

        foreach ($mahasiswa as $data) {
            User::create([
                'username' => $data['username'],
                'name' => $data['name'],
                'password' => $data['password'],
                'email' => $data['username'] . '@jayanusa.ac.id',
                'role' => 'mahasiswa'
            ]);
        }
    }
} 