import { VotedStudent } from '@/types/voting';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

// Jeda antar tampilan mahasiswa baru (ms)
const DEQUEUE_INTERVAL = 5000;

interface ToastItem {
    id: number;
    name: string;
}

export function useVotedStudents() {
    const [votedStudents, setVotedStudents] = useState<VotedStudent[]>([]);
    const [loading, setLoading] = useState(true);
    const [toastQueue, setToastQueue] = useState<ToastItem[]>([]);

    // Antrian mahasiswa baru yang belum ditampilkan
    const queueRef = useRef<VotedStudent[]>([]);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startDequeue = () => {
        if (timerRef.current) return;
        timerRef.current = setInterval(() => {
            if (queueRef.current.length === 0) {
                clearInterval(timerRef.current!);
                timerRef.current = null;
                return;
            }
            const next = queueRef.current.shift()!;

            // Tambah ke list mahasiswa
            setVotedStudents((prev) => {
                if (prev.some((s) => s.id === next.id)) return prev;
                return [next, ...prev];
            });

            // Tambah toast notifikasi
            setToastQueue((prev) => [...prev, { id: next.id, name: next.name }]);
        }, DEQUEUE_INTERVAL);
    };

    const dismissToast = (id: number) => {
        setToastQueue((prev) => prev.filter((t) => t.id !== id));
    };

    // Initial fetch — langsung tampilkan semua data existing tanpa antri
    useEffect(() => {
        let cancelled = false;
        axios
            .get<VotedStudent[]>('/voted-students')
            .then((res) => {
                if (!cancelled) setVotedStudents(res.data);
            })
            .catch((err) => console.error('Error fetching voted students:', err))
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    // Realtime subscription via Laravel Reverb
    useEffect(() => {
        const echo = window.Echo;
        if (!echo) return;

        const channel = echo.channel('voting');

        channel.listen('.vote.created', (payload: { student: VotedStudent }) => {
            if (!payload?.student) return;
            queueRef.current.push(payload.student);
            startDequeue();
        });

        return () => {
            channel.stopListening('.vote.created');
            echo.leave('voting');
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { votedStudents, loading, toastQueue, dismissToast };
}
