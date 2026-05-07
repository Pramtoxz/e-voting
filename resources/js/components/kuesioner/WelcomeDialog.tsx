import { CheckCircle, HelpCircle } from 'lucide-react';
import { getPemiraYear } from '@/utils/date';

interface WelcomeDialogProps {
    show: boolean;
    onStart: () => void;
}

export default function WelcomeDialog({ show, onStart }: WelcomeDialogProps) {
    const pemiraYear = getPemiraYear();

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="h-2 w-full bg-gradient-to-r from-red-700 to-red-500"></div>

                <div className="p-8">
                    <div className="mb-6 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                            <HelpCircle className="h-10 w-10 text-red-600" />
                        </div>
                    </div>

                    <h2 className="mb-4 text-center text-3xl font-bold text-gray-800">Selamat Datang di Kuesioner PEMIRA {pemiraYear}</h2>

                    <p className="mb-6 text-center text-gray-600">
                        Terima kasih telah berpartisipasi dalam PEMIRA {pemiraYear}. Kami ingin mendengar pendapat Anda tentang sistem e-voting ini.
                    </p>

                    <div className="mb-6 space-y-3 rounded-lg bg-red-50 p-4">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-red-600" />
                            <p className="text-sm text-gray-700">Berikan penilaian Anda untuk setiap aspek sistem</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-red-600" />
                            <p className="text-sm text-gray-700">Bagikan saran dan kesan Anda</p>
                        </div>
                    </div>

                    <button
                        id="start-button"
                        onClick={onStart}
                        className="w-full rounded-lg bg-red-600 px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-red-700"
                    >
                        Mulai Mengisi Kuesioner
                    </button>
                </div>
            </div>
        </div>
    );
}
