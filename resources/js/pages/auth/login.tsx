import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, LogIn, Calculator } from 'lucide-react';
import { FormEventHandler } from 'react';
import Lottie from 'lottie-react';
import animationData from '@/assets/animasi.json';
import LogoJayanusa from '@/assets/jayanusa.webp';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginForm = {
    username: string;
    password: string;
    remember: boolean;
    captchaAnswer: string;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [captchaDialogOpen, setCaptchaDialogOpen] = useState(false);
    const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        username: '',
        password: '',
        remember: false,
        captchaAnswer: '',
    });

    // Tambahkan useEffect untuk menerapkan tema dari localStorage
    useEffect(() => {
        const savedThemeMode = localStorage.getItem('themeMode') as 'light' | 'dark' | 'system' || 'system';
        
        if (savedThemeMode === 'system') {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', systemPrefersDark);
        } else {
            document.documentElement.classList.toggle('dark', savedThemeMode === 'dark');
        }
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (savedThemeMode === 'system') {
                document.documentElement.classList.toggle('dark', mediaQuery.matches);
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Fungsi untuk menghasilkan soal matematika baru
    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCaptcha({
            num1,
            num2,
            answer: num1 + num2
        });
        setCaptchaAnswer('');
        setCaptchaError('');
    };

    // Menghasilkan CAPTCHA saat komponen dimuat
    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleLoginAttempt: FormEventHandler = (e) => {
        e.preventDefault();
        setCaptchaDialogOpen(true);
    };

    const submitCaptcha = () => {
        if (parseInt(captchaAnswer) !== captcha.answer) {
            setCaptchaError('Jawaban matematika tidak tepat, silakan coba lagi');
            generateCaptcha();
            return;
        }
        
        setCaptchaError('');
        setCaptchaDialogOpen(false);
        setIsSubmitting(true);
        
        // Setelah CAPTCHA berhasil, lanjutkan dengan login
        post(route('login'), {
            onFinish: () => {
                reset('password');
                setIsSubmitting(false);
                generateCaptcha();
            },
        });
    };

    // Fungsi untuk menampilkan pesan error yang lebih ramah
    const getErrorMessage = (message: string) => {
        if (message === "These credentials do not match our records.") {
            return "Yah, Sepertinya Username atau password yang Anda masukkan salah";
        }
        return message;
    };

    if (isLoading || isSubmitting) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <Head title="Login Portal Materi" />
                <div className="w-64 h-64">
                    <Lottie 
                        animationData={animationData} 
                        loop={true}
                        autoplay={true}
                    />
                </div>
                <p className="mt-4 text-indigo-700 font-medium">
                    {isLoading ? '⏳  Sedang Di Proses...' : '🚪✨ Membuka pintu gerbang ilmu pengetahuan...'}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#1a1a1a] dark:via-[#0f1117] dark:to-black transition-all duration-500 p-4 sm:p-6 md:p-8">
            <Head title="Login Portal Materi">
                <link rel="preload" href={LogoJayanusa} as="image" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            </Head>
            
            <div className="w-full max-w-md transition-all duration-700 opacity-100 scale-100">
                <div className="bg-white dark:bg-[#1a1a1a]/80 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl dark:border dark:border-[#dd00ff]/20">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-[#b800e6] dark:via-[#dd00ff] dark:to-[#ff00ff] p-6 sm:p-8 flex flex-col items-center relative overflow-hidden">
                        {/* Elemen dekoratif */}
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-400 opacity-20 rounded-full"></div>
                            <div className="absolute top-20 -right-10 w-32 h-32 bg-indigo-400 opacity-20 rounded-full"></div>
                        </div>
                        
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-md transform transition-transform duration-300 hover:scale-105 z-10">
                            <img 
                                 src={LogoJayanusa}
                                alt="Logo Jayanusa" 
                                className="w-16 h-16 object-contain"
                            />
                        </div>
                        <h1 className="text-white text-2xl font-bold text-center z-10">
                            Portal Materi 
                        </h1>
                        <p className="text-blue-100 text-sm mt-1 z-10">
                            STMIK - AMIK JAYANUSA
                        </p>
                    </div>

                    <div className="p-6 sm:p-8">
                        <form className="space-y-5" onSubmit={handleLoginAttempt}>
                            <div className="group">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1.5 transition-colors group-focus-within:text-blue-600">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="username"
                                        type="text"
                                        required
                                        autoFocus
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                        placeholder="Masukkan username Anda"
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                                    />
                                </div>
                                {errors.username && (
                                    <p className="text-red-500 text-xs mt-1.5">{getErrorMessage(errors.username)}</p>
                                )}
                            </div>

                            <div className="group">
                                <div className="flex items-center justify-between mb-1.5">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600">
                                        Password
                                    </label>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Masukkan password"
                                        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4.5 w-4.5" />
                                        ) : (
                                            <Eye className="h-4.5 w-4.5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1.5">{getErrorMessage(errors.password)}</p>
                                )}
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    Ingat saya
                                </label>
                            </div>

                            <div>
                                <button 
                                    type="submit" 
                                    className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-[#b800e6] dark:via-[#dd00ff] dark:to-[#ff00ff] hover:from-blue-700 hover:to-indigo-800 dark:hover:from-[#a500cc] dark:hover:via-[#c700e6] dark:hover:to-[#e600e6] text-white font-medium shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Memproses...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <LogIn className="h-4 w-4 mr-2" />
                                            Masuk
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>

                        {status && (
                            <div className="mt-5 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fadeIn">
                                {status}
                            </div>
                        )}

                        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                            Etss... Udah Follow Instagram Jayanusa Belum?{' '}
                            <a href="https://www.instagram.com/stmikamikjayanusa/" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               className="text-blue-600 hover:text-blue-800 dark:text-[#dd00ff] dark:hover:text-[#ff00ff] font-medium transition-colors duration-200">
                                Klik Disini!
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                    &copy; {new Date().getFullYear()} STMIK - AMIK JAYANUSA. Hak Cipta Dilindungi.
                </div>
            </div>
            
            {/* Dialog CAPTCHA dengan tema gelap */}
            <Dialog open={captchaDialogOpen} onOpenChange={setCaptchaDialogOpen}>
                <DialogContent className="sm:max-w-md dark:bg-[#1a1a1a] dark:border-[#dd00ff]/20">
                    <DialogHeader>
                        <DialogTitle className="dark:text-white">Verifikasi Keamanan</DialogTitle>
                        <DialogDescription className="dark:text-[#dd00ff]/80">
                            Silakan jawab pertanyaan matematika berikut untuk melanjutkan.
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="flex flex-col space-y-4 py-4">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-center text-xl font-medium text-gray-800">
                                {captcha.num1} + {captcha.num2} = ?
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Calculator className="h-5 w-5" />
                            </div>
                            <Input
                                type="text"
                                value={captchaAnswer}
                                onChange={(e) => setCaptchaAnswer(e.target.value)}
                                placeholder="Masukkan jawaban Anda"
                                className="pl-10"
                            />
                        </div>
                        
                        {captchaError && (
                            <p className="text-red-500 text-sm">{captchaError}</p>
                        )}
                    </div>
                    
                    <DialogFooter className="flex space-x-2 sm:space-x-0">
                        <Button variant="outline" onClick={generateCaptcha}>
                            Ganti Soal
                        </Button>
                        <Button type="submit" onClick={submitCaptcha}>
                            Verifikasi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}