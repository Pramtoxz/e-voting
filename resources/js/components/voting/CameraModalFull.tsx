import { useEffect, useRef, useState } from 'react';
import { Camera, ChevronDown, RefreshCcw, Smile, X } from 'lucide-react';
import Button from '@/components/Button';
import { useCameraLogic } from '@/hooks/voting/useCameraLogic';

interface CameraModalFullProps {
    show: boolean;
    onClose: () => void;
    onCapture: (file: File, preview: string) => void;
    pemiraYear: string;
}

export default function CameraModalFull({ show, onClose, onCapture, pemiraYear }: CameraModalFullProps) {
    const modalContentRef = useRef<HTMLDivElement>(null);
    const captureBarRef = useRef<HTMLDivElement>(null);
    const [showScrollHint, setShowScrollHint] = useState(false);

    const {
        videoRef,
        canvasRef,
        cameraContainerRef,
        cameraActive,
        isCountingDown,
        countDown,
        isTakingPicture,
        initCamera,
        stopCamera,
        startCountDown,
    } = useCameraLogic({
        pemiraYear,
        onPhotoCapture: (file, preview) => {
            onCapture(file, preview);
            stopCamera();
            onClose();
        },
    });

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                initCamera();
            }, 800);
        }

        return () => {
            stopCamera();
        };
    }, [show]);

    // Deteksi apakah tombol foto tertutup (perlu scroll)
    useEffect(() => {
        if (!show || !cameraActive) {
            setShowScrollHint(false);
            return;
        }

        const container = modalContentRef.current;
        const bar = captureBarRef.current;
        if (!container || !bar) return;

        const check = () => {
            const containerRect = container.getBoundingClientRect();
            const barRect = bar.getBoundingClientRect();
            // Tombol tertutup kalau bawahnya melewati bawah container yang scrollable
            const hidden = barRect.bottom > containerRect.bottom + 4;
            setShowScrollHint(hidden);
        };

        check();
        const onScroll = () => check();
        container.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', check);
        const interval = setInterval(check, 500);

        return () => {
            container.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', check);
            clearInterval(interval);
        };
    }, [show, cameraActive]);

    const scrollToCapture = () => {
        captureBarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    if (!show) return null;

    return (
        <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div ref={modalContentRef} className="camera-modal-content relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg bg-white">
                <div className="flex items-center justify-between border-b border-gray-200 p-4">
                    <h3 className="text-lg font-semibold text-gray-800">Ambil Foto Selfi</h3>
                    <button onClick={onClose} className="rounded-full p-1 transition-colors hover:bg-gray-200">
                        <X className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                <div className="p-4">
                    {cameraActive && (
                        <div className="camera-container mb-4" ref={cameraContainerRef}>
                            <div className="relative mb-3">
                                <video ref={videoRef} autoPlay playsInline muted className="hidden" width="1280" height="720" />
                                <canvas ref={canvasRef} className="w-full rounded-lg" style={{ minHeight: '320px' }}></canvas>

                                {isTakingPicture && <div className="animate-flash absolute inset-0 bg-white"></div>}

                                {isCountingDown && (
                                    <div className="bg-opacity-30 absolute inset-0 flex items-center justify-center bg-black">
                                        <div className="flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-red-600 text-6xl font-bold text-white">
                                            {countDown}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Instruksi */}
                            <div className="mt-2 rounded-lg bg-gray-100 p-2">
                                <p className="flex items-center justify-center text-center text-sm font-medium text-gray-700">
                                    <Smile className="mr-1 h-4 w-4 text-red-600" />
                                    Tips Pengambilan Foto:
                                </p>
                                <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-gray-600">
                                    <li>Pastikan wajah Anda berada di dalam lingkaran panduan</li>
                                    <li>Gunakan pencahayaan yang cukup agar wajah terlihat jelas</li>
                                    <li>Posisikan kamera sejajar dengan wajah Anda</li>
                                    <li>Tersenyum dan bersiaplah saat hitung mundur dimulai</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {!cameraActive && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-red-700"></div>
                            <p className="text-gray-600">Memuat kamera...</p>
                        </div>
                    )}
                </div>

                <div ref={captureBarRef} className="flex justify-center border-t border-gray-200 p-4">
                    {cameraActive && (
                        <div className="flex items-center space-x-4">
                            <Button
                                className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700"
                                onClick={startCountDown}
                                disabled={isCountingDown}
                            >
                                <Camera className="h-6 w-6" />
                            </Button>

                            <Button
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-700"
                                onClick={() => {
                                    stopCamera();
                                    initCamera();
                                }}
                            >
                                <RefreshCcw className="h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Hint scroll ke tombol foto — muncul bila tombol tertutup viewport */}
            {showScrollHint && (
                <button
                    type="button"
                    onClick={scrollToCapture}
                    className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-900/40 transition hover:bg-red-700 animate-scroll-hint"
                >
                    <ChevronDown className="h-4 w-4 animate-bounce" />
                    Scroll ke tombol foto
                </button>
            )}

            <style
                dangerouslySetInnerHTML={{
                    __html: `
              @keyframes flash {
                0% { opacity: 0; }
                50% { opacity: 1; }
                100% { opacity: 0; }
              }
              
              .animate-flash {
                animation: flash 0.5s ease-out;
              }

              @keyframes scroll-hint-pulse {
                0%, 100% { transform: translate(-50%, 0) scale(1); box-shadow: 0 10px 25px rgba(127, 29, 29, 0.4); }
                50%      { transform: translate(-50%, -4px) scale(1.04); box-shadow: 0 14px 30px rgba(127, 29, 29, 0.6); }
              }

              .animate-scroll-hint {
                animation: scroll-hint-pulse 1.6s ease-in-out infinite;
              }
            `,
                }}
            />
        </div>
    );
}
