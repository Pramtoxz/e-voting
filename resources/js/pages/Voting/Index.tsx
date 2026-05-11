import Layout from '@/Layout/MainLayout';
import Button from '@/components/Button';
import { Head, useForm } from '@inertiajs/react';
import { AlertTriangle, Camera, ChevronLeft, ChevronRight, Info, Shield, User, Vote } from 'lucide-react';
import React, { useState } from 'react';
import { getPemiraYear } from '@/utils/date';
import { KandidatSelectionCard, SelectedKandidatInfo } from '@/components/voting';
import CameraModalFull from '@/components/voting/CameraModalFull';

interface Kandidat {
    id: number;
    nomor_urut: string;
    nama: string;
    nama_presiden: string;
    nomor_bp_presiden: string;
    nama_wakil: string;
    nomor_bp_wakil: string;
    foto_presiden: string;
    foto_wakil: string;
    visi: string;
    misi: string;
}

interface IndexProps {
    kandidat: Kandidat[];
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            username: string;
        };
    };
}

export default function Index({ kandidat, auth }: IndexProps) {
    const pemiraYear = getPemiraYear();

    const [selectedKandidat, setSelectedKandidat] = useState<Kandidat | null>(null);
    const [votingStep, setVotingStep] = useState(1);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showCameraModal, setShowCameraModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nomor_urut: '',
        foto_bukti: null as File | null,
    });

    const handleSelectKandidat = (kandidat: Kandidat) => {
        setSelectedKandidat(kandidat);
        setData('nomor_urut', kandidat.nomor_urut);
    };

    const handleNextStep = () => {
        if (votingStep === 1 && selectedKandidat) {
            setVotingStep(2);
        } else if (votingStep === 2 && data.foto_bukti) {
            setVotingStep(3);
        }
    };

    const handlePrevStep = () => {
        if (votingStep === 3) {
            setVotingStep(2);
        } else if (votingStep === 2) {
            setVotingStep(1);
        }
    };

    const handleCameraCapture = (file: File, preview: string) => {
        setPreviewImage(preview);
        setData('foto_bukti', file);
    };

    const handleRetakePhoto = () => {
        setData('foto_bukti', null);
        setPreviewImage(null);
        setShowCameraModal(true);
    };

    const handleSubmitVote = () => {
        post(route('voting.store'), {
            onSuccess: () => {
                reset();
                setPreviewImage(null);
            },
        });
    };

    return (
        <>
            <Head title={`Voting - PEMIRA ${pemiraYear}`} />

            <main className="flex-1 bg-white">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-red-700 to-red-800 py-8 text-white md:py-12">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="inline-flex items-center rounded-full border border-white bg-red-700/50 px-3 py-1 text-sm font-semibold">
                                <Vote className="mr-1 h-4 w-4" />
                                <span>Pemilihan Raya Mahasiswa {pemiraYear}</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Berikan Suara Anda</h1>
                            <p className="max-w-[700px] text-red-100 md:text-xl/relaxed">
                                Pilih kandidat yang menurut Anda paling tepat untuk memimpin organisasi kemahasiswaan periode {pemiraYear}.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Voting Steps Indicator */}
                <div className="container px-4 py-8 md:px-6">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-8 flex items-center justify-between">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                        votingStep >= 1 ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}
                                >
                                    <span className="font-bold">1</span>
                                </div>
                                <span className="mt-2 text-sm">Pilih Kandidat</span>
                            </div>
                            <div className="mx-4 h-1 flex-1 bg-gray-200">
                                <div className={`h-full bg-red-700`} style={{ width: votingStep >= 2 ? '100%' : '0%' }}></div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                        votingStep >= 2 ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}
                                >
                                    <span className="font-bold">2</span>
                                </div>
                                <span className="mt-2 text-sm">Upload Bukti</span>
                            </div>
                            <div className="mx-4 h-1 flex-1 bg-gray-200">
                                <div className={`h-full bg-red-700`} style={{ width: votingStep >= 3 ? '100%' : '0%' }}></div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                        votingStep >= 3 ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}
                                >
                                    <span className="font-bold">3</span>
                                </div>
                                <span className="mt-2 text-sm">Konfirmasi</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Voting Content */}
                <div className="container px-4 py-8 md:px-6">
                    {/* Step 1: Pilih Kandidat */}
                    {votingStep === 1 && (
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-8 flex items-start rounded-lg border border-red-100 bg-red-50 p-4">
                                <Info className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-red-700" />
                                <div>
                                    <h3 className="font-semibold text-red-700">Informasi Penting</h3>
                                    <p className="text-sm text-gray-600">
                                        Pemilihan hanya dapat dilakukan satu kali dan tidak dapat diubah. Pastikan Anda memilih dengan bijak. Suara
                                        Anda bersifat rahasia dan aman.
                                    </p>
                                </div>
                            </div>

                            <h2 className="mb-6 text-center text-2xl font-bold">Daftar Kandidat</h2>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {kandidat.map((calon) => (
                                    <KandidatSelectionCard
                                        key={calon.id}
                                        kandidat={calon}
                                        isSelected={selectedKandidat?.id === calon.id}
                                        onSelect={handleSelectKandidat}
                                    />
                                ))}
                            </div>

                            <div className="mt-8 flex justify-center">
                                <Button
                                    className="bg-red-700 text-white hover:bg-red-800"
                                    size="lg"
                                    disabled={!selectedKandidat}
                                    onClick={handleNextStep}
                                >
                                    Lanjutkan <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Upload Bukti */}
                    {votingStep === 2 && (
                        <div className="mx-auto max-w-3xl">
                            <div className="mb-8 flex items-start rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                                <AlertTriangle className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-yellow-600" />
                                <div>
                                    <h3 className="font-semibold text-yellow-600">Bukti Voting</h3>
                                    <p className="text-sm text-gray-600">
                                        Silakan ambil foto selfi sebagai bukti voting Anda. Ini akan membantu panitia dalam proses validasi suara.
                                        Pastikan wajah Anda terlihat jelas.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <h2 className="mb-4 text-xl font-bold">Ambil Foto Bukti</h2>

                                {selectedKandidat && <SelectedKandidatInfo kandidat={selectedKandidat} />}

                                <div className="mt-4">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Foto Bukti Voting</label>

                                    {!previewImage ? (
                                        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                                            <Button
                                                className="bg-red-600 px-4 py-3 text-white hover:bg-red-700"
                                                onClick={() => setShowCameraModal(true)}
                                            >
                                                <Camera className="mr-2 h-5 w-5" />
                                                Buka Kamera Selfi
                                            </Button>

                                            <div className="mx-auto mt-4 max-w-md rounded-lg bg-gray-100 px-3 py-2 text-xs">
                                                <p>Anda perlu memberikan izin untuk mengakses kamera</p>
                                                <p>Kamera depan akan digunakan untuk mengambil selfi sebagai bukti voting</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="rounded-lg border-2 border-gray-300 p-3">
                                            <div className="relative w-full overflow-hidden rounded-lg">
                                                <img src={previewImage} alt="Preview" className="mx-auto w-full" />
                                            </div>
                                            <div className="flex justify-center space-x-3">
                                                <Button
                                                    className="border border-gray-300 bg-gray-100 text-xs text-gray-700 hover:bg-gray-200"
                                                    onClick={handleRetakePhoto}
                                                >
                                                    Ambil Ulang Foto
                                                </Button>
                                                <Button
                                                    className="bg-green-600 text-xs text-white hover:bg-green-700"
                                                    onClick={handleNextStep}
                                                    disabled={!data.foto_bukti}
                                                >
                                                    Gunakan Foto Ini
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {errors.foto_bukti && <p className="mt-1 text-sm text-red-600">{errors.foto_bukti}</p>}
                                </div>

                                <div className="mt-8 flex justify-between">
                                    <Button variant="outline" className="border-gray-300 text-gray-700" onClick={handlePrevStep}>
                                        <ChevronLeft className="mr-2 h-4 w-4" /> Kembali
                                    </Button>
                                    <Button className="bg-red-700 text-white hover:bg-red-800" onClick={handleNextStep} disabled={!data.foto_bukti}>
                                        Lanjutkan <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Konfirmasi */}
                    {votingStep === 3 && (
                        <div className="mx-auto max-w-3xl">
                            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                                <h2 className="mb-6 text-center text-2xl font-bold">Konfirmasi Voting</h2>

                                <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                                    <div className="flex items-start">
                                        <AlertTriangle className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-yellow-600" />
                                        <div>
                                            <h3 className="font-semibold text-yellow-600">Penting!</h3>
                                            <p className="text-sm text-gray-600">
                                                Pastikan pilihan Anda sudah benar. Setelah dikonfirmasi, pilihan tidak dapat diubah.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Detail Pemilih */}
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <h3 className="mb-3 font-semibold text-gray-700">Detail Pemilih</h3>
                                        <div className="flex items-center gap-3">
                                            <User className="h-5 w-5 text-gray-500" />
                                            <div>
                                                <p className="font-medium">{auth.user.name}</p>
                                                <p className="text-sm text-gray-500">{auth.user.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Kandidat yang dipilih */}
                                    {selectedKandidat && (
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <h3 className="mb-3 font-semibold text-gray-700">Kandidat yang Dipilih</h3>
                                            <SelectedKandidatInfo kandidat={selectedKandidat} />
                                        </div>
                                    )}

                                    {/* Bukti Voting */}
                                    {previewImage && (
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <h3 className="mb-3 font-semibold text-gray-700">Bukti Voting</h3>
                                            <div className="relative w-full overflow-hidden rounded-lg">
                                                <img src={previewImage} alt="Bukti Voting" className="mx-auto w-full" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 border-t border-gray-200 pt-6">
                                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                                        <div className="flex items-center text-gray-600">
                                            <Shield className="mr-2 h-5 w-5" />
                                            <span className="text-sm">Suara Anda dijamin kerahasiaannya</span>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                className="border-gray-300 text-gray-700"
                                                onClick={handlePrevStep}
                                                disabled={processing}
                                            >
                                                <ChevronLeft className="mr-2 h-4 w-4" /> Kembali
                                            </Button>
                                            <Button className="bg-red-700 text-white hover:bg-red-800" onClick={handleSubmitVote} disabled={processing}>
                                                {processing ? 'Memproses...' : 'Konfirmasi Pilihan'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Camera Modal */}
            <CameraModalFull
                show={showCameraModal}
                onClose={() => setShowCameraModal(false)}
                onCapture={handleCameraCapture}
                pemiraYear={pemiraYear}
            />
        </>
    );
}

Index.layout = (page: React.ReactElement) => <Layout auth={page.props.auth as IndexProps['auth']} children={page} title="Voting - PEMIRA" showFooter={false} />;
