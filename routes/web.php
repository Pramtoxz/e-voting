<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Http\Controllers\VotingController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\KandidatController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\VotingResultsController;
use App\Http\Controllers\Admin\SettingController;
// Redirect root ke login
Route::get('/', function () {
    return Redirect::route('login');
});

// Public Routes
Route::get('/voting-results', [VotingResultsController::class, 'index'])->name('voting.results');
Route::get('/api/check-countdown', [VotingResultsController::class, 'checkCountdown'])->name('api.check-countdown');

// Route untuk pengguna yang sudah login
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard untuk admin
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->middleware('admin')
        ->name('dashboard');

    // Route untuk semua user
    Route::get('home', [HomeController::class, 'index'])->name('home');

    // Route untuk voting
    Route::get('voting', [VotingController::class, 'index'])->name('voting.index');
    Route::post('voting', [VotingController::class, 'store'])->name('voting.store');
    Route::get('voting/thanks', [VotingController::class, 'thanks'])->name('voting.thanks');

    // Route untuk hasil voting (dapat diakses oleh semua pengguna)
    Route::get('voting/results', [VotingResultsController::class, 'index'])->name('voting.results');

    // Route untuk menampilkan data mahasiswa yang telah voting
    Route::get('/voted-students', [VotingController::class, 'getVotedStudents'])->name('voting.students');

    // Route untuk admin
    Route::middleware(['admin'])->group(function () {
        Route::resource('user', UserController::class);
        Route::resource('kandidat', KandidatController::class)->except(['show']);
        Route::get('/settings/results', [SettingController::class, 'index'])->name('settings.index');
        Route::post('/settings/results', [SettingController::class, 'update'])->name('settings.update');
        Route::post('/settings/force-show-results', [SettingController::class, 'forceShowResults'])->name('settings.force-show');
        Route::post('/settings/activate-countdown', [SettingController::class, 'activateCountdown'])->name('settings.activate-countdown');
    });
});

// Admin Routes
// Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
//     // Settings
//     Route::get('/settings', [App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
//     Route::post('/settings', [App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
// });

// Include file route lainnya
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
