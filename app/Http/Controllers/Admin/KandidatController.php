<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kandidat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class KandidatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/kandidat/index', [
            'kandidats' => Kandidat::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/kandidat/create');
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
            'nomor_bp_presiden' => 'required|string|max:20|unique:kandidats,nomor_bp_presiden',
            'nomor_bp_wakil' => 'required|string|max:20|unique:kandidats,nomor_bp_wakil',
            'prodi_presiden' => 'required|in:SI,MI,SK',
            'prodi_wakil' => 'required|in:SI,MI,SK',
            'foto_presiden' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'foto_wakil' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'visi' => 'required|string',
            'misi' => 'required|string',
            'periode' => 'required|string|max:9'
        ]);

        try {
            DB::beginTransaction();

            $data = $request->except(['foto_presiden', 'foto_wakil']);
            $data['visi'] = explode("\n", $request->visi);
            $data['misi'] = explode("\n", $request->misi);

            // Handle foto presiden
            if ($request->hasFile('foto_presiden')) {
                $foto_presiden = $request->file('foto_presiden');
                $filename = 'presiden_' . time() . '_' . $foto_presiden->getClientOriginalName();
                Storage::disk('public')->makeDirectory('kandidat');
                $path = $foto_presiden->storeAs('kandidat', $filename, 'public');
                $data['foto_presiden'] = $path;
            }

            // Handle foto wakil
            if ($request->hasFile('foto_wakil')) {
                $foto_wakil = $request->file('foto_wakil');
                $filename = 'wakil_' . time() . '_' . $foto_wakil->getClientOriginalName();
                Storage::disk('public')->makeDirectory('kandidat');
                $path = $foto_wakil->storeAs('kandidat', $filename, 'public');
                $data['foto_wakil'] = $path;
            }

            Kandidat::create($data);

            DB::commit();

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Kandidat berhasil ditambahkan',
                    'success' => true
                ]);
            }

            return redirect()->route('kandidat.index')
                ->with('success', 'Kandidat berhasil ditambahkan');

        } catch (\Exception $e) {
            DB::rollBack();
            
            // Hapus file yang sudah diupload jika ada error
            if (isset($data['foto_presiden'])) {
                Storage::disk('public')->delete($data['foto_presiden']);
            }
            if (isset($data['foto_wakil'])) {
                Storage::disk('public')->delete($data['foto_wakil']);
            }

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
                    'success' => false
                ], 500);
            }

            return back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
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
        return Inertia::render('Admin/kandidat/edit', [
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
            'nomor_bp_presiden' => 'required|string|max:20|unique:kandidats,nomor_bp_presiden,' . $kandidat->id,
            'nomor_bp_wakil' => 'required|string|max:20|unique:kandidats,nomor_bp_wakil,' . $kandidat->id,
            'prodi_presiden' => 'required|in:SI,MI,SK',
            'prodi_wakil' => 'required|in:SI,MI,SK',
            'foto_presiden' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'foto_wakil' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'visi' => 'required|string',
            'misi' => 'required|string',
            'periode' => 'required|string|max:9'
        ]);

        try {
            DB::beginTransaction();

            $data = $request->except(['foto_presiden', 'foto_wakil']);
            $data['visi'] = explode("\n", $request->visi);
            $data['misi'] = explode("\n", $request->misi);

            // Handle foto presiden
            if ($request->hasFile('foto_presiden')) {
                // Hapus foto lama
                if ($kandidat->foto_presiden) {
                    Storage::disk('public')->delete($kandidat->foto_presiden);
                }
                
                $foto_presiden = $request->file('foto_presiden');
                $filename = 'presiden_' . time() . '_' . $foto_presiden->getClientOriginalName();
                Storage::disk('public')->makeDirectory('kandidat');
                $path = $foto_presiden->storeAs('kandidat', $filename, 'public');
                $data['foto_presiden'] = $path;
            }

            // Handle foto wakil
            if ($request->hasFile('foto_wakil')) {
                // Hapus foto lama
                if ($kandidat->foto_wakil) {
                    Storage::disk('public')->delete($kandidat->foto_wakil);
                }
                
                $foto_wakil = $request->file('foto_wakil');
                $filename = 'wakil_' . time() . '_' . $foto_wakil->getClientOriginalName();
                Storage::disk('public')->makeDirectory('kandidat');
                $path = $foto_wakil->storeAs('kandidat', $filename, 'public');
                $data['foto_wakil'] = $path;
            }

            $kandidat->update($data);

            DB::commit();

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Kandidat berhasil diperbarui',
                    'success' => true,
                    'redirect' => route('kandidat.index')
                ]);
            }

            return redirect()->route('kandidat.index')
                ->with('success', 'Kandidat berhasil diperbarui');

        } catch (\Exception $e) {
            DB::rollBack();
            
            // Hapus file yang sudah diupload jika ada error
            if (isset($data['foto_presiden'])) {
                Storage::disk('public')->delete($data['foto_presiden']);
            }
            if (isset($data['foto_wakil'])) {
                Storage::disk('public')->delete($data['foto_wakil']);
            }

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Terjadi kesalahan: ' . $e->getMessage(),
                    'success' => false
                ], 500);
            }

            return back()->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
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
