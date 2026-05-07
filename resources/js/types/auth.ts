export interface LoginForm {
    username: string;
    password: string;
    remember: boolean;
    captchaAnswer: string;
}

export interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export interface Captcha {
    num1: number;
    num2: number;
    answer: number;
}
