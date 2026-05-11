import { CheckCircle, User } from 'lucide-react';
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
            {/* Header: Nomor Urut + Nama Paslon */}
            <div className={`flex items-center justify-between px-5 py-3 ${isSelected ? 'bg-red-700' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-2">
                    <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                            isSelected ? 'bg-white text-red-700' : 'bg-red-700 text-white'
                        }`}
                    >
                        {kandidat.nomor_urut}
                    </span>
                    <span className={`font-bold text-base ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                        {kandidat.nama}
                    </span>
                </div>
                {isSelected && (
                    <CheckCircle className="h-5 w-5 text-white" />
                )}
            </div>

            {/* Foto Paslon */}
            <div className="grid grid-cols-2 gap-0">
                {/* Presiden */}
                <div className="relative flex flex-col">
                    <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100">
                        <img
                            src={`/storage/${kandidat.foto_presiden}`}
                            alt={kandidat.nama_presiden}
                            className="h-full w-full object-cover object-top"
                        />
                    </div>
                    <div className="flex flex-col items-center bg-red-700 px-2 py-2 text-center text-white">
                        <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">Calon Ketua</span>
                        <span className="mt-0.5 text-sm font-bold leading-tight">{kandidat.nama_presiden}</span>
                        <span className="mt-0.5 text-xs opacity-80">{kandidat.nomor_bp_presiden}</span>
                    </div>
                </div>

                {/* Wakil */}
                <div className="relative flex flex-col">
                    <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100">
                        <img
                            src={`/storage/${kandidat.foto_wakil}`}
                            alt={kandidat.nama_wakil}
                            className="h-full w-full object-cover object-top"
                        />
                    </div>
                    <div className="flex flex-col items-center bg-red-800 px-2 py-2 text-center text-white">
                        <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">Calon Wakil</span>
                        <span className="mt-0.5 text-sm font-bold leading-tight">{kandidat.nama_wakil}</span>
                        <span className="mt-0.5 text-xs opacity-80">{kandidat.nomor_bp_wakil}</span>
                    </div>
                </div>
            </div>

            {/* Visi */}
            <div className="px-5 py-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Visi</p>
                <p className="line-clamp-3 text-sm text-gray-600 italic">{kandidat.visi}</p>
            </div>

            {/* Tombol */}
            <div className="px-5 pb-5">
                <Button
                    variant={isSelected ? 'default' : 'outline'}
                    className={`w-full font-semibold ${
                        isSelected
                            ? 'bg-red-700 text-white hover:bg-red-800'
                            : 'border-red-700 text-red-700 hover:bg-red-50'
                    }`}
                    onClick={(e) => { e.stopPropagation(); onSelect(kandidat); }}
                >
                    {isSelected ? (
                        <><CheckCircle className="mr-2 h-4 w-4" /> Kandidat Terpilih</>
                    ) : (
                        <><User className="mr-2 h-4 w-4" /> Pilih Kandidat</>
                    )}
                </Button>
            </div>
        </Card>
    );
}
