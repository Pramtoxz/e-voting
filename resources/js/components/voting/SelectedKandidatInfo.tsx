interface Kandidat {
    nomor_urut: string;
    nama: string;
    nama_presiden: string;
    nama_wakil: string;
}

interface SelectedKandidatInfoProps {
    kandidat: Kandidat;
}

export function SelectedKandidatInfo({ kandidat }: SelectedKandidatInfoProps) {
    return (
        <div className="mb-6 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-red-700 text-2xl font-bold text-white">
                    {kandidat.nomor_urut}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-red-700">{kandidat.nama}</h3>
                    <p className="text-sm text-gray-600">
                        {kandidat.nama_presiden} & {kandidat.nama_wakil}
                    </p>
                </div>
            </div>
        </div>
    );
}
