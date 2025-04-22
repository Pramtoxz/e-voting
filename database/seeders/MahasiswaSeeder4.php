<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder4 extends Seeder
{
    public function run()
    {
        $mahasiswa = [
            ['username' => '2410006', 'name' => 'NAZEEHA AZZUKA', 'password' => 'a48ad4bc0245e474a128db1f19eb9b22'],
            ['username' => '2410009', 'name' => 'TRI VALDO PUTRA', 'password' => 'b072d515f26a0dca0f8675cb9313739d'],
            ['username' => '2210003', 'name' => 'ADITTYA AL YANDRA', 'password' => '7f321b3bff3e9399e761c4881df52a95'],
            ['username' => '2210037', 'name' => 'MUHAMMAD RISKI ILLAHI', 'password' => 'c4b022af0f3248bfc492f5b582d81ae8'],
            ['username' => '2410017', 'name' => 'IDHAM KHALID', 'password' => 'b7ea61126660678a2520d2243c2897f4'],
            ['username' => '2110028', 'name' => 'SHANDRA MONALISA', 'password' => 'f2623237a63928af8b4551c2ee85d687'],
            ['username' => '2410023', 'name' => 'RESTA JULIANDRI', 'password' => '238fb95a15323adf621429dccceb3f32'],
            ['username' => '2210022', 'name' => 'DEVRI', 'password' => 'c552d276c3c20f92122699adf3e51b20'],
            ['username' => '2110010', 'name' => 'FIONA NIKI SELFANOGI', 'password' => '74bdb4a4a1d4343750a823715f137e83'],
            ['username' => '2210007', 'name' => 'SENTIA ULANDARI', 'password' => 'e89846d2d50d5825c07f7141e33d58b3'],
            ['username' => '2310004', 'name' => 'Hakim Pratama', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2110033', 'name' => 'YOLANDA SSA\'ADAH', 'password' => 'a5b7b71d30330dea0593b2f7160681ad'],
            ['username' => '2210021', 'name' => 'DEBORA SEPTIANI DAELI', 'password' => '18a3820ebef49ed124fa79342dc746cf'],
            ['username' => '2410041', 'name' => 'NILAM MUTIA SARI', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2210050', 'name' => 'ADITIA NOVIRMAN', 'password' => '64b7925c73960a41a66ca2e608d82d91'],
            ['username' => '2210005', 'name' => 'ZARA AYUNDA', 'password' => '28453a18a73baa10c91b17f6b4ff5889'],
            ['username' => '2110027', 'name' => 'RUCI ARINING TYAS', 'password' => '5eca3cb5511c41eaa466e4c38b5d6698'],
            ['username' => '2210011', 'name' => 'WIDYA SAFITRI', 'password' => 'c8085b102fb75d9c29beb12eea8154ad'],
            ['username' => '2210009', 'name' => 'SRI MULYARNI', 'password' => '9a2b4a68c41c92ada7d01950206606e7'],
            ['username' => '2110052', 'name' => 'RINDIANI', 'password' => '4249ad52288ce0ebf29755270609d256'],
            ['username' => '2110068', 'name' => 'MUHAMMAD HAKIM TASMIZAN', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2410014', 'name' => 'ALDI RAHMAT SAPUTRA', 'password' => 'ca1d17d7222e5a4995ff7ae9f1e89210'],
            ['username' => '2410024', 'name' => 'SURYA', 'password' => '7d21b8feffbe10b948d396acc41c6228'],
            ['username' => '2310014', 'name' => 'GUNTUR LAILAM YURO', 'password' => 'ce2a0027444f59bc2d01f33098b74895'],
            ['username' => '2410012', 'name' => 'ADELFIANTI NEHE', 'password' => 'ae119b40fdc4f250df362ba810679689'],
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