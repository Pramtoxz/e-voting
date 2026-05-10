import EpicBg from '@/assets/epic_bg.png';
import { Kandidat } from '@/types/voting';
import { getPemiraYear } from '@/utils/date';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import KandidatCard from './KandidatCard';

gsap.registerPlugin(ScrollTrigger);

interface KandidatSectionProps {
    kandidat: Kandidat[];
    onOpenDialog: (kandidat: Kandidat) => void;
}

export default function KandidatSection({ kandidat, onOpenDialog }: KandidatSectionProps) {
    const pemiraYear = getPemiraYear();
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const vsRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const speedLinesRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Speed lines rotation animation
            if (speedLinesRef.current) {
                gsap.to(speedLinesRef.current, {
                    rotation: 360,
                    duration: 60,
                    repeat: -1,
                    ease: 'none',
                });
            }

            // Floating particles
            if (particlesRef.current) {
                const particles = particlesRef.current.querySelectorAll('.epic-particle');
                particles.forEach((p, i) => {
                    gsap.to(p, {
                        y: -80 - Math.random() * 120,
                        x: (Math.random() - 0.5) * 100,
                        opacity: 0,
                        duration: 2 + Math.random() * 3,
                        repeat: -1,
                        delay: i * 0.3,
                        ease: 'power1.out',
                    });
                });
            }

            // Title entrance with dramatic split
            if (titleRef.current) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        end: 'top 30%',
                        toggleActions: 'play none none reverse',
                    },
                });

                tl.from(titleRef.current, {
                    scale: 3,
                    autoAlpha: 0,
                    duration: 0.8,
                    ease: 'power4.out',
                })
                    .from(
                        subtitleRef.current,
                        {
                            y: 40,
                            autoAlpha: 0,
                            duration: 0.6,
                            ease: 'power3.out',
                        },
                        '-=0.3',
                    )
                    .from(
                        '.epic-decoration-line',
                        {
                            scaleX: 0,
                            duration: 0.8,
                            ease: 'power2.out',
                        },
                        '-=0.4',
                    );
            }

            // VS text pulse animation
            if (vsRef.current) {
                gsap.fromTo(
                    vsRef.current,
                    { scale: 0.8, autoAlpha: 0 },
                    {
                        scale: 1,
                        autoAlpha: 1,
                        duration: 0.6,
                        ease: 'elastic.out(1, 0.5)',
                        scrollTrigger: {
                            trigger: vsRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );

                // Continuous pulse
                gsap.to(vsRef.current, {
                    scale: 1.1,
                    duration: 0.8,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });
            }

            // Cards dramatic entrance - left and right sides
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                const isLeft = i % 2 === 0;

                gsap.fromTo(
                    card,
                    {
                        x: isLeft ? -200 : 200,
                        rotationY: isLeft ? -25 : 25,
                        autoAlpha: 0,
                        scale: 0.7,
                    },
                    {
                        x: 0,
                        rotationY: 0,
                        autoAlpha: 1,
                        scale: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            end: 'top 50%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );


            });
        }, sectionRef);

        return () => ctx.revert();
    }, [kandidat]);

    return (
        <section
            ref={sectionRef}
            id="kandidat"
            className="relative w-full overflow-hidden py-16 md:py-28 lg:py-36"
            style={{
                background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0505 20%, #2d0a0a 50%, #1a0505 80%, #0a0a0a 100%)',
            }}
        >
            {/* Epic background image */}
            <div className="absolute inset-0 opacity-20">
                <img src={EpicBg} alt="" className="h-full w-full object-cover" aria-hidden="true" />
            </div>

            {/* Animated speed lines */}
            <div ref={speedLinesRef} className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
                <svg width="1600" height="1600" viewBox="0 0 1600 1600" className="absolute">
                    {Array.from({ length: 36 }).map((_, i) => (
                        <line
                            key={i}
                            x1="800"
                            y1="800"
                            x2={800 + 800 * Math.cos((i * 10 * Math.PI) / 180)}
                            y2={800 + 800 * Math.sin((i * 10 * Math.PI) / 180)}
                            stroke="#ef4444"
                            strokeWidth="1.5"
                        />
                    ))}
                </svg>
            </div>

            {/* Halftone dots overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, #ef4444 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }}
            />

            {/* Floating particles */}
            <div ref={particlesRef} className="pointer-events-none absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="epic-particle absolute rounded-full"
                        style={{
                            width: 2 + Math.random() * 4 + 'px',
                            height: 2 + Math.random() * 4 + 'px',
                            background: i % 3 === 0 ? '#ef4444' : i % 3 === 1 ? '#fbbf24' : '#ffffff',
                            left: Math.random() * 100 + '%',
                            top: 60 + Math.random() * 40 + '%',
                            opacity: 0.6,
                        }}
                    />
                ))}
            </div>

            {/* Top dramatic gradient divider */}
            <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

            {/* Decorative corner elements */}
            <div className="pointer-events-none absolute top-8 left-8 h-24 w-24 border-t-2 border-l-2 border-red-600/30 opacity-60" />
            <div className="pointer-events-none absolute top-8 right-8 h-24 w-24 border-t-2 border-r-2 border-red-600/30 opacity-60" />
            <div className="pointer-events-none absolute bottom-8 left-8 h-24 w-24 border-b-2 border-l-2 border-red-600/30 opacity-60" />
            <div className="pointer-events-none absolute right-8 bottom-8 h-24 w-24 border-b-2 border-r-2 border-red-600/30 opacity-60" />

            <div className="relative container mx-auto px-4 md:px-6">
                {/* Epic Title Area */}
                <div className="mb-16 flex flex-col items-center justify-center space-y-6 text-center md:mb-24">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/60 px-5 py-2 backdrop-blur-sm">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-400">Pertarungan Dimulai</span>
                        <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                    </div>

                    {/* Main Title */}
                    <div ref={titleRef} className="relative">
                        <h2
                            className="relative text-4xl font-black uppercase tracking-wider text-white sm:text-6xl md:text-7xl lg:text-8xl"
                            style={{
                                textShadow: '0 0 40px rgba(239,68,68,0.5), 0 0 80px rgba(239,68,68,0.2), 0 4px 8px rgba(0,0,0,0.8)',
                                letterSpacing: '0.08em',
                            }}
                        >
                            <span className="bg-gradient-to-b from-white via-white to-red-200 bg-clip-text text-transparent">KANDIDAT</span>
                        </h2>
                        <div
                            className="mx-auto mt-2 text-2xl font-bold tracking-[0.5em] text-red-500 sm:text-3xl md:text-4xl"
                            style={{ textShadow: '0 0 20px rgba(239,68,68,0.3)' }}
                        >
                            PEMIRA {pemiraYear}
                        </div>
                    </div>

                    {/* Decoration Line */}
                    <div className="epic-decoration-line mx-auto h-[2px] w-48 origin-center bg-gradient-to-r from-transparent via-red-500 to-transparent md:w-72" />

                    {/* Subtitle */}
                    <p
                        ref={subtitleRef}
                        className="max-w-[700px] text-base leading-relaxed font-light text-gray-300/90 md:text-lg"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                    >
                        Kenali calon pemimpin yang akan mewakili aspirasi dan kepentingan mahasiswa. Siapa yang akan menjadi <span className="font-semibold text-red-400">pemenangnya?</span>
                    </p>
                </div>

                {/* Cards Battle Arena */}
                <div className="relative mx-auto max-w-7xl">
                    {/* VS Indicator (shown when 2 candidates) */}
                    {kandidat.length === 2 && (
                        <div
                            ref={vsRef}
                            className="pointer-events-none absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block"
                        >
                            {/* Radial glow behind VS */}
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    width: '160px',
                                    height: '160px',
                                    background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0.06) 40%, transparent 70%)',
                                    filter: 'blur(15px)',
                                }}
                            />
                            <div className="relative">
                                {/* Lightning bolt - top left */}
                                <svg
                                    className="absolute -top-5 -left-7 h-8 w-5 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"
                                    viewBox="0 0 32 48"
                                    fill="currentColor"
                                >
                                    <path d="M20 0L8 20h8L12 48l16-28h-8z" />
                                </svg>
                                {/* Main VS Text */}
                                <span
                                    className="text-5xl text-white lg:text-6xl xl:text-7xl"
                                    style={{
                                        fontFamily: "'Komika Axis', sans-serif",
                                        textShadow:
                                            '0 0 25px rgba(239,68,68,0.8), 0 0 50px rgba(239,68,68,0.4), 0 4px 10px rgba(0,0,0,0.9), -2px -2px 0 #7f1d1d, 2px -2px 0 #7f1d1d, -2px 2px 0 #7f1d1d, 2px 2px 0 #7f1d1d',
                                        WebkitTextStroke: '1px rgba(255,255,255,0.12)',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    VS
                                </span>
                                {/* Lightning bolt - bottom right */}
                                <svg
                                    className="absolute -right-7 -bottom-4 h-7 w-4.5 rotate-180 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]"
                                    viewBox="0 0 32 48"
                                    fill="currentColor"
                                >
                                    <path d="M20 0L8 20h8L12 48l16-28h-8z" />
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* Cards Grid */}
                    <div
                        className={`grid gap-8 ${kandidat.length === 2 ? 'md:grid-cols-2 md:gap-16 lg:gap-28' : kandidat.length === 1 ? 'mx-auto max-w-xl grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-' + Math.min(kandidat.length, 3)}`}
                        style={{ perspective: '1200px' }}
                    >
                        {kandidat.map((calon, index) => (
                            <div
                                key={calon.id}
                                ref={(el) => {
                                    cardsRef.current[index] = el;
                                }}
                                className="relative"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <KandidatCard kandidat={calon} onOpenDialog={onOpenDialog} index={index} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom dramatic text */}
                <div className="mt-16 flex flex-col items-center gap-3 md:mt-24">
                    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
                    <p
                        className="text-center text-sm font-medium tracking-widest text-red-500/60 uppercase italic"
                        style={{ textShadow: '0 0 10px rgba(239,68,68,0.2)' }}
                    >
                        "Suaramu menentukan masa depan kampus"
                    </p>
                    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
                </div>
            </div>

            {/* Bottom dramatic gradient divider */}
            <div className="absolute right-0 bottom-0 left-0 h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        </section>
    );
}
