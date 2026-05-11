<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     * Auto-detect login_type based on route name.
     */
    protected function prepareForValidation(): void
    {
        if ($this->has('login_type')) {
            return;
        }

        $routeName = optional($this->route())->getName();
        $loginType = $routeName === 'admin.login.store' ? 'admin' : 'mahasiswa';

        $this->merge(['login_type' => $loginType]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'login_type' => ['required', 'in:admin,mahasiswa'],
            'username' => ['required', 'string', 'regex:/^[a-zA-Z0-9_]+$/'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Custom error messages for validation.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'login_type.required' => 'Tipe login wajib dipilih.',
            'login_type.in' => 'Tipe login tidak valid.',
            'username.required' => 'Username wajib diisi.',
            'username.regex' => 'Username hanya boleh berisi huruf, angka, dan underscore.',
            'password.required' => 'Password wajib diisi.',
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        if ($this->input('login_type') === 'mahasiswa') {
            $this->authenticateMahasiswa();
        } else {
            $this->authenticateAdmin();
        }

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Authenticate admin user using local database.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function authenticateAdmin(): void
    {
        $credentials = $this->only('username', 'password');

        if (! Auth::attempt($credentials, $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'username' => 'Username atau password salah.',
            ]);
        }

        $user = Auth::user();

        if ($user->role !== 'admin') {
            Auth::logout();
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'username' => 'Akun ini bukan akun admin. Silakan gunakan login Mahasiswa.',
            ]);
        }
    }

    /**
     * Authenticate mahasiswa user via external API.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function authenticateMahasiswa(): void
    {
        $plainPassword = $this->input('password');

        try {
            $response = Http::acceptJson()
                ->asJson()
                ->withoutVerifying()
                ->timeout(20)
                ->post('https://api.novinaldi.my.id/api/login-voting', [
                    'username' => $this->input('username'),
                    'password' => $plainPassword,   // kirim plain, API yang handle MD5
                ]);
        } catch (\Throwable $e) {
            RateLimiter::hit($this->throttleKey());

            Log::error('Mahasiswa login API error', [
                'message' => $e->getMessage(),
                'username' => $this->input('username'),
            ]);

            throw ValidationException::withMessages([
                'username' => 'Tidak dapat terhubung ke server akademik. Silakan coba lagi. (' . class_basename($e) . ')',
            ]);
        }

        $body = $response->json() ?? [];

        if (! $response->successful() || ! ($body['success'] ?? false)) {
            RateLimiter::hit($this->throttleKey());

            $message = $body['message'] ?? 'Username atau password salah, atau anda tidak terdaftar di semester ini.';

            throw ValidationException::withMessages([
                'username' => $message,
            ]);
        }

        $data = $body['data'] ?? [];
        $nobp = $data['nobp'] ?? null;
        $nama = $data['nama'] ?? null;

        if (! $nobp || ! $nama) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'username' => 'Data mahasiswa tidak lengkap dari server akademik.',
            ]);
        }

        // Sinkronkan data mahasiswa ke database lokal supaya relasi
        // (Vote, Kuesioner, Session) tetap konsisten dengan yang sudah ada.
        $user = User::updateOrCreate(
            ['username' => $nobp],
            [
                'name'     => $nama,
                'email'    => $nobp . '@jayanusa.ac.id',
                'password' => md5($plainPassword),   // simpan MD5 agar konsisten dengan Md5Hasher
                'role'     => 'mahasiswa',
            ]
        );

        Auth::login($user, $this->boolean('remember'));
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'username' => __('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('username')).'|'.$this->ip());
    }
}
