import GarudaImage from '@/assets/garuda.webp';
import Layout from '@/Layout/MainLayout';
import { Head } from '@inertiajs/react';
import { AlertTriangle, Award, BarChart, Calendar, Clock, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPemiraYear } from '@/utils/date';

interface Kandidat {
    id: number;
    nomor_urut: string;
    nama: string;
    nama_presiden: string;
    nama_wakil: string;
    foto_presiden: string;
    foto_wakil: string;
    jumlah_suara: number;
    persentase: number;
    foto?: string;
    slogan?: string;
}

interface VotingResultsProps {
    kandidat: Kandidat[];
    totalVotes: number;
    totalVoters: number;
    showResults: boolean;
    showCountdown: boolean;
    countdownEndTime: string | null;
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
            username: string;
        };
    };
}

export default function VotingResults({ kandidat, totalVotes, totalVoters, showResults, showCountdown, countdownEndTime, auth }: VotingResultsProps) {
    const pemiraYear = getPemiraYear();
    
    // State untuk countdown
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
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
                    seconds: 0,
                };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };
        };

        // Set initial time
        setTimeRemaining(calculateTimeRemaining());

        // Update countdown every second
        const timer = setInterval(() => {
            const remaining = calculateTimeRemaining();
            setTimeRemaining(remaining);

            if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
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
    }, [showResults, showCountdown, countdownFinished, kandidat]);

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
    }, [showCountdown, showResults, countdownFinished, kandidat]);

    // Tampilkan countdown jika showCountdown true dan countdown belum selesai
    if (showCountdown && !countdownFinished) {
        return (
            <Layout title={`Pengumuman Hasil Voting - PEMIRA ${pemiraYear}`} auth={auth}>
                <Head title={`Pengumuman Hasil Voting - PEMIRA ${pemiraYear}`} />

                {/* CSS untuk animasi */}
                <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

                <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-red-900 to-red-700">
                    {/* Background pattern overlay */}
                    <div
                        className="absolute inset-0 bg-repeat opacity-5"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
                        }}
                    />

                    <div className="relative z-10 container mx-auto px-4 py-12 md:px-6 md:py-16">
                        <div className="relative z-20 mx-auto max-w-4xl text-center text-white">
                            <div className="fade-in mb-8 flex justify-center">
                                <div className="inline-flex rounded-full bg-white p-4 shadow-lg">
                                    <Clock className="h-12 w-12 text-red-600" />
                                </div>
                            </div>

                            <h1 className="fade-in mb-4 text-center text-3xl font-bold md:text-5xl">Pengumuman Hasil Voting PEMIRA {pemiraYear}</h1>
                            <p className="fade-in-delay-1 mb-10 text-lg text-white/90 md:text-xl">Hasil perhitungan suara akan diumumkan pada:</p>

                            <div className="fade-in-delay-2 mx-auto mb-12 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
                                <div className="rounded-lg border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                                    <div className="mb-2 text-4xl font-bold text-white md:text-6xl">{timeRemaining.days}</div>
                                    <div className="font-medium text-white/80">Hari</div>
                                </div>
                                <div className="rounded-lg border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                                    <div className="mb-2 text-4xl font-bold text-white md:text-6xl">{timeRemaining.hours}</div>
                                    <div className="font-medium text-white/80">Jam</div>
                                </div>
                                <div className="rounded-lg border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                                    <div className="mb-2 text-4xl font-bold text-white md:text-6xl">{timeRemaining.minutes}</div>
                                    <div className="font-medium text-white/80">Menit</div>
                                </div>
                                <div className="rounded-lg border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                                    <div className="mb-2 text-4xl font-bold text-white md:text-6xl">{timeRemaining.seconds}</div>
                                    <div className="font-medium text-white/80">Detik</div>
                                </div>
                            </div>

                            <div className="fade-in-delay-3 mx-auto mb-10 max-w-3xl">
                                <div className="flex items-start rounded-lg border border-white/20 bg-white/10 p-6 text-left shadow-lg backdrop-blur-sm md:items-center">
                                    <div>
                                        <h3 className="mb-1 text-lg font-semibold text-white">Pengumuman akan segera ditampilkan</h3>
                                        <p className="text-white/80">
                                            Halaman akan otomatis memperbarui saat waktu pengumuman tiba. Terima kasih atas kesabaran Anda.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Garuda untuk desktop - posisi kanan dengan animasi floating */}
                        <div className="pointer-events-none absolute top-10 right-0 z-10 hidden lg:block xl:top-20">
                            <div className="garuda-float">
                                <img src={GarudaImage} alt="Garuda Pancasila" className="h-96 w-auto opacity-90 xl:h-[35rem]" />
                            </div>
                        </div>

                        {/* Garuda untuk tampilan mobile - diletakkan di bawah konten utama dengan animasi floating */}
                        <div className="pointer-events-none mt-4 flex justify-center lg:hidden">
                            <div className="garuda-float">
                                <img src={GarudaImage} alt="Garuda Pancasila" className="h-64 w-auto opacity-80" />
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 bg-gradient-to-t from-black/20 to-transparent py-6 text-center text-white/80 italic">
                        <div className="container mx-auto">
                            <p className="mx-auto max-w-2xl">
                                "we are cooking🔥"
                                <span className="mt-2 block font-semibold not-italic">— Rafi Chandra - Pramudito Metra</span>
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
            <Layout title={`Hasil Voting - PEMIRA ${pemiraYear}`} auth={auth}>
                <Head title={`Hasil Voting - PEMIRA ${pemiraYear}`} />
                <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

                <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-red-900 to-red-700">
                    {/* Background pattern overlay */}
                    <div
                        className="absolute inset-0 bg-repeat opacity-5"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
                        }}
                    />

                    <div className="relative z-10 container mx-auto px-4 py-16 md:px-6">
                        <div className="mx-auto max-w-3xl text-center text-white">
                            <div className="fade-in mb-8 flex justify-center">
                                <div className="inline-flex rounded-full bg-white p-4 shadow-lg">
                                    <AlertTriangle className="h-12 w-12 text-red-600" />
                                </div>
                            </div>

                            <h1 className="fade-in mb-4 text-center text-3xl font-bold md:text-5xl">Hasil Belum Dapat Ditampilkan</h1>
                            <p className="fade-in-delay-1 mb-8 text-lg text-white/90 md:text-xl">
                                Hasil perhitungan suara akan ditampilkan setelah proses voting selesai dan diumumkan oleh panitia PEMIRA {pemiraYear}.
                            </p>
                        </div>
                    </div>

                    {/* Garuda dengan animasi floating */}
                    <div className="pointer-events-none absolute top-0 right-0 md:top-40 lg:top-20">
                        <div className="garuda-float">
                            <img src={GarudaImage} alt="Garuda Pancasila" className="h-96 w-auto opacity-90 md:h-[35rem]" />
                        </div>
                    </div>

                    <div className="relative z-10 bg-gradient-to-t from-black/20 to-transparent py-6 text-center text-white/80 italic">
                        <div className="container mx-auto">
                            <p className="mx-auto max-w-2xl">
                                "Dari Sabang sampai Merauke berjajar pulau-pulau, sambung menyambung menjadi satu, itulah Indonesia."
                            </p>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // Urutkan kandidat berdasarkan jumlah suara (tertinggi ke terendah)
    const sortedKandidat = [...kandidat].sort((a, b) => b.jumlah_suara - a.jumlah_suara);
    const pemenang = sortedKandidat[0];
    const totalVotesPercentage = totalVoters > 0 ? (totalVotes / totalVoters) * 100 : 0;

    // Format tanggal untuk tampilan
    const formattedDate = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const formattedDateTime = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    // Tampilan modern hasil voting
    return (
        <Layout title={`Hasil Voting - PEMIRA ${pemiraYear}`} auth={auth}>
            <Head title={`Hasil Voting - PEMIRA ${pemiraYear}`} />
            <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-red-900 via-red-800 to-red-700">
                {/* Background pattern overlay */}
                <div
                    className="absolute inset-0 bg-repeat opacity-5"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                />

                <div className="relative z-10 container mx-auto flex flex-grow flex-col px-4 py-8">
                    {/* Header dengan judul dan informasi voting */}
                    <div className="fade-in mb-8 border-b border-white/10 pb-6 text-center text-white">
                        <h1 className="mb-2 text-3xl font-bold md:text-5xl">Hasil Pemilihan Raya {pemiraYear}</h1>
                        <div className="mb-6 flex items-center justify-center text-sm text-white/70">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span>Penghitungan suara selesai pada {formattedDate}</span>
                        </div>

                        {/* Statistik Utama dalam Card Glassmorphism */}
                        <div className="fade-in-delay-1 mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="rounded-xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-sm">
                                <div className="mb-3 flex items-center justify-center">
                                    <BarChart className="mr-2 h-6 w-6 text-yellow-300" />
                                </div>
                                <div className="mb-1 text-4xl font-bold text-white">{totalVotes}</div>
                                <div className="text-sm text-white/70">Total Suara Sah</div>
                            </div>

                            <div className="rounded-xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-sm">
                                <div className="mb-3 flex items-center justify-center">
                                    <Users className="mr-2 h-6 w-6 text-yellow-300" />
                                </div>
                                <div className="mb-1 text-4xl font-bold text-white">{totalVoters}</div>
                                <div className="text-sm text-white/70">Total Pemilih Terdaftar</div>
                            </div>

                            <div className="rounded-xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-sm">
                                <div className="mb-3 flex items-center justify-center">
                                    <TrendingUp className="mr-2 h-6 w-6 text-yellow-300" />
                                </div>
                                <div className="mb-1 text-4xl font-bold text-white">{totalVotesPercentage.toFixed(1)}%</div>
                                <div className="text-sm text-white/70">Tingkat Partisipasi</div>
                            </div>
                        </div>
                    </div>

                    {/* Pemenang Utama dengan highlight */}
                    {pemenang && (
                        <div className="fade-in-delay-2 mb-12">
                            <h2 className="mb-6 flex items-center justify-center text-center text-2xl font-bold text-white">
                                <Award className="mr-2 h-6 w-6 text-yellow-400" />
                                Pemenang Pemilihan Raya {pemiraYear}
                            </h2>

                            <div className="pulse-winner mx-auto max-w-4xl overflow-hidden rounded-xl border-2 border-yellow-400 bg-gradient-to-r from-red-800 to-red-700 shadow-xl">
                                <div className="flex items-center justify-between bg-yellow-500/10 px-4 py-1.5 font-bold text-yellow-300">
                                    <span>PASANGAN PEMENANG</span>
                                    <span className="rounded bg-yellow-500 px-2 py-0.5 text-xs text-black">
                                        {totalVotes > 0 ? ((pemenang.jumlah_suara / totalVotes) * 100).toFixed(1) : 0}% Suara
                                    </span>
                                </div>

                                <div className="flex flex-col items-center gap-8 p-6 md:flex-row">
                                    {/* Foto Pemenang */}
                                    <div className="w-40 md:w-48">
                                        <div className="aspect-square overflow-hidden rounded-full border-4 border-yellow-400 shadow-xl">
                                            {pemenang.foto_presiden ? (
                                                <img
                                                    src={`/storage/${pemenang.foto_presiden}`}
                                                    alt={pemenang.nama_presiden}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                                                    Tidak ada foto
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Informasi Pemenang */}
                                    <div className="flex-grow text-center md:text-left">
                                        <div className="mb-2 text-5xl font-bold text-white md:text-6xl">No. {pemenang.nomor_urut}</div>
                                        <h2 className="mb-3 text-2xl font-extrabold text-white md:text-3xl">{pemenang.nama}</h2>

                                        <div className="mb-4 items-baseline gap-4 md:flex">
                                            <span className="mb-2 inline-block rounded-full bg-yellow-500 px-4 py-1.5 text-lg font-bold text-black md:mb-0">
                                                {pemenang.jumlah_suara} Suara
                                            </span>
                                            <span className="text-lg text-white/80">
                                                dengan selisih {pemenang.jumlah_suara - (sortedKandidat[1]?.jumlah_suara || 0)} suara dari pesaing
                                                terdekat
                                            </span>
                                        </div>

                                        {pemenang.nama_presiden && pemenang.nama_wakil && (
                                            <div className="mt-2 text-white/80">
                                                <div className="text-lg font-semibold">
                                                    {pemenang.nama_presiden} &amp; {pemenang.nama_wakil}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Peringkat Kandidat */}
                    <div className="fade-in-delay-3 mb-12">
                        <div className="mx-auto max-w-5xl space-y-4">
                            {sortedKandidat.map((k, index) => {
                                const percentage = totalVotes > 0 ? (k.jumlah_suara / totalVotes) * 100 : 0;
                                const isPemenang = k.id === pemenang?.id;

                                return (
                                    <div
                                        key={k.id}
                                        className={`hover-scale overflow-hidden rounded-xl transition-all duration-300 ${
                                            isPemenang ? 'border-2 border-yellow-400 shadow-lg' : 'border border-white/10'
                                        }`}
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            {/* Header dengan peringkat dan nomor urut */}
                                            <div className="flex items-center justify-between bg-gradient-to-r from-red-900 to-red-800 px-4 py-3 md:w-40 md:justify-start">
                                                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 font-bold text-white">
                                                    {index + 1}
                                                </div>
                                                <div className="text-2xl font-bold text-white">No. {k.nomor_urut}</div>
                                            </div>

                                            {/* Informasi Kandidat */}
                                            <div className="flex flex-grow flex-col items-center bg-red-800/80 p-4 text-white md:flex-row">
                                                {/* Foto Kandidat */}
                                                <div className="mb-3 w-20 md:mr-4 md:mb-0 md:w-16">
                                                    <div className="aspect-square overflow-hidden rounded-full border-2 border-white/30 shadow-md">
                                                        {k.foto_presiden ? (
                                                            <img
                                                                src={`/storage/${k.foto_presiden}`}
                                                                alt={k.nama_presiden}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs text-gray-500">
                                                                Tidak ada foto
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Informasi dan Progress Bar */}
                                                <div className="flex w-full flex-grow flex-col justify-center text-center md:text-left">
                                                    <div className="mb-1 flex flex-col md:flex-row md:items-center md:justify-between">
                                                        <div>
                                                            <h2 className="text-lg font-bold md:text-xl">{k.nama}</h2>
                                                            {k.nama_presiden && k.nama_wakil && (
                                                                <div className="text-sm text-white/70">
                                                                    {k.nama_presiden} &amp; {k.nama_wakil}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="mt-2 flex justify-center gap-2 md:mt-0 md:justify-end">
                                                            <div className="rounded bg-white/20 px-3 py-1 text-sm font-medium">
                                                                {k.jumlah_suara} Suara
                                                            </div>

                                                            {isPemenang && (
                                                                <div className="rounded bg-yellow-500 px-2 py-1 text-sm font-bold text-black">
                                                                    PEMENANG
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="mt-3">
                                                        <div className="mb-1 flex items-center justify-between">
                                                            <div className="text-sm font-medium">Persentase Suara</div>
                                                            <div className="text-sm font-bold text-yellow-300">{percentage.toFixed(1)}%</div>
                                                        </div>

                                                        {/* Progress Bar with animation */}
                                                        <div className="h-3 w-full overflow-hidden rounded-full bg-red-900/70 shadow-inner">
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
                    <div className="mx-auto mt-8 grid grid-cols-1 md:max-w-5xl">
                        <div className="rounded-xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-sm">
                            <h3 className="mb-3 flex items-center text-lg font-bold text-white">
                                <Calendar className="mr-2 h-5 w-5 text-yellow-300" />
                                Informasi Pemilihan
                            </h3>
                            <ul className="space-y-3 text-sm text-white/80">
                                <li className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <span>Tanggal Pelaksanaan:</span>
                                    <span className="font-medium text-white">{formattedDate}</span>
                                </li>
                                <li className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <span>Jumlah Kandidat:</span>
                                    <span className="font-medium text-white">{kandidat.length} Pasangan</span>
                                </li>
                                <li className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <span>Suara Sah:</span>
                                    <span className="font-medium text-white">{totalVotes} Suara</span>
                                </li>
                                <li className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <span>Partisipasi:</span>
                                    <span className="font-medium text-white">{totalVotesPercentage.toFixed(1)}%</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Tidak Memilih:</span>
                                    <span className="font-medium text-white">{totalVoters - totalVotes} Pemilih</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 border-t border-white/10 pt-10 text-center text-sm text-white/70">
                        <p>© {pemiraYear} Pemilihan Raya Universitas • Panitia PEMIRA {pemiraYear}</p>
                        <p className="mt-2 text-xs text-white/50">Data terakhir diperbarui: {formattedDateTime}</p>
                    </div>
                </div>

                {/* Floating Garuda di bagian bawah */}
                <div className="pointer-events-none fixed right-0 bottom-0 z-0 opacity-20 md:opacity-30">
                    <div className="garuda-float">
                        <img src={GarudaImage} alt="Garuda Pancasila" className="h-48 w-auto md:h-64" />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
