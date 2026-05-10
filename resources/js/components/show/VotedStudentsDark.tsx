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
        const animate = () => { pos += 0.6; if (pos >= el.scrollWidth / 3) pos = 0; el.scrollLeft = pos; animId = requestAnimationFrame(animate); };
        animId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animId);
    }, [students.length]);

    const tripled = [...students, ...students, ...students];

    return (
        <div className="relative">
            <div className="mb-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:text-left">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, #dc262620, #991b1b30)', border: '1px solid rgba(220,38,38,0.2)' }}>
                        <Vote className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white sm:text-2xl">Mahasiswa yang Telah Memilih</h2>
                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500"><Clock className="h-3.5 w-3.5" /><span>Update real-time setiap 5 detik</span></div>
                    </div>
                </div>
                <div className="sm:ml-auto">
                    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.1), rgba(153,27,27,0.15))', border: '1px solid rgba(220,38,38,0.2)' }}>
                        <Users className="h-4 w-4 text-red-400" /><span className="text-lg font-black text-red-400">{students.length}</span><span className="text-xs text-gray-400">suara masuk</span>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16"><div className="flex items-center gap-3 text-gray-500"><div className="h-5 w-5 animate-spin rounded-full border-2 border-red-600 border-t-transparent" /><span className="text-sm font-medium">Memuat data pemilih...</span></div></div>
            ) : students.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16"><Vote className="mb-3 h-10 w-10 text-gray-600" /><p className="text-sm text-gray-500">Belum ada mahasiswa yang memilih</p></div>
            ) : (
                <div ref={scrollRef} className="hide-scrollbar flex overflow-x-hidden" style={{ scrollBehavior: 'auto' }}>
                    <div className="flex gap-8 py-4 sm:gap-10">
                        {tripled.map((student, index) => (
                            <div key={`${student.id}-${index}`} className="flex flex-shrink-0 flex-col items-center gap-2.5">
                                <div className="h-24 w-24 overflow-hidden rounded-full border-3 border-white shadow-lg sm:h-[120px] sm:w-[120px] md:h-[144px] md:w-[144px]">
                                    <img src={getInitialAvatar(student)} alt={student.name} className="h-full w-full object-cover" />
                                </div>
                                <p className="max-w-[120px] truncate text-center text-xs font-semibold text-white sm:max-w-[140px] sm:text-sm md:text-base">{student.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {students.length > 0 && (
                <>
                    <div className="pointer-events-none absolute bottom-0 left-0 top-[60px] w-24 sm:w-36" style={{ background: 'linear-gradient(to right, #0a0a0a, transparent)' }} />
                    <div className="pointer-events-none absolute bottom-0 right-0 top-[60px] w-24 sm:w-36" style={{ background: 'linear-gradient(to left, #0a0a0a, transparent)' }} />
                </>
            )}
        </div>
    );
}
