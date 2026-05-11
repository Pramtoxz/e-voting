import { Loader2 } from 'lucide-react';

interface CountdownOverlayProps {
    show: boolean;
    countdown: number;
}

export default function CountdownOverlay({ show, countdown }: CountdownOverlayProps) {
    if (!show) return null;

    const isProcessing = countdown <= 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="text-center">
                <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full border-8 border-red-600 bg-white">
                    {isProcessing ? (
                        <Loader2 className="h-16 w-16 animate-spin text-red-600" />
                    ) : (
                        <span className="text-6xl font-bold text-red-600">{countdown}</span>
                    )}
                </div>
                <p className="text-xl font-semibold text-white">
                    {isProcessing ? 'Memverifikasi akun...' : 'Memproses login...'}
                </p>
            </div>
        </div>
    );
}
