import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

interface CountdownOverlayProps {
    show: boolean;
    countdown: number;
}

export default function CountdownOverlay({ show, countdown }: CountdownOverlayProps) {
    const [animationData, setAnimationData] = useState<unknown>(null);

    useEffect(() => {
        if (!show || animationData) return;
        fetch('/animation/loading.json')
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch((err) => console.error('Gagal memuat animasi loading:', err));
    }, [show, animationData]);

    if (!show) return null;

    const isProcessing = countdown <= 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="text-center">
                <div className="mx-auto mb-4 flex h-48 w-48 items-center justify-center">
                    {animationData ? (
                        <Lottie animationData={animationData} loop autoplay className="h-full w-full" />
                    ) : (
                        <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-red-500" />
                    )}
                </div>
                <p className="text-xl font-semibold text-white">{isProcessing ? 'Memverifikasi akun...' : 'Memproses login...'}</p>
            </div>
        </div>
    );
}
