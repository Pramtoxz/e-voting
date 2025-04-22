<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder5 extends Seeder
{
    public function run()
    {
        $mahasiswa = [
            ['username' => '2110014', 'name' => 'ILHAM SAPUTRA', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2110039', 'name' => 'DIONEIDIS AFRA', 'password' => 'bbc58a702d13d4b906aff6d40d737c03'],
            ['username' => '2110070', 'name' => 'MUSTIKA FADILA SARI', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2410038', 'name' => 'ADI PUTRA', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2310032', 'name' => 'ABDUL HAMID HAKIM', 'password' => '107b9875e5ea7701afd575950d1e3382'],
            ['username' => '2410019', 'name' => 'KEVINDA ADRIAN', 'password' => 'a7ddab460278dea3b583a7fc64728239'],
            ['username' => '2310022', 'name' => 'RAHMAT SALSABILLA', 'password' => '1bd52cb319761cd63f885fd9142d66cb'],
            ['username' => '2410008', 'name' => 'SALSABILA', 'password' => '8e1c47ab53a743c70ed8a5bc584ecf5b'],
            ['username' => '2310003', 'name' => 'Habil Harpama Putra', 'password' => 'f2a9eaabd011024c6e1727dd2528946d'],
            ['username' => '2310001', 'name' => 'DENIL JUNIA EKA PUTRA', 'password' => 'db90355e79bcc80fc3610458c8753817'],
            ['username' => '2110020', 'name' => 'MUHAMMAD FARID SUHANDA', 'password' => '0e5dddd94480f7736132b15bb79dd3bd'],
            ['username' => '2210017', 'name' => 'APRIAN NANDA', 'password' => '74959a92a7bc16fd753e083c51c7a71b'],
            ['username' => '2210023', 'name' => 'DHIMAS PUTRA PRASETYA', 'password' => 'f0b8b5d0188032e32292f88e67f87a3a'],
            ['username' => '2010053', 'name' => 'FIRMAN', 'password' => 'f728e3c7b3170fd89b0e1d84258d1a8b'],
            ['username' => '2110002', 'name' => 'ANDREA REYNETTA', 'password' => 'd4ddcd39974a1cce27de045886a47a23'],
            ['username' => '2310013', 'name' => 'FIKRUL HANIF ALGHAZALI', 'password' => 'fb5460380dd27a058012e97036da89ed'],
            ['username' => '2110018', 'name' => 'MUHAMMAD AFDAL ZIKRI', 'password' => '3783aed5352ddfd90f048223842b5189'],
            ['username' => '2310021', 'name' => 'NADA AULIA PUTRI', 'password' => '8d0d30ca48482eec966ca6712fe17c35'],
            ['username' => '2410022', 'name' => 'NALARASTI USMAN', 'password' => '6388eb43e71aa6d363173db5c967925f'],
            ['username' => '2110045', 'name' => 'KARTINA AMELIA P', 'password' => '37dfa2a68def9ec306ea5afa9972ccda'],
            ['username' => '2410029', 'name' => 'JULPRI WARUWU', 'password' => '9dcce115fb5320f28b528863b476307d'],
            ['username' => '2110029', 'name' => 'SILVIA NISA', 'password' => 'c26504e22ac2723c1a2123f7450b4c65'],
            ['username' => '2210020', 'name' => 'BIMA PRATAMA PUTRA', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2310011', 'name' => 'AL FAHRUL OZI', 'password' => '09ca203c02ad660bc5bb600be7d9b793'],
            ['username' => '2010072', 'name' => 'MUHAMMAD RHAFIZ ARIVI', 'password' => '7a002a1f8ac59b2fc9172b541810c513'],
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