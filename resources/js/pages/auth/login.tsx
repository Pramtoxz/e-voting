import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, Calculator, Vote, CheckCircle, Shield } from 'lucide-react';
import { FormEventHandler } from 'react';
import GarudaImage from "@/assets/garuda.webp";
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
    
    // State untuk hitung mundur 3 detik
    const [countdown, setCountdown] = useState(3);
    const [showCountdown, setShowCountdown] = useState(false);
    
    // State untuk animasi typing
    const [typingText, setTypingText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [loopNum, setLoopNum] = useState(0)
    const [typingSpeed, setTypingSpeed] = useState(150)
  
    // Array teks yang akan diketik
    const textArray = [
        "Suarakan Pilihanmu...",
        "Masa Depan Kampus...",
        "Ada Di Tanganmu...",
        "PEMIRA 2025..."
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
    
    // Effect untuk hitung mundur
    useEffect(() => {
        if (showCountdown && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown, showCountdown]);
    
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        username: '',
        password: '',
        remember: false,
        captchaAnswer: '',
    });

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
        setShowCountdown(true); // Aktifkan hitung mundur
        
        // Setelah hitung mundur selesai, lanjutkan dengan login
        setTimeout(() => {
            post(route('login'), {
                onFinish: () => {
                    reset('password');
                    setIsSubmitting(false);
                    setShowCountdown(false);
                    setCountdown(3); // Reset countdown untuk penggunaan berikutnya
                    generateCaptcha();
                },
            });
        }, 3000); // Menunggu 3 detik
    };

    // Fungsi untuk menampilkan pesan error yang lebih ramah
    const getErrorMessage = (message: string) => {
        if (message === "These credentials do not match our records.") {
            return "Yah, Sepertinya Username atau password yang Anda masukkan salah";
        }
        return message;
    };

    // URL untuk batik pattern
    const batikPatternUrl = "https://img.freepik.com/free-vector/white-organic-lines-seamless-pattern-brown-background_1409-4450.jpg?t=st=1745350003~exp=1745353603~hmac=9136d2f2846337b3ff161fd1128332e04d74e31db2eb4ca1a246022b4194f730&w=996"

    if (isLoading || isSubmitting) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-700 to-red-900 relative overflow-hidden">
                <Head title="Login PEMIRA 2025" />
                
                {/* Garuda Animation */}
                <div className="relative flex flex-col items-center z-10">
                    <div className="w-40 h-40 garuda-shine relative animate-float">
                        <img 
                            src={GarudaImage} 
                            alt="Garuda Pancasila" 
                            className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse-subtle"
                        />
                        
                        {/* Elemen bersinar */}
                        <div className="absolute inset-0 garuda-rays opacity-70"></div>
                        
                        {/* Countdown display */}
                        {showCountdown && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-6xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse-countdown">{countdown}</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Loading spinner - tetap tampilkan baik saat countdown maupun tidak */}
                    <div className="mt-8 relative">
                        <div className="w-12 h-12 border-4 border-t-red-200 border-r-red-200 border-b-red-200 border-l-red-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                        </div>
                    </div>
                    
                    <p className="mt-8 text-white font-medium text-center text-lg">
                        {showCountdown 
                            ? `Sedang masuk, tunggu ${countdown} detik...` 
                            : (isLoading ? 'Memuat...' : 'Memverifikasi identitas Anda...')}
                    </p>
                    
                    <div className="mt-3 flex space-x-1.5">
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] flex flex-col overflow-hidden relative touch-manipulation">
            <Head title="Login PEMIRA 2025">
                <link rel="preload" href={LogoJayanusa} as="image" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <meta name="theme-color" content="#dc2626" />
            </Head>
            
            {/* Background image - Batik Pattern */}
            <div className="fixed inset-0 opacity-80 z-0">
                <img
                    src={batikPatternUrl}
                    alt="Batik Pattern Background"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="fixed inset-0 bg-gradient-to-b from-red-600/90 to-red-700/90 z-0"></div>

            {/* Wave divider */}
            <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden z-10">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,0,0,0z"
                        fill="#ffffff"
                    ></path>
                </svg>
            </div>

            {/* Mobile optimized content structure */}
            <div className="flex flex-col w-full min-h-[100dvh] z-20 relative">
                {/* Header section with branding */}
                <div className="flex justify-between items-center pt-5 px-4">
                    <div className="inline-flex items-center rounded-full border border-white bg-red-700/50 px-2.5 py-1 text-sm font-semibold text-white w-max">
                        <Shield className="mr-1 h-3.5 w-3.5" />
                        PEMIRA 2025
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden">
                            <img 
                                src={LogoJayanusa}
                                alt="Logo Jayanusa" 
                                className="w-7 h-7 object-contain"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Main content with reduced text */}
                <div className="flex-1 flex flex-col items-center px-4 py-2 justify-center">
                    {/* Login Form Card - Optimized for mobile */}
                    <div className="w-full max-w-md">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden relative z-20 motion-safe:animate-fadeIn">
                            {/* Red banner strip at top */}
                            <div className="h-2 w-full bg-gradient-to-r from-red-700 to-red-500"></div>
                            
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-red-700 text-xl font-bold">
                                        Masuk untuk Voting
                                    </h2>
                                    <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center shadow-md">
                                        <Vote className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            
                                <form className="space-y-4" onSubmit={handleLoginAttempt}>
                                    <div className="group">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 transition-colors group-focus-within:text-red-600">
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
                                                autoComplete="username"
                                                inputMode="text"
                                                value={data.username}
                                                onChange={(e) => setData('username', e.target.value)}
                                                placeholder="Masukkan username Anda"
                                                className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-base"
                                            />
                                        </div>
                                        {errors.username && (
                                            <p className="text-red-500 text-xs mt-1.5">{getErrorMessage(errors.username)}</p>
                                        )}
                                    </div>

                                    <div className="group">
                                        <div className="flex items-center justify-between mb-1">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 transition-colors group-focus-within:text-red-600">
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
                                                autoComplete="current-password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Masukkan password"
                                                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-base"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 touch-manipulation"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
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
                                            className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                            Ingat saya
                                        </label>
                                    </div>

                                    <div className="pt-1">
                                        <button 
                                            type="submit" 
                                            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center text-base"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Memproses...
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <Vote className="h-5 w-5 mr-2" />
                                                    Masuk untuk Voting
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </form>

                                {status && (
                                    <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fadeIn">
                                        {status}
                                    </div>
                                )}

                                <div className="mt-3">
                                    <div className="flex justify-center space-x-4 text-gray-600 text-xs">
                                        <div className="flex items-center space-x-1">
                                            <CheckCircle className="h-3.5 w-3.5 text-red-600" />
                                            <span>Aman</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <CheckCircle className="h-3.5 w-3.5 text-red-600" />
                                            <span>Rahasia</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <CheckCircle className="h-3.5 w-3.5 text-red-600" />
                                            <span>Terpercaya</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Red banner strip at bottom */}
                            <div className="h-2 w-full bg-gradient-to-r from-red-700 to-red-500"></div>
                        </div>
                    </div>

                    {/* Animasi Typing - Under the card */}
                    <div className="h-7 mt-3">
                        <p className="text-white font-bold text-lg typing-text-cursor overflow-hidden pr-1 inline-block">
                            {typingText}
                        </p>
                    </div>
                    
                    {/* Decorative Garuda image - optimized for mobile */}
                    <div className="fixed bottom-20 right-[-50px] w-40 h-40 opacity-15 garuda-float pointer-events-none z-0">
                        <img src={GarudaImage} alt="Garuda" className="w-full h-full" />
                    </div>
                </div>
                
                {/* National Principles on mobile - Horizontal scrolling */}
                <div className="w-full overflow-x-auto pb-2 pt-1 scrollbar-hide">
                    <div className="flex gap-2 min-w-max px-4">
                        <div className="px-3 py-1.5 bg-red-800/50 rounded-full border border-red-100/20">
                            <span className="font-medium text-white text-xs whitespace-nowrap">Ketuhanan Yang Maha Esa</span>
                        </div>
                        <div className="px-3 py-1.5 bg-red-800/50 rounded-full border border-red-100/20">
                            <span className="font-medium text-white text-xs whitespace-nowrap">Kemanusiaan Yang Adil</span>
                        </div>
                        <div className="px-3 py-1.5 bg-red-800/50 rounded-full border border-red-100/20">
                            <span className="font-medium text-white text-xs whitespace-nowrap">Persatuan Indonesia</span>
                        </div>
                        <div className="px-3 py-1.5 bg-red-800/50 rounded-full border border-red-100/20">
                            <span className="font-medium text-white text-xs whitespace-nowrap">Kerakyatan</span>
                        </div>
                        <div className="px-3 py-1.5 bg-red-800/50 rounded-full border border-red-100/20">
                            <span className="font-medium text-white text-xs whitespace-nowrap">Keadilan Sosial</span>
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="w-full text-center pb-4 pt-1 text-xs text-white/80 font-medium z-20">
                    &copy; {new Date().getFullYear()} STMIK - AMIK JAYANUSA
                </div>
            </div>

            {/* Dialog CAPTCHA - Mobile optimized */}
            <Dialog open={captchaDialogOpen} onOpenChange={setCaptchaDialogOpen}>
                <DialogContent className="sm:max-w-md bg-white border-red-200 rounded-xl max-w-[90vw] p-0 overflow-hidden">
                    <div className="h-2 w-full bg-gradient-to-r from-red-700 to-red-500"></div>
                    <div className="p-5">
                        <DialogHeader className="pb-0 space-y-2">
                            <DialogTitle className="text-red-700 flex items-center gap-2 text-xl">
                                <Shield className="h-5 w-5" />
                                Verifikasi
                            </DialogTitle>
                            <DialogDescription className="text-sm">
                                Silakan jawab pertanyaan berikut:
                            </DialogDescription>
                        </DialogHeader>
                        
                        <div className="flex flex-col space-y-4 py-4">
                            <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center">
                                <div className="flex items-center justify-center text-3xl font-bold text-red-700 mb-1">
                                    {captcha.num1} + {captcha.num2} = ?
                                </div>
                            </div>
                            
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <Calculator className="h-5 w-5" />
                                </div>
                                <Input
                                    type="number"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={captchaAnswer}
                                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                                    placeholder="Masukkan jawaban Anda"
                                    className="pl-10 py-3 border-red-200 focus:ring-red-500 rounded-xl text-base"
                                />
                            </div>
                            
                            {captchaError && (
                                <p className="text-red-500 text-sm">{captchaError}</p>
                            )}
                        </div>
                        
                        <DialogFooter className="flex space-x-2 sm:space-x-0 flex-col gap-2 sm:flex-row">
                            <Button 
                                variant="outline" 
                                onClick={generateCaptcha} 
                                className="border-red-200 text-red-700 hover:bg-red-50 rounded-xl py-2.5 w-full"
                            >
                                Ganti Soal
                            </Button>
                            <Button 
                                type="submit" 
                                onClick={submitCaptcha}
                                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl py-2.5 w-full"
                            >
                                Verifikasi
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* CSS untuk animasi dan scrollbar */}
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
                    
                    @keyframes floating {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
                    }
                    
                    .garuda-float {
                        animation: floating 3s ease-in-out infinite;
                    }
                    
                    .animate-fadeIn {
                        animation: fadeIn 0.5s ease-out;
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    /* Garuda shine animation */
                    .garuda-shine {
                        position: relative;
                        overflow: visible;
                    }
                    
                    .garuda-shine::after {
                        content: '';
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: linear-gradient(
                            to right,
                            rgba(255, 255, 255, 0) 0%,
                            rgba(255, 255, 255, 0.3) 50%,
                            rgba(255, 255, 255, 0) 100%
                        );
                        transform: rotate(30deg);
                        animation: shine 4s infinite;
                    }
                    
                    @keyframes shine {
                        0% { transform: rotate(30deg) translateX(-150%); }
                        20% { transform: rotate(30deg) translateX(150%); }
                        100% { transform: rotate(30deg) translateX(150%); }
                    }
                    
                    /* Animated rays */
                    .garuda-rays {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: radial-gradient(circle at center, transparent 35%, rgba(255, 50, 50, 0.1) 35%, rgba(255, 255, 255, 0.4) 100%);
                        pointer-events: none;
                        transform-origin: center;
                        animation: rays 8s infinite linear;
                    }
                    
                    @keyframes rays {
                        0% { transform: scale(0.8) rotate(0deg); }
                        100% { transform: scale(1.2) rotate(360deg); }
                    }
                    
                    /* Subtle pulse animation */
                    @keyframes pulse-subtle {
                        0% { transform: scale(1); filter: brightness(1); }
                        50% { transform: scale(1.05); filter: brightness(1.2); }
                        100% { transform: scale(1); filter: brightness(1); }
                    }
                    
                    .animate-pulse-subtle {
                        animation: pulse-subtle 3s infinite ease-in-out;
                    }
                    
                    .animate-float {
                        animation: floating 4s infinite ease-in-out;
                    }
                    
                    /* Countdown display */
                    .animate-pulse-countdown {
                        animation: pulse-countdown 1s infinite ease-in-out;
                    }
                    
                    @keyframes pulse-countdown {
                        0% { transform: scale(1); text-shadow: 0 0 20px rgba(255, 255, 255, 0.7); }
                        50% { transform: scale(1.2); text-shadow: 0 0 30px rgba(255, 255, 255, 1); }
                        100% { transform: scale(1); text-shadow: 0 0 20px rgba(255, 255, 255, 0.7); }
                    }
                    
                    /* Logo spinning */
                    @keyframes spin-slow {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    .animate-spin-slow {
                        animation: spin-slow 10s linear infinite;
                    }
                    
                    /* Hide scrollbar for Chrome, Safari and Opera */
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                    
                    /* Hide scrollbar for IE, Edge and Firefox */
                    .scrollbar-hide {
                        -ms-overflow-style: none;  /* IE and Edge */
                        scrollbar-width: none;  /* Firefox */
                    }
                    
                    /* Haptic feedback untuk tombol */
                    @keyframes buttonPress {
                        0% { transform: scale(1); }
                        50% { transform: scale(0.97); }
                        100% { transform: scale(1); }
                    }
                    
                    @media (max-width: 640px) {
                        input, button {
                            font-size: 16px !important; /* Prevent zoom on iOS */
                        }
                    }
                    
                    /* Pencegah bouncing pada iOS */
                    html, body {
                        position: fixed;
                        overflow: hidden;
                        width: 100%;
                        height: 100%;
                        overscroll-behavior: none;
                    }
                `
            }} />
        </div>
    );
}