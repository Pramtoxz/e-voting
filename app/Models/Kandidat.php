<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kandidat extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomor_urut',
        'nama_presiden',
        'nama_wakil',
        'nomor_bp_presiden',
        'nomor_bp_wakil',
        'prodi_presiden',
        'prodi_wakil',
        'foto_presiden',
        'foto_wakil',
        'visi',
        'misi',
        'periode'
    ];

    protected $casts = [
        'visi' => 'array',
        'misi' => 'array'
    ];
}
