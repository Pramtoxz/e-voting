<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder3 extends Seeder
{
    public function run()
    {
        $mahasiswa = [
            ['username' => '2200013', 'name' => 'GILANG FERDINAND', 'password' => '1604fadb6dd632e44c461fc5dcb6c431'],
            ['username' => '2200010', 'name' => 'DINDA AULIA', 'password' => '6299b4bf69960e53b6d9a0bd27342660'],
            ['username' => '2410021', 'name' => 'MUHAMMAD AL RAFFI PRIMA', 'password' => '8dfa9027d35343f8076c3c7f0fd96e99'],
            ['username' => '2310027', 'name' => 'BASSIRIL AHLI CANIAGO', 'password' => '57f57adf2111a845dfdb84fdff45301e'],
            ['username' => '2410004', 'name' => 'MUHAMMAD FARIDH MASDIATUL FIKRI', 'password' => '777d66600936527d0a8859243ed97815'],
            ['username' => '2310002', 'name' => 'Genta', 'password' => 'd4cc1a2d554e0e51b3e6964a661bfef2'],
            ['username' => '2310036', 'name' => 'Chintia Sari Devi', 'password' => '4ba6e9577a1f571d8ec54a1fc1dd576e'],
            ['username' => '2310033', 'name' => 'BERTO LAILATUL', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2210028', 'name' => 'FERDI MUHAMMAD', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2110036', 'name' => 'ALDO PUTRA MEIZAHNI', 'password' => 'fcbe3f60e0271857ea2a682dea3b8c2f'],
            ['username' => '2110054', 'name' => 'THERESIA LUMBAN TOBING', 'password' => '45b622031ab9ecffc9382ca606956dd7'],
            ['username' => '2110022', 'name' => 'NURLY SYAAINI', 'password' => 'e6ee8902e3037b45913b0e5d6d6dae4b'],
            ['username' => '2410003', 'name' => 'INDRI OLIVIA DASMITA', 'password' => '3ed21077a73dd283564c88850ce20caa'],
            ['username' => '2410002', 'name' => 'HAZIZAH', 'password' => '70f4abf7204af733708dffcaef1a8589'],
            ['username' => '1910031', 'name' => 'IHSAN MAIHENDRIS', 'password' => 'bc4be1b15b8e2b535cae6f484a66e83a'],
            ['username' => '2310023', 'name' => 'RIMA GUSTI VINOLA', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2110012', 'name' => 'HERLINA EFENDI', 'password' => 'd09c7b7c72046ad43f3bacd7d4f54268'],
            ['username' => '2410033', 'name' => 'ALYSA PUTRI HASANAH', 'password' => '0e84db373d02b6beaa5b05510fb7a9a1'],
            ['username' => '2410025', 'name' => 'SYAFLIZAL SATRIA', 'password' => '2f4a6e7e9007d733e831368d6fac5701'],
            ['username' => '2210018', 'name' => 'ARIF SETIAWAN', 'password' => '09853bc080c4f94c84911d1c3b7d70b9'],
            ['username' => '2010047', 'name' => 'INDAH SRI SUPANDA', 'password' => '4fb734057425f1f289b0cb54339885b7'],
            ['username' => '2010004', 'name' => 'ANANDA', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2110046', 'name' => 'MUHAMMAD DHOFAN FADILLAH', 'password' => '7a04e57f5ba375e02346eb52075d4e53'],
            ['username' => '2110016', 'name' => 'MUHAMMAD ALFARIZI MAULANA', 'password' => '7ca2901eeb1ec674463cd403fc2ab118'],
            ['username' => '2310009', 'name' => 'Wanda Salsabilah', 'password' => '295ae6bbb074b556aa716b53a8ad9a9f'],
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