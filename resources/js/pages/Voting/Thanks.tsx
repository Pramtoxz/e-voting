import Layout from '@/Layout/MainLayout';
import Button from '@/components/Button';
import { Head, Link, router } from '@inertiajs/react';
import { CheckCircle, Shield } from 'lucide-react';
import React, { useEffect } from 'react';
import { getPemiraYear } from '@/utils/date';

interface ThanksProps {
    vote: {
        username: string;
        nomor_urut: string;
        foto_bukti: string;
        created_at: string;
        kandidat: {
            nama: string;
            nama_presiden: string;
            nama_wakil: string;
        };
    };
}

export default function Thanks({ vote }: ThanksProps) {
    const pemiraYear = getPemiraYear();
    
    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            router.visit(route('kuesioner.index'), {
                onFinish: () => console.log('Redirect ke kuesioner selesai'),
            });
        }, 3000);

        return () => clearTimeout(redirectTimer);
    }, []);

    return (
        <>
            <Head title={`Terima Kasih - PEMIRA ${pemiraYear}`} />

            <main className="flex-1 bg-white">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 py-8 text-white md:py-12">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="inline-flex items-center rounded-full border border-white bg-green-600/50 px-3 py-1 text-sm font-semibold">
                                <CheckCircle className="mr-1 h-4 w-4" />
                                <span>Pemilihan Berhasil</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Terima Kasih Atas Partisipasi Anda!</h1>
                            <p className="max-w-[700px] text-green-100 md:text-xl/relaxed">
                                Suara Anda telah berhasil direkam. Terima kasih telah berpartisipasi dalam PEMIRA {pemiraYear}.
                            </p>
                            <p className="text-green-100 md:text-lg/relaxed">Halaman akan dialihkan ke kuesioner dalam 3 detik...</p>
                        </div>
                    </div>
                </div>

                <div className="container px-4 py-12 md:px-6">
                    <div className="mx-auto max-w-3xl">
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                            <div className="mb-6 text-center">
                                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                                    <CheckCircle className="h-10 w-10" />
                                </div>
                                <h2 className="text-2xl font-bold">Voting Berhasil!</h2>
                                <p className="mt-2 text-gray-600">
                                    Suara Anda telah tercatat dalam sistem PEMIRA {pemiraYear}. Terima kasih telah menggunakan hak suara Anda.
                                </p>
                            </div>

                            <div className="mt-8 space-y-6">
                                {/* Detail Vote */}
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <h3 className="mb-3 font-semibold text-gray-700">Detail Pemilihan</h3>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <p className="text-sm text-gray-500">Waktu Vote</p>
                                            <p className="font-medium">{new Date(vote.created_at).toLocaleString('id-ID')}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Kandidat Pilihan</p>
                                            <p className="font-medium">
                                                No. Urut {vote.nomor_urut} - {vote.kandidat.nama}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Presiden</p>
                                            <p className="font-medium">{vote.kandidat.nama_presiden}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Wakil Presiden</p>
                                            <p className="font-medium">{vote.kandidat.nama_wakil}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bukti Vote */}
                                {vote.foto_bukti && (
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <h3 className="mb-3 font-semibold text-gray-700">Bukti Voting</h3>
                                        <div className="relative w-full overflow-hidden rounded-lg">
                                            <img src={`/storage/${vote.foto_bukti}`} alt="Bukti Voting" className="mx-auto" />
                                        </div>
                                        <p className="mt-2 text-center text-xs text-gray-500">Bukti voting Anda telah disimpan dalam sistem</p>
                                    </div>
                                )}

                                {/* Disclaimer */}
                                <div className="rounded-lg bg-blue-50 p-4">
                                    <div className="flex items-start">
                                        <Shield className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-blue-600" />
                                        <div>
                                            <h3 className="font-semibold text-blue-600">Informasi</h3>
                                            <p className="text-sm text-gray-600">
                                                Pilihan Anda bersifat rahasia dan aman. Data ini hanya digunakan untuk keperluan PEMIRA {pemiraYear} dan tidak
                                                akan dibagikan kepada pihak ketiga tanpa persetujuan.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
                                <Link href={route('kuesioner.index')}>
                                    <Button className="bg-red-700 text-white hover:bg-red-800">Ke Halaman Kuesioner</Button>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8 text-center text-sm text-gray-500">
                            <p>&copy; {new Date().getFullYear()} PEMIRA {pemiraYear} | Komisi Pemilihan Mahasiswa</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

Thanks.layout = (page: React.ReactNode) => <Layout children={page} title="Terima Kasih - PEMIRA" />;
