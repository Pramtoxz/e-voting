<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder7 extends Seeder
{
    public function run()
    {
        $mahasiswa = [
            ['username' => '2210032', 'name' => 'ILHAM SYAHADAT', 'password' => '25d5c81aeaa0892c9f37bd958b10e442'],
            ['username' => '2210026', 'name' => 'FADHIIL AL HABIB', 'password' => '1536c61b60530206daab54a0635e60ad'],
            ['username' => '2110038', 'name' => 'CYNTIA ANGGUN SARI', 'password' => 'e7261bfb3b3ed51224798ccdd29bc365'],
            ['username' => '2110021', 'name' => 'MUHAMMAD RAYHAN', 'password' => '737603d96246dfcf16a69ebddc326318'],
            ['username' => '2010054', 'name' => 'M. FAUZHAN ALFAZHEIN', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2210027', 'name' => 'FAHDIL MARSHA ALROSS', 'password' => 'b0de6ae5a9ef1b08fd578fc10041e5f7'],
            ['username' => '2110007', 'name' => 'DASRI JUNAIDI', 'password' => '3ffda644b1bf12ba11d90be3a250786b'],
            ['username' => '2010023', 'name' => 'MUHAMMAD AZLAN', 'password' => 'cfd248f5b71d1cd3a8fe858f5adf4f89'],
            ['username' => '2210059', 'name' => 'NAZHIRUN MARDHIY', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2310031', 'name' => 'MUHAMAD FADLI ANUGRAH', 'password' => 'df934485d96a1ec7ca05ae558cfec760'],
            ['username' => '2210025', 'name' => 'ERIANTI ZAHARA', 'password' => '414b75cdc0091703b6045f9dce669ba3'],
            ['username' => '2110011', 'name' => 'HASIFA AULYA MELFI', 'password' => '47de5f4f7a38380d1fb1b372a913abfa'],
            ['username' => '2410010', 'name' => 'YUNA AMANDA', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2310006', 'name' => 'Muhammad Fazry', 'password' => '9444c759f4639c81a8948e47338e0ef0'],
            ['username' => '2110067', 'name' => 'PUTRI ALIFIA NOER BALQIS', 'password' => 'baefbb6145d2938b95032d28439982a4'],
            ['username' => '2210057', 'name' => 'IHZA FEBRIAN', 'password' => 'dccf5673d4ccb28f237e9ebde5352fa0'],
            ['username' => '2410007', 'name' => 'NUR AFIKA', 'password' => 'cb6a3985edfc109977f11346fa3e6f37'],
            ['username' => '2110006', 'name' => 'AQIL KHAIRUL FIKRI', 'password' => 'a954b8ecdbb3fbb220734349990152f8'],
            ['username' => '2010066', 'name' => 'WILLY ZIHKRI ASEVONE', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2210045', 'name' => 'SHINTIA AMANDA', 'password' => 'ccb13c993c965e27613a8f25d53107ad'],
            ['username' => '2110058', 'name' => 'JOAN MARSYANDA YORI', 'password' => '932b5c6cb6febcce8ede5034826d7865'],
            ['username' => '2110004', 'name' => 'ANNISA', 'password' => 'b4614e59e4e20fab985a4937ae454851'],
            ['username' => '2310028', 'name' => 'IRSYAD RIVALDO PRATAMA', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2110015', 'name' => 'INDRA SEPTIANTORO', 'password' => '1519d57f55b0e24e7b6ab2d7c5cfb98c'],
            ['username' => '2410013', 'name' => 'AFDAL JUMAIDI', 'password' => '08f69325e5d4093018494a896d31bfb6'],
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