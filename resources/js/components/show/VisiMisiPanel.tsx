import { Kandidat } from '@/types/voting';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface VisiMisiPanelProps {
    kandidat: Kandidat;
    accentColor: string;
    accentDark: string;
}

const VISI_DURATION = 15 * 1000;
const MISI_DURATION = 15 * 1000;

export default function VisiMisiPanel({ kandidat, accentColor, accentDark }: VisiMisiPanelProps) {
    const [phase, setPhase] = useState<'visi' | 'misi'>('visi');

    useEffect(() => {
        setPhase('visi');
        const toMisi = setTimeout(() => setPhase('misi'), VISI_DURATION);
        const loop = setInterval(() => {
            setPhase('visi');
            setTimeout(() => setPhase('misi'), VISI_DURATION);
        }, VISI_DURATION + MISI_DURATION);
        return () => { clearTimeout(toMisi); clearInterval(loop); };
    }, [kandidat.id]);

    const misiList: string[] = (() => {
        const raw: unknown = kandidat.misi;
        if (Array.isArray(raw)) return raw.map((m) => String(m).trim()).filter((m) => m.length > 3);
        if (typeof raw === 'string') {
            const t = raw.trim();
            if (t.startsWith('[')) {
                try {
                    const p = JSON.parse(t);
                    if (Array.isArray(p)) return p.map((m) => String(m).trim()).filter((m) => m.length > 3);
                } catch { /* */ }
            }
            return t.split(/\n|\r|•/).map((m) => m.trim().replace(/^[\d]+[\.\)]\s*/, '')).filter((m) => m.length > 3);
        }
        return [];
    })();

    const visiText = Array.isArray(kandidat.visi)
        ? (kandidat.visi as unknown as string[]).join(' ')
        : String(kandidat.visi ?? '');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -24 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-full min-h-0 flex-col overflow-hidden bg-white"
            style={{ borderLeft: `6px solid ${accentColor}` }}
        >
            {/* ── Nomor + Nama — full bleed header ── */}
            <div className="flex-shrink-0 px-7 pt-7 pb-5">
                <div className="flex items-start gap-4">
                    {/* Nomor besar di kiri */}
                    <div
                        className="flex-shrink-0 text-6xl font-black leading-none"
                        style={{ color: accentColor, fontVariantNumeric: 'tabular-nums' }}
                    >
                        {kandidat.nomor_urut}
                    </div>
                    <div className="min-w-0 pt-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                            Pasangan Kandidat
                        </p>
                        <h2 className="mt-0.5 text-2xl font-black leading-tight text-gray-900 sm:text-3xl">
                            {kandidat.nama_presiden}
                        </h2>
                        <p className="text-sm font-medium text-gray-500">
                            &amp; {kandidat.nama_wakil}
                        </p>
                    </div>
                </div>

                {/* Tab switcher — teks saja, tanpa border/pill */}
                <div className="mt-5 flex gap-6 border-b border-gray-100">
                    {(['visi', 'misi'] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setPhase(t)}
                            className="relative pb-3 text-sm font-bold uppercase tracking-widest transition-colors"
                            style={{ color: phase === t ? accentColor : '#9ca3af' }}
                        >
                            {t}
                            {phase === t && (
                                <motion.div
                                    layoutId="tab-underline"
                                    className="absolute bottom-0 left-0 right-0 h-[3px]"
                                    style={{ background: accentColor }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Content ── */}
            <div className="relative min-h-0 flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                    {phase === 'visi' ? (
                        <motion.div
                            key="visi"
                            initial={{ opacity: 0, x: -32 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 32 }}
                            transition={{ duration: 0.38, ease: 'easeOut' }}
                            className="absolute inset-0 overflow-y-auto px-7 py-4"
                        >
                            {/* Kutipan besar — bukan box */}
                            <p
                                className="text-[15px] leading-[1.85] text-gray-800 sm:text-base"
                                style={{ fontStyle: 'italic' }}
                            >
                                <span
                                    className="float-left mr-2 mt-1 text-5xl font-black leading-none"
                                    style={{ color: accentColor }}
                                >
                                    "
                                </span>
                                {visiText}
                                <span
                                    className="ml-1 text-3xl font-black leading-none"
                                    style={{ color: accentColor }}
                                >
                                    "
                                </span>
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="misi"
                            initial={{ opacity: 0, x: 32 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -32 }}
                            transition={{ duration: 0.38, ease: 'easeOut' }}
                            className="absolute inset-0 overflow-y-auto px-7 py-4"
                        >
                            {misiList.length > 0 ? (
                                <ol className="space-y-4">
                                    {misiList.map((m, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.06, duration: 0.3 }}
                                            className="flex gap-4"
                                        >
                                            {/* Nomor — hanya angka, tanpa kotak */}
                                            <span
                                                className="w-5 flex-shrink-0 pt-0.5 text-right text-sm font-black"
                                                style={{ color: accentColor }}
                                            >
                                                {i + 1}.
                                            </span>
                                            <span className="text-[14px] leading-relaxed text-gray-800 sm:text-[15px]">
                                                {m}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ol>
                            ) : (
                                <p className="text-sm leading-relaxed text-gray-700">{String(kandidat.misi ?? '')}</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Footer — nama pasangan ── */}
            <div
                className="flex-shrink-0 px-7 py-4"
                style={{ borderTop: `1px solid ${accentColor}20` }}
            >
                <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>
                        <span className="font-semibold text-gray-600">{kandidat.nama_presiden}</span>
                        <span className="mx-1">·</span>
                        {kandidat.nomor_bp_presiden}
                    </span>
                    <span
                        className="mx-3 h-3 w-[1px]"
                        style={{ background: accentColor }}
                    />
                    <span>
                        <span className="font-semibold text-gray-600">{kandidat.nama_wakil}</span>
                        <span className="mx-1">·</span>
                        {kandidat.nomor_bp_wakil}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
