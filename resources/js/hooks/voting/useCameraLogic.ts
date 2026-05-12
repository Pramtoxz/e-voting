import { useRef, useState, useEffect } from 'react';

interface UseCameraLogicProps {
    pemiraYear: string;
    onPhotoCapture: (file: File, preview: string) => void;
}

export function useCameraLogic({ pemiraYear, onPhotoCapture }: UseCameraLogicProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cameraContainerRef = useRef<HTMLDivElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const animationRef = useRef<number>(0);

    const [cameraActive, setCameraActive] = useState(false);
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [countDown, setCountDown] = useState(3);
    const [isTakingPicture, setIsTakingPicture] = useState(false);

    const stopCamera = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = 0;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }

        setCameraActive(false);
    };

    const drawPhotoFrame = (context: CanvasRenderingContext2D, width: number, height: number) => {
        context.save();

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.35;

        context.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        context.lineWidth = 2;
        context.setLineDash([5, 5]);
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        context.stroke();
        context.setLineDash([]);

        // Teks panduan standar
        context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        context.fillRect(centerX - 60, centerY + radius - 28, 120, 26);
        context.font = '14px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText('Posisikan Wajah', centerX, centerY + radius - 10);

        context.lineWidth = 6;
        context.strokeStyle = 'rgba(220, 38, 38, 0.8)';
        context.beginPath();
        context.moveTo(10, 40);
        context.lineTo(10, 10);
        context.lineTo(40, 10);
        context.moveTo(width - 10, 40);
        context.lineTo(width - 10, 10);
        context.lineTo(width - 40, 10);
        context.moveTo(10, height - 40);
        context.lineTo(10, height - 10);
        context.lineTo(40, height - 10);
        context.moveTo(width - 10, height - 40);
        context.lineTo(width - 10, height - 10);
        context.lineTo(width - 40, height - 10);
        context.stroke();
        context.restore();
    };

    const drawInfoText = (context: CanvasRenderingContext2D, width: number, height: number) => {
        context.fillStyle = 'rgba(0, 0, 0, 0.6)';
        context.fillRect(0, 0, width, 30);
        context.font = 'bold 14px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText(`PEMIRA ${pemiraYear} - Bukti Voting`, width / 2, 20);

        context.fillStyle = 'rgba(0, 0, 0, 0.6)';
        context.fillRect(0, height - 30, width, 30);
        const date = new Date().toLocaleString('id-ID');
        context.font = '12px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText(date, width / 2, height - 12);
    };

    const renderCanvas = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        if (video.readyState < 2) {
            animationRef.current = requestAnimationFrame(renderCanvas);
            return;
        }

        const container = canvas.parentElement;
        if (container) {
            const containerWidth = container.clientWidth;
            const videoRatio = video.videoWidth / video.videoHeight;

            // Aspect ratio canvas adaptif: portrait untuk kamera HP, landscape untuk webcam desktop
            const canvasRatio = videoRatio < 1 ? 3 / 4 : 4 / 3;
            canvas.width = containerWidth;
            canvas.height = containerWidth / canvasRatio;

            // Cover crop: crop video supaya fill canvas tanpa stretch
            let sourceX = 0;
            let sourceY = 0;
            let sourceWidth = video.videoWidth;
            let sourceHeight = video.videoHeight;

            if (videoRatio > canvasRatio) {
                // Video lebih lebar — crop kiri-kanan
                sourceWidth = video.videoHeight * canvasRatio;
                sourceX = (video.videoWidth - sourceWidth) / 2;
            } else {
                // Video lebih tinggi — crop atas-bawah
                sourceHeight = video.videoWidth / canvasRatio;
                sourceY = (video.videoHeight - sourceHeight) / 2;
            }

            // Flip horizontal untuk preview (agar tidak mirror)
            context.save();
            context.scale(-1, 1);
            context.drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight, -canvas.width, 0, canvas.width, canvas.height);
            context.restore();

            drawPhotoFrame(context, canvas.width, canvas.height);
            drawInfoText(context, canvas.width, canvas.height);
        }

        animationRef.current = requestAnimationFrame(renderCanvas);
    };

    const startCanvasPreview = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        if (!cameraActive) return;
        renderCanvas();
    };

    const startCamera = async () => {
        if (streamRef.current) {
            stopCamera();
        }

        const constraints = {
            video: {
                facingMode: 'user',
                width: { ideal: 1280 },
                height: { ideal: 720 },
            },
            audio: false,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (!videoRef.current) {
            throw new Error('Video element belum siap');
        }

        videoRef.current.srcObject = stream;
        streamRef.current = stream;

        return new Promise<void>((resolve, reject) => {
            if (!videoRef.current) {
                reject(new Error('Video element hilang'));
                return;
            }

            videoRef.current.onloadedmetadata = () => {
                if (!videoRef.current) {
                    reject(new Error('Video element hilang setelah metadata loaded'));
                    return;
                }

                videoRef.current
                    .play()
                    .then(() => {
                        setCameraActive(true);
                        setTimeout(() => {
                            startCanvasPreview();
                            resolve();
                        }, 300);
                    })
                    .catch((playError) => {
                        reject(playError);
                    });
            };

            setTimeout(() => {
                if (!cameraActive) {
                    reject(new Error('Timeout memuat video'));
                }
            }, 5000);
        });
    };

    const startCameraAlternative = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        });

        const existingVideo = videoRef.current;

        if (!existingVideo) {
            if (!cameraContainerRef.current) {
                const videoElement = document.createElement('video');
                videoElement.autoplay = true;
                videoElement.playsInline = true;
                videoElement.muted = true;
                videoElement.className = 'hidden';
                videoElement.width = 1280;
                videoElement.height = 720;

                const modalContent = document.querySelector('.camera-modal-content');
                if (modalContent) {
                    modalContent.appendChild(videoElement);
                } else {
                    document.body.appendChild(videoElement);
                }

                videoElement.srcObject = stream;
                streamRef.current = stream;

                await videoElement.play();
                setCameraActive(true);

                setTimeout(() => {
                    if (canvasRef.current) {
                        startEmergencyCanvasPreview(videoElement);
                    }
                }, 500);

                return;
            }

            const videoElement = document.createElement('video');
            videoElement.autoplay = true;
            videoElement.playsInline = true;
            videoElement.muted = true;
            videoElement.className = 'hidden';
            videoElement.width = 1280;
            videoElement.height = 720;

            cameraContainerRef.current.appendChild(videoElement);
            videoElement.srcObject = stream;
            streamRef.current = stream;

            await videoElement.play();
            setCameraActive(true);

            setTimeout(() => {
                if (canvasRef.current) {
                    startEmergencyCanvasPreview(videoElement);
                }
            }, 500);
        } else {
            existingVideo.srcObject = stream;
            streamRef.current = stream;
            await existingVideo.play();
            setCameraActive(true);

            setTimeout(() => {
                startCanvasPreview();
            }, 300);
        }
    };

    const startEmergencyCanvasPreview = (videoElement: HTMLVideoElement) => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        const setCanvasSize = () => {
            const width = canvas.clientWidth || 320;
            const vw = videoElement.videoWidth || 1280;
            const vh = videoElement.videoHeight || 720;
            const videoRatio = vw / vh;
            const canvasRatio = videoRatio < 1 ? 3 / 4 : 4 / 3;
            canvas.width = width;
            canvas.height = width / canvasRatio;
            return { videoRatio, canvasRatio };
        };

        const renderEmergencyLoop = () => {
            if (!canvasRef.current) return;

            const { videoRatio, canvasRatio } = setCanvasSize();

            // Cover crop supaya tidak gepeng
            let sourceX = 0;
            let sourceY = 0;
            let sourceWidth = videoElement.videoWidth || 1280;
            let sourceHeight = videoElement.videoHeight || 720;

            if (videoRatio > canvasRatio) {
                sourceWidth = sourceHeight * canvasRatio;
                sourceX = ((videoElement.videoWidth || 1280) - sourceWidth) / 2;
            } else {
                sourceHeight = sourceWidth / canvasRatio;
                sourceY = ((videoElement.videoHeight || 720) - sourceHeight) / 2;
            }

            // Flip horizontal untuk preview (agar tidak mirror)
            context.save();
            context.scale(-1, 1);
            context.drawImage(videoElement, sourceX, sourceY, sourceWidth, sourceHeight, -canvas.width, 0, canvas.width, canvas.height);
            context.restore();

            drawPhotoFrame(context, canvas.width, canvas.height);
            drawInfoText(context, canvas.width, canvas.height);

            animationRef.current = requestAnimationFrame(renderEmergencyLoop);
        };

        renderEmergencyLoop();
    };

    const initCamera = async () => {
        try {
            await startCamera();
        } catch (error) {
            console.log('Metode 1 gagal, mencoba metode alternatif...', error);
            setTimeout(async () => {
                try {
                    await startCameraAlternative();
                } catch (err2) {
                    console.error('Semua metode akses kamera gagal:', err2);
                    alert('Tidak dapat mengakses kamera. Pastikan browser Anda mendukung akses kamera dan Anda telah memberikan izin.');
                }
            }, 1000);
        }
    };

    const capturePhoto = () => {
        if (!canvasRef.current) return;

        setIsTakingPicture(true);

        setTimeout(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const file = new File([blob], 'selfi_bukti.jpg', { type: 'image/jpeg' });
                        const imageUrl = URL.createObjectURL(blob);
                        onPhotoCapture(file, imageUrl);
                        setIsTakingPicture(false);
                    }
                },
                'image/jpeg',
                0.95,
            );
        }, 200);
    };

    const startCountDown = () => {
        setIsCountingDown(true);
        setCountDown(3);

        try {
            new Audio('/sounds/beep.mp3').play().catch(() => console.log('Audio play failed'));
        } catch {
            console.log('Audio not supported');
        }

        const interval = setInterval(() => {
            setCountDown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsCountingDown(false);
                    try {
                        new Audio('/sounds/camera-shutter.mp3').play().catch(() => console.log('Audio play failed'));
                    } catch {
                        console.log('Audio not supported');
                    }
                    capturePhoto();
                    return 0;
                }
                try {
                    new Audio('/sounds/beep.mp3').play().catch(() => console.log('Audio play failed'));
                } catch {
                    console.log('Audio not supported');
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            stopCamera();
        };
    }, []);

    return {
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
    };
}
