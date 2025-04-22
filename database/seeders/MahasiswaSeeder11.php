<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder11 extends Seeder
{
    public function run()
    {
        $mahasiswa = [
            ['username' => '1820008', 'name' => 'EXAUDI SANENANO FANAETU', 'password' => 'f97f9ef1d0cac621dee6a1340eac70f1'],
            ['username' => '2220023', 'name' => 'SUCI MERI ANDESMITHA', 'password' => '5fba1facc27840b98a78a7d888a28c28'],
            ['username' => '2220003', 'name' => 'RENDI FEBRI YUSRIMEL', 'password' => 'e59ce281d8aab696ac42580eb00b3f43'],
            ['username' => '2120017', 'name' => 'RAHMAWITA GETARI', 'password' => '2d565dd4487a8e4f10220d8b69ec5f21'],
            ['username' => '2220022', 'name' => 'MUHAMMAD SABIRIN', 'password' => '07b28314bc5ced67d42a8bd6631f97d9'],
            ['username' => '2120008', 'name' => 'ILHAM JAYA KUSUMA', 'password' => 'e15b5d55d68b2bc708d31e04afb5520d'],
            ['username' => '2120006', 'name' => 'FADLUL RAHMAN RAMADHAN', 'password' => '30dd6a6ec37385228872f3181162fe41'],
            ['username' => '2220009', 'name' => 'SHERIN AYUNDA HENZLI', 'password' => '9cfd52c4be655f77b07210e7202c6b99'],
            ['username' => '2020024', 'name' => 'MUHAMMAD IKHSAN', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2220030', 'name' => 'Adam Firmansyah', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2220005', 'name' => 'RAHMATUL FADILLA', 'password' => 'c6d4aeca2fb9120ba99eec9e219a7b22'],
            ['username' => '2320006', 'name' => 'Rahul Harianto', 'password' => '61b4cf93d3e66b1a692166e414e9a897'],
            ['username' => '2320012', 'name' => 'YOHANES YOSEF BUDIMAN PRASETYO', 'password' => 'cd79831de1facf3b2fcf75d3649fea2d'],
            ['username' => '2220008', 'name' => 'MARTHA DINO ASYURA', 'password' => 'c8a378a44d6e4c60744827d5736f08b8'],
            ['username' => '2120014', 'name' => 'MUSRI WANDRA', 'password' => 'eb67cc6dcba850183b15c0ff4d32106c'],
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