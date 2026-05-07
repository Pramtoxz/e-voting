import LogoJayanusa from '@/assets/jayanusa.webp';
import { getPemiraYear } from '@/utils/date';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
    const pemiraYear = getPemiraYear();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full bg-gradient-to-b from-red-700 to-red-900 text-white">
            {/* Wave decoration */}
            <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute top-0 h-full w-full">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V120C0,120,0,120,0,120z"
                        fill="#ffffff"
                    ></path>
                </svg>
            </div>

            <div className="container mx-auto px-4 pt-24 pb-8 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* About Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-white ring-2 ring-red-400">
                                <img src={LogoJayanusa} alt="Logo Jayanusa" className="h-full w-full object-contain" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">PEMIRA {pemiraYear}</h3>
                                <p className="text-xs text-red-200">STMIK-AMIK Jayanusa</p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-red-100">
                            Campus For Information Technology. Berdiri sejak 2002 dengan SK DIKTI No. 153/D/O/2002. Semua Program Studi Terakreditasi B.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Tautan Cepat</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#beranda" className="text-red-100 transition-colors hover:text-white hover:underline">
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a href="#tentang" className="text-red-100 transition-colors hover:text-white hover:underline">
                                    Tentang PEMIRA
                                </a>
                            </li>
                            <li>
                                <a href="#kandidat" className="text-red-100 transition-colors hover:text-white hover:underline">
                                    Kandidat
                                </a>
                            </li>
                            <li>
                                <a href="#faq" className="text-red-100 transition-colors hover:text-white hover:underline">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="/login" className="text-red-100 transition-colors hover:text-white hover:underline">
                                    Login
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Kontak</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-300" />
                                <div className="text-red-100">
                                    <p>Jl. Olo Ladang No.1, Padang</p>
                                    <p>Jl. Damar No.69 E, Padang</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 flex-shrink-0 text-red-300" />
                                <div className="text-red-100">
                                    <p>(0751) 28984</p>
                                    <p>+62 811 6650 635</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 flex-shrink-0 text-red-300" />
                                <a href="mailto:jayanusa@jayanusa.ac.id" className="text-red-100 transition-colors hover:text-white hover:underline">
                                    jayanusa@jayanusa.ac.id
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Ikuti Kami</h3>
                        <p className="text-sm text-red-100">Tetap terhubung dengan kami melalui media sosial</p>
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com/jayanusa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-800 transition-all duration-200 hover:bg-white hover:text-red-700 hover:shadow-lg"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="https://instagram.com/jayanusa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-800 transition-all duration-200 hover:bg-white hover:text-red-700 hover:shadow-lg"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com/jayanusa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-800 transition-all duration-200 hover:bg-white hover:text-red-700 hover:shadow-lg"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://youtube.com/jayanusa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-800 transition-all duration-200 hover:bg-white hover:text-red-700 hover:shadow-lg"
                            >
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-red-600 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-red-200 md:flex-row md:text-left">
                        <p>
                            &copy; {currentYear} STMIK-AMIK Jayanusa. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="transition-colors hover:text-white hover:underline">
                                Kebijakan Privasi
                            </a>
                            <a href="#" className="transition-colors hover:text-white hover:underline">
                                Syarat & Ketentuan
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
