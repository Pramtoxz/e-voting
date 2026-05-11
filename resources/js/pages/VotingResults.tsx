import GarudaImage from '@/assets/garuda.webp';
import DramaticReveal from '@/components/voting-results/DramaticReveal';
import Layout from '@/Layout/MainLayout';
import { getPemiraYear } from '@/utils/date';
import { Head } from '@inertiajs/react';
import { AlertTriangle, BarChart, Clock, Crown, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

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

    // State untuk dramatic reveal animation
    const [showReveal, setShowReveal] = useState(() => {
        // Tampilkan reveal hanya jika hasil sedang ditampilkan & belum pernah dilihat session ini
        if (typeof window === 'undefined') return false;
        if (!showResults) return false;
        return sessionStorage.getItem('pemira_reveal_seen') !== '1';
    });

    const handleRevealFinish = () => {
        sessionStorage.setItem('pemira_reveal_seen', '1');
        setShowReveal(false);
    };

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
                // Hapus flag reveal agar reveal tampil setelah reload
                sessionStorage.removeItem('pemira_reveal_seen');
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
                                <span className="mt-2 block font-semibold not-italic">â€” Rafi Chandra - Pramudito Metra</span>
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

    // Tampilan modern hasil voting — layout proyektor (1 layar, no scroll, no navbar)
    return (
        <>
            <Head title={`Hasil Voting - PEMIRA ${pemiraYear}`} />
            <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

            {/* Dramatic reveal overlay */}
            {showReveal && <DramaticReveal kandidat={kandidat} totalVotes={totalVotes} onFinish={handleRevealFinish} />}

            {/* Full viewport — tidak pakai Layout agar tidak ada navbar */}
            <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-gradient-to-br from-red-950 via-red-900 to-red-800">
                {/* Batik pattern */}
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='5' cy='5' r='2.5'/%3E%3Ccircle cx='25' cy='25' r='2.5'/%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                />
                <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-red-500/20 blur-[150px]" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-white/5 blur-[150px]" />

                <div className="relative z-10 flex h-full flex-col px-8 py-5 xl:px-14 xl:py-7">
                    {/* ── HEADER ── */}
                    <div className="mb-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <img src={GarudaImage} alt="Garuda" className="h-10 w-auto opacity-80 xl:h-12" />
                            <div>
                                <p className="text-[10px] font-black tracking-[0.3em] text-white/60 uppercase xl:text-xs">Hasil Resmi</p>
                                <h1 className="text-xl leading-tight font-black xl:text-3xl">Pemilihan Raya Mahasiswa {pemiraYear}</h1>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-white/50 xl:text-xs">{formattedDate}</p>
                            <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black text-white xl:text-xs">
                                <BarChart className="h-3 w-3" />
                                {totalVotes} Suara Sah
                            </div>
                        </div>
                    </div>

                    {/* ── MAIN CONTENT ── */}
                    <div className="flex min-h-0 flex-1 gap-5 xl:gap-7">
                        {/* ── KOLOM KIRI: semua kandidat ── */}
                        <div className="flex w-64 flex-shrink-0 flex-col gap-3 xl:w-72">
                            <p className="text-[10px] font-black tracking-[0.3em] text-white/50 uppercase xl:text-xs">Perolehan Suara</p>

                            <div className="flex flex-col gap-3 overflow-hidden">
                                {sortedKandidat.map((k, index) => {
                                    const pct = totalVotes > 0 ? (k.jumlah_suara / totalVotes) * 100 : 0;
                                    const isWinner = k.id === pemenang?.id;
                                    return (
                                        <div
                                            key={k.id}
                                            className={`relative overflow-hidden rounded-2xl ${
                                                isWinner ? 'border-2 border-white/50 bg-white/15 shadow-lg' : 'border border-white/10 bg-white/5'
                                            }`}
                                        >
                                            {/* Progress bar bg */}
                                            <div
                                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/20 to-transparent"
                                                style={{ width: `${pct}%` }}
                                            />
                                            <div className="relative p-3 xl:p-4">
                                                {/* Rank + nama */}
                                                <div className="mb-2 flex items-center gap-2">
                                                    <div
                                                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-black xl:h-7 xl:w-7 ${isWinner ? 'bg-white text-red-700' : 'bg-white/15 text-white'}`}
                                                    >
                                                        {index + 1}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-[10px] text-white/50">No. {k.nomor_urut}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-base font-black text-white xl:text-lg">{pct.toFixed(1)}%</p>
                                                        <p className="text-[10px] text-white/50">{k.jumlah_suara} suara</p>
                                                    </div>
                                                </div>

                                                {/* Duo foto kecil + nama */}
                                                <div className="flex items-center gap-2">
                                                    {/* Foto presiden */}
                                                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-white/40 xl:h-12 xl:w-12">
                                                        {k.foto_presiden ? (
                                                            <img
                                                                src={`/storage/${k.foto_presiden}`}
                                                                alt={k.nama_presiden}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-white/10">
                                                                <Crown className="h-4 w-4 text-white/50" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* Foto wakil */}
                                                    <div className="-ml-3 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-white/40 xl:h-12 xl:w-12">
                                                        {k.foto_wakil ? (
                                                            <img
                                                                src={`/storage/${k.foto_wakil}`}
                                                                alt={k.nama_wakil}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-white/10">
                                                                <Crown className="h-4 w-4 text-white/50" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-xs font-black text-white xl:text-sm">{k.nama_presiden}</p>
                                                        <p className="truncate text-[10px] text-white/60">&amp; {k.nama_wakil}</p>
                                                    </div>
                                                    {isWinner && (
                                                        <div className="flex-shrink-0 rounded-full bg-white px-2 py-0.5 text-[9px] font-black text-red-700 uppercase xl:text-[10px]">
                                                            Menang
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Footer */}
                            <div className="mt-auto border-t border-white/10 pt-3 text-center">
                                <p className="text-[10px] text-white/30">PEMIRA {pemiraYear} &bull; Resmi Diumumkan</p>
                            </div>
                        </div>

                        {/* ── KOLOM KANAN: Pemenang besar ── */}
                        {pemenang && (
                            <div className="flex min-h-0 flex-1 flex-col">
                                <p className="mb-3 flex items-center justify-center gap-2 text-[10px] font-black tracking-[0.35em] text-white/50 uppercase xl:text-xs">
                                    <Crown className="h-3.5 w-3.5" />
                                    Pemenang PEMIRA {pemiraYear}
                                </p>

                                <div className="flex min-h-0 flex-1 overflow-hidden rounded-3xl bg-white shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
                                    {/* Ribbon kiri vertikal */}
                                    <div className="flex w-10 flex-shrink-0 items-center justify-center bg-gradient-to-b from-red-700 via-red-600 to-red-700 xl:w-12">
                                        <p
                                            className="rotate-180 text-[9px] font-black tracking-[0.4em] text-white uppercase xl:text-[10px]"
                                            style={{ writingMode: 'vertical-rl' }}
                                        >
                                            Pasangan Terpilih
                                        </p>
                                    </div>

                                    {/* Konten pemenang */}
                                    <div className="flex min-h-0 flex-1 flex-col justify-between p-6 xl:p-8">
                                        {/* Nomor urut */}
                                        <div className="flex justify-center">
                                            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-xs font-black tracking-widest text-red-700 uppercase xl:text-sm">
                                                <Trophy className="h-3.5 w-3.5 text-red-600" />
                                                Nomor Urut {pemenang.nomor_urut}
                                            </div>
                                        </div>

                                        {/* Duo foto besar */}
                                        <div className="flex items-center justify-center gap-6 xl:gap-12">
                                            {/* Presiden */}
                                            <div className="flex flex-col items-center text-center">
                                                <div className="relative mb-3">
                                                    <div className="absolute inset-0 -m-3 animate-pulse rounded-full bg-red-500/20 blur-2xl" />
                                                    <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-red-600 shadow-2xl xl:h-56 xl:w-56">
                                                        {pemenang.foto_presiden ? (
                                                            <img
                                                                src={`/storage/${pemenang.foto_presiden}`}
                                                                alt={pemenang.nama_presiden}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-red-100">
                                                                <Crown className="h-12 w-12 text-red-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-[10px] font-bold tracking-widest text-red-600 uppercase xl:text-xs">
                                                    Presiden Mahasiswa
                                                </p>
                                                <h2 className="mt-1 text-xl leading-tight font-black text-gray-900 xl:text-3xl">
                                                    {pemenang.nama_presiden}
                                                </h2>
                                            </div>

                                            {/* Divider */}
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="h-20 w-px bg-gray-200 xl:h-28" />
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-black text-white shadow-lg xl:h-12 xl:w-12 xl:text-base">
                                                    &amp;
                                                </div>
                                                <div className="h-20 w-px bg-gray-200 xl:h-28" />
                                            </div>

                                            {/* Wakil */}
                                            <div className="flex flex-col items-center text-center">
                                                <div className="relative mb-3">
                                                    <div
                                                        className="absolute inset-0 -m-3 animate-pulse rounded-full bg-red-500/20 blur-2xl"
                                                        style={{ animationDelay: '0.7s' }}
                                                    />
                                                    <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-red-600 shadow-2xl xl:h-56 xl:w-56">
                                                        {pemenang.foto_wakil ? (
                                                            <img
                                                                src={`/storage/${pemenang.foto_wakil}`}
                                                                alt={pemenang.nama_wakil}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-red-100">
                                                                <Crown className="h-12 w-12 text-red-400" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-[10px] font-bold tracking-widest text-red-600 uppercase xl:text-xs">
                                                    Wakil Presiden
                                                </p>
                                                <h2 className="mt-1 text-xl leading-tight font-black text-gray-900 xl:text-3xl">
                                                    {pemenang.nama_wakil}
                                                </h2>
                                            </div>
                                        </div>

                                        {/* Persentase */}
                                        <div className="mt-4 flex justify-center">
                                            <div className="inline-flex items-baseline gap-3 rounded-2xl bg-gradient-to-r from-red-700 to-red-600 px-8 py-3 text-white shadow-xl xl:px-10 xl:py-4">
                                                <span className="text-4xl font-black xl:text-5xl">
                                                    {totalVotes > 0 ? ((pemenang.jumlah_suara / totalVotes) * 100).toFixed(1) : 0}%
                                                </span>
                                                <span className="text-xs font-bold tracking-widest uppercase xl:text-sm">
                                                    {pemenang.jumlah_suara} suara
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Garuda watermark pojok kanan bawah */}
                <div className="pointer-events-none absolute right-4 bottom-4 z-0 opacity-10">
                    <img src={GarudaImage} alt="Garuda Pancasila" className="h-48 w-auto xl:h-64" />
                </div>
            </div>
        </>
    );
}

/* ============ HELPER COMPONENTS ============ */

function MiniStatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm xl:px-5 xl:py-3.5">
            <div className="mb-1 flex items-center gap-2 text-white/60">
                {icon}
                <span className="text-[10px] font-bold tracking-widest uppercase xl:text-xs">{label}</span>
            </div>
            <div className="text-2xl font-black text-white xl:text-3xl">{value}</div>
        </div>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6">
            <div className="mb-3 flex items-center gap-2 text-white/70">
                {icon}
                <span className="text-xs font-bold tracking-widest uppercase md:text-sm">{label}</span>
            </div>
            <div className="text-3xl font-black text-white md:text-4xl">{value}</div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 last:border-0 md:pb-3">
            <span className="text-sm text-white/60 md:text-base">{label}</span>
            <span className="text-sm font-bold text-white md:text-base">{value}</span>
        </div>
    );
}
