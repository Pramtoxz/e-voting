import { Captcha } from '@/types/auth';
import { useState } from 'react';

export function useCaptcha() {
    const [captcha, setCaptcha] = useState<Captcha>({ num1: 0, num2: 0, answer: 0 });
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    const [captchaDialogOpen, setCaptchaDialogOpen] = useState(false);

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCaptcha({
            num1,
            num2,
            answer: num1 + num2,
        });
        setCaptchaAnswer('');
        setCaptchaError('');
    };

    const verifyCaptcha = (): boolean => {
        const userAnswer = parseInt(captchaAnswer);
        if (isNaN(userAnswer)) {
            setCaptchaError('Mohon masukkan angka yang valid');
            return false;
        }
        if (userAnswer !== captcha.answer) {
            setCaptchaError('Jawaban salah, silakan coba lagi');
            generateCaptcha();
            return false;
        }
        return true;
    };

    return {
        captcha,
        captchaAnswer,
        captchaError,
        captchaDialogOpen,
        setCaptchaAnswer,
        setCaptchaDialogOpen,
        generateCaptcha,
        verifyCaptcha,
    };
}
