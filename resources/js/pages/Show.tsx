import DitoImage from '@/assets/dito.jpg';
import RafiImage from '@/assets/rafi.jpg';
import KandidatCard from '@/components/home/KandidatCard';
import { VisiMisiDialog } from '@/components/home';
import VisiMisiPanel from '@/components/show/VisiMisiPanel';
import VotedStudentsDark from '@/components/show/VotedStudentsDark';
import { useVotedStudents } from '@/hooks/useVotedStudents';
import { Kandidat } from '@/types/voting';
import { getStudentAvatar } from '@/utils/avatar';
import { getPemiraYear } from '@/utils/date';
import { BATIK_PATTERN_URL } from '@/constants/home';
import { Head } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Github, Instagram, Mail, Shield, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const MOTIVATIONAL_QUOTES: never[] = [];

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

// Showcase interval: per 1 menit, tampil 30 detik (visi 15 + misi 15)
const SHOWCASE_INTERVAL = 1 * 60 * 1000;
const SHOWCASE_DURATION = 30 * 1000;

// Total ad slides: 1 developer slide + 1 sponsor slide
const TOTAL_ADS = 2;

interface Props { kandidat: Kandidat[]; voteActive?: boolean; }

export default function Show({ kandidat, voteActive = false }: Props) {
    const pemiraYear = getPemiraYear();
    const { votedStudents, loading } = useVotedStudents();
    const [selectedKandidat, setSelectedKandidat] = useState<Kandidat | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [adIndex, setAdIndex] = useState(0);
    const [adVisible, setAdVisible] = useState(false);

    // Showcase state: which kandidat is currently spotlighted (showing visi misi in its card position)
    // -1 = no showcase (normal view), 0 = first kandidat spotlight, 1 = second kandidat spotlight, etc.
    const [spotlightIndex, setSpotlightIndex] = useState(-1);

    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const vsRef = useRef<HTMLDivElement>(null);
    const votersRef = useRef<HTMLDivElement>(null);

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

    // Showcase rotation: tiap N detik spotlight kandidat secara bergantian
    useEffect(() => {
        if (kandidat.length < 2) return;

        let currentKandidat = 0;
        let hideTimer: ReturnType<typeof setTimeout>;

        const tick = () => {
            setSpotlightIndex(currentKandidat);
            hideTimer = setTimeout(() => {
                setSpotlightIndex(-1);
                currentKandidat = (currentKandidat + 1) % kandidat.length;
            }, SHOWCASE_DURATION);
        };

        const interval = setInterval(tick, SHOWCASE_INTERVAL);
        return () => {
            clearInterval(interval);
            clearTimeout(hideTimer);
        };
    }, [kandidat.length]);

    // GSAP animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (titleRef.current) {
                gsap.from(titleRef.current, { y: -30, autoAlpha: 0, duration: 0.8, ease: 'power3.out' });
            }
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(card, { x: i % 2 === 0 ? -150 : 150, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, duration: 0.9, delay: 0.3 + i * 0.15, ease: 'power3.out' });
            });
            if (votersRef.current) {
                gsap.from(votersRef.current, { y: 60, autoAlpha: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' });
            }
        }, sectionRef);
        return () => ctx.revert();
    }, [kandidat]);



    return (
        <>
            <Head title={`${voteActive ? 'Pemungutan Suara' : 'Pengenalan Kandidat'} - PEMIRA ${pemiraYear}`} />

            <div ref={sectionRef} className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-b from-red-600 to-red-700 text-white">
                {/* Batik background — persis seperti HeroSection */}
                <div className="absolute inset-0 opacity-80">
                    <img src={BATIK_PATTERN_URL} alt="" className="h-full w-full object-cover" aria-hidden="true" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-red-600/90 to-red-700/90" />

                <div className="relative flex flex-1 flex-col px-4 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6">
                    {/* Header — compact */}
                    <div className="mb-4 flex flex-col items-center text-center md:mb-5" ref={titleRef}>
                        <div className="mb-2 inline-flex items-center rounded-full border border-white bg-red-700/50 px-3 py-1 text-xs font-semibold text-white">
                            <Shield className="mr-1.5 h-3.5 w-3.5" />
                            {voteActive ? 'Pemungutan Suara Berlangsung' : 'Pengenalan Kandidat'}
                        </div>
                        <h1 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl md:text-4xl lg:text-5xl">
                            Pemilihan Raya Mahasiswa {pemiraYear}
                        </h1>
                    </div>



                    {/* ===== KANDIDAT SECTION ===== */}
                    <div className="relative mx-auto w-full max-w-6xl flex-1 min-h-0">
                        {kandidat.length === 2 && spotlightIndex === -1 && (
                            <div ref={vsRef} className="pointer-events-none absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                                <span className="text-5xl font-black text-white/90 drop-shadow-lg lg:text-6xl xl:text-7xl">VS</span>
                            </div>
                        )}

                        {/* Spotlight energy pulse behind active slot */}
                        {spotlightIndex !== -1 && (
                            <motion.div
                                key={`pulse-${spotlightIndex}`}
                                initial={{ scale: 0, opacity: 0.8 }}
                                animate={{ scale: 4, opacity: 0 }}
                                transition={{ duration: 1.2, ease: 'easeOut' }}
                                className="pointer-events-none absolute top-1/2 z-0 h-60 w-60 -translate-y-1/2 rounded-full"
                                style={{
                                    left: spotlightIndex === 0 ? '25%' : '75%',
                                    transform: 'translate(-50%, -50%)',
                                    background: 'radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)',
                                    filter: 'blur(20px)',
                                }}
                            />
                        )}

                        {kandidat.length === 2 ? (
                            // Showcase-enabled grid untuk 2 kandidat
                            <div className="grid h-full gap-6 md:grid-cols-2 md:gap-20 lg:gap-28 xl:gap-36" style={{ perspective: '1500px' }}>
                                {[0, 1].map((slotIdx) => {
                                    const slotAccent = slotIdx % 2 === 0
                                        ? { c: '#dc2626', d: '#991b1b' }
                                        : { c: '#f59e0b', d: '#b45309' };

                                    return (
                                        <div
                                            key={`slot-${slotIdx}`}
                                            className="relative h-full"
                                            style={{ transformStyle: 'preserve-3d' }}
                                        >
                                            <AnimatePresence mode="wait">
                                                {spotlightIndex === slotIdx ? (
                                                    <motion.div
                                                        key={`visi-${kandidat[slotIdx].id}`}
                                                        className="absolute inset-0"
                                                        initial={{ opacity: 0, rotateY: -180, scale: 0.75 }}
                                                        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                                                        exit={{ opacity: 0, rotateY: 180, scale: 0.75 }}
                                                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                                        style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                                                    >
                                                        <VisiMisiPanel
                                                            kandidat={kandidat[slotIdx]}
                                                            accentColor={slotAccent.c}
                                                            accentDark={slotAccent.d}
                                                        />
                                                    </motion.div>
                                                ) : (() => {
                                                    const showKandidat = spotlightIndex === -1
                                                        ? kandidat[slotIdx]
                                                        : kandidat[spotlightIndex];
                                                    const cardIndex = spotlightIndex === -1 ? slotIdx : spotlightIndex;
                                                    const isMoved = spotlightIndex !== -1;

                                                    return (
                                                        <motion.div
                                                            key={`card-${showKandidat.id}-slot-${slotIdx}`}
                                                            className="absolute inset-0"
                                                            initial={{
                                                                opacity: 0,
                                                                scale: 0.88,
                                                                x: isMoved ? (slotIdx === 0 ? 100 : -100) : 0,
                                                                rotateY: isMoved ? (slotIdx === 0 ? 20 : -20) : 0,
                                                            }}
                                                            animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
                                                            exit={{ opacity: 0, scale: 0.88 }}
                                                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                                                            style={{ transformStyle: 'preserve-3d' }}
                                                        >
                                                            <KandidatCard
                                                                kandidat={showKandidat}
                                                                onOpenDialog={openDialog}
                                                                index={cardIndex}
                                                                hideVisiMisi
                                                            />
                                                        </motion.div>
                                                    );
                                                })()}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            // Fallback grid
                            <div className={`grid h-full gap-6 ${kandidat.length === 1 ? 'mx-auto max-w-xl grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-' + Math.min(kandidat.length, 3)}`} style={{ perspective: '1200px' }}>
                                {kandidat.map((calon, index) => (
                                    <div key={calon.id} ref={(el) => { cardsRef.current[index] = el; }} className="relative" style={{ transformStyle: 'preserve-3d' }}>
                                        <KandidatCard kandidat={calon} onOpenDialog={openDialog} index={index} hideVisiMisi />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                {/* ===== VOTED STUDENTS — hanya tampil saat voting dibuka ===== */}
                {voteActive && (
                    <div ref={votersRef} className="relative flex-shrink-0 px-4 pb-4 sm:px-8 sm:pb-6">
                        <VotedStudentsDark students={votedStudents} loading={loading} getInitialAvatar={getStudentAvatar} />
                    </div>
                )}

                <VisiMisiDialog show={showDialog} kandidat={selectedKandidat} isClosing={isClosing} onClose={closeDialog} />
                <AdOverlay adIndex={adIndex} visible={adVisible} onClose={() => setAdVisible(false)} />
            </div>
        </>
    );
}


/* ===== AD BANNER - slides up from bottom ===== */
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

    const isSponsor = adIndex === 1;

    return (
        <div ref={bannerRef} className="invisible fixed right-0 bottom-0 left-0 z-50 flex justify-center px-3 pb-8 sm:px-4">
            <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-[0_-4px_40px_rgba(0,0,0,0.3)]">

                {isSponsor ? (
                    /* === SPONSOR SLIDE === */
                    <div className="flex items-center justify-center gap-6 px-8 py-7 sm:gap-10 sm:px-12 sm:py-8">
                        {/* Logo */}
                        <img
                            src="/images/vendora.png"
                            alt="Vendora"
                            className="h-24 w-auto flex-shrink-0 object-contain sm:h-32 md:h-36"
                        />
                        {/* Text stack */}
                        <div>
                            <p className="text-4xl font-black uppercase leading-none tracking-[0.08em] text-gray-900 sm:text-5xl md:text-6xl">
                                PT.VENDORA
                            </p>
                            <p className="mt-2 border-b-2 border-gray-900 pb-1 text-base tracking-[0.35em] text-gray-900 sm:text-lg md:text-xl">
                                SOLUSI DIGITAL
                            </p>
                            <p className="mt-2 text-xs text-gray-600 sm:text-sm md:text-base">
                                Jl. Yogyakarta No.16, Ulak Karang, Kota Padang, Sumatera Barat
                            </p>
                        </div>
                    </div>
                ) : (
                    /* === DEVELOPER SLIDE === */
                    <div className="px-8 py-7 sm:px-10 sm:py-8">
                        <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">Developer — Alumni STMIK-AMIK Jayanusa</p>
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
                )}
            </div>
        </div>
    );
}
