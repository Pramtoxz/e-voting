<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vote;
use App\Models\User;
use App\Models\Kandidat;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class VotingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan ada data kandidat
        $kandidatCount = Kandidat::count();
        if ($kandidatCount == 0) {
            $this->command->error('Tidak ada data kandidat. Jalankan KandidatSeeder terlebih dahulu.');
            return;
        }

        // Ambil semua nomor urut kandidat yang tersedia
        $nomorUrut = Kandidat::pluck('nomor_urut')->toArray();

        // Ambil username dari mahasiswa di MahasiswaSeeder1, MahasiswaSeeder2, dan MahasiswaSeeder3
        $mahasiswaUsernames = [
            // MahasiswaSeeder1
            '2000335', '2400007', '2300013', '2200012', '2400008',
            '2300008', '2300006', '2400004', '2200016', '2200001',
            '2300009', '2300005', '2200017', '2300016', '2400014',
            '2400006', '2400009', '2200020', '2300010', '2200018',
            '2200008', '2200026', '2200023', '2200004', '2200011',
            
            // MahasiswaSeeder2
            '2300011', '2200021', '2200002', '2300003', '2000341',
            '2200007', '2200019', '2400002', '2300002', '2300014',
            '2300004', '2000301', '2400005', '2300007', '2200014',
            '2400010', '2200003', '2300012', '2200006', '2200022',
            '2300015', '2400016', '2400001', '2400013', '2000338',
            
            // MahasiswaSeeder3
            '2200013', '2200010', '2410021', '2310027', '2410004',
            '2310002', '2310036', '2310033', '2210028', '2110036',
            '2110054', '2110022', '2410003', '2410002', '1910031',
            '2310023', '2110012', '2410033', '2410025', '2210018',
            '2010047', '2010004', '2110046', '2110016', '2310009'
        ];

        // Hapus data voting yang sudah ada untuk mahasiswa tersebut
        Vote::whereIn('username', $mahasiswaUsernames)->delete();

        $faker = Faker::create('id_ID');
        $this->command->info('Membuat data voting untuk ' . count($mahasiswaUsernames) . ' mahasiswa dari MahasiswaSeeder1, MahasiswaSeeder2, dan MahasiswaSeeder3.');

        foreach ($mahasiswaUsernames as $username) {
            // Pilih nomor urut acak
            $selectedNomorUrut = $faker->randomElement($nomorUrut);

            // Nama file foto bukti yang tetap sama
            $fotoFileName = 'vote_bukti/bukti_default.jpg';

            // Timestamp acak dalam 7 hari terakhir
            $timestamp = $faker->dateTimeBetween('-7 days', 'now');

            Vote::create([
                'username' => $username,
                'nomor_urut' => $selectedNomorUrut,
                'foto_bukti' => $fotoFileName,
                'created_at' => $timestamp,
                'updated_at' => $timestamp,
            ]);
        }

        $this->command->info('Seeder votes untuk mahasiswa dari MahasiswaSeeder1, MahasiswaSeeder2, dan MahasiswaSeeder3 berhasil dijalankan.');
    }
}
