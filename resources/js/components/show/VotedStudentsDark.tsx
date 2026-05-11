import { VotedStudent } from '@/types/voting';
import { Clock, Users, Vote } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface VotedStudentsDarkProps {
    students: VotedStudent[];
    loading: boolean;
    // prop ini tetap diterima agar tidak breaking, tapi kita pakai getStudentAvatar langsung
    getInitialAvatar: (student: VotedStudent) => string;
}

export default function VotedStudentsDark({ students, loading, getInitialAvatar }: VotedStudentsDarkProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    // Simpan id yang sudah dirender agar tidak duplikat
    const renderedIds = useRef<Set<number>>(new Set());

    // Saat students berubah, append item baru ke track tanpa re-render seluruh list
    useEffect(() => {
        if (!trackRef.current) return;

        students.forEach((student) => {
            if (renderedIds.current.has(student.id)) return;
            renderedIds.current.add(student.id);

            const item = buildItem(student, getInitialAvatar);
            trackRef.current!.appendChild(item);
        });
    }, [students, getInitialAvatar]);

    const shouldScroll = students.length >= 6;
    const duration = Math.max(20, students.length * 3);

    return (
        <div className="relative">
            <style>{`
                @keyframes marquee-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-track {
                    animation: marquee-scroll ${duration}s linear infinite;
                    will-change: transform;
                }
            `}</style>

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
                            <span>Pembaruan realtime otomatis</span>
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
                <div className="overflow-hidden">
                    {/*
                        Track ini TIDAK pernah di-unmount — item baru di-append via DOM langsung.
                        Untuk infinite marquee: track berisi 2 salinan (dikelola via CSS width 200%).
                        Kita pakai translateX(-50%) sebagai endpoint.
                    */}
                    <div
                        ref={trackRef}
                        className={shouldScroll ? 'marquee-track flex gap-5 py-2 sm:gap-6' : 'flex flex-wrap gap-5 py-2 sm:gap-6'}
                        style={shouldScroll ? { width: 'max-content' } : undefined}
                    />
                </div>
            )}

            {/* Fade edges */}
            {students.length > 0 && (
                <>
                    <div
                        className="pointer-events-none absolute top-[52px] bottom-0 left-0 w-16 sm:w-24"
                        style={{ background: 'linear-gradient(to right, rgba(185,28,28,0.95), transparent)' }}
                    />
                    <div
                        className="pointer-events-none absolute top-[52px] right-0 bottom-0 w-16 sm:w-24"
                        style={{ background: 'linear-gradient(to left, rgba(185,28,28,0.95), transparent)' }}
                    />
                </>
            )}
        </div>
    );
}

/** Buat DOM node untuk satu item mahasiswa */
function buildItem(student: VotedStudent, getAvatar: (s: VotedStudent) => string): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-shrink-0 flex-col items-center gap-1.5';

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'h-16 w-16 overflow-hidden rounded-full border-2 border-white/60 shadow-lg sm:h-20 sm:w-20 md:h-24 md:w-24';

    const img = document.createElement('img');
    img.src = getAvatar(student);
    img.alt = student.name;
    img.className = 'h-full w-full object-cover';

    imgWrapper.appendChild(img);

    const label = document.createElement('p');
    label.className = 'max-w-[90px] truncate text-center text-[10px] font-semibold text-white sm:max-w-[110px] sm:text-xs md:text-sm';
    label.textContent = student.name;

    wrapper.appendChild(imgWrapper);
    wrapper.appendChild(label);
    return wrapper;
}
