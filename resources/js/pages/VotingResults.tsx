import React, { useState, useEffect } from "react"
import { Head } from "@inertiajs/react"
import Layout from "@/Layout/MainLayout"
import { Clock, AlertTriangle, Award, BarChart, Users, TrendingUp, Calendar } from "lucide-react"
import GarudaImage from "@/assets/garuda.webp"

interface Kandidat {
  id: number
  nomor_urut: string
  nama: string
  nama_presiden: string
  nama_wakil: string
  foto_presiden: string
  foto_wakil: string
  jumlah_suara: number
  persentase: number
  foto?: string
  slogan?: string
}

interface VotingResultsProps {
  kandidat: Kandidat[]
  totalVotes: number
  totalVoters: number
  showResults: boolean
  showCountdown: boolean
  countdownEndTime: string | null
}

export default function VotingResults({ kandidat, totalVotes, totalVoters, showResults, showCountdown, countdownEndTime }: VotingResultsProps) {
  // State untuk countdown
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [countdownFinished, setCountdownFinished] = useState(false);

  // CSS untuk animasi
  const animationStyles = `
    @keyframes floating {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    .garuda-float {
      animation: floating 3s ease-in-out infinite;
    }
    
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
      animation: fadeIn 0.5s ease-out forwards;
    }
    
    .fade-in-delay-1 {
      animation: fadeIn 0.5s ease-out 0.1s forwards;
      opacity: 0;
    }
    
    .fade-in-delay-2 {
      animation: fadeIn 0.5s ease-out 0.2s forwards;
      opacity: 0;
    }
    
    .fade-in-delay-3 {
      animation: fadeIn 0.5s ease-out 0.3s forwards;
      opacity: 0;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .pulse-winner {
      animation: pulse 2s ease-in-out infinite;
    }
    
    .hover-scale:hover {
      transform: scale(1.02);
      transition: transform 0.3s ease;
    }
  `;

  // Efek untuk countdown timer
  useEffect(() => {
    if (!showCountdown || !countdownEndTime) return;

    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const endTime = new Date(countdownEndTime).getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        setCountdownFinished(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    // Set initial time
    setTimeRemaining(calculateTimeRemaining());

    // Update countdown every second
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);
      
      if (remaining.days === 0 && remaining.hours === 0 && 
          remaining.minutes === 0 && remaining.seconds === 0) {
        clearInterval(timer);
        setCountdownFinished(true);
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [showCountdown, countdownEndTime]);

  // Debug console logs (akan dihapus nanti)
  useEffect(() => {
    console.log('showResults:', showResults);
    console.log('showCountdown:', showCountdown);
    console.log('countdownFinished:', countdownFinished);
    console.log('kandidat:', kandidat);
  }, []);

  // Fungsi untuk mengecek status countdown dari server setiap 10 detik
  useEffect(() => {
    // Baik sedang menampilkan countdown atau tidak, tetap cek status dari server
    const checkCountdownStatus = async () => {
      try {
        const response = await fetch('/api/check-countdown');
        const data = await response.json();
        console.log('Countdown check response:', data);
        
        // Jika status countdown berubah, reload halaman
        if (data.status === 'updated') {
          console.log('Status countdown diperbarui, me-reload halaman...');
          window.location.reload();
          return;
        }
        
        // Jika sedang menampilkan countdown tapi countdown harusnya sudah selesai
        if (showCountdown && data.countdown_active === false) {
          console.log('Countdown sudah tidak aktif, me-reload halaman...');
          window.location.reload();
          return;
        }
        
        // Jika hasil harusnya sudah ditampilkan tapi masih disembunyikan
        if (!showResults && data.show_results === true) {
          console.log('Hasil voting sudah bisa ditampilkan, me-reload halaman...');
          window.location.reload();
          return;
        }
        
        // Debug tambahan untuk memahami waktu server vs client
        if (data.now && data.countdown_end) {
          const serverNow = new Date(data.now).getTime();
          const countdownEnd = new Date(data.countdown_end).getTime();
          const diffMs = countdownEnd - serverNow;
          const diffSec = Math.floor(diffMs / 1000);
          
          console.log(`Waktu server hingga countdown selesai: ${diffSec} detik`);
          
          // Jika countdown sudah selesai menurut waktu server tapi masih belum update status
          if (diffSec <= 0 && data.countdown_active) {
            console.log('Countdown harusnya sudah selesai, memaksa reload dalam 5 detik...');
            setTimeout(() => window.location.reload(), 5000);
          }
        }
      } catch (error) {
        console.error('Error checking countdown status:', error);
      }
    };

    // Cek status segera
    checkCountdownStatus();
    
    // Lalu set interval untuk cek setiap 10 detik
    const intervalId = setInterval(checkCountdownStatus, 10000);
    
    return () => clearInterval(intervalId);
  }, [showCountdown, showResults]);

  // Tampilkan countdown jika showCountdown true dan countdown belum selesai
  if (showCountdown && !countdownFinished) {
    return (
      <Layout title="Pengumuman Hasil Voting - PEMIRA 2025">
        <Head title="Pengumuman Hasil Voting - PEMIRA 2025" />
        
        {/* CSS untuk animasi */}
        <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
        
        <div className="bg-gradient-to-b from-red-900 to-red-700 min-h-screen relative overflow-hidden">
          {/* Background pattern overlay */}
          <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }} />
          
          <div className="container px-4 md:px-6 py-12 md:py-16 mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white relative z-20">
              <div className="flex justify-center mb-8 fade-in">
                <div className="rounded-full bg-white p-4 inline-flex shadow-lg">
                  <Clock className="h-12 w-12 text-red-600" />
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 fade-in">
                Pengumuman Hasil Voting PEMIRA 2025
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-10 fade-in-delay-1">
                Hasil perhitungan suara akan diumumkan pada:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto fade-in-delay-2">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 shadow-lg transition-all duration-300 hover:bg-white/20">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                    {timeRemaining.days}
                  </div>
                  <div className="text-white/80 font-medium">Hari</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 shadow-lg transition-all duration-300 hover:bg-white/20">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                    {timeRemaining.hours}
                  </div>
                  <div className="text-white/80 font-medium">Jam</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 shadow-lg transition-all duration-300 hover:bg-white/20">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                    {timeRemaining.minutes}
                  </div>
                  <div className="text-white/80 font-medium">Menit</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 shadow-lg transition-all duration-300 hover:bg-white/20">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                    {timeRemaining.seconds}
                  </div>
                  <div className="text-white/80 font-medium">Detik</div>
                </div>
              </div>

              <div className="max-w-3xl mx-auto mb-10 fade-in-delay-3">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 flex items-start md:items-center text-left shadow-lg">
                  <div>
                    <h3 className="font-semibold text-lg text-white mb-1">Pengumuman akan segera ditampilkan</h3>
                    <p className="text-white/80">
                      Halaman akan otomatis memperbarui saat waktu pengumuman tiba. Terima kasih atas kesabaran Anda.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Garuda untuk desktop - posisi kanan dengan animasi floating */}
            <div className="hidden lg:block absolute right-0 top-10 xl:top-20 pointer-events-none z-10">
              <div className="garuda-float">
                <img 
                  src={GarudaImage} 
                  alt="Garuda Pancasila" 
                  className="w-auto h-96 xl:h-[35rem] opacity-90"
                />
              </div>
            </div>
            
            {/* Garuda untuk tampilan mobile - diletakkan di bawah konten utama dengan animasi floating */}
            <div className="lg:hidden mt-4 flex justify-center pointer-events-none">
              <div className="garuda-float">
                <img 
                  src={GarudaImage} 
                  alt="Garuda Pancasila" 
                  className="w-auto h-64 opacity-80"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-t from-black/20 to-transparent py-6 relative z-10 text-center text-white/80 italic">
            <div className="container mx-auto">
              <p className="max-w-2xl mx-auto">
                "we are cooking🔥"
                <span className="block mt-2 font-semibold not-italic">— Rafi Chandra - Pramudito Metra</span>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Tampilkan pesan jika tidak boleh menampilkan hasil
  if (!showResults) {
    return (
      <Layout title="Hasil Voting - PEMIRA 2025">
        <Head title="Hasil Voting - PEMIRA 2025" />
        <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
        
        <div className="bg-gradient-to-b from-red-900 to-red-700 min-h-screen relative overflow-hidden">
          {/* Background pattern overlay */}
          <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }} />
          
          <div className="container px-4 md:px-6 py-16 mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <div className="flex justify-center mb-8 fade-in">
                <div className="rounded-full bg-white p-4 inline-flex shadow-lg">
                  <AlertTriangle className="h-12 w-12 text-red-600" />
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 fade-in">
                Hasil Belum Dapat Ditampilkan
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 fade-in-delay-1">
                Hasil perhitungan suara akan ditampilkan setelah proses voting selesai dan diumumkan
                oleh panitia PEMIRA 2025.
              </p>
            </div>
          </div>

          {/* Garuda dengan animasi floating */}
          <div className="absolute right-0 top-0 md:top-40 lg:top-20 pointer-events-none">
            <div className="garuda-float">
              <img 
                src={GarudaImage} 
                alt="Garuda Pancasila" 
                className="w-auto h-96 md:h-[35rem] opacity-90"
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-t from-black/20 to-transparent py-6 relative z-10 text-center text-white/80 italic">
            <div className="container mx-auto">
              <p className="max-w-2xl mx-auto">
                "Dari Sabang sampai Merauke berjajar pulau-pulau, sambung menyambung menjadi satu, itulah Indonesia."
              </p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // Urutkan kandidat berdasarkan jumlah suara (tertinggi ke terendah)
  const sortedKandidat = [...kandidat].sort((a, b) => b.jumlah_suara - a.jumlah_suara)
  const pemenang = sortedKandidat[0]
  const totalVotesPercentage = totalVoters > 0 ? (totalVotes / totalVoters) * 100 : 0
  
  // Format tanggal untuk tampilan
  const formattedDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  });
  
  const formattedDateTime = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', 
    month: 'long', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  });

  // Tampilan modern hasil voting
  return (
    <Layout title="Hasil Voting - PEMIRA 2025">
      <Head title="Hasil Voting - PEMIRA 2025" />
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

      <div className="bg-gradient-to-b from-red-900 via-red-800 to-red-700 min-h-screen relative overflow-hidden">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="container mx-auto px-4 py-8 flex-grow flex flex-col relative z-10">
          {/* Header dengan judul dan informasi voting */}
          <div className="text-center text-white pb-6 mb-8 border-b border-white/10 fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              Hasil Pemilihan Raya 2025
            </h1>
            <div className="flex items-center justify-center text-white/70 text-sm mb-6">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Penghitungan suara selesai pada {formattedDate}</span>
            </div>
            
            {/* Statistik Utama dalam Card Glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8 fade-in-delay-1">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 shadow-lg">
                <div className="flex items-center justify-center mb-3">
                  <BarChart className="h-6 w-6 text-yellow-300 mr-2" />
                </div>
                <div className="text-4xl font-bold mb-1 text-white">{totalVotes}</div>
                <div className="text-sm text-white/70">Total Suara Sah</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 shadow-lg">
                <div className="flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-yellow-300 mr-2" />
                </div>
                <div className="text-4xl font-bold mb-1 text-white">{totalVoters}</div>
                <div className="text-sm text-white/70">Total Pemilih Terdaftar</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 shadow-lg">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="h-6 w-6 text-yellow-300 mr-2" />
                </div>
                <div className="text-4xl font-bold mb-1 text-white">{totalVotesPercentage.toFixed(1)}%</div>
                <div className="text-sm text-white/70">Tingkat Partisipasi</div>
              </div>
            </div>
          </div>

          {/* Pemenang Utama dengan highlight */}
          {pemenang && (
            <div className="mb-12 fade-in-delay-2">
              <h2 className="text-2xl font-bold text-center text-white mb-6 flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-400 mr-2" />
                Pemenang Pemilihan Raya 2025
              </h2>
              
              <div className="bg-gradient-to-r from-red-800 to-red-700 rounded-xl overflow-hidden border-2 border-yellow-400 shadow-xl max-w-4xl mx-auto pulse-winner">
                <div className="bg-yellow-500/10 px-4 py-1.5 text-yellow-300 font-bold flex items-center justify-between">
                  <span>PASANGAN PEMENANG</span>
                  <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-xs">
                    {totalVotes > 0 ? ((pemenang.jumlah_suara / totalVotes) * 100).toFixed(1) : 0}% Suara
                  </span>
                </div>
                
                <div className="p-6 flex flex-col md:flex-row items-center gap-8">
                  {/* Foto Pemenang */}
                  <div className="w-40 md:w-48">
                    <div className="aspect-square overflow-hidden rounded-full border-4 border-yellow-400 shadow-xl">
                      {pemenang.foto_presiden ? (
                        <img 
                          src={`/storage/${pemenang.foto_presiden}`} 
                          alt={pemenang.nama_presiden} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                          Tidak ada foto
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Informasi Pemenang */}
                  <div className="flex-grow text-center md:text-left">
                    <div className="text-5xl md:text-6xl font-bold text-white mb-2">No. {pemenang.nomor_urut}</div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">{pemenang.nama}</h2>
                    
                    <div className="md:flex items-baseline gap-4 mb-4">
                      <span className="inline-block px-4 py-1.5 bg-yellow-500 text-black text-lg font-bold rounded-full mb-2 md:mb-0">
                        {pemenang.jumlah_suara} Suara
                      </span>
                      <span className="text-white/80 text-lg">
                        dengan selisih {pemenang.jumlah_suara - (sortedKandidat[1]?.jumlah_suara || 0)} suara dari pesaing terdekat
                      </span>
                    </div>
                    
                    {pemenang.nama_presiden && pemenang.nama_wakil && (
                      <div className="text-white/80 mt-2">
                        <div className="font-semibold text-lg">{pemenang.nama_presiden} &amp; {pemenang.nama_wakil}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Peringkat Kandidat */}
          <div className="mb-12 fade-in-delay-3">
           
            <div className="space-y-4 max-w-5xl mx-auto">
              {sortedKandidat.map((k, index) => {
                const percentage = totalVotes > 0 ? (k.jumlah_suara / totalVotes) * 100 : 0;
                const isPemenang = k.id === pemenang?.id;
                
                return (
                  <div 
                    key={k.id}
                    className={`rounded-xl overflow-hidden transition-all duration-300 hover-scale ${
                      isPemenang ? "border-2 border-yellow-400 shadow-lg" : "border border-white/10"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Header dengan peringkat dan nomor urut */}
                      <div className="bg-gradient-to-r from-red-900 to-red-800 py-3 px-4 flex justify-between md:justify-start items-center md:w-40">
                        <div className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center font-bold text-white mr-3">
                          {index + 1}
                        </div>
                        <div className="text-white text-2xl font-bold">
                          No. {k.nomor_urut}
                        </div>
                      </div>
                      
                      {/* Informasi Kandidat */}
                      <div className="flex-grow p-4 text-white bg-red-800/80 flex flex-col md:flex-row items-center">
                        {/* Foto Kandidat */}
                        <div className="w-20 md:w-16 mb-3 md:mb-0 md:mr-4">
                          <div className="aspect-square overflow-hidden rounded-full border-2 border-white/30 shadow-md">
                            {k.foto_presiden ? (
                              <img 
                                src={`/storage/${k.foto_presiden}`} 
                                alt={k.nama_presiden} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-xs">
                                Tidak ada foto
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Informasi dan Progress Bar */}
                        <div className="flex-grow flex flex-col justify-center w-full text-center md:text-left">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1">
                            <div>
                              <h2 className="font-bold text-lg md:text-xl">{k.nama}</h2>
                              {k.nama_presiden && k.nama_wakil && (
                                <div className="text-sm text-white/70">
                                  {k.nama_presiden} &amp; {k.nama_wakil}
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-2 md:mt-0 flex justify-center md:justify-end gap-2">
                              <div className="bg-white/20 px-3 py-1 rounded text-sm font-medium">
                                {k.jumlah_suara} Suara
                              </div>
                              
                              {isPemenang && (
                                <div className="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                                  PEMENANG
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-sm font-medium">Persentase Suara</div>
                              <div className="font-bold text-yellow-300 text-sm">{percentage.toFixed(1)}%</div>
                            </div>
                            
                            {/* Progress Bar with animation */}
                            <div className="w-full bg-red-900/70 h-3 rounded-full overflow-hidden shadow-inner">
                              <div 
                                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 transition-all duration-1000"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Informasi Tambahan dalam Grid */}
          <div className="mt-8 grid grid-cols-1 md:max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                <Calendar className="h-5 w-5 text-yellow-300 mr-2" />
                Informasi Pemilihan
              </h3>
              <ul className="text-white/80 space-y-3 text-sm">
                <li className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span>Tanggal Pelaksanaan:</span>
                  <span className="font-medium text-white">{formattedDate}</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span>Jumlah Kandidat:</span>
                  <span className="font-medium text-white">{kandidat.length} Pasangan</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span>Suara Sah:</span>
                  <span className="font-medium text-white">{totalVotes} Suara</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span>Partisipasi:</span>
                  <span className="font-medium text-white">{totalVotesPercentage.toFixed(1)}%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Tidak Memilih:</span>
                  <span className="font-medium text-white">{totalVoters - totalVotes} Pemilih</span>
                </li>
              </ul>
            </div>
            
         
          </div>
          
          {/* Footer */}
          <div className="text-center text-white/70 text-sm pt-10 mt-12 border-t border-white/10">
            <p>© 2025 Pemilihan Raya Universitas • Panitia PEMIRA 2025</p>
            <p className="mt-2 text-xs text-white/50">Data terakhir diperbarui: {formattedDateTime}</p>
          </div>
        </div>

        {/* Floating Garuda di bagian bawah */}
        <div className="fixed bottom-0 right-0 pointer-events-none z-0 opacity-20 md:opacity-30">
          <div className="garuda-float">
            <img 
              src={GarudaImage} 
              alt="Garuda Pancasila" 
              className="w-auto h-48 md:h-64"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
} 