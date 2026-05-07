interface CountdownOverlayProps {
    show: boolean;
    countdown: number;
}

export default function CountdownOverlay({ show, countdown }: CountdownOverlayProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="text-center">
                <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full border-8 border-red-600 bg-white">
                    <span className="text-6xl font-bold text-red-600">{countdown}</span>
                </div>
                <p className="text-xl font-semibold text-white">Memproses login...</p>
            </div>
        </div>
    );
}
