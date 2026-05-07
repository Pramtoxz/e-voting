import GarudaImage from '@/assets/garuda.webp';
import LogoJayanusa from '@/assets/jayanusa.webp';
import { CaptchaDialog, CountdownOverlay, LoginForm } from '@/components/auth';
import { LOGIN_STYLES, LOGIN_TYPING_TEXT_ARRAY } from '@/constants/auth';
import { useCaptcha } from '@/hooks/useCaptcha';
import { useCountdown } from '@/hooks/useCountdown';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import { LoginForm as LoginFormData, LoginProps } from '@/types/auth';
import { getPemiraYear } from '@/utils/date';
import { Head, useForm } from '@inertiajs/react';
import { Shield, Vote } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export default function Login({ status }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const pemiraYear = getPemiraYear();

    const { countdown, showCountdown, startCountdown } = useCountdown(3);
    const typingText = useTypingAnimation(LOGIN_TYPING_TEXT_ARRAY);
    const { captcha, captchaAnswer, captchaError, captchaDialogOpen, setCaptchaAnswer, setCaptchaDialogOpen, generateCaptcha, verifyCaptcha } = useCaptcha();

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginFormData>>({
        username: '',
        password: '',
        remember: false,
        captchaAnswer: '',
    });

    const handleDataChange = (field: keyof LoginFormData, value: string | boolean) => {
        setData(field, value as never);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        generateCaptcha();
        setCaptchaDialogOpen(true);
    };

    const handleCaptchaVerify = () => {
        if (!verifyCaptcha()) return;

        setCaptchaDialogOpen(false);
        setIsSubmitting(true);
        startCountdown();

        setTimeout(() => {
            post(route('login'), {
                onFinish: () => {
                    reset('password');
                    setIsSubmitting(false);
                },
            });
        }, 3000);
    };

    return (
        <>
            <Head title={`Login - PEMIRA ${pemiraYear}`} />

            <style dangerouslySetInnerHTML={{ __html: LOGIN_STYLES }} />

            <CountdownOverlay show={showCountdown} countdown={countdown} />

            <CaptchaDialog
                open={captchaDialogOpen}
                captcha={captcha}
                answer={captchaAnswer}
                error={captchaError}
                onAnswerChange={setCaptchaAnswer}
                onVerify={handleCaptchaVerify}
                onCancel={() => setCaptchaDialogOpen(false)}
            />

            <div className="flex min-h-screen">
                <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-red-600 to-red-700 lg:block">
                    <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/white-organic-lines-seamless-pattern-brown-background_1409-4450.jpg')] opacity-20"></div>

                    <div className="relative flex h-full flex-col items-center justify-center p-12 text-white">
                        <div className="garuda-float mb-8">
                            <img src={GarudaImage} alt="Garuda Pancasila" className="h-64 w-64 drop-shadow-2xl" />
                        </div>

                        <div className="mb-4 inline-flex items-center rounded-full border border-white bg-red-700/50 px-4 py-2 text-sm font-semibold">
                            <Shield className="mr-2 h-4 w-4" />
                            Semangat Nasionalisme
                        </div>

                        <h1 className="mb-4 text-center text-4xl font-bold">Pemilihan Raya Mahasiswa {pemiraYear}</h1>

                        <p className="mb-8 max-w-md text-center text-lg text-red-100">
                            Suarakan pilihanmu untuk masa depan kampus yang lebih baik. Bersama kita wujudkan perubahan.
                        </p>

                        <div className="h-12">
                            <p className="typing-text-cursor text-2xl font-bold">{typingText}</p>
                        </div>

                        <div className="mt-12 flex items-center gap-4 rounded-full border border-white/30 bg-white/10 px-6 py-3 backdrop-blur-sm">
                            <Vote className="h-6 w-6" />
                            <span className="text-sm font-medium">Demokrasi Kampus Dimulai Dari Sini</span>
                        </div>
                    </div>
                </div>

                <div className="flex w-full items-center justify-center bg-gray-50 p-8 lg:w-1/2">
                    <div className="w-full max-w-md">
                        <div className="mb-8 text-center">
                            <img src={LogoJayanusa} alt="Logo Jayanusa" className="mx-auto mb-6 h-24 w-auto" />
                            <h2 className="mb-2 text-3xl font-bold text-gray-800">Selamat Datang</h2>
                            <p className="text-gray-600">Silakan login untuk melanjutkan ke sistem voting</p>
                        </div>

                        {status && (
                            <div className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-600">
                                <p>{status}</p>
                            </div>
                        )}

                        <div className="rounded-2xl bg-white p-8 shadow-xl">
                            <LoginForm
                                data={data}
                                errors={errors}
                                processing={processing || isSubmitting}
                                showPassword={showPassword}
                                onDataChange={handleDataChange}
                                onTogglePassword={() => setShowPassword(!showPassword)}
                                onSubmit={submit}
                            />
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-600">
                            <p>© {pemiraYear} PEMIRA. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
