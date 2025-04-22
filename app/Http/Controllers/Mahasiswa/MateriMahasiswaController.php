<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Materi;
use App\Models\Matakuliah;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class MateriMahasiswaController extends Controller
{
    public function show($kodematakuliah)
    {
        $matakuliah = Matakuliah::where('kodematakuliah', $kodematakuliah)->firstOrFail();
        $materi = Materi::where('kodematakuliah', $kodematakuliah)
            ->paginate(10);

        return Inertia::render('materi', [
            'matakuliah' => $matakuliah,
            'materi' => $materi
        ]);
    }

    public function preview(Materi $materi)
    {
        return Inertia::render('play', [
            'materi' => $materi->load('matakuliah')
        ]);
    }

    public function download(Materi $materi)
    {
        if (!$materi->filemateri) {
            abort(404);
        }
        
        $path = storage_path('app/public/' . $materi->filemateri);
        
        if (!file_exists($path)) {
            abort(404, 'File tidak ditemukan');
        }
        
        return response()->download($path);
    }

    public function view(Materi $materi)
    {
        if (!$materi->filemateri) {
            abort(404);
        }
        
        $path = storage_path('app/public/' . $materi->filemateri);
        
        if (!file_exists($path)) {
            abort(404);
        }

        return response()->file($path);
    }

    public function play(Materi $materi)
    {
        return Inertia::render('play', [
            'materi' => $materi->load('matakuliah')
        ]);
    }
} 