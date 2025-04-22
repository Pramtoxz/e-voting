import React, { useState, useRef, useEffect } from "react"
import { Head, useForm } from "@inertiajs/react"
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Info, Shield, User, Vote, Camera, RefreshCcw, X, Smile } from "lucide-react"
import Layout from "@/Layout/MainLayout"
import Button from "@/components/Button"
import Card from "@/components/Card"

interface Kandidat {
  id: number
  nomor_urut: string
  nama: string
  nama_presiden: string
  nomor_bp_presiden: string
  nama_wakil: string
  nomor_bp_wakil: string
  foto_presiden: string
  foto_wakil: string
  visi: string
  misi: string
}

interface IndexProps {
  kandidat: Kandidat[]
  auth: {
    user: {
      id: number
      name: string
      email: string
      username: string
    }
  }
}

export default function Index({ kandidat, auth }: IndexProps) {
  const [selectedKandidat, setSelectedKandidat] = useState<Kandidat | null>(null)
  const [votingStep, setVotingStep] = useState(1) // 1: Select, 2: Upload Bukti, 3: Confirm
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [countDown, setCountDown] = useState(3)
  const [isTakingPicture, setIsTakingPicture] = useState(false)
  const [showCameraModal, setShowCameraModal] = useState(false)
  const [canvasFilter, setCanvasFilter] = useState<string>("normal") // normal, sepia, grayscale, invert
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cameraContainerRef = useRef<HTMLDivElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef<number>(0)

  // State untuk selfi action
  const [selfiAction, setSelfiAction] = useState<string>("normal") // normal, peace, tongue, wink, love
  const [useSticker, setUseSticker] = useState<boolean>(false)
  const [selectedSticker, setSelectedSticker] = useState<string>("heart")
  const [countdownStyle, setCountdownStyle] = useState<string>("bubble") // bubble, flip, bounce

  const { data, setData, post, processing, errors, reset } = useForm({
    nomor_urut: "",
    foto_bukti: null as File | null,
  })

  const handleSelectKandidat = (kandidat: Kandidat) => {
    setSelectedKandidat(kandidat)
    setData("nomor_urut", kandidat.nomor_urut)
  }

  const handleNextStep = () => {
    if (votingStep === 1 && selectedKandidat) {
      setVotingStep(2) // Go to upload bukti step
    } else if (votingStep === 2 && data.foto_bukti) {
      setVotingStep(3) // Go to confirmation step
      // Jika kamera masih aktif, matikan
      stopCamera()
    }
  }

  const handlePrevStep = () => {
    if (votingStep === 3) {
      setVotingStep(2)
    } else if (votingStep === 2) {
      setVotingStep(1)
      // Jika kamera masih aktif, matikan
      stopCamera()
    }
  }

  // Fungsi untuk menampilkan modal kamera
  const openCameraModal = () => {
    setShowCameraModal(true);
    setCameraActive(false); // Reset kamera status
    
    // Mulai kamera setelah modal benar-benar muncul
    setTimeout(() => {
      initCamera();
    }, 800);
  }
  
  // Fungsi untuk mencoba beberapa metode akses kamera
  const initCamera = async () => {
    try {
      // Metode 1: getUserMedia standar
      await startCamera();
    } catch (error) {
      console.log("Metode 1 gagal, mencoba metode alternatif...", error);
      
      // Metode 2: Coba dengan delay lebih lama
      setTimeout(async () => {
        try {
          await startCameraAlternative();
        } catch (err2) {
          console.error("Semua metode akses kamera gagal:", err2);
          alert("Tidak dapat mengakses kamera. Pastikan browser Anda mendukung akses kamera dan Anda telah memberikan izin.");
        }
      }, 1000);
    }
  }

  // Fungsi untuk menutup modal kamera
  const closeCameraModal = () => {
    stopCamera();
    setShowCameraModal(false);
  }

  // Fungsi untuk memulai kamera dengan metode standar
  const startCamera = async () => {
    // Reset state kamera terlebih dahulu
    if (streamRef.current) {
      stopCamera();
    }
    
    console.log("Memulai akses kamera dengan metode standar...");
    
    const constraints = {
      video: { facingMode: "user" },
      audio: false
    };
    
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    
    if (!videoRef.current) {
      throw new Error("Video element belum siap");
    }
    
    videoRef.current.srcObject = stream;
    streamRef.current = stream;
    
    return new Promise<void>((resolve, reject) => {
      if (!videoRef.current) {
        reject(new Error("Video element hilang"));
        return;
      }
      
      // Handler saat video metadata loaded
      videoRef.current.onloadedmetadata = () => {
        if (!videoRef.current) {
          reject(new Error("Video element hilang setelah metadata loaded"));
          return;
        }
        
        videoRef.current.play()
          .then(() => {
            setCameraActive(true);
            // Mulai preview setelah video benar-benar berjalan
            setTimeout(() => {
              startCanvasPreview();
              resolve();
            }, 300);
          })
          .catch(playError => {
            reject(playError);
          });
      };
      
      // Timeout jika video tidak pernah dimuat
      setTimeout(() => {
        if (!cameraActive) {
          reject(new Error("Timeout memuat video"));
        }
      }, 5000);
    });
  }
  
  // Fungsi alternatif untuk memulai kamera jika metode standar gagal
  const startCameraAlternative = async () => {
    console.log("Mencoba metode alternatif akses kamera...");
    
    // Coba dengan constraint minimal
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });
    
    // Buat video element baru secara manual jika ref asli bermasalah
    const existingVideo = videoRef.current;
    
    if (!existingVideo) {
      console.log("Membuat video element baru karena ref tidak tersedia");
      
      // Gunakan cameraContainerRef alih-alih querySelector
      if (!cameraContainerRef.current) {
        console.error("Container kamera ref tidak tersedia", cameraContainerRef);
        
        // Fallback: coba buat video element dan atur ke body jika tidak ada container
        const videoElement = document.createElement('video');
        videoElement.autoplay = true;
        videoElement.playsInline = true;
        videoElement.muted = true;
        videoElement.className = 'hidden';
        videoElement.width = 1280;
        videoElement.height = 720;
        
        // Coba dapatkan container dengan cara lain
        const modalContent = document.querySelector('.camera-modal-content');
        if (modalContent) {
          modalContent.appendChild(videoElement);
        } else {
          // Last resort - tambahkan ke body
          document.body.appendChild(videoElement);
        }
        
        // Set srcObject
        videoElement.srcObject = stream;
        streamRef.current = stream;
        
        try {
          await videoElement.play();
          setCameraActive(true);
          
          // Mulai preview dengan videoElement
          setTimeout(() => {
            if (canvasRef.current) {
              startEmergencyCanvasPreview(videoElement);
            }
          }, 500);
          
        } catch (err) {
          console.error("Gagal memulai playback video:", err);
          throw new Error(`Gagal memutar video: ${err}`);
        }
        
        return;
      }
      
      // Buat element video baru
      const videoElement = document.createElement('video');
      videoElement.autoplay = true;
      videoElement.playsInline = true;
      videoElement.muted = true;
      videoElement.className = 'hidden';
      videoElement.width = 1280;
      videoElement.height = 720;
      
      // Tambahkan ke container dengan ref
      cameraContainerRef.current.appendChild(videoElement);
      
      // Set srcObject
      videoElement.srcObject = stream;
      streamRef.current = stream;
      
      // Play video
      try {
        await videoElement.play();
        
        // Set state active
        setCameraActive(true);
        
        // Mulai preview
        setTimeout(() => {
          if (canvasRef.current) {
            startEmergencyCanvasPreview(videoElement);
          }
        }, 500);
        
      } catch (err) {
        throw new Error(`Gagal memutar video: ${err}`);
      }
    } else {
      // Gunakan existing video ref
      existingVideo.srcObject = stream;
      streamRef.current = stream;
      
      // Play dan wait
      await existingVideo.play();
      setCameraActive(true);
      
      // Mulai preview
      setTimeout(() => {
        startCanvasPreview();
      }, 300);
    }
  }

  // Fungsi untuk menghentikan kamera
  const stopCamera = () => {
    // Hentikan animasi canvas
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
    }
    
    // Hentikan stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setCameraActive(false);
  }

  // Fungsi untuk memulai preview canvas
  const startCanvasPreview = () => {
    console.log("Memulai canvas preview");
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Pastikan kamera sudah aktif
    if (!cameraActive) {
      console.log("Kamera belum aktif, menunda preview");
      return;
    }
    
    renderCanvas();
  }

  // Fungsi untuk render canvas secara real-time
  const renderCanvas = () => {
    if (!videoRef.current || !canvasRef.current) {
      console.log("Video atau canvas ref tidak tersedia");
      return;
    }
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) {
      console.log("Tidak dapat memperoleh context canvas");
      return;
    }
    
    // Cek apakah video sudah ready
    if (video.readyState < 2) {
      console.log("Video belum siap, mencoba lagi...");
      animationRef.current = requestAnimationFrame(renderCanvas);
      return;
    }
    
    // Set ukuran canvas sesuai dengan ukuran kontainer
    const container = canvas.parentElement;
    if (container) {
      const containerWidth = container.clientWidth;
      
      // Set ukuran canvas eksplisit
      canvas.width = containerWidth;
      canvas.height = containerWidth * 0.75; // Rasio 4:3
      
      // Gambar video ke canvas
      const videoRatio = video.videoWidth / video.videoHeight;
      let drawWidth = canvas.width;
      let drawHeight = canvas.width / videoRatio;
      const offsetY = 0;
      
      // Jika gambar video terlalu tinggi, atur ulang dimensi
      if (drawHeight > canvas.height) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * videoRatio;
      }
      
      // Center video pada canvas
      const offsetX = (canvas.width - drawWidth) / 2;
      
      // Draw video
      context.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
      
      // Terapkan filter sesuai dengan yang dipilih
      if (canvasFilter !== "normal") {
        // Simpan filter yang sedang digunakan
        const currentFilter = canvasFilter;
        
        // Save state, apply filter, redraw, restore state
        context.save();
        
        switch (currentFilter) {
          case "sepia":
            context.filter = "sepia(100%)";
            break;
          case "grayscale":
            context.filter = "grayscale(100%)";
            break;
          case "invert":
            context.filter = "invert(80%)";
            break;
        }
        
        context.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
        context.restore();
      }
      
      // Gambar bingkai foto
      drawPhotoFrame(context, canvas.width, canvas.height);
      
      // Gambar teks informasi
      drawInfoText(context, canvas.width, canvas.height);
    } else {
      console.log("Container canvas tidak ditemukan");
    }
    
    // Lanjutkan loop animasi
    animationRef.current = requestAnimationFrame(renderCanvas);
  }
  
  // Fungsi untuk menggambar bingkai foto
  const drawPhotoFrame = (context: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear any previous overlay
    context.save()
    
    // Lingkaran panduan
    context.beginPath()
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) * 0.35
    
    // Buat lingkaran guide
    context.strokeStyle = 'rgba(255, 255, 255, 0.8)'
    context.lineWidth = 2
    context.setLineDash([5, 5])
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    context.stroke()
    
    // Reset line dash
    context.setLineDash([])
    
    // Draw selfi action guide based on selected action
    if (selfiAction !== 'normal') {
      const actionText = getActionText(selfiAction)
      
      // Teks panduan di tengah lingkaran
      context.fillStyle = 'rgba(0, 0, 0, 0.6)'
      context.fillRect(centerX - 80, centerY + radius - 28, 160, 26)
      context.font = '14px Arial'
      context.fillStyle = 'white'
      context.textAlign = 'center'
      context.fillText(actionText, centerX, centerY + radius - 10)
      
      // Draw action illustration
      drawActionIllustration(context, selfiAction, centerX, centerY, radius)
    } else {
      // Teks panduan standar
      context.fillStyle = 'rgba(0, 0, 0, 0.5)'
      context.fillRect(centerX - 60, centerY + radius - 28, 120, 26)
      context.font = '14px Arial'
      context.fillStyle = 'white'
      context.textAlign = 'center'
      context.fillText('Posisikan Wajah', centerX, centerY + radius - 10)
    }
    
    // Draw stickers if enabled
    if (useSticker) {
      drawSticker(context, selectedSticker, centerX, centerY, radius)
    }
    
    // Bingkai foto berdasarkan action
    context.lineWidth = 6
    
    // Warna frame sesuai dengan aksi
    let frameColor = 'rgba(220, 38, 38, 0.8)' // Default red
    
    switch(selfiAction) {
      case 'peace':
        frameColor = 'rgba(59, 130, 246, 0.8)' // Blue
        break
      case 'tongue':
        frameColor = 'rgba(234, 88, 12, 0.8)' // Orange
        break
      case 'wink':
        frameColor = 'rgba(5, 150, 105, 0.8)' // Green
        break
      case 'love':
        frameColor = 'rgba(236, 72, 153, 0.8)' // Pink
        break
    }
    
    context.strokeStyle = frameColor
    context.beginPath()
    
    // Gambar sudut kiri atas
    context.moveTo(10, 40)
    context.lineTo(10, 10)
    context.lineTo(40, 10)
    
    // Gambar sudut kanan atas
    context.moveTo(width - 10, 40)
    context.lineTo(width - 10, 10)
    context.lineTo(width - 40, 10)
    
    // Gambar sudut kiri bawah
    context.moveTo(10, height - 40)
    context.lineTo(10, height - 10)
    context.lineTo(40, height - 10)
    
    // Gambar sudut kanan bawah
    context.moveTo(width - 10, height - 40)
    context.lineTo(width - 10, height - 10)
    context.lineTo(width - 40, height - 10)
    
    context.stroke()
    context.restore()
  }
  
  // Fungsi untuk mendapatkan teks action
  const getActionText = (action: string): string => {
    switch(action) {
      case 'peace':
        return 'Tunjukkan Jari Peace! ✌️'
      case 'tongue':
        return 'Keluarkan Lidah! 😜'
      case 'wink':
        return 'Kedipkan Mata! 😉'
      case 'love':
        return 'Tunjukkan Cinta! 💕'
      default:
        return 'Posisikan Wajah'
    }
  }
  
  // Fungsi untuk menggambar teks informasi
  const drawInfoText = (context: CanvasRenderingContext2D, width: number, height: number) => {
    // Header
    context.fillStyle = 'rgba(0, 0, 0, 0.6)'
    context.fillRect(0, 0, width, 30)
    
    context.font = 'bold 14px Arial'
    context.fillStyle = 'white'
    context.textAlign = 'center'
    context.fillText('PEMIRA 2025 - Bukti Voting', width / 2, 20)
    
    // Footer dengan timestamp
    context.fillStyle = 'rgba(0, 0, 0, 0.6)'
    context.fillRect(0, height - 30, width, 30)
    
    const date = new Date().toLocaleString('id-ID')
    context.font = '12px Arial'
    context.fillStyle = 'white'
    context.textAlign = 'center'
    context.fillText(date, width / 2, height - 12)
  }

  // Fungsi untuk menggambar ilustrasi aksi
  const drawActionIllustration = (context: CanvasRenderingContext2D, action: string, centerX: number, centerY: number, radius: number) => {
    // Draw illustration based on action
    context.save()
    
    switch(action) {
      case 'peace':
        // Peace sign illustration
        context.strokeStyle = 'rgba(255, 255, 255, 0.7)'
        context.lineWidth = 3
        context.beginPath()
        context.moveTo(centerX + radius / 2, centerY - radius / 2)
        context.lineTo(centerX + radius / 2, centerY - radius / 3)
        context.moveTo(centerX + radius / 3, centerY - radius / 2)
        context.lineTo(centerX + radius / 3, centerY - radius / 3)
        context.stroke()
        break
        
      case 'tongue':
        // Tongue out illustration
        context.fillStyle = 'rgba(255, 80, 80, 0.7)'
        context.beginPath()
        context.arc(centerX + radius / 2, centerY, radius / 8, 0, Math.PI, false)
        context.fill()
        break
        
      case 'wink':
        // Wink illustration
        context.strokeStyle = 'rgba(255, 255, 255, 0.7)'
        context.lineWidth = 3
        context.beginPath()
        context.arc(centerX + radius / 2, centerY - radius / 4, radius / 10, 0, Math.PI, true)
        context.stroke()
        break
        
      case 'love': {
        // Heart illustration
        context.fillStyle = 'rgba(255, 80, 80, 0.7)'
        const heartSize = radius / 5
        drawHeart(context, centerX + radius / 2, centerY - radius / 4, heartSize)
        break
      }
    }
    
    context.restore()
  }
  
  // Fungsi untuk menggambar hati
  const drawHeart = (context: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    context.beginPath()
    context.moveTo(x, y + size / 4)
    
    // Left curve
    context.bezierCurveTo(
      x, y, 
      x - size / 2, y, 
      x - size / 2, y + size / 4
    )
    
    // Bottom left curve
    context.bezierCurveTo(
      x - size / 2, y + size / 2, 
      x, y + size, 
      x, y + size
    )
    
    // Bottom right curve
    context.bezierCurveTo(
      x, y + size, 
      x + size / 2, y + size / 2, 
      x + size / 2, y + size / 4
    )
    
    // Right curve
    context.bezierCurveTo(
      x + size / 2, y, 
      x, y, 
      x, y + size / 4
    )
    
    context.fill()
  }
  
  // Fungsi untuk menggambar stiker
  const drawSticker = (context: CanvasRenderingContext2D, stickerType: string, centerX: number, centerY: number, radius: number) => {
    context.save()
    
    switch(stickerType) {
      case 'heart':
        // Draw heart sticker
        context.fillStyle = 'rgba(255, 0, 0, 0.6)'
        drawHeart(context, centerX - radius / 1.3, centerY - radius / 2, radius / 4)
        break
        
      case 'star':
        // Draw star sticker
        context.fillStyle = 'rgba(255, 215, 0, 0.6)'
        drawStar(context, centerX + radius / 1.3, centerY - radius / 2, radius / 4, 5, 0.5)
        break
        
      case 'crown':
        // Draw crown sticker
        context.fillStyle = 'rgba(255, 215, 0, 0.6)'
        drawCrown(context, centerX, centerY - radius - radius / 10, radius / 2)
        break
        
      case 'thumbs':
        // Draw thumbs up sticker
        context.fillStyle = 'rgba(0, 128, 0, 0.6)'
        drawThumbsUp(context, centerX - radius / 1.3, centerY + radius / 1.5, radius / 3)
        break
    }
    
    context.restore()
  }
  
  // Fungsi untuk menggambar bintang
  const drawStar = (context: CanvasRenderingContext2D, cx: number, cy: number, radius: number, spikes: number, inset: number) => {
    let rot = Math.PI / 2 * 3
    let x = cx
    let y = cy
    const step = Math.PI / spikes
    
    context.beginPath()
    context.moveTo(cx, cy - radius)
    
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * radius
      y = cy + Math.sin(rot) * radius
      context.lineTo(x, y)
      rot += step
      
      x = cx + Math.cos(rot) * radius * inset
      y = cy + Math.sin(rot) * radius * inset
      context.lineTo(x, y)
      rot += step
    }
    
    context.lineTo(cx, cy - radius)
    context.closePath()
    context.fill()
  }
  
  // Fungsi untuk menggambar mahkota
  const drawCrown = (context: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    context.beginPath()
    
    // Base of crown
    context.moveTo(x - size / 2, y + size / 2)
    context.lineTo(x + size / 2, y + size / 2)
    
    // Right spike
    context.lineTo(x + size / 3, y)
    
    // Middle spike
    context.lineTo(x, y - size / 2)
    
    // Left spike
    context.lineTo(x - size / 3, y)
    
    context.closePath()
    context.fill()
  }
  
  // Fungsi untuk menggambar jempol
  const drawThumbsUp = (context: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    context.beginPath()
    
    // Thumb
    context.moveTo(x, y)
    context.lineTo(x + size / 3, y - size / 2)
    context.lineTo(x + size / 2, y - size / 2)
    context.lineTo(x + size / 2, y)
    
    // Base
    context.lineTo(x, y + size / 3)
    
    context.closePath()
    context.fill()
  }

  // Fungsi untuk mengambil foto
  const capturePhoto = () => {
    if (!canvasRef.current) return
    
    setIsTakingPicture(true)
    
    setTimeout(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      
      // Canvas sudah berisi gambar dari preview, tinggal convert ke blob
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "selfi_bukti.jpg", { type: "image/jpeg" })
          
          // Set preview image dan data
          const imageUrl = URL.createObjectURL(blob)
          setPreviewImage(imageUrl)
          setData("foto_bukti", file)
          
          // Matikan kamera setelah mengambil foto
          stopCamera()
          setIsTakingPicture(false)
          
          // Tutup modal kamera setelah foto berhasil diambil
          closeCameraModal()
        }
      }, "image/jpeg", 0.95)
    }, 200) // Berikan sedikit delay untuk efek flash
  }

  // Countdown dengan animasi yang lebih menyenangkan
  const startCountDown = () => {
    setIsCountingDown(true)
    setCountDown(3)
    
    // Sound effect for countdown (optional)
    try {
      new Audio('/sounds/beep.mp3').play().catch(() => console.log('Audio play failed'))
    } catch {
      console.log('Audio not supported')
    }
    
    const interval = setInterval(() => {
      setCountDown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsCountingDown(false)
          // Sound effect for capture
          try {
            new Audio('/sounds/camera-shutter.mp3').play().catch(() => console.log('Audio play failed'))
          } catch {
            console.log('Audio not supported')
          }
          capturePhoto()
          return 0
        }
        // Sound effect for each count
        try {
          new Audio('/sounds/beep.mp3').play().catch(() => console.log('Audio play failed'))
        } catch {
          console.log('Audio not supported')
        }
        return prev - 1
      })
    }, 1000)
  }

  // Cleanup pada unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      stopCamera()
    }
  }, [])

  const handleSubmitVote = () => {
    post(route("voting.store"), {
      onSuccess: () => {
        reset()
        setPreviewImage(null)
      },
    })
  }

  // Fungsi fallback untuk preview canvas dengan video element yang dibuat secara manual
  const startEmergencyCanvasPreview = (videoElement: HTMLVideoElement) => {
    console.log("Memulai emergency canvas preview dengan video element manual");
    
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Gambar frame pertama
    canvas.width = canvas.clientWidth || 320;
    canvas.height = (canvas.clientWidth || 320) * 0.75;
    
    // Mulai loop animasi
    const renderEmergencyLoop = () => {
      if (!canvasRef.current) return;
      
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      drawPhotoFrame(context, canvas.width, canvas.height);
      drawInfoText(context, canvas.width, canvas.height);
      
      animationRef.current = requestAnimationFrame(renderEmergencyLoop);
    };
    
    renderEmergencyLoop();
  }

  return (
    <>
      <Head title="Voting - PEMIRA 2025" />

      <main className="flex-1 bg-white">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-red-700 to-red-800 text-white py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-flex items-center rounded-full border border-white bg-red-700/50 px-3 py-1 text-sm font-semibold">
                <Vote className="mr-1 h-4 w-4" />
                <span>Pemilihan Raya Mahasiswa 2025</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Berikan Suara Anda
              </h1>
              <p className="max-w-[700px] text-red-100 md:text-xl/relaxed">
                Pilih kandidat yang menurut Anda paling tepat untuk memimpin organisasi kemahasiswaan periode 2025.
              </p>
            </div>
          </div>
        </div>

        {/* Voting Steps */}
        <div className="container px-4 md:px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    votingStep >= 1 ? "bg-red-700 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <span className="font-bold">1</span>
                </div>
                <span className="text-sm mt-2">Pilih Kandidat</span>
              </div>
              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div
                  className={`h-full bg-red-700`}
                  style={{ width: votingStep >= 2 ? "100%" : "0%" }}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    votingStep >= 2 ? "bg-red-700 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <span className="font-bold">2</span>
                </div>
                <span className="text-sm mt-2">Upload Bukti</span>
              </div>
              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div
                  className={`h-full bg-red-700`}
                  style={{ width: votingStep >= 3 ? "100%" : "0%" }}
                ></div>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    votingStep >= 3 ? "bg-red-700 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <span className="font-bold">3</span>
                </div>
                <span className="text-sm mt-2">Konfirmasi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Voting Content */}
        <div className="container px-4 md:px-6 py-8">
          {/* Step 1: Pilih Kandidat */}
          {votingStep === 1 && (
            <div className="max-w-5xl mx-auto">
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8 flex items-start">
                <Info className="h-5 w-5 text-red-700 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-700">Informasi Penting</h3>
                  <p className="text-sm text-gray-600">
                    Pemilihan hanya dapat dilakukan satu kali dan tidak dapat diubah. Pastikan Anda memilih dengan
                    bijak. Suara Anda bersifat rahasia dan aman.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-center">Daftar Kandidat</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {kandidat.map((calon) => (
                  <Card
                    key={calon.id}
                    className={`overflow-hidden border-2 transition-all duration-300 hover:shadow-lg ${
                      selectedKandidat?.id === calon.id ? "border-red-700 shadow-md" : "border-gray-200 hover:border-red-200"
                    }`}
                    onClick={() => handleSelectKandidat(calon)}
                  >
                    <div className="aspect-[4/3] relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-red-700/20 to-red-700/0 z-10"></div>
                      <div className="grid grid-cols-2 h-full">
                        <div className="relative">
                          <img
                            src={`/storage/${calon.foto_presiden}`}
                            alt={`Kandidat ${calon.nomor_urut} - ${calon.nama_presiden}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="relative">
                          <img
                            src={`/storage/${calon.foto_wakil}`}
                            alt={`Kandidat ${calon.nomor_urut} - ${calon.nama_wakil}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center font-bold">
                        {calon.nomor_urut}
                      </div>
                      {selectedKandidat?.id === calon.id && (
                        <div className="absolute top-3 left-3 z-20">
                          <div className="bg-green-600 text-white rounded-full p-1">
                            <CheckCircle className="h-6 w-6" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-red-700">{calon.nama}</h3>
                      <div className="grid grid-cols-2 gap-2 mb-4 mt-2">
                        <div>
                          <p className="text-sm font-semibold">{calon.nama_presiden}</p>
                          <p className="text-xs text-muted-foreground">{calon.nomor_bp_presiden}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{calon.nama_wakil}</p>
                          <p className="text-xs text-muted-foreground">{calon.nomor_bp_wakil}</p>
                        </div>
                      </div>
                      <p className="mb-4 text-sm italic line-clamp-2">{calon.visi}</p>
                      <Button
                        variant={selectedKandidat?.id === calon.id ? "default" : "outline"}
                        className={`w-full ${
                          selectedKandidat?.id === calon.id
                            ? "bg-red-700 text-white"
                            : "border-red-700 text-red-700 hover:bg-red-50"
                        }`}
                        onClick={() => handleSelectKandidat(calon)}
                      >
                        {selectedKandidat?.id === calon.id ? "Kandidat Terpilih" : "Pilih Kandidat"}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  className="bg-red-700 hover:bg-red-800 text-white"
                  size="lg"
                  disabled={!selectedKandidat}
                  onClick={handleNextStep}
                >
                  Lanjutkan <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Upload Bukti */}
          {votingStep === 2 && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-600">Bukti Voting</h3>
                  <p className="text-sm text-gray-600">
                    Silakan ambil foto selfi sebagai bukti voting Anda. Ini akan membantu panitia dalam proses validasi suara.
                    Pastikan wajah Anda terlihat jelas.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Ambil Foto Bukti</h2>

                {/* Kandidat yang dipilih */}
                {selectedKandidat && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                        {selectedKandidat.nomor_urut}
                      </div>
                      <div>
                        <h3 className="font-bold text-red-700 text-lg">{selectedKandidat.nama}</h3>
                        <p className="text-sm text-gray-600">
                          {selectedKandidat.nama_presiden} & {selectedKandidat.nama_wakil}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Kamera dan Foto */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foto Bukti Voting</label>
                  
                  {!previewImage ? (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center border-gray-300 bg-gray-50">
                      <Button
                        className="bg-red-600 text-white hover:bg-red-700 py-3 px-4"
                        onClick={openCameraModal}
                      >
                        <Camera className="h-5 w-5 mr-2" />
                        Buka Kamera Selfi
                      </Button>
                      
                      <div className="mt-4 text-xs bg-gray-100 rounded-lg py-2 px-3 mx-auto max-w-md">
                        <p>Anda perlu memberikan izin untuk mengakses kamera</p>
                        <p>Kamera depan akan digunakan untuk mengambil selfi sebagai bukti voting</p>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 rounded-lg p-3 border-gray-300">
                      <div className="relative w-full max-h-64 overflow-hidden rounded-lg mb-3">
                        <img src={previewImage} alt="Preview" className="mx-auto" />
                      </div>
                      <div className="flex justify-center space-x-3">
                        <Button
                          className="text-xs bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200"
                          onClick={() => {
                            setData("foto_bukti", null)
                            setPreviewImage(null)
                            openCameraModal()
                          }}
                        >
                          Ambil Ulang Foto
                        </Button>
                        <Button
                          className="text-xs bg-green-600 text-white hover:bg-green-700"
                          onClick={handleNextStep}
                          disabled={!data.foto_bukti}
                        >
                          Gunakan Foto Ini
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {errors.foto_bukti && (
                    <p className="mt-1 text-sm text-red-600">{errors.foto_bukti}</p>
                  )}
                </div>

                <div className="mt-8 flex justify-between">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                    onClick={handlePrevStep}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Kembali
                  </Button>
                  <Button
                    className="bg-red-700 hover:bg-red-800 text-white"
                    onClick={handleNextStep}
                    disabled={!data.foto_bukti}
                  >
                    Lanjutkan <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Kamera */}
          {showCameraModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
              <div className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto camera-modal-content">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800">Ambil Foto Selfi</h3>
                  <button 
                    onClick={closeCameraModal}
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
                
                <div className="p-4">
                  {/* Tampilan kamera aktif */}
                  {cameraActive && (
                    <div className="mb-4 camera-container" ref={cameraContainerRef}>
                      <div className="relative mb-3">
                        {/* Video kamera (hidden) */}
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          playsInline
                          muted
                          className="hidden"
                          width="1280"
                          height="720"
                        />
                        
                        {/* Canvas untuk preview kamera */}
                        <canvas 
                          ref={canvasRef} 
                          className="w-full rounded-lg"
                          style={{ minHeight: "320px" }}
                        ></canvas>
                        
                        {/* Flash effect */}
                        {isTakingPicture && (
                          <div className="absolute inset-0 bg-white animate-flash"></div>
                        )}
                        
                        {/* Countdown overlay berdasarkan style */}
                        {isCountingDown && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <div className={`text-6xl font-bold text-white ${
                              countdownStyle === 'bubble' 
                                ? 'bg-red-600 h-24 w-24 rounded-full flex items-center justify-center animate-pulse' 
                                : countdownStyle === 'flip' 
                                  ? 'bg-transparent transform animate-flip'
                                  : 'bg-red-600 h-24 w-24 rounded-full flex items-center justify-center animate-bounce'
                            }`}>
                              {countDown}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Selfi Actions */}
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Ekspresi Selfi:</p>
                        <div className="flex justify-center gap-2 flex-wrap">
                          <button 
                            onClick={() => setSelfiAction("normal")}
                            className={`px-3 py-1 rounded-full text-xs ${selfiAction === "normal" 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-200 text-gray-800'}`}
                          >
                            Normal
                          </button>
                          <button 
                            onClick={() => setSelfiAction("peace")}
                            className={`px-3 py-1 rounded-full text-xs ${selfiAction === "peace" 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-200 text-gray-800'}`}
                          >
                            Peace ✌️
                          </button>
                          <button 
                            onClick={() => setSelfiAction("tongue")}
                            className={`px-3 py-1 rounded-full text-xs ${selfiAction === "tongue" 
                              ? 'bg-orange-600 text-white' 
                              : 'bg-gray-200 text-gray-800'}`}
                          >
                            Lidah 😜
                          </button>
                          <button 
                            onClick={() => setSelfiAction("wink")}
                            className={`px-3 py-1 rounded-full text-xs ${selfiAction === "wink" 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-200 text-gray-800'}`}
                          >
                            Kedip 😉
                          </button>
                          <button 
                            onClick={() => setSelfiAction("love")}
                            className={`px-3 py-1 rounded-full text-xs ${selfiAction === "love" 
                              ? 'bg-pink-600 text-white' 
                              : 'bg-gray-200 text-gray-800'}`}
                          >
                            Love 💕
                          </button>
                        </div>
                      </div>
                      
                      {/* Sticker Options */}
                      <div className="mb-3">
                        <div className="flex items-center mb-2">
                          <input 
                            type="checkbox" 
                            id="useSticker" 
                            checked={useSticker}
                            onChange={() => setUseSticker(!useSticker)}
                            className="mr-2 h-4 w-4"
                          />
                          <label htmlFor="useSticker" className="text-sm font-medium text-gray-700">Tambahkan Stiker</label>
                        </div>
                        
                        {useSticker && (
                          <div className="flex justify-start gap-3 pl-6">
                            <button 
                              onClick={() => setSelectedSticker("heart")}
                              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                selectedSticker === "heart" ? 'bg-red-100 border-2 border-red-500' : 'bg-gray-100'
                              }`}
                            >
                              ❤️
                            </button>
                            <button 
                              onClick={() => setSelectedSticker("star")}
                              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                selectedSticker === "star" ? 'bg-yellow-100 border-2 border-yellow-500' : 'bg-gray-100'
                              }`}
                            >
                              ⭐
                            </button>
                            <button 
                              onClick={() => setSelectedSticker("crown")}
                              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                selectedSticker === "crown" ? 'bg-yellow-100 border-2 border-yellow-500' : 'bg-gray-100'
                              }`}
                            >
                              👑
                            </button>
                            <button 
                              onClick={() => setSelectedSticker("thumbs")}
                              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                selectedSticker === "thumbs" ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100'
                              }`}
                            >
                              👍
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {/* Countdown Style */}
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Animasi Hitung Mundur:</p>
                        <div className="flex justify-start gap-2">
                          <button 
                            onClick={() => setCountdownStyle("bubble")}
                            className={`px-3 py-1 rounded-full text-xs ${countdownStyle === "bubble" 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-200 text-gray-800'}`}
                          >
                            Gelembung
                          </button>
                          <button 
                            onClick={() => setCountdownStyle("flip")}
                            className={`px-3 py-1 rounded-full text-xs ${countdownStyle === "flip" 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-200 text-gray-800'}`}
                          >
                            Flip
                          </button>
                          <button 
                            onClick={() => setCountdownStyle("bounce")}
                            className={`px-3 py-1 rounded-full text-xs ${countdownStyle === "bounce" 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-200 text-gray-800'}`}
                          >
                            Lompat
                          </button>
                        </div>
                      </div>
                      
                      {/* Filter options */}
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Filter Foto:</p>
                        <div className="flex justify-start gap-2">
                          <button 
                            onClick={() => setCanvasFilter("normal")}
                            className={`px-3 py-1 rounded-full text-xs ${canvasFilter === "normal" 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-200 text-gray-800'}`}
                          >
                            Normal
                          </button>
                          <button 
                            onClick={() => setCanvasFilter("sepia")}
                            className={`px-3 py-1 rounded-full text-xs ${canvasFilter === "sepia" 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-200 text-gray-800'}`}
                          >
                            Sepia
                          </button>
                          <button 
                            onClick={() => setCanvasFilter("grayscale")}
                            className={`px-3 py-1 rounded-full text-xs ${canvasFilter === "grayscale" 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-200 text-gray-800'}`}
                          >
                            B&W
                          </button>
                          <button 
                            onClick={() => setCanvasFilter("invert")}
                            className={`px-3 py-1 rounded-full text-xs ${canvasFilter === "invert" 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-200 text-gray-800'}`}
                          >
                            Invert
                          </button>
                        </div>
                      </div>
                      
                      {/* Instruksi untuk pengguna */}
                      <div className="bg-gray-100 rounded-lg p-2 mt-2">
                        <p className="text-center text-sm text-gray-700 font-medium flex items-center justify-center">
                          <Smile className="h-4 w-4 mr-1 text-red-600" />
                          Tips Pengambilan Selfi:
                        </p>
                        <ul className="text-xs text-gray-600 mt-1 space-y-1 pl-4 list-disc">
                          <li>Ikuti petunjuk ekspresi yang dipilih untuk hasil yang lebih seru</li>
                          <li>Tambahkan stiker untuk latar yang lebih meriah</li>
                          <li>Pastikan pencahayaan cukup dan wajah terlihat jelas</li>
                          <li>Tersenyumlah saat hitung mundur menunjukkan angka 1</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Loading message jika kamera belum siap */}
                  {showCameraModal && !cameraActive && (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700 mb-4"></div>
                      <p className="text-gray-600">Memuat kamera...</p>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t border-gray-200 flex justify-center">
                  {cameraActive && (
                    <div className="flex items-center space-x-4">
                      <Button
                        className="bg-red-600 text-white hover:bg-red-700 rounded-full h-14 w-14 flex items-center justify-center"
                        onClick={startCountDown}
                        disabled={isCountingDown}
                      >
                        <Camera className="h-6 w-6" />
                      </Button>
                      
                      <Button
                        className="bg-gray-600 text-white hover:bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center"
                        onClick={() => {
                          stopCamera()
                          startCamera()
                        }}
                      >
                        <RefreshCcw className="h-5 w-5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CSS kustom untuk animasi countdown dan flash */}
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes flash {
                0% { opacity: 0; }
                50% { opacity: 1; }
                100% { opacity: 0; }
              }
              
              .animate-flash {
                animation: flash 0.5s ease-out;
              }
              
              @keyframes flip {
                0% { transform: perspective(400px) rotateY(0); }
                100% { transform: perspective(400px) rotateY(360deg); }
              }
              
              .animate-flip {
                animation: flip 1s ease-out infinite;
              }
            `
          }} />

          {/* Step 3: Konfirmasi */}
          {votingStep === 3 && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Konfirmasi Voting</h2>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-yellow-600">Penting!</h3>
                      <p className="text-sm text-gray-600">
                        Pastikan pilihan Anda sudah benar. Setelah dikonfirmasi, pilihan tidak dapat diubah.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Detail Pemilih */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-3">Detail Pemilih</h3>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{auth.user.name}</p>
                        <p className="text-sm text-gray-500">{auth.user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Kandidat yang dipilih */}
                  {selectedKandidat && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-3">Kandidat yang Dipilih</h3>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-2xl flex-shrink-0">
                          {selectedKandidat.nomor_urut}
                        </div>
                        <div>
                          <h3 className="font-bold text-red-700">{selectedKandidat.nama}</h3>
                          <p className="text-sm text-gray-600">
                            {selectedKandidat.nama_presiden} & {selectedKandidat.nama_wakil}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bukti Voting */}
                  {previewImage && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-3">Bukti Voting</h3>
                      <div className="relative w-full max-h-64 overflow-hidden rounded-lg">
                        <img src={previewImage} alt="Bukti Voting" className="mx-auto" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center text-gray-600">
                      <Shield className="h-5 w-5 mr-2" />
                      <span className="text-sm">Suara Anda dijamin kerahasiaannya</span>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="border-gray-300 text-gray-700"
                        onClick={handlePrevStep}
                        disabled={processing}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" /> Kembali
                      </Button>
                      <Button
                        className="bg-red-700 hover:bg-red-800 text-white"
                        onClick={handleSubmitVote}
                        disabled={processing}
                      >
                        {processing ? "Memproses..." : "Konfirmasi Pilihan"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

Index.layout = (page: React.ReactNode) => <Layout children={page} title="Voting - PEMIRA 2025" /> 