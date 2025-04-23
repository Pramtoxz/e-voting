<?php

namespace App\Http\Controllers;

use App\Models\Kandidat;
use App\Models\Setting;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Artisan;

class VotingResultsController extends Controller
{
    public function index()
    {
        // Inisialisasi pengaturan default jika belum ada
        Setting::initializeDefaultSettings();

        // Ambil pengaturan dari database
        $adminShowResults = Setting::getValue('show_voting_results', '0') === '1';
        $countdownActive = Setting::getValue('countdown_active', '0') === '1';
        $countdownEndTime = Setting::getValue('countdown_end_time', null);

        // Periksa status countdown
        $countdownEnd = null;
        $countdownFinished = false;

        if ($countdownEndTime) {
            $countdownEnd = Carbon::parse($countdownEndTime);
            $now = Carbon::now();
            $countdownFinished = $now->greaterThanOrEqualTo($countdownEnd);
        }

        // PENTING: Cek dulu apakah hasil sudah boleh ditampilkan, berdasarkan:
        // 1. Admin sudah mengizinkan (show_voting_results = 1) ATAU
        // 2. Countdown ada dan sudah selesai
        $shouldShowResults = $adminShowResults || ($countdownEndTime && $countdownFinished);

        // Tentukan nilai showResults dan showCountdown
        if ($shouldShowResults) {
            // Jika hasil harus ditampilkan, maka:
            $showResults = true;
            $showCountdown = false;

            // Pastikan pengaturan di database sesuai
            if (!$adminShowResults) {
                Setting::setValue('show_voting_results', '1');
            }

            // Nonaktifkan countdown di database
            if ($countdownActive) {
                Setting::setValue('countdown_active', '0');
            }
        } else {
            // Hasil belum boleh ditampilkan
            $showResults = false;

            // Atur countdown jika belum diatur dan belum ada countdown yang selesai
            if (!$countdownActive && !$countdownEndTime) {
                $countdownEndTime = now()->addMinutes(10)->toDateTimeString();
                Setting::setValue('countdown_end_time', $countdownEndTime);
                Setting::setValue('countdown_active', '1');
                $countdownActive = true;
            }

            // Selalu tampilkan countdown jika hasil belum ditampilkan
            $showCountdown = true;
        }

        // Siapkan data kandidat
        $votes = Vote::select('nomor_urut', DB::raw('count(*) as jumlah_suara'))
            ->groupBy('nomor_urut')
            ->get()
            ->pluck('jumlah_suara', 'nomor_urut')
            ->toArray();

        $totalVotes = array_sum($votes);
        $totalVoters = User::where('role', 'mahasiswa')->count();

        $kandidat = Kandidat::all()->map(function ($item) use ($votes, $totalVotes) {
            $jumlahSuara = $votes[$item->nomor_urut] ?? 0;
            $persentase = $totalVotes > 0 ? round(($jumlahSuara / $totalVotes) * 100, 1) : 0;

            return [
                'id' => $item->id,
                'nomor_urut' => $item->nomor_urut,
                'nama' => $item->nama ?? "{$item->nama_presiden} & {$item->nama_wakil}",
                'nama_presiden' => $item->nama_presiden,
                'nama_wakil' => $item->nama_wakil,
                'foto_presiden' => $item->foto_presiden,
                'foto_wakil' => $item->foto_wakil,
                'jumlah_suara' => $jumlahSuara,
                'persentase' => $persentase,
            ];
        });

        // Urutkan kandidat berdasarkan jumlah suara (terbanyak di atas)
        $kandidat = $kandidat->sortByDesc('jumlah_suara')->values();

        // Format waktu countdown untuk JavaScript (ISO format)
        $formattedCountdownTime = $countdownEndTime ? Carbon::parse($countdownEndTime)->toISOString() : null;

        // Log untuk debugging
        Log::info("Rendering VotingResults page", [
            'showResults' => $showResults,
            'showCountdown' => $showCountdown,
            'countdownEndTime' => $formattedCountdownTime,
            'countdownActive' => $countdownActive,
            'adminShowResults' => $adminShowResults,
            'countdownFinished' => $countdownFinished,
            'shouldShowResults' => $shouldShowResults
        ]);

        // Render halaman dengan data yang sesuai
        return Inertia::render('VotingResults', [
            'kandidat' => $kandidat,
            'totalVotes' => $totalVotes,
            'totalVoters' => $totalVoters,
            'showResults' => $showResults,
            'showCountdown' => $showCountdown,
            'countdownEndTime' => $formattedCountdownTime,
            'adminShowResults' => $adminShowResults
        ]);
    }

    // Endpoint untuk mengecek status countdown dan memperbarui jika perlu
    public function checkCountdown()
    {
        // Ambil status terbaru
        $adminShowResults = Setting::getValue('show_voting_results', '0') === '1';
        $countdownActive = Setting::getValue('countdown_active', '0') === '1';
        $countdownEndTime = Setting::getValue('countdown_end_time');

        // Periksa status countdown
        $isFinished = false;

        if ($countdownEndTime) {
            $countdownEnd = Carbon::parse($countdownEndTime);
            $now = Carbon::now();
            $isFinished = $now->greaterThanOrEqualTo($countdownEnd);
        }

        // PENTING: Cek dulu apakah hasil sudah boleh ditampilkan
        $shouldShowResults = $adminShowResults || ($countdownEndTime && $isFinished);

        // Tentukan nilai showResults dan showCountdown
        if ($shouldShowResults) {
            // Jika hasil harus ditampilkan, maka:
            $showResults = true;
            $showCountdown = false;

            // Pastikan pengaturan di database sesuai
            if (!$adminShowResults) {
                Setting::setValue('show_voting_results', '1');
            }

            // Nonaktifkan countdown di database
            if ($countdownActive) {
                Setting::setValue('countdown_active', '0');
            }
        } else {
            // Hasil belum boleh ditampilkan
            $showResults = false;

            // Atur countdown jika belum diatur dan belum ada countdown yang selesai
            if (!$countdownActive && !$countdownEndTime) {
                $countdownEndTime = now()->addMinutes(10)->toDateTimeString();
                Setting::setValue('countdown_end_time', $countdownEndTime);
                Setting::setValue('countdown_active', '1');
                $countdownActive = true;
            }

            // Selalu tampilkan countdown jika hasil belum ditampilkan
            $showCountdown = true;
        }

        // Log untuk debugging
        Log::info("API checkCountdown response", [
            'showResults' => $showResults,
            'showCountdown' => $showCountdown,
            'countdownActive' => $countdownActive,
            'isFinished' => $isFinished,
            'adminShowResults' => $adminShowResults,
            'shouldShowResults' => $shouldShowResults
        ]);

        return response()->json([
            'status' => 'ok',
            'show_results' => $showResults,
            'show_countdown' => $showCountdown,
            'countdown_active' => $countdownActive,
            'countdown_finished' => $isFinished,
            'now' => Carbon::now()->toISOString(),
            'countdown_end' => $countdownEndTime ? Carbon::parse($countdownEndTime)->toISOString() : null,
            'admin_show_results' => $adminShowResults
        ]);
    }
}
