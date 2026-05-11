import Layout from '@/Layout/MainLayout';
import { getPemiraYear } from '@/utils/date';
import { Head } from '@inertiajs/react';
import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';

interface ClosedProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            username: string;
        };
    };
}

export default function Closed({ auth }: ClosedProps) {
    const pemiraYear = getPemiraYear();
    const [animationData, setAnimationData] = useState<object | null>(null);

    useEffect(() => {
        fetch('/animation/no.json')
            .then((res) => res.json())
            .then((data) => setAnimationData(data))
            .catch(() => {/* animasi tidak tersedia, tampilkan fallback */});
    }, []);

    return (
        <>
            <Head title={`Voting Ditutup - PEMIRA ${pemiraYear}`} />
            <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-20">
                <div className="w-full max-w-md text-center">
                    <div className="mx-auto mb-2 w-56">
                        {animationData ? (
                            <Lottie animationData={animationData} loop={true} />
                        ) : (
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
                                <span className="text-4xl">🔒</span>
                            </div>
                        )}
                    </div>
                    <h1 className="mb-3 text-3xl font-bold text-gray-800">Voting Belum Dibuka</h1>
                    <p className="mb-6 text-gray-500">
                        Sesi voting PEMIRA {pemiraYear} belum dibuka oleh panitia. Silakan tunggu pengumuman lebih lanjut.
                    </p>
                    <a
                        href={route('home')}
                        className="inline-flex items-center rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                        Kembali ke Beranda
                    </a>
                </div>
            </main>
        </>
    );
}

Closed.layout = (page: React.ReactElement<ClosedProps>) => (
    <Layout auth={page.props.auth} children={page} title="Voting Ditutup" showFooter={false} />
);
