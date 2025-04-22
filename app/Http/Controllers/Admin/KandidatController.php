<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kandidat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class KandidatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Kandidat/Index', [
            'kandidats' => Kandidat::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Kandidat/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nomor_urut' => 'required|string|unique:kandidats,nomor_urut',
            'nama_presiden' => 'required|string|max:255',
            'nama_wakil' => 'required|string|max:255',
            'prodi_presiden' => 'required|in:SI,MI,SK',
            'prodi_wakil' => 'required|in:SI,MI,SK',
            'foto_presiden' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'foto_wakil' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'visi' => 'required|array',
            'misi' => 'required|array',
            'periode' => 'required|string|max:9'
        ]);

        $foto_presiden = $request->file('foto_presiden')->store('public/kandidat');
        $foto_wakil = $request->file('foto_wakil')->store('public/kandidat');

        Kandidat::create([
            'nomor_urut' => $request->nomor_urut,
            'nama_presiden' => $request->nama_presiden,
            'nama_wakil' => $request->nama_wakil,
            'prodi_presiden' => $request->prodi_presiden,
            'prodi_wakil' => $request->prodi_wakil,
            'foto_presiden' => str_replace('public/', '', $foto_presiden),
            'foto_wakil' => str_replace('public/', '', $foto_wakil),
            'visi' => $request->visi,
            'misi' => $request->misi,
            'periode' => $request->periode
        ]);

        return redirect()->route('kandidat.index')
            ->with('message', 'Kandidat berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kandidat $kandidat)
    {
        return Inertia::render('Admin/Kandidat/Edit', [
            'kandidat' => $kandidat
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kandidat $kandidat)
    {
        $request->validate([
            'nomor_urut' => 'required|string|unique:kandidats,nomor_urut,' . $kandidat->id,
            'nama_presiden' => 'required|string|max:255',
            'nama_wakil' => 'required|string|max:255',
            'prodi_presiden' => 'required|in:SI,MI,SK',
            'prodi_wakil' => 'required|in:SI,MI,SK',
            'foto_presiden' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'foto_wakil' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'visi' => 'required|array',
            'misi' => 'required|array',
            'periode' => 'required|string|max:9'
        ]);

        $data = $request->except(['foto_presiden', 'foto_wakil']);

        if ($request->hasFile('foto_presiden')) {
            if ($kandidat->foto_presiden) {
                Storage::delete('public/' . $kandidat->foto_presiden);
            }
            $foto_presiden = $request->file('foto_presiden')->store('public/kandidat');
            $data['foto_presiden'] = str_replace('public/', '', $foto_presiden);
        }

        if ($request->hasFile('foto_wakil')) {
            if ($kandidat->foto_wakil) {
                Storage::delete('public/' . $kandidat->foto_wakil);
            }
            $foto_wakil = $request->file('foto_wakil')->store('public/kandidat');
            $data['foto_wakil'] = str_replace('public/', '', $foto_wakil);
        }

        $kandidat->update($data);

        return redirect()->route('kandidat.index')
            ->with('message', 'Kandidat berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kandidat $kandidat)
    {
        if ($kandidat->foto_presiden) {
            Storage::delete('public/' . $kandidat->foto_presiden);
        }
        if ($kandidat->foto_wakil) {
            Storage::delete('public/' . $kandidat->foto_wakil);
        }

        $kandidat->delete();

        return redirect()->route('kandidat.index')
            ->with('message', 'Kandidat berhasil dihapus');
    }
}
