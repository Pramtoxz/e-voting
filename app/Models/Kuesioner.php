<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kuesioner extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'nilai_tampilan',
        'nilai_kemudahan',
        'nilai_keamanan',
        'nilai_kecepatan',
        'nilai_keseluruhan',
        'saran',
        'kesan'
    ];

    /**
     * Get the user that owns the kuesioner.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'username', 'username');
    }
}
