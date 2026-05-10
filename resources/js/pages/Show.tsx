import DitoImage from '@/assets/dito.jpg';
import EpicBg from '@/assets/epic_bg.png';
import RafiImage from '@/assets/rafi.jpg';
import KandidatCard from '@/components/home/KandidatCard';
import { VisiMisiDialog } from '@/components/home';
import VotedStudentsDark from '@/components/show/VotedStudentsDark';
import { useVotedStudents } from '@/hooks/useVotedStudents';
import { Kandidat, VotedStudent } from '@/types/voting';
import { getStudentAvatar } from '@/utils/avatar';
import { getPemiraYear } from '@/utils/date';
import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { Code2, Github, Instagram, Mail, Quote, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const MOTIVATIONAL_QUOTES = [
    { text: 'Suaramu adalah kekuatanmu. Gunakan dengan bijak.', author: 'Anonim' },
    { text: 'Perubahan tidak akan datang jika kita menunggu orang lain. Kita adalah orang yang kita tunggu.', author: 'Barack Obama' },
    { text: 'Jangan biarkan suara pendapat orang lain menenggelamkan suara hatimu sendiri.', author: 'Steve Jobs' },
];

const DEVELOPERS = [
    {
        name: 'Rafi Chandra', role: 'Full Stack Developer', image: RafiImage,
        bio: 'Passionate about creating elegant solutions',
        social: { github: 'https://github.com/chandra_rafi', instagram: 'https://instagram.com/chandra_rafi', email: 'rafi@jayanusa.ac.id' },
    },
    {
        name: 'Pramudito Metra', role: 'Full Stack Developer', image: DitoImage,
        bio: 'Building innovative web applications',
        social: { github: 'https://github.com/pramuditometra', instagram: 'https://instagram.com/pramuditometra', email: 'dito@jayanusa.ac.id' },
    },
];

// Interval: 5 detik untuk testing, ubah ke 5 * 60 * 1000 untuk produksi (5 menit)
const AD_INTERVAL = 20 * 1000;
const AD_DISPLAY_DURATION = 5000; // popup tampil selama 4 detik

// Total ad slides: 1 developer slide (combined) + quotes
const TOTAL_ADS = 1 + MOTIVATIONAL_QUOTES.length;

interface Props { kandidat: Kandidat[]; }

export default function Show({ kandidat }: Props) {
    const pemiraYear = getPemiraYear();
    const { votedStudents, loading } = useVotedStudents();
    const [selectedKandidat, setSelectedKandidat] = useState<Kandidat | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [adIndex, setAdIndex] = useState(0);
    const [adVisible, setAdVisible] = useState(false);

    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const vsRef = useRef<HTMLDivElement>(null);
    const votersRef = useRef<HTMLDivElement>(null);
    const speedLinesRef = useRef<HTMLDivElement>(null);
    const orbsRef = useRef<HTMLDivElement>(null);

    const openDialog = useCallback((calon: Kandidat) => {
        setSelectedKandidat(calon);
        setTimeout(() => { setShowDialog(true); setIsClosing(false); }, 50);
    }, []);

    const closeDialog = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => { setShowDialog(false); setIsClosing(false); }, 400);
    }, []);

    // Ad overlay rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setAdVisible(true);
            setTimeout(() => {
                setAdVisible(false);
                setTimeout(() => setAdIndex((p) => (p + 1) % TOTAL_ADS), 500);
            }, AD_DISPLAY_DURATION);
        }, AD_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    // GSAP animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (speedLinesRef.current) {
                gsap.to(speedLinesRef.current, { rotation: 360, duration: 80, repeat: -1, ease: 'none' });
            }
            if (titleRef.current) {
                gsap.from(titleRef.current, { scale: 2.5, autoAlpha: 0, duration: 1, ease: 'power4.out' });
            }
            if (vsRef.current) {
                gsap.fromTo(vsRef.current, { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.8, delay: 0.6, ease: 'elastic.out(1, 0.5)' });
                gsap.to(vsRef.current, { scale: 1.08, duration: 1, repeat: -1, yoyo: true, delay: 1.4, ease: 'sine.inOut' });
            }
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(card, { x: i % 2 === 0 ? -150 : 150, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, duration: 0.9, delay: 0.3 + i * 0.15, ease: 'power3.out' });
            });
            if (votersRef.current) {
                gsap.from(votersRef.current, { y: 60, autoAlpha: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' });
            }
            // Floating orbs
            if (orbsRef.current) {
                orbsRef.current.querySelectorAll('.glow-orb').forEach((orb, i) => {
                    gsap.to(orb, {
                        y: `random(-60, 60)`, x: `random(-40, 40)`, duration: 4 + i * 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.8,
                    });
                    gsap.to(orb, { opacity: 0.15 + Math.random() * 0.2, duration: 2 + i, repeat: -1, yoyo: true, ease: 'sine.inOut' });
                });
            }
        }, sectionRef);
        return () => ctx.revert();
    }, [kandidat]);



    return (
        <>
            <Head title={`Pemungutan Suara PEMIRA ${pemiraYear}`} />
            <style dangerouslySetInnerHTML={{ __html: `@font-face { font-family: 'Komika Axis'; src: url('/font/KOMIKAX_.ttf') format('truetype'); font-display: swap; }` }} />

            <div ref={sectionRef} className="relative min-h-screen w-full overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0505 15%, #2d0a0a 40%, #1a0505 70%, #0a0a0a 100%)' }}>
                {/* BG layers */}
                <div className="absolute inset-0 opacity-15"><img src={EpicBg} alt="" className="h-full w-full object-cover" aria-hidden="true" /></div>
                <div ref={speedLinesRef} className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
                    <svg width="1600" height="1600" viewBox="0 0 1600 1600" className="absolute">
                        {Array.from({ length: 36 }).map((_, i) => (<line key={i} x1="800" y1="800" x2={800 + 800 * Math.cos((i * 10 * Math.PI) / 180)} y2={800 + 800 * Math.sin((i * 10 * Math.PI) / 180)} stroke="#ef4444" strokeWidth="1.5" />))}
                    </svg>
                </div>
                <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #ef4444 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                {/* Floating glow orbs */}
                <div ref={orbsRef} className="pointer-events-none absolute inset-0 overflow-hidden">
                    {[{ x: '10%', y: '20%', s: 200, c: 'rgba(220,38,38,0.08)' }, { x: '85%', y: '60%', s: 160, c: 'rgba(245,158,11,0.06)' }, { x: '50%', y: '80%', s: 240, c: 'rgba(220,38,38,0.05)' }, { x: '70%', y: '15%', s: 120, c: 'rgba(239,68,68,0.07)' }].map((o, i) => (
                        <div key={i} className="glow-orb absolute rounded-full" style={{ left: o.x, top: o.y, width: o.s, height: o.s, background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)`, filter: 'blur(30px)' }} />
                    ))}
                </div>

                {/* Corner decorations */}
                <div className="pointer-events-none absolute top-6 left-6 h-20 w-20 border-t-2 border-l-2 border-red-600/30" />
                <div className="pointer-events-none absolute top-6 right-6 h-20 w-20 border-t-2 border-r-2 border-red-600/30" />
                <div className="pointer-events-none absolute bottom-6 left-6 h-20 w-20 border-b-2 border-l-2 border-red-600/30" />
                <div className="pointer-events-none absolute right-6 bottom-6 h-20 w-20 border-b-2 border-r-2 border-red-600/30" />
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

                <div className="relative container mx-auto px-4 py-10 md:px-6 md:py-14 lg:py-16">
                    {/* Header */}
                    <div className="mb-10 flex flex-col items-center text-center md:mb-14" ref={titleRef}>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/60 px-5 py-2 backdrop-blur-sm">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-400">Pemungutan Suara Berlangsung</span>
                            <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                        </div>
                        <h1 className="text-3xl font-black uppercase tracking-wider sm:text-5xl md:text-6xl lg:text-7xl" style={{ textShadow: '0 0 40px rgba(239,68,68,0.5), 0 4px 8px rgba(0,0,0,0.8)' }}>
                            <span className="bg-gradient-to-b from-white via-white to-red-200 bg-clip-text text-transparent">PEMIRA {pemiraYear}</span>
                        </h1>
                        <div className="mt-3 h-[2px] w-40 bg-gradient-to-r from-transparent via-red-500 to-transparent md:w-64" />
                        <p className="mt-4 max-w-xl text-sm font-light text-gray-400 md:text-base" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            Pemungutan suara sedang berlangsung. Pantau kandidat dan mahasiswa yang telah menggunakan hak suaranya.
                        </p>
                    </div>



                    {/* ===== KANDIDAT SECTION ===== */}
                    <div className="relative mx-auto mb-14 max-w-7xl md:mb-18">
                        {kandidat.length === 2 && (
                            <div ref={vsRef} className="pointer-events-none absolute top-1/3 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 140, height: 140, background: 'radial-gradient(circle, rgba(239,68,68,0.18) 0%, transparent 70%)', filter: 'blur(12px)' }} />
                                <div className="relative">
                                    <svg className="absolute -top-4 -left-6 h-7 w-4 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" viewBox="0 0 32 48" fill="currentColor"><path d="M20 0L8 20h8L12 48l16-28h-8z" /></svg>
                                    <span className="text-4xl text-white lg:text-5xl xl:text-6xl" style={{ fontFamily: "'Komika Axis', sans-serif", textShadow: '0 0 20px rgba(239,68,68,0.7), 0 3px 8px rgba(0,0,0,0.9), -2px -2px 0 #7f1d1d, 2px -2px 0 #7f1d1d, -2px 2px 0 #7f1d1d, 2px 2px 0 #7f1d1d', WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>VS</span>
                                    <svg className="absolute -right-6 -bottom-3 h-6 w-3.5 rotate-180 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" viewBox="0 0 32 48" fill="currentColor"><path d="M20 0L8 20h8L12 48l16-28h-8z" /></svg>
                                </div>
                            </div>
                        )}
                        <div className={`grid gap-8 ${kandidat.length === 2 ? 'md:grid-cols-2 md:gap-14 lg:gap-24' : kandidat.length === 1 ? 'mx-auto max-w-xl grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-' + Math.min(kandidat.length, 3)}`} style={{ perspective: '1200px' }}>
                            {kandidat.map((calon, index) => (
                                <div key={calon.id} ref={(el) => { cardsRef.current[index] = el; }} className="relative" style={{ transformStyle: 'preserve-3d' }}>
                                    <KandidatCard kandidat={calon} onOpenDialog={openDialog} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ===== VOTED STUDENTS (full width) ===== */}
                <div ref={votersRef} className="px-4 sm:px-8">
                    <VotedStudentsDark students={votedStudents} loading={loading} getInitialAvatar={getStudentAvatar} />
                </div>


                <div className="absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
                <VisiMisiDialog show={showDialog} kandidat={selectedKandidat} isClosing={isClosing} onClose={closeDialog} />

                {/* ===== AD OVERLAY POPUP ===== */}
                <AdOverlay adIndex={adIndex} visible={adVisible} onClose={() => setAdVisible(false)} />
            </div>
        </>
    );
}


/* ===== AD BANNER - slides up from bottom like sports sponsor ===== */
function AdOverlay({ adIndex, visible, onClose }: { adIndex: number; visible: boolean; onClose: () => void }) {
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!bannerRef.current) return;
        if (visible) {
            gsap.fromTo(bannerRef.current, { y: '100%', autoAlpha: 0 }, { y: '0%', autoAlpha: 1, duration: 0.6, ease: 'power3.out' });
        } else {
            gsap.to(bannerRef.current, { y: '100%', autoAlpha: 0, duration: 0.4, ease: 'power2.in' });
        }
    }, [visible]);

    const isDeveloper = adIndex === 0;
    const quote = !isDeveloper ? MOTIVATIONAL_QUOTES[adIndex - 1] : null;

    return (
        <div ref={bannerRef} className="invisible fixed right-0 bottom-0 left-0 z-50 flex justify-center px-3 pb-8 sm:px-4">
            <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-[0_-4px_40px_rgba(0,0,0,0.3)]">

                {/* Close */}
                <button onClick={onClose} className="absolute top-3 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                    <X className="h-4 w-4" />
                </button>

                {isDeveloper ? (
                    /* === COMBINED DEVELOPERS === */
                    <div className="px-8 py-7 sm:px-10 sm:py-8">
                        <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">Sponsor / Developer — Alumni STMIK-AMIK Jayanusa</p>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                            {DEVELOPERS.map((dev, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-red-100 shadow-md sm:h-20 sm:w-20">
                                        <img src={dev.image} alt={dev.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-lg font-bold text-gray-800 sm:text-xl">{dev.name}</h3>
                                        <p className="text-sm font-semibold text-red-600">{dev.role}</p>
                                        <p className="mt-0.5 text-xs text-gray-500">{dev.bio}</p>
                                        <div className="mt-2 flex gap-2">
                                            {dev.social.github && <a href={dev.social.github} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-600"><Github className="h-4 w-4" /></a>}
                                            {dev.social.instagram && <a href={dev.social.instagram} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-600"><Instagram className="h-4 w-4" /></a>}
                                            {dev.social.email && <a href={`mailto:${dev.social.email}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-600"><Mail className="h-4 w-4" /></a>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4 text-center text-[10px] text-gray-400">Built with Laravel, React & Inertia.js</p>
                    </div>
                ) : quote ? (
                    /* === MOTIVATIONAL QUOTE === */
                    <div className="flex items-center gap-6 px-8 py-7 sm:gap-8 sm:px-10 sm:py-8">
                        <Quote className="h-10 w-10 flex-shrink-0 text-red-200 sm:h-12 sm:w-12" />
                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">Kata Motivasi</p>
                            <p className="mt-1 text-base leading-snug font-medium text-gray-700 italic sm:text-lg md:text-xl">"{quote.text}"</p>
                            <p className="mt-2 text-sm font-semibold text-red-500">— {quote.author}</p>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
