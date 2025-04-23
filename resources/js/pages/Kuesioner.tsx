import React, { useEffect, useRef, useState } from "react"
import { Head, useForm } from "@inertiajs/react"
import Layout from "@/Layout/MainLayout"
import Button from "@/components/Button"
import Card from "@/components/Card"
import { HelpCircle, Star, CheckCircle, Send, Shield, Clock, Github, Instagram } from "lucide-react"
// Import foto developer
import RafiImage from "@/assets/rafi.jpg"
import DitoImage from "@/assets/dito.jpg"
// Import Lottie
import Lottie from "lottie-react"
import starAnimation from "@/assets/bintang.json"
// Import audio
import bgMusic from "@/assets/cokelat.m4a"

type RatingKey = 'nilai_tampilan' | 'nilai_kemudahan' | 'nilai_keamanan' | 'nilai_kecepatan' | 'nilai_keseluruhan'

interface KuesionerData {
  nilai_tampilan: number
  nilai_kemudahan: number
  nilai_keamanan: number
  nilai_kecepatan: number
  nilai_keseluruhan: number
  saran: string
  kesan: string
  [key: string]: number | string 
}

interface KuesionerProps {
  hasSubmitted: boolean
  kuesioner?: KuesionerData
  errors: Record<string, string>
  flash: {
    success?: string
    error?: string
  }
}

interface Developer {
  name: string
  role: string
  photo: string
  github: string
  instagram: string
}

