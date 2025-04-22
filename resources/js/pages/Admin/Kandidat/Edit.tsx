import KandidatForm from "./Form";

interface Props {
    kandidat: {
        id: number;
        nomor_urut: string;
        nama_presiden: string;
        nama_wakil: string;
        prodi_presiden: string;
        prodi_wakil: string;
        visi: string[];
        misi: string[];
        periode: string;
    };
}

export default function Edit({ kandidat }: Props) {
    return <KandidatForm kandidat={kandidat} />;
} 