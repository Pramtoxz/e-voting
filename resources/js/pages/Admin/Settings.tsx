import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { CheckCircle2, LockKeyhole, Timer, Trophy, Vote, XCircle } from 'lucide-react';

interface SettingsProps extends PageProps {
    showVotingResults: string;
    countdownActive: string;
    countdownEndTime: string;
    voteActive: string;
}

export default function Settings({ showVotingResults, countdownActive, countdownEndTime, voteActive }: SettingsProps) {
    const countdownForm = useForm({ countdown_minutes: '' });
    const forceShowForm = useForm({});
    const toggleVoteForm = useForm({});

    const isCountdownActive = countdownActive === '1';
    const showResults = showVotingResults === '1';
    const isVoteActive = voteActive === '1';

    const formatEndTime = () => {
        if (!countdownEndTime) return '-';
        const endTime = new Date(countdownEndTime);
        return endTime.toLocaleString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
        });
    };

    return (
        <AppLayout>
            <Head title="Pengaturan Hasil Voting" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <h2 className="mb-6 text-2xl font-semibold">Pengaturan Voting</h2>

                        {/* ── Status Saat Ini ── */}
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Status Saat Ini</CardTitle>
                                <CardDescription>Informasi tentang status sistem voting</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-md bg-gray-50 p-4">
                                        <p className="text-sm font-medium text-gray-500">Status Voting</p>
                                        <p className={`mt-1 text-lg font-bold ${isVoteActive ? 'text-green-600' : 'text-red-600'}`}>
                                            {isVoteActive ? '🟢 Dibuka' : '🔴 Ditutup'}
                                        </p>
                                    </div>
                                    <div className="rounded-md bg-gray-50 p-4">
                                        <p className="text-sm font-medium text-gray-500">Status Countdown</p>
                                        <p className={`mt-1 text-lg font-bold ${isCountdownActive ? 'text-green-600' : 'text-gray-500'}`}>
                                            {isCountdownActive ? '🟢 Aktif' : '⚪ Tidak Aktif'}
                                        </p>
                                    </div>
                                    <div className="rounded-md bg-gray-50 p-4">
                                        <p className="text-sm font-medium text-gray-500">Hasil Voting</p>
                                        <p className={`mt-1 text-lg font-bold ${showResults ? 'text-green-600' : 'text-gray-500'}`}>
                                            {showResults ? '🟢 Ditampilkan' : '⚪ Disembunyikan'}
                                        </p>
                                    </div>
                                </div>

                                {isCountdownActive && (
                                    <div className="mt-4 rounded-md border border-blue-100 bg-blue-50 p-4">
                                        <p className="font-medium text-blue-800">Countdown Berakhir Pada:</p>
                                        <p className="text-lg font-bold text-blue-600">{formatEndTime()}</p>
                                        <p className="mt-1 text-sm text-blue-600">Hasil voting akan otomatis ditampilkan saat countdown berakhir.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* ── Toggle Buka / Tutup Voting ── */}
                        <Card className={`mb-6 border-2 ${isVoteActive ? 'border-green-200' : 'border-red-200'}`}>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isVoteActive ? 'bg-green-100' : 'bg-red-100'}`}>
                                        {isVoteActive
                                            ? <Vote className="h-5 w-5 text-green-600" />
                                            : <LockKeyhole className="h-5 w-5 text-red-600" />
                                        }
                                    </div>
                                    <div>
                                        <CardTitle>Buka / Tutup Voting</CardTitle>
                                        <CardDescription>
                                            Mahasiswa hanya bisa melakukan voting jika status voting <strong>Dibuka</strong>.
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className={`flex items-start gap-3 rounded-lg p-4 ${isVoteActive ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                    {isVoteActive
                                        ? <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                                        : <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                                    }
                                    <div>
                                        <p className={`font-semibold ${isVoteActive ? 'text-green-700' : 'text-red-700'}`}>
                                            {isVoteActive ? 'Voting sedang dibuka' : 'Voting sedang ditutup'}
                                        </p>
                                        <p className={`text-sm ${isVoteActive ? 'text-green-600' : 'text-red-600'}`}>
                                            {isVoteActive
                                                ? 'Mahasiswa dapat mengakses halaman voting dan memberikan suara.'
                                                : 'Mahasiswa tidak dapat mengakses halaman voting saat ini.'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => toggleVoteForm.post(route('settings.toggle-vote-active'))}
                                    disabled={toggleVoteForm.processing}
                                    className={`w-full sm:w-auto ${isVoteActive
                                        ? 'bg-red-600 hover:bg-red-700'
                                        : 'bg-green-600 hover:bg-green-700'
                                    }`}
                                >
                                    {isVoteActive ? 'Tutup Voting' : 'Buka Voting'}
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* ── Pengaturan Countdown ── */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                        <Timer className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <CardTitle>Pengaturan Countdown & Hasil</CardTitle>
                                        <CardDescription>Atur durasi countdown dan tampilan hasil voting</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <label htmlFor="countdown_minutes" className="mb-1 block text-sm font-medium">
                                        Durasi Countdown (menit)
                                    </label>
                                    <input
                                        id="countdown_minutes"
                                        type="number"
                                        min="1"
                                        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                        value={countdownForm.data.countdown_minutes}
                                        onChange={(e) => countdownForm.setData('countdown_minutes', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="rounded-md border border-yellow-100 bg-yellow-50 p-3 text-sm">
                                    <p className="font-medium text-yellow-800">Catatan:</p>
                                    <p className="text-yellow-700">
                                        Saat countdown aktif, hasil voting akan disembunyikan hingga countdown selesai. Setelah countdown berakhir,
                                        hasil akan ditampilkan secara otomatis.
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-3 sm:flex-row">
                                <Button
                                    onClick={() => countdownForm.post(route('settings.activate-countdown'))}
                                    disabled={countdownForm.processing}
                                    className="w-full bg-blue-600 hover:bg-blue-700 sm:w-auto"
                                >
                                    <Timer className="mr-2 h-4 w-4" /> Aktifkan Countdown
                                </Button>

                                <Button
                                    onClick={() => forceShowForm.post(route('settings.force-show'))}
                                    disabled={forceShowForm.processing}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
                                >
                                    <Trophy className="mr-2 h-4 w-4" /> Tampilkan Hasil Sekarang
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
