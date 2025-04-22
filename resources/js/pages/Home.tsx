import React, { useState, useEffect } from "react"
import { Head } from "@inertiajs/react"
import { CheckCircle, Clock, FileText, HelpCircle, Info, Shield, Users, Vote, X } from "lucide-react"
import Layout from "@/Layout/MainLayout"
import Button from "@/components/Button"
import Card from "@/components/Card"
import GarudaImage from "@/assets/garuda.webp"
import axios from "axios"


interface VotedStudent {
  id: number
  name: string
  username: string
  faculty: string 
  timestamp: string
  foto_bukti?: string
}


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

interface Props { 
  kandidat: Kandidat[]
}


export default function LandingPage({ kandidat }: Props) {
  // Array of students yang telah voting 
  const [votedStudents, setVotedStudents] = useState<VotedStudent[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data mahasiswa yang telah voting
  useEffect(() => {
    const fetchVotedStudents = async () => {
      try {
        const response = await axios.get('/voted-students');
        setVotedStudents(response.data);
      } catch (error) {
        console.error('Error fetching voted students:', error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchVotedStudents();
  }, []);

  // Tambahkan useEffect untuk periodic polling
  useEffect(() => {
    // Fungsi untuk memperbarui data voting setiap 15 detik
    const intervalId = setInterval(() => {
      const fetchVotedStudents = async () => {
        try {
          const response = await axios.get('/voted-students');
          setVotedStudents(response.data);
        } catch (error) {
          console.error('Error fetching voted students:', error);
          // Tidak perlu set data dummy karena sudah ada data sebelumnya
        }
      };

      fetchVotedStudents();
    }, 5000); // Refresh setiap 5 detik

    // Cleanup function
    return () => clearInterval(intervalId);
  }, []);

  // State untuk dialog visi misi
  const [selectedKandidat, setSelectedKandidat] = useState<Kandidat | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [activeTab, setActiveTab] = useState<'visi' | 'misi'>('visi')

  // State untuk animasi typing
  const [typingText, setTypingText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  
  // Array teks yang akan diketik
  const textArray = [
    "Created By....",
    "Rafi Chandra",
    "Pramudito Metra",
    "Follow Us On Instagram.....",
    "@chandra_rafi",
    "@pramuditometra"
  ]
  
  // Effect untuk animasi typing
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % textArray.length
      const fullText = textArray[i]
      
      setTypingText(
        isDeleting 
          ? fullText.substring(0, typingText.length - 1) 
          : fullText.substring(0, typingText.length + 1)
      )
      
      // Mengatur kecepatan typing
      setTypingSpeed(isDeleting ? 50 : 150)
      
      // Jika selesai mengetik
      if (!isDeleting && typingText === fullText) {
        // Tunggu 2 detik sebelum mulai menghapus
        setTimeout(() => setIsDeleting(true), 2000)
      } 
      // Jika selesai menghapus
      else if (isDeleting && typingText === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        // Tunggu 0.5 detik sebelum mengetik lagi
        setTypingSpeed(500)
      }
    }
    
    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [typingText, isDeleting, loopNum, typingSpeed, textArray])

  // Fungsi untuk membuka dialog
  const openDialog = (calon: Kandidat) => {
    setSelectedKandidat(calon)
    setActiveTab('visi') // Reset ke tab visi setiap kali dialog dibuka
    
    // Gunakan setTimeout untuk delay kecil dalam penampilan dialog untuk efek yang lebih baik
    setTimeout(() => {
      setShowDialog(true)
      setIsClosing(false)
    }, 50)
  }

  // Fungsi untuk menutup dialog dengan animasi
  const closeDialog = () => {
    // Set isClosing untuk memulai animasi keluar
    setIsClosing(true)
    
    // Tunggu animasi selesai sebelum benar-benar menghilangkan dialog
    setTimeout(() => {
      setShowDialog(false)
      setIsClosing(false)
    }, 400) // Waktu diperbarui untuk animasi yang lebih lambat
  }

  // URL untuk batik pattern
  const batikPatternUrl = "https://img.freepik.com/free-vector/white-organic-lines-seamless-pattern-brown-background_1409-4450.jpg?t=st=1745350003~exp=1745353603~hmac=9136d2f2846337b3ff161fd1128332e04d74e31db2eb4ca1a246022b4194f730&w=996"
  
  // URL untuk gambar Garuda Pancasila
  const garudaUrl = "https://upload.wikimedia.org/wikipedia/commons/9/9c/Garuda_Pancasila%2C_Coat_of_Arms_of_Indonesia.svg"

  // URL untuk foto profil mahasiswa
  const getInitialAvatar = (student: VotedStudent): string => {
    // Jika ada foto bukti, gunakan foto bukti
    if (student.foto_bukti) {
      return `/storage/${student.foto_bukti}`;
    }
    // Jika tidak ada, gunakan avatar dengan inisial
    return `https://ui-avatars.com/api/?name=${student.name.charAt(0)}&background=ef4444&color=fff&size=100`;
  }

  return (
    <>
      <Head title="PEMIRA 2025 - Pemilihan Raya Mahasiswa" />

      {/* Inline CSS untuk animasi floating dan marquee */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .garuda-float {
          animation: floating 3s ease-in-out infinite;
        }
        
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        
        .animate-marquee2 {
          animation: marquee 100s linear infinite;
          animation-delay: 20s;
        }

        .marquee-item {
          transition: all 0.3s ease;
        }
        
        .marquee-item:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          z-index: 10;
        }
      `}} />

      <main className="flex-1">
        {/* Hero Section with Indonesian Heroes */}
        <section
          id="beranda"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-red-600 to-red-700 text-white relative overflow-hidden"
        >
          {/* Background image - Batik Pattern */}
          <div className="absolute inset-0 opacity-80">
            <img
              src={batikPatternUrl}
              alt="Batik Pattern Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-red-600/90 to-red-700/90"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full border border-white bg-red-700/50 px-2.5 py-0.5 text-sm font-semibold text-white mb-4">
                  <Shield className="mr-1 h-3.5 w-3.5" />
                  Semangat Nasionalisme
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Pemilihan Raya Mahasiswa 2025
                  </h1>
                  <p className="max-w-[600px] text-red-100 md:text-xl">
                    "Dari Sabang sampai Merauke berjajar pulau-pulau, sambung menyambung menjadi satu, itulah
                    Indonesia."
                  </p>
                  <p className="max-w-[600px] text-red-100 md:text-lg italic">
                    Suarakan pilihanmu untuk masa depan kampus yang lebih baik. Bersama kita wujudkan perubahan.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button 
                    className=" text-red-700 hover:bg-gray-100 border border-white shadow-sm" 
                    size="lg" 
                    href="#voting"
                  >
                    Voting Sekarang
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-red-800 hover:border-white transition-all duration-200" 
                    size="lg" 
                    href="#kandidat"
                  >
                    Lihat Kandidat
                  </Button>
                </div>
                
                {/* Animasi Typing */}
                <div className="mt-4 h-8">
                  <p className="text-white font-bold text-xl typing-text-cursor overflow-hidden pr-1">
                    {typingText}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full">
                  {/* Heroes Collage */}
                  <div className="grid grid-cols-1 grid-rows-1 h-full w-full">
                    <div className="relative flex justify-center">
                      <div className="garuda-float">
                        <img
                          src={GarudaImage}
                          alt="Garuda Pancasila"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspirational quote */}
            <div className="mt-12 text-center max-w-3xl mx-auto border-t border-b border-white/30 py-4">
              <p className="italic text-white/90">
                "Jangan biarkan suara pendapat orang lain menenggelamkan suara hatimu sendiri."
              </p>
              <p className="text-sm text-white/70 mt-1">— Steve Jobs</p>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,0,0,0z"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
        </section>

        {/* Infinite Marquee - Students who have voted */}
        <section className="w-full py-12 bg-white overflow-hidden border-b border-red-100">
          <div className="flex items-center gap-4 mb-6 px-6 md:px-8">
            <div className="flex items-center gap-3 text-red-600 font-bold text-2xl">
              <Vote className="h-8 w-8" />
              <span>Mahasiswa yang telah memilih:</span>
            </div>
            <div className="flex items-center gap-3 text-lg text-muted-foreground">
              <Clock className="h-6 w-6" />
              <span>Update real-time setiap 5 detik</span>
            </div>
          </div>

          {/* Marquee container with increased size */}
          <div className="relative w-full overflow-hidden py-6">
            {loading ? (
              <div className="p-8 text-center w-full text-xl font-medium">Memuat data...</div>
            ) : (
              <div className="flex whitespace-nowrap">
                <div className="animate-marquee py-6 flex">
                  {votedStudents.map((student) => (
                    <div 
                      key={student.id} 
                      className="flex items-center mx-8 px-6 py-4 bg-red-50 rounded-xl border border-red-200 marquee-item"
                    >
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-red-600 flex-shrink-0 shadow-md">
                        <img
                          src={getInitialAvatar(student)}
                          alt={student.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-5 min-w-[200px]">
                        <p className="font-bold text-xl text-gray-800">{student.name}</p>
                        <p className="text-base text-gray-600 flex items-center gap-3 mt-1">
                          <span className="font-medium">{student.faculty}</span>
                          <span className="inline-block w-2 h-2 rounded-full bg-red-600"></span>
                          <span>{student.timestamp}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* National Principles Section */}
        <section className="w-full py-8 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap justify-center gap-4 text-center">
              <div className="px-4 py-2 bg-red-50 rounded-full border border-red-100">
                <span className="font-semibold text-red-600">Ketuhanan Yang Maha Esa</span>
              </div>
              <div className="px-4 py-2 bg-red-50 rounded-full border border-red-100">
                <span className="font-semibold text-red-600">Kemanusiaan Yang Adil dan Beradab</span>
              </div>
              <div className="px-4 py-2 bg-red-50 rounded-full border border-red-100">
                <span className="font-semibold text-red-600">Persatuan Indonesia</span>
              </div>
              <div className="px-4 py-2 bg-red-50 rounded-full border border-red-100">
                <span className="font-semibold text-red-600">Kerakyatan Yang Dipimpin Oleh Hikmat Kebijaksanaan</span>
              </div>
              <div className="px-4 py-2 bg-red-50 rounded-full border border-red-100">
                <span className="font-semibold text-red-600">Keadilan Sosial Bagi Seluruh Rakyat Indonesia</span>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="tentang" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-10">
            <div
              className="w-full h-full bg-red-600"
              style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
            ></div>
          </div>

          {/* Garuda Pancasila background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <div
              className="w-[500px] h-[500px] bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${garudaUrl})`,
              }}
            ></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-red-600 px-2.5 py-0.5 text-sm font-semibold text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
                  <Info className="mr-1 h-3.5 w-3.5" />
                  Tentang PEMIRA
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-red-600">Apa itu PEMIRA?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Pemilihan Raya Mahasiswa (PEMIRA) adalah proses pemilihan pemimpin organisasi kemahasiswaan di tingkat
                  universitas. Melalui PEMIRA, mahasiswa dapat memilih calon pemimpin yang akan mewakili aspirasi dan
                  kepentingan mereka.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card className="border-red-100 shadow-sm">
                <div className="pt-6 p-6">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <Vote className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-red-600">Demokrasi Kampus</h3>
                    <p className="text-muted-foreground">
                      PEMIRA merupakan wujud demokrasi di lingkungan kampus yang memberikan hak suara kepada seluruh
                      mahasiswa.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="border-red-100 shadow-sm">
                <div className="pt-6 p-6">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <Users className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-red-600">Representasi Mahasiswa</h3>
                    <p className="text-muted-foreground">
                      Memilih pemimpin yang akan mewakili aspirasi dan kepentingan seluruh mahasiswa di tingkat
                      universitas.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="border-red-100 shadow-sm">
                <div className="pt-6 p-6">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                      <FileText className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-red-600">Transparansi</h3>
                    <p className="text-muted-foreground">
                      Proses pemilihan yang transparan dan akuntabel untuk memastikan hasil yang adil dan dapat
                      dipercaya.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Candidates Section */}
        <section id="kandidat" className="w-full py-12 md:py-24 lg:py-32 bg-red-50 relative">
          <div className="absolute top-0 left-0 w-full h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNTBMNTAgMTAwSDBWMHoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNNTAgMGg1MEwxMDAgMTAwSDUwVjB6IiBmaWxsPSIjZWYxNDFjIi8+PC9zdmc+')] bg-repeat-x"></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-red-700">Kandidat PEMIRA 2025</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Kenali calon pemimpin yang akan mewakili aspirasi dan kepentingan mahasiswa di kampus kita.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-2">
              {kandidat.map((calon) => (
                <Card key={calon.id} className="overflow-hidden border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-red-700/20 to-red-700/0 z-10"></div>
                    <img
                      src={`/storage/${calon.foto_presiden}`}
                      alt={`Kandidat ${calon.nomor_urut} - ${calon.nama_presiden}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white text-sm font-bold">Calon Presiden BEM</p>
                    </div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {calon.nomor_urut}
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-2xl font-bold text-red-700">{calon.nama}</h3>
                    <div className="mt-2 mb-4">
                      <p className="text-base font-semibold">{calon.nama_presiden}</p>
                      <p className="text-sm text-muted-foreground">{calon.nomor_bp_presiden}</p>
                    </div>
                    <p className="mb-4 text-gray-600 line-clamp-2">
                      "{calon.visi}"
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-all duration-200 font-semibold" 
                      onClick={() => openDialog(calon)}
                    >
                      Lihat Visi & Misi
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Voting Process */}
        <section id="voting" className="w-full py-12 md:py-24 lg:py-32 bg-white relative">
          <div className="absolute top-0 left-0 right-0 h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNTBMNTAgMTAwSDBWMHoiIGZpbGw9IiNmZWZlZmUiLz48cGF0aCBkPSJNNTAgMGg1MEwxMDAgMTAwSDUwVjB6IiBmaWxsPSIjZjlmYWZiIi8+PC9zdmc+')] bg-repeat-x"></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-red-700">Cara Voting</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ikuti langkah-langkah berikut untuk memberikan suara pada PEMIRA 2025.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="border-red-200 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="pt-6 p-6">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white">
                      <span className="text-2xl font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-red-700">Login</h3>
                    <p className="text-muted-foreground">Login menggunakan akun mahasiswa pada sistem PEMIRA.</p>
                  </div>
                  </div>
              </Card>
              <Card className="border-red-200 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="pt-6 p-6">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white">
                      <span className="text-2xl font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-red-700">Pilih Kandidat</h3>
                    <p className="text-muted-foreground">Pilih kandidat yang sesuai dengan aspirasi dan harapanmu.</p>
                  </div>
                </div>
              </Card>
              <Card className="border-red-200 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="pt-6 p-6">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white">
                      <span className="text-2xl font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-red-700">Konfirmasi</h3>
                    <p className="text-muted-foreground">Konfirmasi pilihan dan dapatkan bukti voting digital.</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex justify-center">
              <Button 
                className="bg-red-700 hover:bg-red-800 text-white shadow-md transition-all duration-200 text-lg font-semibold px-8 py-3" 
                href={route('voting.index')}
              >
                Voting Sekarang
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-red-600 px-2.5 py-0.5 text-sm font-semibold text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
                  <HelpCircle className="mr-1 h-3.5 w-3.5" />
                  FAQ
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-red-600">Pertanyaan Umum</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Jawaban untuk pertanyaan yang sering diajukan seputar PEMIRA 2025.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <div className="space-y-4">
                  <div className="rounded-lg border border-red-100 p-4">
                    <h3 className="text-lg font-bold text-red-600">Siapa yang berhak memilih dalam PEMIRA?</h3>
                    <p className="text-muted-foreground mt-1">
                      Seluruh mahasiswa aktif yang terdaftar pada semester berjalan berhak memberikan suara dalam
                      PEMIRA.
                    </p>
                  </div>
                  <div className="rounded-lg border border-red-100 p-4">
                    <h3 className="text-lg font-bold text-red-600">Apa saja persyaratan untuk menjadi kandidat?</h3>
                    <p className="text-muted-foreground mt-1">
                      Mahasiswa aktif minimal semester 3, IPK minimal 3.00, dan tidak pernah mendapat sanksi akademik.
                    </p>
                  </div>
                  <div className="rounded-lg border border-red-100 p-4">
                    <h3 className="text-lg font-bold text-red-600">Berapa lama masa jabatan ketua BEM?</h3>
                    <p className="text-muted-foreground mt-1">
                      Masa jabatan ketua BEM adalah 1 tahun terhitung sejak pelantikan.
                    </p>
                  </div>
                  </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-red-600 text-white relative">
          <div className="absolute top-0 left-0 right-0 h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNTBMNTAgMTAwSDBWMHoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNNTAgMGg1MEwxMDAgMTAwSDUwVjB6IiBmaWxsPSIjZWYxNDFjIi8+PC9zdmc+')] bg-repeat-x transform rotate-180"></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Siap Memberikan Suaramu?
                </h2>
                <p className="mx-auto max-w-[700px] text-red-100 md:text-xl/relaxed">
                  Setiap suara penting untuk menentukan masa depan kampus kita. Jangan lewatkan kesempatan untuk
                  berpartisipasi dalam PEMIRA 2025!
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button 
                  className="bg-white text-red-700 hover:bg-gray-100 shadow-sm transition-all duration-200" 
                  size="lg" 
                  href="#voting"
                >
                  Voting Sekarang
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-red-800 hover:border-white transition-all duration-200" 
                  size="lg" 
                  href="#kandidat"
                >
                  Lihat Kandidat
                </Button>
              </div>
              <div className="flex items-center justify-center space-x-4 pt-4">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Aman</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Rahasia</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Terpercaya</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Dialog Visi & Misi - Redesigned */}
      {showDialog && selectedKandidat && (
        <div 
          className={`fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-400 ease-out ${
            isClosing ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
          }`}
          onClick={closeDialog}
        >
          <div 
            className={`bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden transition-all duration-500 ease-out ${
              isClosing ? 'opacity-0 scale-90 translate-y-10' : 'opacity-100 scale-100 translate-y-0'
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dialog
          >
            {/* Red banner strip */}
            <div className="h-2 w-full bg-gradient-to-r from-red-700 to-red-500"></div>
            
            <div className="flex flex-col md:flex-row">
              {/* Left side - Photo and candidate info */}
              <div className="w-full md:w-2/5 bg-gradient-to-br from-red-50 to-white p-6 relative">
                {/* Candidate number */}
                <div className="absolute top-4 right-4 bg-red-700 text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                  {selectedKandidat.nomor_urut}
                </div>
                
                <h3 className="text-2xl font-bold text-red-700 mb-6 pr-14">
                  {selectedKandidat.nama}
                </h3>
                
                {/* Foto wakil presiden */}
                <div className="mb-6">
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lg border-2 border-red-700/30 mb-4">
                    <img 
                      src={`/storage/${selectedKandidat.foto_wakil}`} 
                      alt={`Wakil - ${selectedKandidat.nama_wakil}`} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-red-700">Calon Wakil Presiden BEM</h4>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Informasi Presiden & Wakil */}
                  <div className="bg-white rounded-xl shadow-md p-4 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                    <div className="mb-3 border-b border-red-100 pb-3">
                      <h4 className="font-bold text-red-700 mb-1">Calon Presiden BEM</h4>
                      <p className="font-medium">{selectedKandidat.nama_presiden}</p>
                      <p className="text-xs text-muted-foreground">{selectedKandidat.nomor_bp_presiden}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-red-700 mb-1">Calon Wakil Presiden BEM</h4>
                      <p className="font-medium">{selectedKandidat.nama_wakil}</p>
                      <p className="text-xs text-muted-foreground">{selectedKandidat.nomor_bp_wakil}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Visi Misi content */}
              <div className="w-full md:w-3/5 p-6 overflow-y-auto max-h-[70vh] md:max-h-[80vh]">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    className={`px-4 py-2 font-semibold transition-colors relative ${
                      activeTab === 'visi' 
                        ? 'text-red-700 border-b-2 border-red-700' 
                        : 'text-gray-500 hover:text-red-700'
                    }`}
                    onClick={() => setActiveTab('visi')}
                  >
                    Visi
                    {activeTab === 'visi' && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-red-700"></span>
                    )}
                  </button>
                  <button
                    className={`px-4 py-2 font-semibold transition-colors relative ${
                      activeTab === 'misi' 
                        ? 'text-red-700 border-b-2 border-red-700' 
                        : 'text-gray-500 hover:text-red-700'
                    }`}
                    onClick={() => setActiveTab('misi')}
                  >
                    Misi
                    {activeTab === 'misi' && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-red-700"></span>
                    )}
                  </button>
                </div>
                
                {/* Tab content with animation */}
                <div className="relative">
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      activeTab === 'visi' 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-10 absolute inset-0 pointer-events-none'
                    }`}
                  >
                    <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center">
                      <span className="bg-red-700 w-8 h-8 rounded-full text-white flex items-center justify-center mr-2 text-sm">
                        <Vote className="h-4 w-4" />
                      </span>
                      Visi
                    </h3>
                    <div className="bg-white rounded-xl p-5 border border-red-100 shadow-sm">
                      <p className="text-gray-700 leading-relaxed">
                        {selectedKandidat.visi}
                      </p>
                    </div>
                  </div>
                  
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      activeTab === 'misi' 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-10 absolute inset-0 pointer-events-none'
                    }`}
                  >
                    <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center">
                      <span className="bg-red-700 w-8 h-8 rounded-full text-white flex items-center justify-center mr-2 text-sm">
                        <CheckCircle className="h-4 w-4" />
                      </span>
                      Misi
                    </h3>
                    <div className="bg-white rounded-xl p-5 border border-red-100 shadow-sm">
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {selectedKandidat.misi}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Close button */}
                <div className="mt-8 flex justify-end">
                  <Button
                    className="bg-red-700 hover:bg-red-800 text-white shadow-md transition-all duration-200 font-semibold flex items-center"
                    onClick={closeDialog}
                  >
                    <X className="mr-2 h-4 w-4" /> 
                    Tutup
                  </Button>
                </div>
          </div>
            </div>
            
            {/* Close button - top right */}
            <button 
              onClick={closeDialog}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-red-50 text-red-700 transition-colors duration-200 shadow-md"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* CSS untuk cursor */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .typing-text-cursor {
            border-right: 4px solid white;
            display: inline-block;
            animation: blink 0.75s step-end infinite;
          }
          
          @keyframes blink {
            from, to { border-color: transparent }
            50% { border-color: white; }
          }
        `
      }} />
    </>
  )
}



LandingPage.layout = (page: React.ReactNode) => <Layout children={page} title="PEMIRA 2025" />
