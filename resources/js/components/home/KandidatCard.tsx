import Card from '@/components/Card';
import { Kandidat } from '@/types/voting';
import { HelpCircle } from 'lucide-react';

interface KandidatCardProps {
    kandidat: Kandidat;
    onOpenDialog: (kandidat: Kandidat) => void;
}

export default function KandidatCard({ kandidat, onOpenDialog }: KandidatCardProps) {
    return (
        <Card className="overflow-hidden border-red-200 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="relative">
                <div className="grid grid-cols-2 gap-0">
                    <div className="relative aspect-[3/4]">
                        <div className="absolute inset-0 z-10 bg-gradient-to-b from-red-700/20 to-red-700/0"></div>
                        <img
                            src={`/storage/${kandidat.foto_presiden}`}
                            alt={`${kandidat.nama_presiden}`}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <p className="text-xs font-bold text-white">Calon Presiden</p>
                        </div>
                    </div>
                    <div className="relative aspect-[3/4]">
                        <div className="absolute inset-0 z-10 bg-gradient-to-b from-red-500/20 to-red-500/0"></div>
                        <img
                            src={`/storage/${kandidat.foto_wakil}`}
                            alt={`${kandidat.nama_wakil}`}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <p className="text-xs font-bold text-white">Calon Wakil</p>
                        </div>
                    </div>
                </div>
                <div className="absolute top-4 left-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-3xl font-bold text-white shadow-lg">
                    {kandidat.nomor_urut}
                </div>
            </div>
            <div className="p-4 sm:p-6">
                <div className="mb-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-600">Calon Presiden</p>
                    <h3 className="mb-1 text-xl font-bold text-red-700 sm:text-2xl">{kandidat.nama_presiden}</h3>
                    <p className="text-xs text-gray-600 sm:text-sm">NIM: {kandidat.nomor_bp_presiden}</p>
                </div>
                <div className="mb-4 border-t border-red-100 pt-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-600">Calon Wakil Presiden</p>
                    <h4 className="text-lg font-bold text-red-600">{kandidat.nama_wakil}</h4>
                    <p className="text-xs text-gray-600 sm:text-sm">NIM: {kandidat.nomor_bp_wakil}</p>
                </div>
                <button
                    onClick={() => onOpenDialog(kandidat)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700 sm:py-3 sm:text-base"
                >
                    <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    Lihat Visi & Misi
                </button>
            </div>
        </Card>
    );
}
