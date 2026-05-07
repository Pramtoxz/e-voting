import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface SettingsProps extends PageProps {
    showVotingResults: string;
    countdownActive: string;
    countdownEndTime: string;
}

export default function Settings({ showVotingResults, countdownActive, countdownEndTime }: SettingsProps) {
    // Form untuk pengaturan countdown
    const countdownForm = useForm({
        countdown_minutes: '',
    });

    // Form untuk force show results
    const forceShowForm = useForm({});

    // Simpan status settings dalam variabel untuk kemudahan
    const isCountdownActive = countdownActive === '1';
    const showResults = showVotingResults === '1';

    const formatEndTime = () => {
        if (!countdownEndTime) return '-';

        const endTime = new Date(countdownEndTime);
        return endTime.toLocaleString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <AppLayout>
            <Head title="Pengaturan Hasil Voting" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <h2 className="mb-6 text-2xl font-semibold">Pengaturan Hasil Voting</h2>

                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>Status Saat Ini</CardTitle>
                                <CardDescription>Informasi tentang status tampilan hasil voting</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="rounded-md bg-gray-50 p-4">
                                        <p className="font-medium text-gray-700">Status Countdown:</p>
                                        <p className={`text-lg font-bold ${isCountdownActive ? 'text-green-600' : 'text-gray-600'}`}>
                                            {isCountdownActive ? 'Aktif' : 'Tidak Aktif'}
                                        </p>
                                    </div>

                                    <div className="rounded-md bg-gray-50 p-4">
                                        <p className="font-medium text-gray-700">Status Hasil Voting:</p>
                                        <p className={`text-lg font-bold ${showResults ? 'text-green-600' : 'text-gray-600'}`}>
                                            {showResults ? 'Ditampilkan' : 'Disembunyikan'}
                                        </p>
                                    </div>
                                </div>

                                {isCountdownActive && (
                                    <div className="rounded-md border border-blue-100 bg-blue-50 p-4">
                                        <p className="font-medium text-blue-800">Countdown Berakhir Pada:</p>
                                        <p className="text-lg font-bold text-blue-600">{formatEndTime()}</p>
                                        <p className="mt-2 text-sm text-blue-600">Hasil voting akan otomatis ditampilkan saat countdown berakhir.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Pengaturan Countdown</CardTitle>
                                <CardDescription>Atur durasi countdown untuk hasil voting</CardDescription>
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

                                <div className="mb-4 rounded-md border border-yellow-100 bg-yellow-50 p-3 text-sm">
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
                                    Aktifkan Countdown
                                </Button>

                                <Button
                                    onClick={() => forceShowForm.post(route('settings.force-show'))}
                                    disabled={forceShowForm.processing}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
                                >
                                    Tampilkan Hasil Sekarang
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
