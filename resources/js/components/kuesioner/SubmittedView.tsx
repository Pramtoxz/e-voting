import Card from '@/components/Card';
import { KuesionerData } from '@/types/kuesioner';
import { CheckCircle, Star } from 'lucide-react';

interface SubmittedViewProps {
    kuesioner?: KuesionerData;
}

export default function SubmittedView({ kuesioner }: SubmittedViewProps) {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <Card className="border-green-200 bg-green-50">
                <div className="p-8 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                    </div>
                    <h2 className="mb-4 text-3xl font-bold text-gray-800">Terima Kasih!</h2>
                    <p className="mb-6 text-gray-600">Anda telah mengisi kuesioner. Berikut adalah penilaian Anda:</p>

                    {kuesioner && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg bg-white p-4">
                                <span className="font-medium text-gray-700">Tampilan</span>
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-5 w-5 ${i < kuesioner.nilai_tampilan ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-white p-4">
                                <span className="font-medium text-gray-700">Kemudahan</span>
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-5 w-5 ${i < kuesioner.nilai_kemudahan ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-white p-4">
                                <span className="font-medium text-gray-700">Keamanan</span>
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-5 w-5 ${i < kuesioner.nilai_keamanan ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-white p-4">
                                <span className="font-medium text-gray-700">Kecepatan</span>
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-5 w-5 ${i < kuesioner.nilai_kecepatan ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-white p-4">
                                <span className="font-medium text-gray-700">Keseluruhan</span>
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-5 w-5 ${i < kuesioner.nilai_keseluruhan ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
