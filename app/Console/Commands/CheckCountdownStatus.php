<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CheckCountdownStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'countdown:check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check countdown status and update settings if time is up';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Checking countdown status...');

        // Ambil pengaturan countdown
        $countdownActive = Setting::getValue('countdown_active', '0');
        $countdownEndTime = Setting::getValue('countdown_end_time');

        // Debug output
        $this->info('Countdown active: ' . $countdownActive);
        $this->info('Countdown end time: ' . ($countdownEndTime ?? 'not set'));

        // Jika countdown tidak aktif, tidak perlu melakukan apapun
        if ($countdownActive !== '1' || !$countdownEndTime) {
            $this->info('Countdown is not active. Nothing to do.');
            return 0;
        }

        // Periksa apakah waktu countdown sudah habis
        $countdownEnd = Carbon::parse($countdownEndTime);
        $now = Carbon::now();

        $this->info("Current time: {$now->toDateTimeString()}");
        $this->info("Countdown end: {$countdownEnd->toDateTimeString()}");
        $this->info("Difference in seconds: " . $now->diffInSeconds($countdownEnd, false));

        if ($now->greaterThanOrEqualTo($countdownEnd)) {
            $this->info('Countdown has ended. Updating settings...');

            try {
                // Update pengaturan menggunakan model Setting
                Setting::setValue('countdown_active', '0');
                Setting::setValue('show_voting_results', '1');

                Log::info('Countdown status updated by command', [
                    'countdown_active' => '0',
                    'show_voting_results' => '1',
                    'time' => now()->toDateTimeString()
                ]);

                $this->info('Settings updated successfully!');
            } catch (\Exception $e) {
                $this->error('Failed to update settings: ' . $e->getMessage());
                Log::error('Failed to update countdown settings by command: ' . $e->getMessage());
                return 1;
            }
        } else {
            $this->info('Countdown is still active.');

            // Kalkulasi sisa waktu
            $remainingMinutes = $now->diffInMinutes($countdownEnd);
            $this->info("Remaining time: {$remainingMinutes} minutes");
        }

        return 0;
    }
}
