<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder6 extends Seeder
{
    public function run()
    {
        $mahasiswa = [
            ['username' => '2110056', 'name' => 'VICKY HIDAYAT', 'password' => 'fea54e522f1efa33adc723d9b385f785'],
            ['username' => '2210046', 'name' => 'WIKEL AFRIKESMI', 'password' => '850dde7e142e2459a3ccc5dca6dc7e8f'],
            ['username' => '2410032', 'name' => 'ADIRA RAHMA SYAHTI', 'password' => 'faf50152fd92f385aab1062b0e455b5b'],
            ['username' => '2410005', 'name' => 'NAJWA FEBVIOLA', 'password' => '7731d09f06e45daeaac3f927b66d8579'],
            ['username' => '2110032', 'name' => 'VIVI HANDAYANI', 'password' => '61a781857ea35e01122107c2cf44adb3'],
            ['username' => '2410035', 'name' => 'MUHAMMAD FADHEL ARTAMIRANO', 'password' => 'b75d65cff3b712831bf29474533e4a53'],
            ['username' => '2110023', 'name' => 'NURUL HALIMAH', 'password' => '55811d685377dc59c4f23b946670dcca'],
            ['username' => '2410001', 'name' => 'SISKA YULIA NINGSIH', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2210034', 'name' => 'KELVIN ANDIKA', 'password' => '2077f1dae6b96be81d1f654c1b29b925'],
            ['username' => '2110003', 'name' => 'Anggi Maiza Putra', 'password' => '9093c509376a68ea4009531a6e7b2850'],
            ['username' => '2110026', 'name' => 'Ridho Rahman', 'password' => 'fb624629bbdbe0a60d184290ec28999d'],
            ['username' => '2410011', 'name' => 'ZULFA INDRA', 'password' => '643ae2b352a4917874655aedec5f52e1'],
            ['username' => '2310019', 'name' => 'LUTHFI ARIESTO PRAYOGA', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2310026', 'name' => 'FITRIA AIDIL RAHMAN', 'password' => 'eaac1b73300e734014ee0b116f31383a'],
            ['username' => '2310017', 'name' => 'KEVIN ANRAGA', 'password' => '92cca226ccaf86737ffb3b2c0b668f85'],
            ['username' => '2310005', 'name' => 'Arif Syafriyaldi', 'password' => '9118716ea657bf31f7f08cf1398e311c'],
            ['username' => '2310030', 'name' => 'ALWINSTON AULIA', 'password' => '8add60a674149d41c75480dd0fff5826'],
            ['username' => '2110053', 'name' => 'SUPANDI', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2410031', 'name' => 'BRAM SETIAWAN', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2210004', 'name' => 'Nurlaili', 'password' => '64b7925c73960a41a66ca2e608d82d91'],
            ['username' => '2210002', 'name' => 'FARHAN ADHA', 'password' => 'd2e74eb28d0c11e2a4d1aea71839f051'],
            ['username' => '2310035', 'name' => 'Risman Dedy', 'password' => '5f967b793a0e256ebb6047c3ff73493a'],
            ['username' => '2210010', 'name' => 'DIANADA RAHMADANI', 'password' => 'dd8314e40eec2a4d6b32de11e1ce608f'],
            ['username' => '2010070', 'name' => 'BELIA AMANDA', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2410037', 'name' => 'GUSTINA KHAIRUNNISA', 'password' => 'cb17a34954443a164ceb4075d28b86fb'],
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