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
        <section id="beranda" className="relative w-full overflow-hidden bg-gradient-to-b from-red-600 to-red-700 py-8 text-white sm:py-12 md:py-16 lg:py-20">
            <div className="absolute inset-0 opacity-80">
                <img src={batikPatternUrl} alt="Batik Pattern Background" className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-red-600/90 to-red-700/90"></div>

            <div className="relative container px-4 md:px-6">
                <div className="grid gap-4 lg:grid-cols-2 lg:gap-8 xl:grid-cols-2">
                    <div className="flex flex-col justify-center space-y-3 sm:space-y-4">
                        <div className="mb-2 inline-flex items-center rounded-full border border-white bg-red-700/50 px-2.5 py-0.5 text-xs font-semibold text-white sm:mb-3 sm:text-sm">
                            <Shield className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            Semangat Nasionalisme
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">Pemilihan Raya Mahasiswa {pemiraYear}</h1>
                            <p className="max-w-[600px] text-sm text-red-100 sm:text-base md:text-xl">
                                "Dari Sabang sampai Merauke berjajar pulau-pulau, sambung menyambung menjadi satu, itulah Indonesia."
                            </p>
                            <p className="max-w-[600px] text-sm text-red-100 italic sm:text-base md:text-lg">
                                Suarakan pilihanmu untuk masa depan kampus yang lebih baik. Bersama kita wujudkan perubahan.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            {isAuthenticated ? (
                                <Link href={route('voting.index')}>
                                    <button className="inline-flex h-11 w-full items-center justify-center rounded-md border border-white bg-white px-8 font-medium text-red-700 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-[400px]:w-auto">
                                        Voting Sekarang
                                    </button>
                                </Link>
                            ) : (
                                <Link href={route('login')}>
                                    <button className="inline-flex h-11 w-full items-center justify-center rounded-md border border-white bg-white px-8 font-medium text-red-700 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-[400px]:w-auto">
                                        Login untuk Voting
                                    </button>
                                </Link>
                            )}
                            <a href="#kandidat" onClick={scrollToKandidat}>
                                <button className="inline-flex h-11 w-full items-center justify-center rounded-md border border-white bg-transparent px-8 font-medium text-white transition-all duration-200 hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-[400px]:w-auto">
                                    Lihat Kandidat
                                </button>
                            </a>
                        </div>

                        <div className="mt-2 h-6 sm:mt-3 sm:h-8">
                            <p className="typing-text-cursor overflow-hidden pr-1 text-base font-bold text-white sm:text-lg md:text-xl">{typingText}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative w-full">
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

                <div className="mx-auto mt-6 max-w-3xl border-t border-b border-white/30 py-3 text-center sm:mt-8 sm:py-4">
                    <p className="text-sm text-white/90 italic sm:text-base">"Jangan biarkan suara pendapat orang lain menenggelamkan suara hatimu sendiri."</p>
                    <p className="mt-1 text-xs text-white/70 sm:text-sm">— Steve Jobs</p>
                </div>
            </div>

            <div className="absolute right-0 bottom-0 left-0 h-16 overflow-hidden">
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
