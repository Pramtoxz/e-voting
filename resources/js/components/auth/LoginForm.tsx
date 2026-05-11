import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginForm as LoginFormData, LoginType } from '@/types/auth';
import { Link } from '@inertiajs/react';
import { Eye, EyeOff, GraduationCap, Lock, ShieldCheck, User } from 'lucide-react';

interface LoginFormProps {
    data: Required<LoginFormData>;
    errors: Partial<Record<keyof LoginFormData, string>>;
    processing: boolean;
    showPassword: boolean;
    loginType: LoginType;
    onDataChange: (field: keyof LoginFormData, value: string | boolean) => void;
    onTogglePassword: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

export default function LoginForm({
    data,
    errors,
    processing,
    showPassword,
    loginType,
    onDataChange,
    onTogglePassword,
    onSubmit,
}: LoginFormProps) {
    const isMahasiswa = loginType === 'mahasiswa';

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white">
                    {isMahasiswa ? <GraduationCap className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-red-700">
                        {isMahasiswa ? 'Login Mahasiswa' : 'Login Admin'}
                    </p>
                    <p className="text-xs text-red-600/80">
                        {isMahasiswa
                            ? 'Gunakan NOBP dan password akademik Anda.'
                            : 'Khusus administrator sistem PEMIRA.'}
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-700">
                    {isMahasiswa ? 'NOBP' : 'Username'}
                </label>
                <div className="relative">
                    <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                        id="username"
                        type="text"
                        value={data.username}
                        onChange={(e) => onDataChange('username', e.target.value)}
                        className="pl-10"
                        placeholder={isMahasiswa ? 'Contoh: 2010036' : 'Masukkan username admin'}
                        autoComplete="username"
                        required
                    />
                </div>
                {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="relative">
                    <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={data.password}
                        onChange={(e) => onDataChange('password', e.target.value)}
                        className="pr-10 pl-10"
                        placeholder="Masukkan password"
                        autoComplete="current-password"
                        required
                    />
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center">
                <input
                    id="remember"
                    type="checkbox"
                    checked={data.remember}
                    onChange={(e) => onDataChange('remember', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                    Ingat saya
                </label>
            </div>

            <Button type="submit" disabled={processing} className="w-full bg-red-600 hover:bg-red-700">
                {processing ? 'Memproses...' : `Login ${isMahasiswa ? 'Mahasiswa' : 'Admin'}`}
            </Button>

            <div className="text-center text-sm text-gray-600">
                {isMahasiswa ? (
                    <>
                        Login sebagai admin?{' '}
                        <Link href={route('admin.login')} className="font-semibold text-red-700 hover:underline">
                            Klik di sini
                        </Link>
                    </>
                ) : (
                    <>
                        Login sebagai mahasiswa?{' '}
                        <Link href={route('login')} className="font-semibold text-red-700 hover:underline">
                            Klik di sini
                        </Link>
                    </>
                )}
            </div>
        </form>
    );
}
