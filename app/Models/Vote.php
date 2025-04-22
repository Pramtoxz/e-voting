<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'nomor_urut',
        'foto_bukti'
    ];

    /**
     * Get the user that owns the vote.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'username', 'username');
    }

    /**
     * Get the kandidat associated with the vote.
     */
    public function kandidat()
    {
        return $this->belongsTo(Kandidat::class, 'nomor_urut', 'nomor_urut');
    }
}
