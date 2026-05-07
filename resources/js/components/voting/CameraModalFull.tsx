import { useEffect } from 'react';
import { Camera, RefreshCcw, Smile, X } from 'lucide-react';
import Button from '@/components/Button';
import { useCameraLogic } from '@/hooks/voting/useCameraLogic';

interface CameraModalFullProps {
    show: boolean;
    onClose: () => void;
    onCapture: (file: File, preview: string) => void;
    pemiraYear: string;
}

export default function CameraModalFull({ show, onClose, onCapture, pemiraYear }: CameraModalFullProps) {
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

    if (!show) return null;

    return (
        <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="camera-modal-content relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg bg-white">
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

                <div className="flex justify-center border-t border-gray-200 p-4">
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
            `,
                }}
            />
        </div>
    );
}
