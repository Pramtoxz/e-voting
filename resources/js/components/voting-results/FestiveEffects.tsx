import { useEffect, useMemo, useState } from 'react';

/**
 * Efek meriah looping untuk halaman pemenang:
 * - Konfeti turun non-stop
 * - Kembang api meledak random
 * - Spotlight berputar
 * - Balon naik dari bawah
 * - Sparkle berkelip
 * - Ring/glow di belakang pemenang
 */
export default function FestiveEffects() {
    const confetti = useMemo(() => Array.from({ length: 80 }), []);
    const balloons = useMemo(() => Array.from({ length: 14 }), []);
    const sparkles = useMemo(() => Array.from({ length: 30 }), []);
    const [fireworks, setFireworks] = useState<Array<{ id: number; left: number; top: number; color: string }>>([]);

    const fireworkColors = ['#fde047', '#f87171', '#60a5fa', '#4ade80', '#c084fc', '#f472b6', '#ffffff'];

    useEffect(() => {
        let id = 0;
        const spawn = () => {
            id += 1;
            const fw = {
                id,
                left: 10 + Math.random() * 80,
                top: 10 + Math.random() * 60,
                color: fireworkColors[Math.floor(Math.random() * fireworkColors.length)],
            };
            setFireworks((prev) => [...prev.slice(-5), fw]);
            setTimeout(() => {
                setFireworks((prev) => prev.filter((f) => f.id !== fw.id));
            }, 1400);
        };

        const interval = setInterval(spawn, 900);
        spawn();
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <style>{css}</style>

            {/* Spotlight berputar */}
            <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
                <div className="fx-spotlight" />
                <div className="fx-spotlight fx-spotlight--alt" />
            </div>

            {/* Radial glow yang pulse */}
            <div className="pointer-events-none absolute inset-0 z-[1] fx-radial-pulse" />

            {/* Konfeti turun */}
            <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
                {confetti.map((_, i) => {
                    const left = (i * 1.23) % 100;
                    const delay = (i * 0.17) % 6;
                    const dur = 5 + ((i * 0.37) % 5);
                    const size = 6 + (i % 5) * 2;
                    const color = fireworkColors[i % fireworkColors.length];
                    const rot = (i * 47) % 360;
                    return (
                        <span
                            key={`c-${i}`}
                            className="fx-confetti"
                            style={{
                                left: `${left}%`,
                                animationDelay: `${delay}s`,
                                animationDuration: `${dur}s`,
                                width: `${size}px`,
                                height: `${size * 1.6}px`,
                                background: color,
                                transform: `rotate(${rot}deg)`,
                            }}
                        />
                    );
                })}
            </div>

            {/* Balon naik */}
            <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
                {balloons.map((_, i) => {
                    const left = (i * 7.3 + 4) % 95;
                    const delay = (i * 0.9) % 10;
                    const dur = 10 + ((i * 0.6) % 6);
                    const color = fireworkColors[(i + 2) % fireworkColors.length];
                    const size = 34 + (i % 4) * 6;
                    return (
                        <span
                            key={`b-${i}`}
                            className="fx-balloon"
                            style={{
                                left: `${left}%`,
                                animationDelay: `${delay}s`,
                                animationDuration: `${dur}s`,
                                width: `${size}px`,
                                height: `${size * 1.2}px`,
                                background: `radial-gradient(circle at 30% 25%, #ffffff 0%, ${color} 40%, ${color} 100%)`,
                            }}
                        >
                            <span className="fx-balloon-string" />
                        </span>
                    );
                })}
            </div>

            {/* Sparkle berkelip */}
            <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
                {sparkles.map((_, i) => {
                    const left = (i * 13.7) % 100;
                    const top = (i * 9.3) % 100;
                    const delay = (i * 0.23) % 4;
                    const dur = 1.8 + ((i * 0.11) % 2);
                    return (
                        <span
                            key={`s-${i}`}
                            className="fx-sparkle"
                            style={{
                                left: `${left}%`,
                                top: `${top}%`,
                                animationDelay: `${delay}s`,
                                animationDuration: `${dur}s`,
                            }}
                        />
                    );
                })}
            </div>

            {/* Kembang api */}
            <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
                {fireworks.map((fw) => (
                    <div
                        key={fw.id}
                        className="fx-firework"
                        style={{ left: `${fw.left}%`, top: `${fw.top}%` }}
                    >
                        {Array.from({ length: 14 }).map((_, i) => (
                            <span
                                key={i}
                                className="fx-firework-particle"
                                style={{
                                    background: fw.color,
                                    transform: `rotate(${(i * 360) / 14}deg)`,
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

const css = `
@keyframes fx-confetti-fall {
    0%   { transform: translate3d(0, -20vh, 0) rotate(0deg);   opacity: 0; }
    10%  { opacity: 1; }
    100% { transform: translate3d(40px, 120vh, 0) rotate(720deg); opacity: 1; }
}
.fx-confetti {
    position: absolute;
    top: 0;
    border-radius: 2px;
    animation: fx-confetti-fall linear infinite;
    will-change: transform;
    box-shadow: 0 0 4px rgba(255,255,255,0.4);
}

@keyframes fx-balloon-up {
    0%   { transform: translate3d(0, 110vh, 0) rotate(-4deg); opacity: 0; }
    8%   { opacity: 1; }
    50%  { transform: translate3d(15px, 50vh, 0) rotate(4deg); }
    100% { transform: translate3d(-10px, -30vh, 0) rotate(-3deg); opacity: 0.9; }
}
.fx-balloon {
    position: absolute;
    bottom: 0;
    border-radius: 50% 50% 50% 50% / 55% 55% 45% 45%;
    animation: fx-balloon-up linear infinite;
    will-change: transform;
    box-shadow: inset -6px -10px 18px rgba(0,0,0,0.25), 0 4px 20px rgba(0,0,0,0.25);
}
.fx-balloon::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -6px;
    width: 10px;
    height: 8px;
    background: inherit;
    filter: brightness(0.7);
    transform: translateX(-50%) rotate(45deg);
}
.fx-balloon-string {
    position: absolute;
    left: 50%;
    top: 100%;
    width: 1px;
    height: 60px;
    background: rgba(255,255,255,0.5);
    transform: translateX(-50%);
}

@keyframes fx-sparkle-blink {
    0%, 100% { opacity: 0; transform: scale(0.3); }
    50%      { opacity: 1; transform: scale(1.2); }
}
.fx-sparkle {
    position: absolute;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 10px 2px rgba(255,255,255,0.9), 0 0 20px 6px rgba(253,224,71,0.6);
    animation: fx-sparkle-blink ease-in-out infinite;
    will-change: transform, opacity;
}

@keyframes fx-firework-burst {
    0%   { transform: translate(-50%, -50%) scale(0); opacity: 1; }
    60%  { opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
}
.fx-firework {
    position: absolute;
    width: 180px;
    height: 180px;
    transform: translate(-50%, -50%);
    animation: fx-firework-burst 1.4s ease-out forwards;
}
.fx-firework-particle {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 4px;
    height: 80px;
    border-radius: 4px;
    transform-origin: 50% 0;
    box-shadow: 0 0 8px currentColor;
    opacity: 0.95;
}

@keyframes fx-spotlight-rotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
}
.fx-spotlight {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 180vmax;
    height: 180vmax;
    background: conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.08) 20deg, transparent 60deg, transparent 180deg, rgba(253,224,71,0.08) 200deg, transparent 240deg, transparent 360deg);
    animation: fx-spotlight-rotate 18s linear infinite;
    mix-blend-mode: screen;
}
.fx-spotlight--alt {
    animation-duration: 26s;
    animation-direction: reverse;
    opacity: 0.6;
}

@keyframes fx-radial-pulse {
    0%, 100% { opacity: 0.5; }
    50%      { opacity: 1; }
}
.fx-radial-pulse {
    background:
        radial-gradient(circle at 20% 20%, rgba(253,224,71,0.18), transparent 35%),
        radial-gradient(circle at 80% 70%, rgba(248,113,113,0.25), transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 60%);
    animation: fx-radial-pulse 4s ease-in-out infinite;
}
`;
