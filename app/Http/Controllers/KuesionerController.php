<?php

namespace App\Http\Controllers;

use App\Models\Kuesioner;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KuesionerController extends Controller
{
    /**
     * Display the kuesioner form.
     */
    public function index()
    {
        // Check if user has already filled the form
        $user = Auth::user();
        $kuesioner = Kuesioner::where('username', $user->username)->first();
        
        return Inertia::render('Kuesioner', [
            'hasSubmitted' => $kuesioner ? true : false,
            'kuesioner' => $kuesioner
        ]);
    }

    /**
     * Store a new kuesioner response.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nilai_tampilan' => 'required|integer|min:1|max:5',
            'nilai_kemudahan' => 'required|integer|min:1|max:5',
            'nilai_keamanan' => 'required|integer|min:1|max:5',
            'nilai_kecepatan' => 'required|integer|min:1|max:5',
            'nilai_keseluruhan' => 'required|integer|min:1|max:5',
            'saran' => 'nullable|string|max:500',
            'kesan' => 'nullable|string|max:500',
        ]);

        // Check if user has already submitted
        $user = Auth::user();
        $existingKuesioner = Kuesioner::where('username', $user->username)->first();
        
        if ($existingKuesioner) {
            return redirect()->back()->with('error', 'Anda sudah mengisi kuesioner sebelumnya.');
        }

        // Create new kuesioner
        Kuesioner::create([
            'username' => $user->username,
            'nilai_tampilan' => $request->nilai_tampilan,
            'nilai_kemudahan' => $request->nilai_kemudahan,
            'nilai_keamanan' => $request->nilai_keamanan,
            'nilai_kecepatan' => $request->nilai_kecepatan,
            'nilai_keseluruhan' => $request->nilai_keseluruhan,
            'saran' => $request->saran,
            'kesan' => $request->kesan,
        ]);

        return redirect()->back()->with('success', 'Terima kasih telah mengisi kuesioner!');
    }
}
