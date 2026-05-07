export type RatingKey = 'nilai_tampilan' | 'nilai_kemudahan' | 'nilai_keamanan' | 'nilai_kecepatan' | 'nilai_keseluruhan';

export interface KuesionerData {
    nilai_tampilan: number;
    nilai_kemudahan: number;
    nilai_keamanan: number;
    nilai_kecepatan: number;
    nilai_keseluruhan: number;
    saran: string;
    kesan: string;
    [key: string]: number | string;
}

export interface KuesionerProps {
    hasSubmitted: boolean;
    kuesioner?: KuesionerData;
    errors: Record<string, string>;
    flash: {
        success?: string;
        error?: string;
    };
}

export interface Developer {
    name: string;
    role: string;
    photo: string;
    github: string;
    instagram: string;
}
