import { CheckCircle } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';

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

interface KandidatSelectionCardProps {
    kandidat: Kandidat;
    isSelected: boolean;
    onSelect: (kandidat: Kandidat) => void;
}

export function KandidatSelectionCard({ kandidat, isSelected, onSelect }: KandidatSelectionCardProps) {
    return (
        <Card
            className={`overflow-hidden border-2 transition-all duration-300 hover:shadow-lg ${
                isSelected ? 'border-red-700 shadow-md' : 'border-gray-200 hover:border-red-200'
            }`}
            onClick={() => onSelect(kandidat)}
        >
            <div className="relative aspect-[4/3]">
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-red-700/20 to-red-700/0"></div>
                <div className="grid h-full grid-cols-2">
                    <div className="relative">
                        <img
                            src={`/storage/${kandidat.foto_presiden}`}
                            alt={`Kandidat ${kandidat.nomor_urut} - ${kandidat.nama_presiden}`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="relative">
                        <img
                            src={`/storage/${kandidat.foto_wakil}`}
                            alt={`Kandidat ${kandidat.nomor_urut} - ${kandidat.nama_wakil}`}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
                <div className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-700 font-bold text-white">
                    {kandidat.nomor_urut}
                </div>
                {isSelected && (
                    <div className="absolute top-3 left-3 z-20">
                        <div className="rounded-full bg-green-600 p-1 text-white">
                            <CheckCircle className="h-6 w-6" />
                        </div>
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-red-700">{kandidat.nama}</h3>
                <div className="mt-2 mb-4 grid grid-cols-2 gap-2">
                    <div>
                        <p className="text-sm font-semibold">{kandidat.nama_presiden}</p>
                        <p className="text-muted-foreground text-xs">{kandidat.nomor_bp_presiden}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold">{kandidat.nama_wakil}</p>
                        <p className="text-muted-foreground text-xs">{kandidat.nomor_bp_wakil}</p>
                    </div>
                </div>
                <p className="mb-4 line-clamp-2 text-sm italic">{kandidat.visi}</p>
                <Button
                    variant={isSelected ? 'default' : 'outline'}
                    className={`w-full ${
                        isSelected ? 'bg-red-700 text-white' : 'border-red-700 text-red-700 hover:bg-red-50'
                    }`}
                    onClick={() => onSelect(kandidat)}
                >
                    {isSelected ? 'Kandidat Terpilih' : 'Pilih Kandidat'}
                </Button>
            </div>
        </Card>
    );
}
