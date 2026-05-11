<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class SettingController extends Controller
{
    /**
     * Menampilkan halaman pengaturan
     */
    public function index()
    {
        try {
            // Pastikan pengaturan dasar sudah diinisialisasi
            Setting::initializeDefaultSettings();

            // Ambil pengaturan dari database setelah inisialisasi
            $showVotingResults = Setting::getValue('show_voting_results', '0');
            $countdownEndTime = Setting::getValue('countdown_end_time', now()->addDays(1)->toDateTimeString());
            $countdownActive = Setting::getValue('countdown_active', '0');
            $voteActive = Setting::getValue('vote_active', '0');

            return Inertia::render('Admin/Settings', [
                'showVotingResults' => $showVotingResults,
                'countdownEndTime' => $countdownEndTime,
                'countdownActive' => $countdownActive,
                'voteActive' => $voteActive,
            ]);
        } catch (\Exception $e) {
            Log::error('Error saat menampilkan halaman pengaturan: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menampilkan pengaturan.');
        }
    }

    /**
     * Toggle status vote active
     */
    public function toggleVoteActive(Request $request)
    {
        try {
            $current = Setting::getValue('vote_active', '0');
            $newValue = $current === '1' ? '0' : '1';

            Setting::where('key', 'vote_active')->update(['value' => $newValue]);

            $status = $newValue === '1' ? 'dibuka' : 'ditutup';
            return redirect()->route('settings.index')->with('success', "Voting berhasil {$status}.");
        } catch (\Exception $e) {
            Log::error('Error saat toggle vote active: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan saat mengubah status voting.');
        }
    }

    /**
     * Memaksa menampilkan hasil voting
     */
    public function forceShowResults()
    {
        try {
            DB::beginTransaction();

            // Aktifkan tampilan hasil voting
            Setting::where('key', 'show_voting_results')->update(['value' => '1']);

            // Nonaktifkan countdown
            Setting::where('key', 'countdown_active')->update(['value' => '0']);

            DB::commit();

            return redirect()->route('settings.index')->with('success', 'Hasil voting berhasil ditampilkan.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error saat memaksa menampilkan hasil: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan saat mengatur tampilan hasil.');
        }
    }

    /**
     * Mengaktifkan countdown
     */
    public function activateCountdown(Request $request)
    {
        try {
            $validated = $request->validate([
                'countdown_minutes' => 'required|integer|min:1',
            ]);

            $minutes = (int) $validated['countdown_minutes'];

            // Hitung waktu berakhir countdown
            $endTime = now()->addMinutes($minutes)->format('Y-m-d H:i:s');

            DB::beginTransaction();

            // Update pengaturan countdown
            Setting::where('key', 'countdown_end_time')->update(['value' => $endTime]);
            Setting::where('key', 'countdown_active')->update(['value' => '1']);

            // Sembunyikan hasil voting saat countdown aktif
            Setting::where('key', 'show_voting_results')->update(['value' => '0']);

            DB::commit();

            return redirect()->route('settings.index')->with('success', "Countdown berhasil diaktifkan selama {$minutes} menit.");
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error saat mengaktifkan countdown: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Terjadi kesalahan saat mengaktifkan countdown.');
        }
    }
}
