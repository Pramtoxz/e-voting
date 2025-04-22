<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder1 extends Seeder
{
    public function run()
    {
        $mahasiswa = [
            ['username' => '2000335', 'name' => 'DANI MUKHLIS', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2400007', 'name' => 'NADIA TERESA', 'password' => '5b4c12248f5bb1597166598f220e9d06'],
            ['username' => '2300013', 'name' => 'HARISKI SAPUTRA', 'password' => '966d6eb702198d7efe69f4a893c60171'],
            ['username' => '2200012', 'name' => 'FADLI ANSYARI', 'password' => '51b93bdebd2db78879a6831e3e42cc9f'],
            ['username' => '2400008', 'name' => 'NURFADYLLAH', 'password' => '2aedd0c4dce0f5569a69c141e1d41606'],
            ['username' => '2300008', 'name' => 'RINA SILVIA', 'password' => 'c599583569bc8a0d07b5c6d54fb24361'],
            ['username' => '2300006', 'name' => 'Muhamad Yunus', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2400004', 'name' => 'ZAFRAN ALFARRAS', 'password' => '03ade97a67c059828560e72306075333'],
            ['username' => '2200016', 'name' => 'NADIA OKTAVINDA', 'password' => '9fc0d952c565ab2723f440f37b9142a4'],
            ['username' => '2200001', 'name' => 'DINI ULANDARI', 'password' => '8a28baa0fbdf31c7b75097256e58775b'],
            ['username' => '2300009', 'name' => 'ROJI PALENIA PUTRI', 'password' => 'aeecde3b7e65fec0ca77ec420049c9dd'],
            ['username' => '2300005', 'name' => 'Dirgha Caprio Sandes', 'password' => '6ce68ff76a763f82f9d93b7d76f9abe9'],
            ['username' => '2200017', 'name' => 'NESRI YULIARTI MARKIS', 'password' => 'dfbca09d6a657eab80f0e501e39d9605'],
            ['username' => '2300016', 'name' => 'Ratih Syafarti Hotri', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2400014', 'name' => 'ANNISA AFRIOLA', 'password' => 'fa5df0a012e4e1bd6545faf41e1ad3e3'],
            ['username' => '2400006', 'name' => 'SITI SALSA ANJELINA', 'password' => '669da7dc5f43edbcd7920fac3676339c'],
            ['username' => '2400009', 'name' => 'M. VADILAH ICHSAN VERNANDO', 'password' => 'c39cd6b309f96e2325481e61eaeb6031'],
            ['username' => '2200020', 'name' => 'RAHMAT ARDIAN', 'password' => '3b4ca16bdce3270d641da889149cddb4'],
            ['username' => '2300010', 'name' => 'Terik Bakar Buana', 'password' => '8f54b702222536da04701bd4aad06ad8'],
            ['username' => '2200018', 'name' => 'NUR AZIZAH', 'password' => '2f26b70ff673f9c5d77f733836f85e3e'],
            ['username' => '2200008', 'name' => 'DEA AMANDA', 'password' => '9f269428a7f54b29a0e1e7d2874b5cae'],
            ['username' => '2200026', 'name' => 'M. HUSAIN FARRAS', 'password' => '0f190cafcd51f0fb59310bed1c018319'],
            ['username' => '2200023', 'name' => 'HAYATUL FAUZI', 'password' => '99180acde2bc8d1db51df73eed4ac6cb'],
            ['username' => '2200004', 'name' => 'MUHAMMAD ILHAM', 'password' => 'c3d1928ddbc0c3ca3cea6fdb0194eacf'],
            ['username' => '2200011', 'name' => 'DINDA GUSTI KHAIRANI', 'password' => '2940442da4c4e3baa0eaf74858c860c2'],
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