<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder8 extends Seeder
{
    public function run()
    {
        $mahasiswa = [
            ['username' => '2410040', 'name' => 'MEGA HANUM', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2210019', 'name' => 'ATTAYA FIQRI PRADANA', 'password' => 'eb3bb855358d544aa65de28a4d396af2'],
            ['username' => '2410016', 'name' => 'FAWZIAH PUTRI ZAHARA', 'password' => 'eb17d346bd28bc46dcc7b885f296ad89'],
            ['username' => '2410034', 'name' => 'MIA LAVENIA', 'password' => 'bf2a94877948171dce0e7b135c4d7385'],
            ['username' => '2210001', 'name' => 'CHIKA FEBRIA KANZA', 'password' => 'eefefb61b46889eeb08c1ea8d6aaf2d1'],
            ['username' => '2110005', 'name' => 'ANNISA OKTAVIANI', 'password' => 'e0d65e5e31305de341e36cf6a95466f2'],
            ['username' => '2110013', 'name' => 'IKHSAN MILYADI', 'password' => '0afc14fb09e0c2ac84e76c8706ea5d54'],
            ['username' => '2110055', 'name' => 'TOMI JUN HARTO HALAWA', 'password' => '875a3cc6badc3e7b7311485acd2b6a42'],
            ['username' => '2110024', 'name' => 'RESLINA DARMANSYAH', 'password' => '1c61726518bdcb19c9551e2ab0cc65f2'],
            ['username' => '2110065', 'name' => 'NUTHQAN FARID MASZILHAQ', 'password' => '03c2abbe325811eb745827e17488ae86'],
            ['username' => '2110050', 'name' => 'RESTYA ANANDA', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2410026', 'name' => 'RESI AULIA PUTRI', 'password' => 'd7bf1beb1bb74125a6a94cfc73cfc04b'],
            ['username' => '2310008', 'name' => 'RISKA ILMANDA', 'password' => '7fabf8cd9f32a083a20d5658a3f04042'],
            ['username' => '2310016', 'name' => 'KATON BAGAS TRI ERYO', 'password' => '67a9e209dbaea66cf9fd85cb6df29793'],
            ['username' => '2110001', 'name' => 'AGIL ALFISYAHRI', 'password' => '03a3c07a32357ddde5e8545ed428c14a'],
            ['username' => '2310007', 'name' => 'NADYA FITRI WARDANI', 'password' => 'a72b5a0da77f561a5e11f2bc90da0506'],
            ['username' => '2210036', 'name' => 'MUHAMMAD IHSAN', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2110017', 'name' => 'MUHAMMAD ADAM RIDWAN', 'password' => 'f8a8912b2588c26416af8455aeded342'],
            ['username' => '2210024', 'name' => 'ENGELA MAYOFANI', 'password' => 'e99cd160994dec8c588b2089e088f70d'],
            ['username' => '2410039', 'name' => 'OCTOBARKAH MAULANA AGUS', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2110043', 'name' => 'HANIF SALMIZAH RAFI', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2110040', 'name' => 'FAJRI DWIPUTRA YUSDITIO', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2220007', 'name' => 'KAHLIL GIBRAN CHANIAGO', 'password' => 'f90b34606af913edf5ce40bb396bd5e5'],
            ['username' => '2120002', 'name' => 'ANANDA RADILA', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2120015', 'name' => 'MUTH MAINAH', 'password' => '5bf01fd48d198c93d543667092bf2ee4'],
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