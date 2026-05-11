import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Crown, Flame, Hand, HelpCircle, Sparkles, Trophy, User } from 'lucide-react';
import { useEffect, useState } from 'react';

interface KandidatLite {
    id: number;
    nomor_urut: string;
    nama: string;
    nama_presiden: string;
    nama_wakil: string;
    foto_presiden: string;
    foto_wakil: string;
    jumlah_suara: number;
    persentase: number;
}

interface DramaticRevealProps {
    kandidat: KandidatLite[];
    totalVotes: number;
    onFinish: () => void;
}

/**
 * Rangkaian reveal cinematic — bikin audiens tegang & penasaran
 */
const STAGES = [
    { key: 's0', dur: 3800 }, // intro
    { key: 's1', dur: 3000 }, // siapa pemenangnya
    { key: 's2', dur: 2800 }, // nungguin
    { key: 's3', dur: 4000 }, // kira-kira siapa
    { key: 's4', dur: 5200 }, // countdown pertama
    { key: 's5', dur: 3000 }, // oke langsung saja
    { key: 's6', dur: 4000 }, // presma wapresma adalah... (dots)
    { key: 's7', dur: 3500 }, // loading
    { key: 's8', dur: 2800 }, // eh tunggu
    { key: 's9', dur: 3000 }, // menegangkan
    { key: 's10', dur: 4000 }, // sebelum lanjut, ini perolehan suara
    { key: 's11', dur: 6500 }, // reveal persentase juara 2
    { key: 's12', dur: 3200 }, // lalu juara 1?
    { key: 's13', dur: 7000 }, // reveal persentase juara 1
    { key: 's14', dur: 3500 }, // selisih
    { key: 's15', dur: 3500 }, // ada tau siapa...?
    { key: 's16', dur: 5200 }, // countdown final
    { key: 's17', dur: 4000 }, // drumroll
    { key: 's18', dur: 10000 }, // reveal winner — diperlambat
] as const;

