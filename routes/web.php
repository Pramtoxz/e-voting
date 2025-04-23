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
use App\Http\Controllers\KuesionerController;

// Redirect root ke login
Route::get('/', function () {
    return Redirect::route('login');
});

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

    // Route untuk menampilkan data mahasiswa yang telah voting
    Route::get('/voted-students', [VotingController::class, 'getVotedStudents'])->name('voting.students');

    // Route untuk kuesioner
    Route::get('kuesioner', [KuesionerController::class, 'index'])->name('kuesioner.index');
    Route::post('kuesioner', [KuesionerController::class, 'store'])->name('kuesioner.store');

    // Route untuk admin
    Route::middleware(['admin'])->group(function () {
        Route::resource('user', UserController::class);
        Route::resource('kandidat', KandidatController::class)->except(['show']);
    });
});


// Include file route lainnya
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
