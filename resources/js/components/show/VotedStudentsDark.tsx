import { VotedStudent } from '@/types/voting';
import { Clock, Users, Vote } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface VotedStudentsDarkProps {
    students: VotedStudent[];
    loading: boolean;
    getInitialAvatar: (student: VotedStudent) => string;
}

export default function VotedStudentsDark({ students, loading, getInitialAvatar }: VotedStudentsDarkProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollRef.current || students.length === 0) return;
        const el = scrollRef.current;
        let animId: number, pos = 0;
        const animate = () => {
            pos += 0.6;
            if (pos >= el.scrollWidth / 3) pos = 0;
            el.scrollLeft = pos;
            animId = requestAnimationFrame(animate);
        };
        animId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animId);
    }, [students.length]);

    const tripled = [...students, ...students, ...students];

    return (
        <div className="relative">
            {/* Header */}
            <div className="mb-3 flex flex-col items-center gap-3 text-center sm:flex-row sm:items-end sm:text-left">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-white/20">
                        <Vote className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-white sm:text-lg">Mahasiswa yang Telah Memilih</h2>
                        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-red-100">
                            <Clock className="h-3 w-3" />
                            <span>Update real-time setiap 5 detik</span>
                        </div>
                    </div>
                </div>
                <div className="sm:ml-auto">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1">
                        <Users className="h-3.5 w-3.5 text-white" />
                        <span className="text-base font-black text-white">{students.length}</span>
                        <span className="text-[11px] text-red-100">suara</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center py-16">
                    <div className="flex items-center gap-3 text-white/70">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span className="text-sm font-medium">Memuat data pemilih...</span>
                    </div>
                </div>
            ) : students.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <Vote className="mb-3 h-10 w-10 text-white/40" />
                    <p className="text-sm text-white/60">Belum ada mahasiswa yang memilih</p>
                </div>
            ) : (
                <div ref={scrollRef} className="hide-scrollbar flex overflow-x-hidden" style={{ scrollBehavior: 'auto' }}>
                    <div className="flex gap-5 py-2 sm:gap-6">
                        {tripled.map((student, index) => (
                            <div key={`${student.id}-${index}`} className="flex flex-shrink-0 flex-col items-center gap-1.5">
                                <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white/60 shadow-lg sm:h-20 sm:w-20 md:h-24 md:w-24">
                                    <img
                                        src={getInitialAvatar(student)}
                                        alt={student.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <p className="max-w-[90px] truncate text-center text-[10px] font-semibold text-white sm:max-w-[110px] sm:text-xs md:text-sm">
                                    {student.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Fade edges — pakai warna merah sesuai background */}
            {students.length > 0 && (
                <>
                    <div
                        className="pointer-events-none absolute bottom-0 left-0 top-[52px] w-16 sm:w-24"
                        style={{ background: 'linear-gradient(to right, rgba(185,28,28,0.95), transparent)' }}
                    />
                    <div
                        className="pointer-events-none absolute bottom-0 right-0 top-[52px] w-16 sm:w-24"
                        style={{ background: 'linear-gradient(to left, rgba(185,28,28,0.95), transparent)' }}
                    />
                </>
            )}
        </div>
    );
}
