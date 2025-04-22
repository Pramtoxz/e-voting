<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home');
    }

    public function kandidatDetail($id)
    {
        $kandidat = [
            'id' => $id,
            'nama' => "Kandidat {$id}",
            'fakultas' => 'Fakultas Ilmu Komputer',
            'visi' => 'Mewujudkan kampus yang lebih baik, inovatif, dan berprestasi untuk semua mahasiswa.',
            'misi' => [
                'Meningkatkan kualitas fasilitas kampus',
                'Mengembangkan program beasiswa untuk mahasiswa berprestasi',
                'Memperkuat hubungan antara kampus dan industri',
                'Mendorong kegiatan penelitian dan pengembangan',
            ],
        ];

        return Inertia::render('KandidatDetail', [
            'kandidat' => $kandidat,
        ]);
    }

    public function voting()
    {
        return Inertia::render('Voting');
    }
}
