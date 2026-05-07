import GarudaImage from '@/assets/garuda.webp';
import { getPemiraYear } from '@/utils/date';
import { Shield } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface HeroSectionProps {
    typingText: string;
    batikPatternUrl: string;
    isAuthenticated?: boolean;
}

export default function HeroSection({ typingText, batikPatternUrl, isAuthenticated }: HeroSectionProps) {
    const pemiraYear = getPemiraYear();

    const scrollToKandidat = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const kandidatSection = document.getElementById('kandidat');
        if (kandidatSection) {
            kandidatSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section id="beranda" className="relative w-full overflow-hidden bg-gradient-to-b from-red-600 to-red-700 py-12 text-white sm:py-16 md:py-24 lg:py-32 xl:py-40">
            <div className="absolute inset-0 opacity-80">
                <img src={batikPatternUrl} alt="Batik Pattern Background" className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-red-600/90 to-red-700/90"></div>

            <div className="relative container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                    <div className="flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8">
                        <div className="mb-2 inline-flex w-fit items-center rounded-full border border-white bg-red-700/50 px-3 py-1 text-sm font-semibold text-white sm:mb-3 sm:px-4 sm:py-1.5 sm:text-base">
                            <Shield className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />
                            Semangat Nasionalisme
                        </div>
                        <div className="space-y-3 sm:space-y-4 md:space-y-6">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl/none">
                                Pemilihan Raya Mahasiswa {pemiraYear}
                            </h1>
                            <p className="max-w-[700px] text-base text-red-100 sm:text-lg md:text-xl lg:text-2xl">
                                "Dari Sabang sampai Merauke berjajar pulau-pulau, sambung menyambung menjadi satu, itulah Indonesia."
                            </p>
                            <p className="max-w-[700px] text-base text-red-100 italic sm:text-lg md:text-xl lg:text-2xl">
                                Suarakan pilihanmu untuk masa depan kampus yang lebih baik. Bersama kita wujudkan perubahan.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 min-[400px]:flex-row sm:gap-4">
                            {isAuthenticated ? (
                                <Link href={route('voting.index')}>
                                    <button className="inline-flex h-12 w-full items-center justify-center rounded-md border border-white bg-white px-8 text-base font-semibold text-red-700 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-14 sm:px-10 sm:text-lg min-[400px]:w-auto">
                                        Voting Sekarang
                                    </button>
                                </Link>
                            ) : (
                                <Link href={route('login')}>
                                    <button className="inline-flex h-12 w-full items-center justify-center rounded-md border border-white bg-white px-8 text-base font-semibold text-red-700 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-14 sm:px-10 sm:text-lg min-[400px]:w-auto">
                                        Login untuk Voting
                                    </button>
                                </Link>
                            )}
                            <a href="#kandidat" onClick={scrollToKandidat}>
                                <button className="inline-flex h-12 w-full items-center justify-center rounded-md border border-white bg-transparent px-8 text-base font-semibold text-white transition-all duration-200 hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-14 sm:px-10 sm:text-lg min-[400px]:w-auto">
                                    Lihat Kandidat
                                </button>
                            </a>
                        </div>

                        <div className="mt-3 h-7 sm:mt-4 sm:h-9 md:h-10">
                            <p className="typing-text-cursor overflow-hidden pr-1 text-lg font-bold text-white sm:text-xl md:text-2xl">{typingText}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl">
                            <div className="grid h-full w-full grid-cols-1 grid-rows-1">
                                <div className="relative flex justify-center">
                                    <div className="garuda-float">
                                        <img src={GarudaImage} alt="Garuda Pancasila" className="h-full w-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-8 max-w-4xl border-t border-b border-white/30 py-4 text-center sm:mt-12 sm:py-6 md:mt-16">
                    <p className="text-base text-white/90 italic sm:text-lg md:text-xl">"Jangan biarkan suara pendapat orang lain menenggelamkan suara hatimu sendiri."</p>
                    <p className="mt-2 text-sm text-white/70 sm:text-base">— Steve Jobs</p>
                </div>
            </div>

            <div className="absolute right-0 bottom-0 left-0 h-16 overflow-hidden sm:h-20 md:h-24">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 h-full w-full">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,0,0,0z"
                        fill="#ffffff"
                    ></path>
                </svg>
            </div>
        </section>
    );
}
