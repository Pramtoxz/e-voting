<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Vote;
use App\Models\User;
use App\Models\Kandidat;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VoteSeeder extends Seeder
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

        // Ambil semua user yang belum memilih
        $usersWithoutVotes = User::whereNotIn('username', function ($query) {
            $query->select('username')->from('votes');
        })->get();

        if ($usersWithoutVotes->isEmpty()) {
            $this->command->info('Semua user sudah memilih, menghapus data votes yang ada untuk demo.');
            DB::table('votes')->delete();

            // Ambil semua user setelah menghapus votes
            $usersWithoutVotes = User::all();
        }

        // Hanya ambil 50 user atau semua user jika kurang dari 50
        $usersToSeed = $usersWithoutVotes->take(50);
        $faker = Faker::create('id_ID');

        $this->command->info('Membuat data voting untuk ' . $usersToSeed->count() . ' user.');

        foreach ($usersToSeed as $user) {
            // Pilih nomor urut acak
            $selectedNomorUrut = $faker->randomElement($nomorUrut);

            // Nama file foto bukti yang tetap sama
            $fotoFileName = 'vote_bukti/bukti_1745358412_2010036.jpg';

            // Timestmap acak dalam 7 hari terakhir
            $timestamp = $faker->dateTimeBetween('-7 days', 'now');

            Vote::create([
                'username' => $user->username,
                'nomor_urut' => $selectedNomorUrut,
                'foto_bukti' => $fotoFileName,
                'created_at' => $timestamp,
                'updated_at' => $timestamp,
            ]);
        }

        $this->command->info('Seeder votes berhasil dijalankan.');
    }
}
