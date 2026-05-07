export interface VotedStudent {
    id: number;
    name: string;
    username: string;
    faculty: string;
    timestamp: string;
    foto_bukti?: string;
}

export interface Kandidat {
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

export interface UserProps {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    username?: string;
}

export interface AuthProps {
    user: UserProps;
}