export default function DramaticReveal({ kandidat, totalVotes, onFinish }: DramaticRevealProps) {
    const [stage, setStage] = useState(0);
    const [skipped, setSkipped] = useState(false);

    const sorted = [...kandidat].sort((a, b) => b.jumlah_suara - a.jumlah_suara);
    const winner = sorted[0];
    const runnerUp = sorted[1];
    const winnerPct = totalVotes > 0 ? ((winner?.jumlah_suara ?? 0) / totalVotes) * 100 : 0;
    const runnerUpPct = totalVotes > 0 ? ((runnerUp?.jumlah_suara ?? 0) / totalVotes) * 100 : 0;
    const selisih = winnerPct - runnerUpPct;

    useEffect(() => {
        if (skipped) return;
        if (stage >= STAGES.length) {
            onFinish();
            return;
        }
        const timer = setTimeout(() => setStage((s) => s + 1), STAGES[stage].dur);
        return () => clearTimeout(timer);
    }, [stage, skipped, onFinish]);

    const handleSkip = () => {
        setSkipped(true);
        onFinish();
    };

    const selisihText =
        selisih < 2 ? 'Selisihnya tipiiiiis banget...' : selisih < 10 ? 'Selisihnya lumayan tipis... hati-hati' : 'Selisihnya lumayan jauh...';

    return (
        <div className="fixed inset-0 z-[60] overflow-hidden bg-gradient-to-br from-red-950 via-red-900 to-red-800">
            {/* Batik pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='5' cy='5' r='3'/%3E%3Ccircle cx='25' cy='25' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
                }}
            />

            {/* Cinematic orbs */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, -30, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-red-500/40 blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 30, 0] }}
                    transition={{ duration: 12, repeat: Infinity, delay: 1 }}
                    className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-700/30 blur-3xl"
                />
            </div>

            {/* Cinematic bars (film letterbox) */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: stage >= STAGES.length - 1 ? 0 : '8vh' }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-0 right-0 left-0 z-40 bg-black"
            />
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: stage >= STAGES.length - 1 ? 0 : '8vh' }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute right-0 bottom-0 left-0 z-40 bg-black"
            />

            {/* Skip */}
            <button
                onClick={handleSkip}
                className="absolute top-[10vh] right-6 z-50 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-md transition hover:bg-white/20 hover:text-white"
            >
                Lewati ›
            </button>

            {/* Progress dots */}
            <div className="absolute top-[10vh] left-1/2 z-50 flex -translate-x-1/2 gap-1">
                {STAGES.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-700 ${i <= stage ? 'w-5 bg-white' : 'w-2 bg-white/30'}`} />
                ))}
            </div>

            <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
                <AnimatePresence mode="wait">
                    {stage === 0 && (
                        <TextStage
                            key="s0"
                            preline="PEMIRA Jayanusa"
                            title="Perhitungan Suara Telah Selesai"
                            subtitle="Mohon tetap di tempat, jangan beranjak dulu..."
                            icon={<Sparkles className="h-16 w-16 text-white" />}
                        />
                    )}
                    {stage === 1 && <BigQuestion key="s1" text="Siapakah Pemenangnya?" />}
                    {stage === 2 && <TeasingStage key="s2" text="Nungguin ya...?" icon={<Clock />} />}
                    {stage === 3 && <BigQuestion key="s3" text="Kira-kira siapa yang akan menjadi Presma & Wapresma Jayanusa?" small />}
                    {stage === 4 && <CountdownStage key="s4" />}
                    {stage === 5 && <TeasingStage key="s5" text="Oke, langsung saja..." icon={<Sparkles />} />}
                    {stage === 6 && <DramaticLineStage key="s6" text="Presma & Wapresma Terpilih Adalah" dots />}
                    {stage === 7 && <LoadingStage key="s7" />}
                    {stage === 8 && <TeasingStage key="s8" text="Eh tunggu... tunggu..." icon={<Hand />} />}
                    {stage === 9 && <TeasingStage key="s9" text="Kita buat lebih menegangkan lagi..." icon={<Flame />} />}
                    {stage === 10 && (
                        <TextStage
                            key="s10"
                            preline="Sebelum kita lanjut"
                            title="Inilah perolehan suara..."
                            subtitle="Kita lihat dulu peringkat kedua"
                            icon={<Sparkles className="h-14 w-14 text-white" />}
                        />
                    )}
                    {stage === 11 && <PercentageReveal key="s11" label="Peringkat Kedua" position={2} percentage={runnerUpPct} />}
                    {stage === 12 && <TeasingStage key="s12" text="Lalu peringkat pertama...?" icon={<HelpCircle />} />}
                    {stage === 13 && <PercentageReveal key="s13" label="Peringkat Pertama" position={1} percentage={winnerPct} />}
                    {stage === 14 && <SelisihStage key="s14" text={selisihText} selisih={selisih} />}
                    {stage === 15 && <BigQuestion key="s15" text="Ada tau siapa...?" />}
                    {stage === 16 && <CountdownStage key="s16" urgent />}
                    {stage === 17 && <DramaticLineStage key="s17" text="Presma & Wapresma Terpilih Adalah" dots bigDrumroll />}
                    {stage === 18 && winner && <WinnerReveal key="s18" kandidat={winner} percentage={winnerPct.toFixed(1)} />}
                </AnimatePresence>
            </div>

            {stage === 18 && <Confetti />}
        </div>
    );
}

/* ============ CINEMATIC TRANSITIONS ============ */

const cinematicIn = {
    initial: { opacity: 0, scale: 0.85, filter: 'blur(20px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 1.15, filter: 'blur(20px)' },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

const slideIn = {
    initial: { opacity: 0, y: 60, filter: 'blur(12px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -60, filter: 'blur(12px)' },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

/* ============ STAGES ============ */

function TextStage({ preline, title, subtitle, icon }: { preline?: string; title: string; subtitle?: string; icon?: React.ReactNode }) {
    return (
        <motion.div {...cinematicIn} className="text-center">
            {icon && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="mb-6 inline-block"
                >
                    {icon}
                </motion.div>
            )}
            {preline && (
                <motion.p
                    initial={{ opacity: 0, letterSpacing: '0.1em' }}
                    animate={{ opacity: 1, letterSpacing: '0.4em' }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="mb-3 text-xs font-bold text-white/70 uppercase md:text-sm"
                >
                    {preline}
                </motion.p>
            )}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-3 text-3xl font-black text-white md:text-6xl"
            >
                {title}
            </motion.h1>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-base text-white/70 md:text-xl"
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    );
}

function BigQuestion({ text, small = false }: { text: string; small?: boolean }) {
    const words = text.split(' ');
    return (
        <motion.div {...slideIn} className="max-w-5xl text-center">
            <h1
                className={
                    small
                        ? 'text-2xl leading-tight font-black text-white md:text-4xl lg:text-5xl'
                        : 'text-4xl leading-tight font-black text-white md:text-7xl lg:text-8xl'
                }
            >
                {words.map((w, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
                        className="mr-2 inline-block"
                    >
                        {w}
                    </motion.span>
                ))}
            </h1>
        </motion.div>
    );
}

function TeasingStage({ text, icon }: { text: string; icon: React.ReactNode }) {
    return (
        <motion.div {...slideIn} className="flex flex-col items-center gap-5 px-4 text-center md:flex-row md:gap-8">
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="flex items-center justify-center"
            >
                <motion.div
                    animate={{ rotate: [-10, 10, -10], scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 text-white backdrop-blur-md md:h-32 md:w-32 [&>svg]:h-10 [&>svg]:w-10 md:[&>svg]:h-16 md:[&>svg]:w-16"
                >
                    {icon}
                </motion.div>
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-2xl font-black text-white md:text-6xl"
            >
                {text}
            </motion.h2>
        </motion.div>
    );
}

function DramaticLineStage({ text, dots = false, bigDrumroll = false }: { text: string; dots?: boolean; bigDrumroll?: boolean }) {
    return (
        <motion.div {...cinematicIn} className="text-center">
            {bigDrumroll && (
                <motion.p
                    initial={{ opacity: 0, letterSpacing: '0.1em' }}
                    animate={{ opacity: 1, letterSpacing: '0.5em' }}
                    transition={{ duration: 1.5 }}
                    className="mb-4 text-xs font-bold text-white/80 uppercase md:text-sm"
                >
                    Drumroll please...
                </motion.p>
            )}
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl font-black text-white md:text-6xl lg:text-7xl"
            >
                {text}
            </motion.h1>
            {dots && <AnimatedDots />}
        </motion.div>
    );
}

function AnimatedDots() {
    const [dotCount, setDotCount] = useState(1);
    useEffect(() => {
        const timer = setInterval(() => setDotCount((c) => (c % 5) + 1), 400);
        return () => clearInterval(timer);
    }, []);
    return <div className="mt-4 h-16 text-5xl font-black text-white md:text-7xl">{'.'.repeat(dotCount)}</div>;
}

function CountdownStage({ urgent = false }: { urgent?: boolean }) {
    const [count, setCount] = useState(3);

    useEffect(() => {
        if (count <= 0) return;
        const t = setTimeout(() => setCount((c) => c - 1), 1300);
        return () => clearTimeout(t);
    }, [count]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-base font-bold tracking-[0.3em] text-white/70 uppercase md:text-2xl"
            >
                {urgent ? 'Siap-siap!!!' : 'Bersiap...'}
            </motion.p>
            <AnimatePresence mode="wait">
                <motion.div
                    key={count}
                    initial={{ scale: 2.5, opacity: 0, rotate: -15, filter: 'blur(20px)' }}
                    animate={{ scale: 1, opacity: 1, rotate: 0, filter: 'blur(0px)' }}
                    exit={{ scale: 0.3, opacity: 0, rotate: 15, filter: 'blur(20px)' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-gradient-to-br from-white via-red-100 to-white bg-clip-text text-[10rem] leading-none font-black text-transparent md:text-[18rem]"
                    style={{ filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.5))' }}
                >
                    {count > 0 ? count : '✦'}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

function LoadingStage() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((p) => {
                if (p < 80) return p + 3;
                if (p < 99) return p + 0.25;
                return 99;
            });
        }, 80);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div {...cinematicIn} className="w-full max-w-xl text-center">
            <h2 className="mb-6 text-2xl font-black text-white md:text-4xl">Loading hasil...</h2>
            <div className="mb-3 h-4 overflow-hidden rounded-full border border-white/20 bg-white/10">
                <motion.div
                    className="h-full bg-gradient-to-r from-white to-red-200"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>
            <p className="text-sm text-white/60 md:text-base">
                {progress.toFixed(0)}% — {progress < 99 ? 'Memproses data...' : 'Hampir selesai... tinggal sedikit lagi...'}
            </p>
        </motion.div>
    );
}

/* ============ PERCENTAGE REVEAL ============ */

function PercentageReveal({ label, position, percentage }: { label: string; position: number; percentage: number }) {
    return (
        <motion.div {...cinematicIn} className="w-full max-w-2xl text-center">
            {/* Position badge */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 150, delay: 0.3 }}
                className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-md"
            >
                <span className="text-xs font-black tracking-[0.3em] text-white uppercase md:text-sm">{label}</span>
            </motion.div>

            {/* Silhouette circle */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
                className="relative mx-auto mb-8"
            >
                <div className="relative mx-auto h-44 w-44 md:h-56 md:w-56">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-white/40 blur-3xl"
                    />
                    <div
                        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-white/40 shadow-2xl backdrop-blur-xl"
                        style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.15), rgba(127,29,29,0.5))' }}
                    >
                        <div className="text-center text-white/60">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-8xl font-black md:text-9xl"
                            >
                                ?
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Animated big percentage */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }}>
                <p className="mb-2 text-xs font-bold tracking-[0.3em] text-white/60 uppercase md:text-sm">Memperoleh</p>
                <AnimatedPercentage target={percentage} />
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 0.8 }}
                    className="mt-3 text-base text-white/70 md:text-xl"
                >
                    perolehan suara
                </motion.p>
            </motion.div>
        </motion.div>
    );
}

function AnimatedPercentage({ target }: { target: number }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const duration = 2800;
        const start = performance.now();
        let raf: number;

        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(target * eased);
            if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target]);

    return (
        <div
            className="bg-gradient-to-br from-white via-red-100 to-white bg-clip-text text-8xl leading-none font-black text-transparent md:text-[10rem]"
            style={{ filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.4))' }}
        >
            {value.toFixed(1)}%
        </div>
    );
}

function SelisihStage({ text, selisih }: { text: string; selisih: number }) {
    return (
        <motion.div {...cinematicIn} className="w-full max-w-3xl text-center">
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-sm font-bold tracking-[0.3em] text-white/60 uppercase md:text-base"
            >
                Selisih perolehan
            </motion.p>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="mb-6 inline-flex items-baseline gap-2 rounded-full bg-white/10 px-8 py-3 backdrop-blur-md"
            >
                <span className="text-5xl font-black text-white md:text-7xl">{selisih.toFixed(1)}%</span>
            </motion.div>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-2xl font-black text-white md:text-4xl"
            >
                {text}
            </motion.h2>
        </motion.div>
    );
}

/* ============ WINNER REVEAL ============ */

function WinnerReveal({ kandidat, percentage }: { kandidat: KandidatLite; percentage: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(30px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-3xl text-center"
        >
            {/* Badge */}
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2 text-xs font-black tracking-[0.3em] text-red-700 uppercase shadow-2xl md:text-sm"
            >
                <Crown className="h-4 w-4 fill-red-600" />
                Pemenang PEMIRA
                <Crown className="h-4 w-4 fill-red-600" />
            </motion.div>

            {/* Foto pasangan: presiden & wakil */}
            <div className="relative mx-auto mb-6">
                {/* Trophy di atas tengah */}
                <motion.div
                    initial={{ scale: 0, y: -30 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="relative z-10 mb-[-20px] inline-block"
                >
                    <motion.div animate={{ y: [-8, 0, -8], rotate: [-5, 5, -5] }} transition={{ duration: 2.5, repeat: Infinity }}>
                        <Trophy className="h-14 w-14 fill-white text-red-600 drop-shadow-2xl md:h-16 md:w-16" />
                    </motion.div>
                </motion.div>

                {/* Duo avatar */}
                <div className="flex items-center justify-center gap-4 md:gap-6">
                    {/* Presiden */}
                    <motion.div
                        initial={{ scale: 0, x: -40, rotate: -20 }}
                        animate={{ scale: 1, x: 0, rotate: 0 }}
                        transition={{ delay: 0.7, type: 'spring', stiffness: 120, damping: 12 }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative h-36 w-36 md:h-52 md:w-52">
                            <motion.div
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 rounded-full bg-white/60 blur-3xl"
                            />
                            <div className="relative h-full w-full overflow-hidden rounded-full border-[5px] border-white shadow-[0_0_40px_rgba(255,255,255,0.6)]">
                                {kandidat.foto_presiden ? (
                                    <img
                                        src={`/storage/${kandidat.foto_presiden}`}
                                        alt={kandidat.nama_presiden}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-red-900 text-white">
                                        <User className="h-12 w-12" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3 }}
                            className="mt-2 text-[10px] font-bold tracking-widest text-white/70 uppercase md:text-xs"
                        >
                            Presiden
                        </motion.p>
                    </motion.div>

                    {/* Ampersand */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.1, type: 'spring' }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-black text-red-700 shadow-xl md:h-14 md:w-14 md:text-2xl"
                    >
                        &amp;
                    </motion.div>

                    {/* Wakil */}
                    <motion.div
                        initial={{ scale: 0, x: 40, rotate: 20 }}
                        animate={{ scale: 1, x: 0, rotate: 0 }}
                        transition={{ delay: 0.9, type: 'spring', stiffness: 120, damping: 12 }}
                        className="flex flex-col items-center"
                    >
                        <div className="relative h-36 w-36 md:h-52 md:w-52">
                            <motion.div
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                className="absolute inset-0 rounded-full bg-white/60 blur-3xl"
                            />
                            <div className="relative h-full w-full overflow-hidden rounded-full border-[5px] border-white shadow-[0_0_40px_rgba(255,255,255,0.6)]">
                                {kandidat.foto_wakil ? (
                                    <img src={`/storage/${kandidat.foto_wakil}`} alt={kandidat.nama_wakil} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-red-900 text-white">
                                        <User className="h-12 w-12" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3 }}
                            className="mt-2 text-[10px] font-bold tracking-widest text-white/70 uppercase md:text-xs"
                        >
                            Wakil Presiden
                        </motion.p>
                    </motion.div>
                </div>
            </div>

            {/* Info pemenang */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="mx-auto max-w-2xl">
                <div className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-md">
                    Nomor Urut {kandidat.nomor_urut}
                </div>

                <div className="mb-6 flex flex-col items-center justify-center gap-1 md:flex-row md:gap-6">
                    <h2 className="text-xl leading-tight font-black text-white md:text-3xl">{kandidat.nama_presiden}</h2>
                    <span className="text-sm text-white/60 md:text-base">&amp;</span>
                    <h2 className="text-xl leading-tight font-black text-white md:text-3xl">{kandidat.nama_wakil}</h2>
                </div>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.7, type: 'spring' }}
                    className="inline-flex items-baseline gap-2 rounded-full bg-white px-8 py-3 shadow-2xl"
                >
                    <span className="text-4xl font-black text-red-700 md:text-5xl">{percentage}%</span>
                    <span className="text-sm font-bold text-red-600 md:text-base">perolehan suara</span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                    className="mt-6 text-base font-semibold text-white/90 italic md:text-lg"
                >
                    Selamat dan sukses!
                </motion.p>
            </motion.div>
        </motion.div>
    );
}

/* ============ CONFETTI ============ */

function Confetti() {
    const pieces = Array.from({ length: 80 }, (_, i) => i);
    const colors = ['#ffffff', '#fecaca', '#fca5a5', '#ef4444', '#dc2626', '#ffffff', '#fef2f2'];

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {pieces.map((i) => {
                const left = Math.random() * 100;
                const delay = Math.random() * 0.8;
                const duration = 3 + Math.random() * 2;
                const size = 6 + Math.random() * 10;
                const color = colors[i % colors.length];
                const rotate = Math.random() * 360;

                return (
                    <motion.div
                        key={i}
                        initial={{ y: -20, x: `${left}vw`, opacity: 1, rotate }}
                        animate={{ y: '110vh', rotate: rotate + 720 }}
                        transition={{ duration, delay, ease: 'linear', repeat: Infinity }}
                        className="absolute"
                        style={{ width: size, height: size * 0.4, backgroundColor: color, borderRadius: '2px' }}
                    />
                );
            })}
        </div>
    );
}
