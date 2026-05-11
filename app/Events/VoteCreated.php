<?php

namespace App\Events;

use App\Models\Vote;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VoteCreated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public array $student;

    /**
     * Membuat event baru dan menyiapkan payload student.
     */
    public function __construct(Vote $vote)
    {
        $vote->loadMissing(['user', 'kandidat']);

        $this->student = [
            'id' => $vote->id,
            'name' => $vote->user->name ?? $vote->username,
            'username' => $vote->username,
            'nomor_urut' => $vote->nomor_urut,
            'foto_bukti' => $vote->foto_bukti,
            'faculty' => 'Mahasiswa',
            'timestamp' => optional($vote->created_at)->format('H:i'),
        ];
    }

    /**
     * Channel publik tempat event ini disiarkan.
     */
    public function broadcastOn(): Channel
    {
        return new Channel('voting');
    }

    /**
     * Nama event di sisi client.
     */
    public function broadcastAs(): string
    {
        return 'vote.created';
    }

    /**
     * Payload yang dikirim ke client.
     */
    public function broadcastWith(): array
    {
        return [
            'student' => $this->student,
        ];
    }
}
