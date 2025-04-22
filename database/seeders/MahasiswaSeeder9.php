<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder9 extends Seeder
{
    public function run()
    {
        $mahasiswa = [
            ['username' => '2420003', 'name' => 'RIDHO NIKMATUL AKBAR', 'password' => '6625981e5ff702b743dbb223866bb716'],
            ['username' => '2120011', 'name' => 'MARIA YULITA NGUSA', 'password' => '1ccd96097b20988e49269aa9dc403882'],
            ['username' => '1920007', 'name' => 'NURSATRIA', 'password' => '36cf9a51bc1ce1d3a814f5963ddb98bb'],
            ['username' => '2220020', 'name' => 'LATIF ADLINSKI', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2420006', 'name' => 'HUTRILA AFDHAL', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2320002', 'name' => 'Cindy Claudya Luahambowo', 'password' => 'e786a9461626cc4ff91f73e3630a4380'],
            ['username' => '2220013', 'name' => 'SITTI FATIHA', 'password' => '8bc095c57bb4d553627f4fde786e9859'],
            ['username' => '2120009', 'name' => 'IQBAL WIDIA SAPUTRA', 'password' => '36fa8e513ad46c5e88b8d80130a4778e'],
            ['username' => '2420002', 'name' => 'MUHAMMAD AZLAN SYAH', 'password' => 'a8c80ab3d6af834bb849be11ff41d753'],
            ['username' => '2120026', 'name' => 'VIRANDA SAMALOISA', 'password' => '2b6620742aa2181ddcbe907449be5cf9'],
            ['username' => '2320011', 'name' => 'YATUL FIKRI', 'password' => 'b8f29de5f6cc19d07076c5d4893e7aa6'],
            ['username' => '2120001', 'name' => 'ADEK JAKA PUTRA', 'password' => 'e89653085ff217be9536824c2bf247e0'],
            ['username' => '2220011', 'name' => 'NURMAN HIDAYAT', 'password' => 'e92db0bcc890667d1ffe2f8e95329080'],
            ['username' => '2120016', 'name' => 'RAHMAT RESTU', 'password' => 'd281486434edd69a660c2f630429b0b2'],
            ['username' => '2320009', 'name' => 'IZAS SELAMAT GEA', 'password' => '113e0fc7bb50790bd0482b6bfe6ad976'],
            ['username' => '2220028', 'name' => 'ROBY ISNIL JUANDA', 'password' => '0f190cafcd51f0fb59310bed1c018319'],
            ['username' => '2220014', 'name' => 'GALUH SAPUTRA', 'password' => 'ba9ce6abc7f38bf0649e9ba9a8de0e0c'],
            ['username' => '2420004', 'name' => 'RIVAL MAIHENDRI', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2120007', 'name' => 'HABIL YAKUB ARAPAH', 'password' => 'c601c634155ec2a64b06f409cd7674ab'],
            ['username' => '2320010', 'name' => 'Kevin Surya Tjandra', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2120025', 'name' => 'AHMAD ZAKI', 'password' => '55b98f486492b39c4ab84f24e7f50e9b'],
            ['username' => '2120012', 'name' => 'MUHAMAD INDRA SALMI', 'password' => 'df4946c0de71d90ab8b5be400e7d8718'],
            ['username' => '2320008', 'name' => 'DION SETIAWAN', 'password' => '1c60bf4931cdf1770b65418d96aafb54'],
            ['username' => '2020001', 'name' => 'SEPTIADI', 'password' => '406e191314818be63c38cc03b3c73c38'],
            ['username' => '2420008', 'name' => 'HENDRI WAHYUDI', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
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