import React, { useState, useRef, useEffect } from "react"
import { Head, useForm } from "@inertiajs/react"
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Info, Shield, User, Vote, Camera, RefreshCcw } from "lucide-react"
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
  const [canvasFilter, setCanvasFilter] = useState<string>("normal") // normal, sepia, grayscale, invert
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animationRef = useRef<number>(0)

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

  // Fungsi untuk memulai kamera
  const startCamera = async () => {
    try {
      const constraints = {
        video: { facingMode: "user" }, // Gunakan kamera depan untuk selfi
        audio: false
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setCameraActive(true)
        
        // Mulai render canvas setelah video dimuat
        videoRef.current.onloadedmetadata = () => {
          startCanvasPreview()
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin untuk menggunakan kamera.")
    }
  }

  // Fungsi untuk menghentikan kamera
  const stopCamera = () => {
    // Hentikan animasi canvas
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = 0
    }
    
    // Hentikan stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
      setCameraActive(false)
    }
  }

  // Fungsi untuk render canvas secara real-time
  const renderCanvas = () => {
    if (!videoRef.current || !canvasRef.current) return
    
    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    if (!context || video.paused || video.ended) return
    
    // Set ukuran canvas sesuai dengan ukuran video (dengan rasio aspect)
    const videoRatio = video.videoWidth / video.videoHeight
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetWidth / videoRatio
    
    // Gambar video ke canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    
    // Terapkan filter sesuai dengan yang dipilih
    if (canvasFilter !== "normal") {
      context.save()
      
      // Terapkan filter sesuai pilihan
      switch (canvasFilter) {
        case "sepia":
          context.filter = "sepia(100%)"
          break
        case "grayscale":
          context.filter = "grayscale(100%)"
          break
        case "invert":
          context.filter = "invert(80%)"
          break
      }
      
      // Gambar ulang dengan filter
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      context.restore()
    }
    
    // Gambar bingkai foto
    drawPhotoFrame(context, canvas.width, canvas.height)
    
    // Gambar teks informasi
    drawInfoText(context, canvas.width, canvas.height)
    
    // Lanjutkan loop animasi
    animationRef.current = requestAnimationFrame(renderCanvas)
  }
  
  // Fungsi untuk menggambar bingkai foto
  const drawPhotoFrame = (context: CanvasRenderingContext2D, width: number, height: number) => {
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
    
    // Teks panduan di tengah lingkaran
    context.fillStyle = 'rgba(0, 0, 0, 0.5)'
    context.fillRect(centerX - 60, centerY + radius - 28, 120, 26)
    context.font = '14px Arial'
    context.fillStyle = 'white'
    context.textAlign = 'center'
    context.fillText('Posisikan Wajah', centerX, centerY + radius - 10)
    
    // Bingkai foto
    context.setLineDash([])
    context.lineWidth = 6
    context.strokeStyle = 'rgba(220, 38, 38, 0.8)' // Red-700
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
  
  // Fungsi untuk memulai preview canvas
  const startCanvasPreview = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    renderCanvas()
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
        }
      }, "image/jpeg", 0.95)
    }, 200) // Berikan sedikit delay untuk efek flash
  }

  // Fungsi untuk memulai countdown dan mengambil foto
  const startCountDown = () => {
    setIsCountingDown(true)
    setCountDown(3)
    
    const interval = setInterval(() => {
      setCountDown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setIsCountingDown(false)
          capturePhoto()
          return 0
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
                    Silakan unggah bukti voting Anda. Ini akan membantu panitia dalam proses validasi suara.
                    Pastikan gambar jelas dan dapat terbaca dengan baik.
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
                  
                  {!cameraActive && !previewImage && (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center border-gray-300 bg-gray-50">
                      <Button
                        className="bg-red-600 text-white hover:bg-red-700 py-3 px-4"
                        onClick={startCamera}
                      >
                        <Camera className="h-5 w-5 mr-2" />
                        Buka Kamera Selfi
                      </Button>
                      
                      <div className="mt-4 text-xs bg-gray-100 rounded-lg py-2 px-3 mx-auto max-w-md">
                        <p>Anda perlu memberikan izin untuk mengakses kamera</p>
                        <p>Kamera depan akan digunakan untuk mengambil selfi sebagai bukti voting</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Tampilan kamera aktif */}
                  {cameraActive && !previewImage && (
                    <div className="border-2 rounded-lg p-3 border-gray-300">
                      <div className="relative mb-3">
                        {/* Video kamera (hidden) */}
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          playsInline
                          className="hidden"
                        />
                        
                        {/* Canvas untuk preview kamera */}
                        <canvas 
                          ref={canvasRef} 
                          className="w-full rounded-lg"
                        ></canvas>
                        
                        {/* Flash effect */}
                        {isTakingPicture && (
                          <div className="absolute inset-0 bg-white animate-flash"></div>
                        )}
                        
                        {/* Countdown overlay */}
                        {isCountingDown && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                            <div className="text-6xl font-bold text-white bg-red-600 h-24 w-24 rounded-full flex items-center justify-center">
                              {countDown}
                            </div>
                          </div>
                        )}
                        
                        {/* Tombol kontrol kamera */}
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center space-x-4">
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
                      </div>
                      
                      {/* Filter options */}
                      <div className="flex justify-center gap-2 mb-3">
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
                      
                      {/* Instruksi untuk pengguna */}
                      <div className="bg-gray-100 rounded-lg p-2 mt-2">
                        <p className="text-center text-sm text-gray-700 font-medium">
                          Petunjuk Pengambilan Selfi:
                        </p>
                        <ul className="text-xs text-gray-600 mt-1 space-y-1 pl-4 list-disc">
                          <li>Posisikan wajah Anda di dalam lingkaran panduan</li>
                          <li>Pilih filter foto yang Anda inginkan (opsional)</li>
                          <li>Tekan tombol merah untuk mulai hitung mundur 3 detik</li>
                          <li>Tersenyumlah saat hitung mundur menunjukkan angka 1</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* CSS kustom untuk animasi flash */}
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
                    `
                  }} />
                  
                  {previewImage && (
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
                            startCamera()
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