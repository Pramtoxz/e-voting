<?php

namespace App\Http\Controllers;

use App\Models\Session;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $loginHistory = Session::with('user')
            ->whereNotNull('user_id')
            ->orderBy('last_activity', 'desc')
            ->take(5)
            ->get()
            ->map(function ($session) {
                return [
                    'user' => [
                        'name' => $session->user->name,
                        'username' => $session->user->username,
                        'role' => $session->user->role
                    ],
                    'ip_address' => $session->ip_address,
                    'last_activity' => $session->last_activity,
                    'user_agent' => $session->user_agent
                ];
            });

        $loginStats = Session::select(
            DB::raw('DATE(FROM_UNIXTIME(last_activity)) as date'),
            DB::raw('COUNT(DISTINCT user_id) as count')
        )
            ->whereNotNull('user_id')
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->take(7)
            ->get();

        $activeUsers = Session::whereNotNull('user_id')
            ->where('last_activity', '>=', now()->subMinutes(5)->timestamp)
            ->count();

        return Inertia::render('dashboard', [
            'loginHistory' => $loginHistory,
            'loginStats' => $loginStats,
            'totalUsers' => User::count(),
            'activeUsers' => $activeUsers,
        ]);
    }
} 