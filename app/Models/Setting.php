<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = ['key', 'value'];

    /**
     * Mendapatkan nilai pengaturan berdasarkan key
     */
    public static function getValue(string $key, $default = null)
    {
        $setting = self::where('key', $key)->first();

        return $setting ? $setting->value : $default;
    }

    /**
     * Menetapkan nilai pengaturan
     */
    public static function setValue(string $key, $value): void
    {
        self::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }

    /**
     * Inisialisasi pengaturan default jika belum ada
     */
    public static function initializeDefaultSettings()
    {
        // Daftar pengaturan default dengan nilai awal
        $defaultSettings = [
            'show_voting_results' => '0',
            'countdown_active' => '0',
            'countdown_end_time' => now()->addHours(1)->format('Y-m-d H:i:s')
        ];

        foreach ($defaultSettings as $key => $value) {
            // Buat hanya jika belum ada
            self::firstOrCreate(['key' => $key], [
                'key' => $key,
                'value' => $value
            ]);
        }
    }
}
