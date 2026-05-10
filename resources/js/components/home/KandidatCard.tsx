import { Kandidat } from '@/types/voting';
import { gsap } from 'gsap';
import { Crown, Eye, Star } from 'lucide-react';
import { useRef } from 'react';

interface KandidatCardProps {
    kandidat: Kandidat;
    onOpenDialog: (kandidat: Kandidat) => void;
    index?: number;
}

export default function KandidatCard({ kandidat, onOpenDialog, index = 0 }: KandidatCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    const accentColor = index % 2 === 0 ? '#dc2626' : '#f59e0b';
    const accentDark = index % 2 === 0 ? '#991b1b' : '#b45309';

    const handleMouseEnter = () => {
        if (!containerRef.current) return;
        gsap.to(containerRef.current, {
            y: -6,
            duration: 0.4,
            ease: 'power2.out',
        });
        gsap.to(containerRef.current.querySelectorAll('.kandidat-photo'), {
            scale: 1.05,
            duration: 0.6,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = () => {
        if (!containerRef.current) return;
        gsap.to(containerRef.current, {
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
        });
        gsap.to(containerRef.current.querySelectorAll('.kandidat-photo'), {
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
        });
    };

    const handleBtnClick = () => {
        if (btnRef.current) {
            gsap.fromTo(
                btnRef.current,
                { scale: 0.92 },
                { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' },
            );
        }
        onOpenDialog(kandidat);
    };

    return (
        <div
            ref={containerRef}
            className="group relative cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Nomor Urut - top center */}
            <div className="absolute -top-5 left-1/2 z-30 -translate-x-1/2">
                <div
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 text-2xl font-black text-white sm:h-16 sm:w-16 sm:text-3xl"
                    style={{
                        background: `linear-gradient(135deg, ${accentColor} 0%, ${accentDark} 100%)`,
                        borderColor: `${accentColor}60`,
                        boxShadow: `0 0 20px ${accentColor}50, 0 6px 24px rgba(0,0,0,0.5)`,
                    }}
                >
                    {kandidat.nomor_urut}
                </div>
            </div>

            {/* Photos area - two photos side by side, no card wrapper */}
            <div className="relative mt-3 overflow-hidden rounded-t-2xl">
                <div className="relative grid grid-cols-2">
                    {/* President Photo */}
                    <div className="relative overflow-hidden">
                        <div className="relative aspect-[3/4]">
                            <img
                                src={`/storage/${kandidat.foto_presiden}`}
                                alt={kandidat.nama_presiden}
                                className="kandidat-photo h-full w-full object-cover"
                            />
                            {/* Cinematic gradient overlay */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(to top, #0a0a0a 0%, rgba(10,5,5,0.5) 35%, rgba(10,5,5,0.1) 60%, ${accentColor}08 100%)`,
                                }}
                            />
                            {/* Halftone texture */}
                            <div
                                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, #fff 0.5px, transparent 0.5px)',
                                    backgroundSize: '4px 4px',
                                }}
                            />
                            {/* Role label */}
                            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
                                <Crown className="h-3.5 w-3.5" style={{ color: accentColor }} />
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest"
                                    style={{ color: accentColor }}
                                >
                                    Presiden
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Center energy line */}
                    <div className="absolute top-0 bottom-0 left-1/2 z-10 -translate-x-1/2">
                        <div
                            className="h-full w-[2px]"
                            style={{
                                background: `linear-gradient(to bottom, transparent 5%, ${accentColor}60 20%, ${accentColor} 50%, ${accentColor}60 80%, transparent 95%)`,
                                boxShadow: `0 0 10px ${accentColor}40`,
                            }}
                        />
                    </div>

                    {/* Vice President Photo */}
                    <div className="relative overflow-hidden">
                        <div className="relative aspect-[3/4]">
                            <img
                                src={`/storage/${kandidat.foto_wakil}`}
                                alt={kandidat.nama_wakil}
                                className="kandidat-photo h-full w-full object-cover"
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(to top, #0a0a0a 0%, rgba(10,5,5,0.5) 35%, rgba(10,5,5,0.1) 60%, ${accentColor}08 100%)`,
                                }}
                            />
                            <div
                                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, #fff 0.5px, transparent 0.5px)',
                                    backgroundSize: '4px 4px',
                                }}
                            />
                            <div className="absolute right-3 bottom-3 z-10 flex items-center gap-1.5">
                                <Star className="h-3.5 w-3.5" style={{ color: accentColor }} />
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest"
                                    style={{ color: accentColor }}
                                >
                                    Wakil
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom accent line */}
                <div
                    className="absolute right-0 bottom-0 left-0 h-[2px]"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                        boxShadow: `0 0 12px ${accentColor}50`,
                    }}
                />
            </div>

            {/* Info area - overlapping with photos bottom, no card */}
            <div
                className="relative rounded-b-2xl px-5 pb-5 pt-4 sm:px-6 sm:pb-6"
                style={{
                    background: 'linear-gradient(180deg, #0a0a0a 0%, rgba(15,5,5,0.95) 100%)',
                }}
            >
                {/* Subtle diagonal pattern */}
                <div
                    className="absolute inset-0 rounded-b-2xl opacity-[0.015]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(45deg, ${accentColor} 0px, ${accentColor} 1px, transparent 1px, transparent 12px)`,
                    }}
                />

                <div className="relative">
                    {/* Names row - president and VP side by side matching photos */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* President name */}
                        <div className="text-center">
                            <h3
                                className="text-base font-black uppercase leading-tight tracking-wide text-white sm:text-lg md:text-xl"
                                style={{ textShadow: `0 0 15px ${accentColor}25` }}
                            >
                                {kandidat.nama_presiden}
                            </h3>
                            <p className="mt-1 text-[10px] tracking-wider text-gray-500 sm:text-xs">
                                {kandidat.nomor_bp_presiden}
                            </p>
                        </div>
                        {/* VP name */}
                        <div className="text-center">
                            <h4
                                className="text-base font-bold leading-tight tracking-wide text-gray-300 sm:text-lg md:text-xl"
                                style={{ textShadow: `0 0 12px ${accentColor}15` }}
                            >
                                {kandidat.nama_wakil}
                            </h4>
                            <p className="mt-1 text-[10px] tracking-wider text-gray-500 sm:text-xs">
                                {kandidat.nomor_bp_wakil}
                            </p>
                        </div>
                    </div>

                    {/* Accent divider */}
                    <div className="my-4 flex items-center gap-3">
                        <div
                            className="h-[1px] flex-1"
                            style={{ background: `linear-gradient(to right, transparent, ${accentColor}30)` }}
                        />
                        <div
                            className="h-1.5 w-1.5 rotate-45"
                            style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
                        />
                        <div
                            className="h-[1px] flex-1"
                            style={{ background: `linear-gradient(to left, transparent, ${accentColor}30)` }}
                        />
                    </div>

                    {/* CTA Button */}
                    <button
                        ref={btnRef}
                        onClick={handleBtnClick}
                        className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 sm:py-3.5 sm:text-base"
                        style={{
                            background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentDark}30 100%)`,
                            border: `1px solid ${accentColor}30`,
                        }}
                    >
                        {/* Hover fill */}
                        <div
                            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{
                                background: `linear-gradient(135deg, ${accentColor} 0%, ${accentDark} 100%)`,
                            }}
                        />
                        <Eye className="relative h-4 w-4" />
                        <span className="relative">Visi & Misi</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
