import React from "react"
import { Head } from "@inertiajs/react"
import { CheckCircle, Clock, FileText, HelpCircle, Info, Shield, Users, Vote } from "lucide-react"
import Layout from "@/Layout/MainLayout"
import Button from "@/components/Button"
import Card from "@/components/Card"

interface VotedStudent {
  id: number
  name: string
  faculty: string
  timestamp: string
}

export default function LandingPage() {
  // Array of students who have voted (placeholder data)
  const votedStudents: VotedStudent[] = [
    { id: 1, name: "Ahmad Rizki", faculty: "Fakultas Teknik", timestamp: "08:15" },
    { id: 2, name: "Siti Nurhaliza", faculty: "Fakultas Ekonomi", timestamp: "08:20" },
    { id: 3, name: "Budi Santoso", faculty: "Fakultas Ilmu Komputer", timestamp: "08:25" },
    { id: 4, name: "Dewi Kartika", faculty: "Fakultas Kedokteran", timestamp: "08:30" },
    { id: 5, name: "Eko Prasetyo", faculty: "Fakultas Hukum", timestamp: "08:35" },
    { id: 6, name: "Fitri Handayani", faculty: "Fakultas Psikologi", timestamp: "08:40" },
    { id: 7, name: "Gunawan Wibisono", faculty: "Fakultas Teknik", timestamp: "08:45" },
    { id: 8, name: "Hana Permata", faculty: "Fakultas MIPA", timestamp: "08:50" },
    { id: 9, name: "Irfan Hakim", faculty: "Fakultas Ilmu Sosial", timestamp: "08:55" },
    { id: 10, name: "Jihan Aulia", faculty: "Fakultas Sastra", timestamp: "09:00" },
    { id: 11, name: "Kurniawan Adi", faculty: "Fakultas Teknik", timestamp: "09:05" },
    { id: 12, name: "Laras Setiawati", faculty: "Fakultas Ekonomi", timestamp: "09:10" },
  ]


  // URL untuk batik pattern
  const batikPatternUrl = "https://img.freepik.com/free-vector/batik-pattern-background-template-red-brown-color-traditional-indonesia_53876-117531.jpg"
  
  // URL untuk gambar pahlawan nasional
  const pahlawanImages = {
    soekarno: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Presiden_Sukarno.jpg/800px-Presiden_Sukarno.jpg",
    hatta: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/VP_Hatta.jpg/800px-VP_Hatta.jpg",
    kartini: "https://upload.wikimedia.org/wikipedia/commons/b/b0/COLLECTIE_TROPENMUSEUM_Portret_van_Raden_Ajeng_Kartini_TMnr_10018776.jpg",
    diponegoro: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Diponegoro.jpg"
  }
  
  // URL untuk gambar Garuda Pancasila
  const garudaUrl = "https://upload.wikimedia.org/wikipedia/commons/9/9c/Garuda_Pancasila%2C_Coat_of_Arms_of_Indonesia.svg"

  // URL untuk gambar kandidat dummy
  const kandidatImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1972&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
  ]

  // URL untuk foto profil mahasiswa
  const getInitialAvatar = (initial: string): string => `https://ui-avatars.com/api/?name=${initial}&background=ef4444&color=fff&size=100`

  return (
    <>
      <Head title="PEMIRA 2025 - Pemilihan Raya Mahasiswa" />

      <main className="flex-1">
        {/* Hero Section with Indonesian Heroes */}
        <section
          id="beranda"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-red-600 to-red-700 text-white relative overflow-hidden"
        >
          {/* Background image - Batik Pattern */}
          <div className="absolute inset-0 opacity-20">
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
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-lg overflow-hidden border-4 border-white shadow-lg">
                  {/* Heroes Collage */}
                  <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
                    <div className="relative">
                      <img
                        src={pahlawanImages.soekarno}
                        alt="Soekarno"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-xs font-bold">Ir. Soekarno</p>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={pahlawanImages.hatta}
                        alt="Mohammad Hatta"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-xs font-bold">Mohammad Hatta</p>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={pahlawanImages.kartini}
                        alt="R.A. Kartini"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-xs font-bold">R.A. Kartini</p>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={pahlawanImages.diponegoro}
                        alt="Pangeran Diponegoro"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-xs font-bold">Pangeran Diponegoro</p>
                      </div>
                    </div>
                  </div>

                  {/* Indonesian flag overlay */}
                  <div className="absolute top-0 left-0 right-0 h-4 bg-red-600"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-white"></div>
                </div>
              </div>
            </div>

            {/* Inspirational quote */}
            <div className="mt-12 text-center max-w-3xl mx-auto border-t border-b border-white/30 py-4">
              <p className="italic text-white/90">
                "Bangsa yang besar adalah bangsa yang menghormati jasa pahlawannya"
              </p>
              <p className="text-sm text-white/70 mt-1">— Ir. Soekarno</p>
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
        <section className="w-full py-6 bg-white overflow-hidden border-b border-red-100">
          <div className="flex items-center gap-4 mb-2 px-4 md:px-6">
            <div className="flex items-center gap-2 text-red-600 font-semibold">
              <Vote className="h-5 w-5" />
              <span>Mahasiswa yang telah memilih:</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Update real-time</span>
            </div>
          </div>

          {/* Marquee container */}
          <div className="relative flex overflow-x-hidden">
            {/* First marquee - original */}
            <div className="animate-marquee whitespace-nowrap py-2 flex">
              {votedStudents.map((student) => (
                <div key={student.id} className="flex items-center mx-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-600 flex-shrink-0">
                    <img
                      src={getInitialAvatar(student.name.charAt(0))}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span>{student.faculty}</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-red-600 mx-1"></span>
                      <span>{student.timestamp}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Second marquee - duplicate for seamless loop */}
            <div className="animate-marquee2 whitespace-nowrap py-2 flex absolute top-0">
              {votedStudents.map((student) => (
                <div key={`dup-${student.id}`} className="flex items-center mx-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-600 flex-shrink-0">
                    <img
                      src={getInitialAvatar(student.name.charAt(0))}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span>{student.faculty}</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-red-600 mx-1"></span>
                      <span>{student.timestamp}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((candidate) => (
                <Card key={candidate} className="overflow-hidden border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[3/4] relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-red-700/20 to-red-700/0 z-10"></div>
                    <img
                      src={kandidatImages[candidate - 1]}
                      alt={`Kandidat ${candidate}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 w-10 h-10 bg-red-700 rounded-full flex items-center justify-center text-white font-bold">
                      {candidate}
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-2xl font-bold text-red-700">Kandidat {candidate}</h3>
                    <p className="text-sm text-muted-foreground mb-4">Fakultas Ilmu Komputer</p>
                    <p className="mb-4 text-gray-600">
                      "Bersama kita wujudkan kampus yang lebih baik, inovatif, dan berprestasi untuk semua mahasiswa."
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-all duration-200 font-semibold" 
                      href="#"
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
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-4">
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
                    <h3 className="text-xl font-bold text-red-700">Verifikasi</h3>
                    <p className="text-muted-foreground">
                      Verifikasi identitas menggunakan kode OTP yang dikirim ke email kampus.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="border-red-200 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="pt-6 p-6">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white">
                      <span className="text-2xl font-bold">3</span>
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
                      <span className="text-2xl font-bold">4</span>
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
                href="#"
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
    </>
  )
}



LandingPage.layout = (page: React.ReactNode) => <Layout children={page} title="PEMIRA 2025" />
