import DitoImage from '@/assets/dito.jpg';
import RafiImage from '@/assets/rafi.jpg';
import { Developer } from '@/types/kuesioner';

export const DEVELOPERS: Developer[] = [
    {
        name: 'Rafi Chandra',
        role: 'Full Stack Developer',
        photo: RafiImage,
        github: 'https://github.com/chandra_rafi',
        instagram: 'https://instagram.com/chandra_rafi',
    },
    {
        name: 'Pramudito Metra',
        role: 'Full Stack Developer',
        photo: DitoImage,
        github: 'https://github.com/Pramtoxz',
        instagram: 'https://instagram.com/pramuditometra',
    },
];

export const RATING_LABELS = {
    nilai_tampilan: 'Tampilan & Desain',
    nilai_kemudahan: 'Kemudahan Penggunaan',
    nilai_keamanan: 'Keamanan Sistem',
    nilai_kecepatan: 'Kecepatan Loading',
    nilai_keseluruhan: 'Penilaian Keseluruhan',
};