export default function Kuesioner({ hasSubmitted, kuesioner, errors, flash }: KuesionerProps) {
  const { data, setData, post, processing } = useForm<KuesionerData>({
    nilai_tampilan: 0,
    nilai_kemudahan: 0,
    nilai_keamanan: 0,
    nilai_kecepatan: 0,
    nilai_keseluruhan: 0,
    saran: "",
    kesan: "",
  })
  
  // State untuk animasi
  const [showAnimation, setShowAnimation] = useState(false)
  
  // State dan ref untuk audio player
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // State untuk dialog welcome
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(!hasSubmitted)
  
  // Effect untuk auto-focus pada dialog setelah beberapa detik
  useEffect(() => {
    if (showWelcomeDialog && !hasSubmitted) {
      const timer = setTimeout(() => {
        const dialogButton = document.getElementById('start-button')
        if (dialogButton) {
          dialogButton.focus()
        }
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [showWelcomeDialog, hasSubmitted])
  
  
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])
  
  const startExperienceWithMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setShowWelcomeDialog(false)
        })
        .catch(error => {
          // Browser mungkin memblokir autoplay
          console.log("Audio autoplay failed:", error)
          // Tetap tutup dialog meskipun audio gagal
          setShowWelcomeDialog(false)
        })
    } else {
      setShowWelcomeDialog(false)
    }
  }
  
  // Fungsi untuk memulai pengalaman tanpa musik
  const startExperienceWithoutMusic = () => {
    setShowWelcomeDialog(false)
  }
  
  // Toggle untuk musik
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('kuesioner.store'), {
      onSuccess: () => {
        // Tampilkan animasi saat berhasil submit
        setShowAnimation(true)
        // Sembunyikan animasi setelah 2.5 detik
        setTimeout(() => {
          setShowAnimation(false)
        }, 2500)
      }
    })
  }

  // Data developer
  const developers: Developer[] = [
    {
      name: "Rafi Chandra",
      role: "Full Stack Developer",
      photo: RafiImage,
      github: "https://github.com/chandrarafi",
      instagram: "https://instagram.com/chandra_rafi26"
    },
    {
      name: "Pramudito Metra",
      role: "UI/UX Designer & Frontend Developer",
      photo: DitoImage,
      github: "https://github.com/chandrarafi",
      instagram: "https://instagram.com/pramuditometra"
    }
  ]

  // Ref untuk scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  // Auto-scroll carousel
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return
    
    let scrollPosition = 0
    const cardWidth = 250 + 16 // Card width + gap
    const scrollSpeed = 3000 // Kecepatan scroll dalam ms
    
    // Menghitung total lebar scroll area
    const totalWidth = cardWidth * developers.length
    
    // Function untuk scroll
    const autoScroll = () => {
      // Hanya jalankan jika dalam tampilan mobile
      if (window.innerWidth >= 640) return
      
      scrollPosition += cardWidth
      
      // Reset posisi jika sudah sampai akhir
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0
      }
      
      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
    
    // Set interval untuk auto-scroll
    const interval = setInterval(autoScroll, scrollSpeed)
    
    // Stop auto-scroll saat user interaksi
    const handleInteraction = () => {
      clearInterval(interval)
      
      // Restart auto-scroll setelah 5 detik tidak ada interaksi
      setTimeout(() => {
        scrollPosition = scrollContainer.scrollLeft
        const newInterval = setInterval(autoScroll, scrollSpeed)
        
        // Clean up on unmount
        return () => clearInterval(newInterval)
      }, 5000)
    }
    
    // Event listener untuk interaksi user
    scrollContainer.addEventListener('touchstart', handleInteraction)
    scrollContainer.addEventListener('mousedown', handleInteraction)
    
    // Clean up pada unmount
    return () => {
      clearInterval(interval)
      scrollContainer.removeEventListener('touchstart', handleInteraction)
      scrollContainer.removeEventListener('mousedown', handleInteraction)
    }
  }, [developers.length])

  const renderStarRating = (name: RatingKey, value: number, label: string, description: string) => {
    return (
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
          <label className="text-lg font-bold text-gray-800">{label}</label>
          <div className="text-sm text-gray-500 mt-1 sm:mt-0">{description}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={hasSubmitted}
              onClick={() => setData({ ...data, [name]: star })}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                hasSubmitted 
                  ? (kuesioner && Number(kuesioner[name]) >= star) 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-100 text-gray-400'
                  : Number(data[name]) >= star 
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              <Star className={`h-5 w-5 sm:h-6 sm:w-6 ${
                hasSubmitted 
                  ? (kuesioner && Number(kuesioner[name]) >= star) 
                    ? 'fill-current' 
                    : '' 
                  : Number(data[name]) >= star 
                    ? 'fill-current' 
                    : ''
              }`} />
            </button>
          ))}
          <span className="ml-2 font-bold text-xl">
            {hasSubmitted 
              ? (kuesioner ? kuesioner[name] : 0) 
              : data[name]}
          </span>
        </div>
        {errors[name] && <div className="text-red-600 mt-1">{errors[name]}</div>}
      </div>
    )
  }

  // Component untuk kartu developer
  const DeveloperCard = ({ developer }: { developer: Developer }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-red-100 flex flex-col min-w-[250px] sm:min-w-0 dev-card">
      <div className="p-4 flex flex-col items-center">
        {/* Foto developer dengan efek hover */}
        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-red-500 relative group">
          <img 
            src={developer.photo} 
            alt={developer.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <h3 className="font-bold text-lg text-red-700">{developer.name}</h3>
        <p className="text-gray-600 text-sm">{developer.role}</p>
        <div className="flex items-center gap-3 mt-3">
          <a 
            href={developer.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-red-600 transition-colors duration-300 flex items-center"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href={developer.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-red-600 transition-colors duration-300 flex items-center"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Head title="Kuesioner Penilaian Aplikasi" />

      {/* Mobile optimized styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Animasi untuk card developer */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .float-animation:hover {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Scroll horizontal untuk mobile */
        .scrolling-wrapper {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
          scroll-behavior: smooth;
        }
        
        .scrolling-wrapper::-webkit-scrollbar {
          display: none; /* Chrome, Safari dan Opera */
        }
        
        /* Card highlight effect */
        .dev-card {
          transition: all 0.3s ease;
        }
        
        .dev-card:not(:hover) {
          transform: scale(0.95);
          opacity: 0.85;
        }
        
        .dev-card:hover {
          transform: scale(1);
          opacity: 1;
          box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.1), 0 8px 10px -6px rgba(239, 68, 68, 0.1);
        }
        
        /* Animasi Lottie */
        .success-animation-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.75);
          z-index: 50;
          backdrop-filter: blur(4px);
          animation: fadeIn 0.3s ease-out;
        }
        
        .success-animation-container {
          background-color: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transform: scale(1);
          opacity: 1;
          animation: scaleIn 0.3s ease-out;
        }
        
        /* Welcome Dialog */
        .welcome-dialog-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.85);
          z-index: 50;
          backdrop-filter: blur(8px);
          animation: fadeIn 0.5s ease-out;
        }
        
        .welcome-dialog-container {
          background-color: white;
          border-radius: 1.5rem;
          padding: 2rem;
          max-width: 90%;
          width: 450px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          transform: scale(1);
          opacity: 1;
          animation: scaleIn 0.5s ease-out;
          border: 2px solid rgba(239, 68, 68, 0.3);
          overflow: hidden;
        }
        
        .welcome-dialog-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(to right, #ef4444, #f87171);
        }
        
        .welcome-button {
          transition: all 0.3s ease;
          transform: translateY(0);
        }
        
        .welcome-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px -3px rgba(239, 68, 68, 0.5);
        }
        
        .welcome-music-button {
          background: linear-gradient(to right, #ef4444, #f87171);
        }
        
        .welcome-skip-button {
          background: linear-gradient(to right, #4b5563, #6b7280);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        /* Musik kontrol button */
        .music-control {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background-color: rgba(239, 68, 68, 0.9);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.5);
          transition: all 0.3s ease;
          z-index: 40;
        }
        
        .music-control:hover {
          transform: scale(1.1);
        }
        
        /* Pulse animasi untuk musik playing */
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        
        .music-playing {
          animation: pulse 2s infinite;
        }
      `}} />
      
      {/* Audio Element */}
      <audio ref={audioRef} loop src={bgMusic} hidden />
      
      {/* Musik kontrol button - hanya tampilkan jika welcome dialog sudah ditutup atau kuesioner sudah diisi */}
      {(!showWelcomeDialog || hasSubmitted) && (
        <button 
          className={`music-control ${isPlaying ? 'music-playing' : ''}`}
          onClick={toggleMusic}
          title={isPlaying ? "Matikan Musik" : "Nyalakan Musik"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
      )}
      
      {/* Welcome Dialog */}
      {showWelcomeDialog && !hasSubmitted && (
        <div className="welcome-dialog-overlay">
          <div className="welcome-dialog-container">
            <div className="w-48 h-48 mx-auto">
              <Lottie 
                animationData={starAnimation} 
                loop={true} 
                autoplay={true}
              />
            </div>
            <h2 className="text-2xl font-bold text-center text-red-600 mt-2">Selamat Datang!</h2>
            <p className="text-center text-gray-600 mt-3">
              Kami ingin mendengar pendapat Anda tentang aplikasi e-Vote ini. Masukan Anda sangat berharga untuk pengembangan kami ke depannya.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                id="start-button"
                className="welcome-button welcome-music-button py-3 px-4 rounded-lg text-white font-semibold flex-1 flex items-center justify-center gap-2"
                onClick={startExperienceWithMusic}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
                Mulai dengan Musik
              </button>
              
              <button
                className="welcome-button welcome-skip-button py-3 px-4 rounded-lg text-white font-semibold flex-1"
                onClick={startExperienceWithoutMusic}
              >
                Lewati Musik
              </button>
            </div>
            
            <p className="text-xs text-center text-gray-500 mt-4">
              Klik tombol di atas untuk melanjutkan pengisian kuesioner
            </p>
          </div>
        </div>
      )}
      
      {/* Animasi Sukses */}
      {showAnimation && (
        <div className="success-animation-overlay">
          <div className="success-animation-container">
            <div className="w-64 h-64 mx-auto">
              <Lottie 
                animationData={starAnimation} 
                loop={false} 
                autoplay={true}
              />
            </div>
            <p className="text-center text-xl font-bold text-red-600 mt-4">
              Terima Kasih Atas Penilaian Anda!
            </p>
          </div>
        </div>
      )}

      <div className="py-6 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
       

          {/* Informasi Developer - Dipindahkan ke paling atas */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">Tim Pengembang</h2>
            
            {/* Desktop view - Grid */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-6">
              {developers.map((developer, index) => (
                <div key={index} className="float-animation">
                  <DeveloperCard developer={developer} />
                </div>
              ))}
            </div>
            
            {/* Mobile view - Horizontal scroll */}
            <div className="sm:hidden">
              <div 
                ref={scrollContainerRef}
                className="scrolling-wrapper overflow-x-auto flex gap-4 pb-4 -mx-4 px-4 relative"
              >
                {developers.map((developer, index) => (
                  <div key={index} className="flex-none float-animation">
                    <DeveloperCard developer={developer} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Garis pembatas dekoratif */}
            <div className="mt-8 border-b-2 border-red-100 relative">
              <div className="absolute left-1/2 -top-2 transform -translate-x-1/2 bg-white px-4">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center rounded-full border border-red-600 px-2.5 py-0.5 text-sm font-semibold text-red-600">
              <HelpCircle className="mr-1 h-3.5 w-3.5" />
              Kuesioner Penilaian
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter text-red-600">
              Kuesioner Penilaian Aplikasi
            </h1>
            <p className="max-w-[900px] text-gray-600 text-base sm:text-lg md:text-xl">
              Bantu kami meningkatkan kualitas aplikasi dengan memberikan penilaian dan masukan Anda.
            </p>
          </div>

          {flash.success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{flash.success}</span>
            </div>
          )}

          {flash.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <Shield className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{flash.error}</span>
            </div>
          )}

          <Card className="overflow-hidden border-red-100 shadow-lg mb-8">
            {hasSubmitted ? (
              <div className="p-4 sm:p-8">
                <div className="flex flex-col items-center justify-center text-center space-y-4 mb-6 sm:mb-8">
                  <div className="w-32 h-32 sm:w-40 sm:h-40">
                    <Lottie 
                      animationData={starAnimation} 
                      loop={true} 
                      autoplay={true}
                    />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Terima Kasih!</h2>
                  <p className="text-gray-600">
                    Terima kasih telah mengisi kuesioner penilaian aplikasi. Masukan Anda sangat berharga bagi kami.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Penilaian Anda</h3>
                  
                  <div className="space-y-4">
                    {kuesioner && (
                      <>
                        {renderStarRating('nilai_tampilan', kuesioner.nilai_tampilan, 'Tampilan Aplikasi', 'Seberapa baik tampilan dan desain aplikasi?')}
                        {renderStarRating('nilai_kemudahan', kuesioner.nilai_kemudahan, 'Kemudahan Penggunaan', 'Seberapa mudah aplikasi ini digunakan?')}
                        {renderStarRating('nilai_keamanan', kuesioner.nilai_keamanan, 'Keamanan', 'Seberapa aman aplikasi ini menurut Anda?')}
                        {renderStarRating('nilai_kecepatan', kuesioner.nilai_kecepatan, 'Kecepatan', 'Seberapa cepat kinerja aplikasi?')}
                        {renderStarRating('nilai_keseluruhan', kuesioner.nilai_keseluruhan, 'Penilaian Keseluruhan', 'Nilai keseluruhan aplikasi ini')}
                      </>
                    )}
                  </div>

                  {kuesioner && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Saran Anda</h4>
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          {kuesioner.saran || "Tidak ada saran yang diberikan"}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Kesan Anda</h4>
                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          {kuesioner.kesan || "Tidak ada kesan yang diberikan"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button href={route('home')} className="bg-red-600 hover:bg-red-700">
                    Kembali ke Beranda
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 sm:p-8">
                <div className="max-w-[900px] text-gray-600 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <span className="text-sm">Waktu pengisian: sekitar 2 menit</span>
                  </div>
                  <p>
                    Silahkan berikan penilaian untuk setiap kriteria dengan memilih jumlah bintang 
                    (1 = Sangat Buruk, 5 = Sangat Baik)
                  </p>
                </div>

                <div className="mb-6 sm:mb-8">
                  {renderStarRating('nilai_tampilan', data.nilai_tampilan, 'Tampilan Aplikasi', 'Seberapa baik tampilan dan desain aplikasi?')}
                  {renderStarRating('nilai_kemudahan', data.nilai_kemudahan, 'Kemudahan Penggunaan', 'Seberapa mudah aplikasi ini digunakan?')}
                  {renderStarRating('nilai_keamanan', data.nilai_keamanan, 'Keamanan', 'Seberapa aman aplikasi ini menurut Anda?')}
                  {renderStarRating('nilai_kecepatan', data.nilai_kecepatan, 'Kecepatan', 'Seberapa cepat kinerja aplikasi?')}
                  {renderStarRating('nilai_keseluruhan', data.nilai_keseluruhan, 'Penilaian Keseluruhan', 'Nilai keseluruhan aplikasi ini')}
                </div>

                <div className="space-y-6 mb-6 sm:mb-8">
                  <div>
                    <label className="block text-lg font-bold text-gray-800 mb-2">
                      Saran untuk Pengembangan
                    </label>
                    <textarea
                      value={data.saran}
                      onChange={(e) => setData('saran', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      rows={4}
                      placeholder="Berikan saran untuk pengembangan aplikasi ke depannya..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-gray-800 mb-2">
                      Kesan Terhadap Aplikasi
                    </label>
                    <textarea
                      value={data.kesan}
                      onChange={(e) => setData('kesan', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      rows={4}
                      placeholder="Berikan kesan Anda terhadap aplikasi ini..."
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg flex items-center"
                    disabled={processing}
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {processing ? 'Mengirim...' : 'Kirim Penilaian'}
                  </Button>
                </div>
              </form>
            )}
          </Card>

          {/* Wave divider */}
          <div className="relative h-16 mt-8 overflow-hidden">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,0,0,0z"
                fill="#ef4444"
                fillOpacity="0.1"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}

Kuesioner.layout = (page: React.ReactNode) => <Layout children={page} title="Kuesioner Penilaian" /> 