<?php

namespace App\Events;

use App\Models\Vote;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StudentVoted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public array $student;

    public int $totalVotes;

    public function __construct(Vote $vote, int $totalVotes)
    {
        $vote->loadMissing(['user', 'kandidat']);

        $this->student = [
            'id' => $vote->id,
            'name' => $vote->user->name ?? $vote->username,
            'username' => $vote->username,
            'nomor_urut' => $vote->nomor_urut,
            'foto_bukti' => $vote->foto_bukti,
            'faculty' => 'Mahasiswa',
            'timestamp' => $vote->created_at->format('H:i'),
        ];

        $this->totalVotes = $totalVotes;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('voting'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'student.voted';
    }

    public function broadcastWith(): array
    {
        return [
            'student' => $this->student,
            'totalVotes' => $this->totalVotes,
        ];
    }
}
