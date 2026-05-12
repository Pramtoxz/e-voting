<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Events\VoteCreated;
use App\Models\Kandidat;
use App\Models\Vote;
use App\Models\User;
use App\Models\Setting;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class VotingController extends Controller
{
    /**
     * Menampilkan halaman voting
     */
    public function index()
    {
        // Cek apakah voting sedang dibuka
        $voteActive = Setting::getValue('vote_active', '0');
        if ($voteActive !== '1') {
            return Inertia::render('Voting/Closed');
        }

        // Cek apakah user sudah melakukan voting
        $hasVoted = Vote::where('username', Auth::user()->username)->exists();

        // Jika sudah voting, redirect ke halaman terima kasih
        if ($hasVoted) {
            return redirect()->route('voting.thanks');
        }

        // Get semua kandidat
        $kandidat = Kandidat::all();

        return Inertia::render('Voting/Index', [
            'kandidat' => $kandidat
        ]);
    }

    /**
     * Menyimpan hasil voting
     */
    public function store(Request $request)
    {
        // Cek apakah voting sedang dibuka
        $voteActive = Setting::getValue('vote_active', '0');
        if ($voteActive !== '1') {
            return redirect()->route('voting.index');
        }

        // Validasi request
        $request->validate([
            'nomor_urut' => 'required|exists:kandidats,nomor_urut',
            'foto_bukti' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Cek apakah user sudah melakukan voting
        $hasVoted = Vote::where('username', Auth::user()->username)->exists();

        if ($hasVoted) {
            return redirect()->route('voting.thanks');
        }

        try {
            DB::beginTransaction();

            // Upload foto bukti
            $fotoBukti = $request->file('foto_bukti');
            $filename = 'bukti_' . time() . '_' . Auth::user()->username . '.' . $fotoBukti->getClientOriginalExtension();

            // Pastikan direktori ada
            Storage::disk('public')->makeDirectory('vote_bukti');

            // Simpan file
            $path = $fotoBukti->storeAs('vote_bukti', $filename, 'public');

            // Simpan data vote
            $vote = Vote::create([
                'username' => Auth::user()->username,
                'nomor_urut' => $request->nomor_urut,
                'foto_bukti' => $path,
            ]);

            DB::commit();

            // Broadcast event ke semua client yang sedang listen channel 'voting'
            broadcast(new VoteCreated($vote))->toOthers();

            return redirect()->route('voting.thanks');
        } catch (\Exception $e) {
            DB::rollBack();

            // Hapus file jika sudah terupload
            if (isset($path)) {
                Storage::disk('public')->delete($path);
            }

            return back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    /**
     * Menampilkan halaman terima kasih setelah voting
     */
    public function thanks()
    {
        // Cek apakah user sudah melakukan voting
        $hasVoted = Vote::where('username', Auth::user()->username)->exists();

        // Jika belum voting, redirect ke halaman voting
        if (!$hasVoted) {
            return redirect()->route('voting.index');
        }

        // Ambil data vote user
        $vote = Vote::where('username', Auth::user()->username)
            ->with('kandidat')
            ->first();

        return Inertia::render('Voting/Thanks', [
            'vote' => $vote
        ]);
    }

    /**
     * Mendapatkan daftar mahasiswa yang telah melakukan voting
     */
    public function getVotedStudents()
    {
        $votes = Vote::with(['user', 'kandidat'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($vote) {
                // Format timestamp (created_at)
                $timestamp = $vote->created_at->format('H:i');

                // Mendapatkan fakultas dari username (contoh: jika format username mengandung kode fakultas)
                // Ini hanya contoh, sesuaikan dengan struktur data yang sebenarnya
                $faculty = "Mahasiswa";

                return [
                    'id' => $vote->id,
                    'name' => $vote->user->name ?? $vote->username,
                    'username' => $vote->username,
                    'nomor_urut' => $vote->nomor_urut,
                    'foto_bukti' => $vote->foto_bukti,
                    'faculty' => $faculty,
                    'timestamp' => $timestamp,
                ];
            });

        return response()->json($votes);
    }
}
