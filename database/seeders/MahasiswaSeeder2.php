<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder2 extends Seeder
{
    public function run()
    {
        $mahasiswa = [
            ['username' => '2300011', 'name' => 'Yogi Vebrival', 'password' => 'd4ad384f5c88055af4cc82af139b13ab'],
            ['username' => '2200021', 'name' => 'RIZQA RAHMAYANI', 'password' => 'cb7ef6ef062f68d8a15a856ccbecde60'],
            ['username' => '2200002', 'name' => 'AZIZ HUSEIN', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2300003', 'name' => 'ANNISA PUTRI ARRAHMAH', 'password' => '924349411b43ed9d89abc77320a14932'],
            ['username' => '2000341', 'name' => 'RIO', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2200007', 'name' => 'DARA AYU NINGSIH', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2200019', 'name' => 'NURUL SABINA PUTRI', 'password' => 'db8a8fd43e6f68cf91cd5213fbfc763c'],
            ['username' => '2400002', 'name' => 'RIDHO MAULANA AULIA PUTRA', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2300002', 'name' => 'AISYAH NURUL ISLAMI', 'password' => 'ff55e12c1a998023c70954f1cbf9980d'],
            ['username' => '2300014', 'name' => 'Ahmad Adzan', 'password' => 'a88559854f6aae9fe10cd12d0527bdb6'],
            ['username' => '2300004', 'name' => 'Dian Putri Melati', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2000301', 'name' => 'MUHAMMAD RIZKY', 'password' => '05c199853604799e63726ff63e232419'],
            ['username' => '2400005', 'name' => 'SAHIFATUL WAHI', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2300007', 'name' => 'Nadiah Yusriani Putri', 'password' => 'e2dafd3ea50941ab67cfae9d240f5f4f'],
            ['username' => '2200014', 'name' => 'HALIMAH TUSHADIYAH', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2400010', 'name' => 'BINTANG HABIB SALIKIN', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2200003', 'name' => 'CANTIKA', 'password' => 'e50331a8454698e8bcc9299e32e8c9f8'],
            ['username' => '2300012', 'name' => 'APRILIO HENDRI', 'password' => '6e99241f20f64ce441c600646ee49223'],
            ['username' => '2200006', 'name' => 'BERLIANA', 'password' => '3a7b9f60936cc164d55015020b90032a'],
            ['username' => '2200022', 'name' => 'SAMUDRA ALFATIH', 'password' => '9903f920b13c5cc657e81f44e4110875'],
            ['username' => '2300015', 'name' => 'NATASYA SALSABILLA', 'password' => 'be07fa26de3bda18691650fcd389b5ad'],
            ['username' => '2400016', 'name' => 'DIKI RIANTO', 'password' => '9edb0b21688a4d0b0e0ebfcb3bd1d712'],
            ['username' => '2400001', 'name' => 'ADELIA MURTI PUTRI', 'password' => 'ed57696c4b15605b348708abd385024f'],
            ['username' => '2400013', 'name' => 'TAUFIK READLI', 'password' => '04024f7418e4cc44dfcec2c558afe58e'],
            ['username' => '2000338', 'name' => 'FATHI ABDUL KARIM', 'password' => 'b76cee55a773d0088f2183593c19f614'],
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