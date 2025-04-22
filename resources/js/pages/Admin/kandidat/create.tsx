import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

type FormData = {
    nomor_urut: string;
    nama_presiden: string;
    nama_wakil: string;
    nomor_bp_presiden: string;
    nomor_bp_wakil: string;
    prodi_presiden: string;
    prodi_wakil: string;
    foto_presiden: File | null;
    foto_wakil: File | null;
    foto_presiden_preview: string | null;
    foto_wakil_preview: string | null;
    visi: string;
    misi: string;
    periode: string;
}

export default function Create() {
    const { toast } = useToast();
    const form = useForm<FormData>({
        nomor_urut: '',
        nama_presiden: '',
        nama_wakil: '',
        nomor_bp_presiden: '',
        nomor_bp_wakil: '',
        prodi_presiden: '',
        prodi_wakil: '',
        foto_presiden: null,
        foto_wakil: null,
        foto_presiden_preview: null,
        foto_wakil_preview: null,
        visi: '',
        misi: '',
        periode: '',
    });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.post(route('kandidat.store'), {
            onSuccess: () => {
                toast({
                    title: "Berhasil!",
                    description: "Kandidat berhasil ditambahkan",
                    variant: "success",
                });
            },
            onError: () => {
                toast({
                    title: "Error!",
                    description: "Gagal menambahkan kandidat",
                    variant: "destructive",
                });
            },
        });
    }

    const handleFileChange = (field: 'foto_presiden' | 'foto_wakil') => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            form.setData(field, file);
            form.setData(`${field}_preview`, URL.createObjectURL(file));
        }
    };

    return (
        <AppLayout>
            <Head title="Tambah Kandidat" />
            <div className="p-3 sm:p-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="p-4 sm:p-6">
                        <div className="flex flex-col items-center gap-4">
                            <h2 className="text-xl sm:text-2xl font-bold text-center">
                                Formulir Pendaftaran Kandidat
                            </h2>
                            <p className="text-sm text-muted-foreground text-center">
                                Silakan lengkapi data kandidat dengan benar
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-4 sm:p-6">
                        <form onSubmit={onSubmit} className="space-y-8">
                            {/* Data Kandidat */}
                            <div className="space-y-6">
                                <div className="pb-4 border-b">
                                    <h3 className="text-lg font-semibold text-primary">Data Kandidat</h3>
                                    <p className="text-sm text-muted-foreground">Informasi umum kandidat</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="nomor_urut">Nomor Urut <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="nomor_urut"
                                            value={form.data.nomor_urut}
                                            onChange={e => form.setData('nomor_urut', e.target.value)}
                                            placeholder="Masukkan nomor urut"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="periode">Periode <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="periode"
                                            value={form.data.periode}
                                            onChange={e => form.setData('periode', e.target.value)}
                                            placeholder="Masukkan periode"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Data Presiden */}
                            <div className="space-y-6">
                                <div className="pb-4 border-b">
                                    <h3 className="text-lg font-semibold text-primary">Data Calon Presiden</h3>
                                    <p className="text-sm text-muted-foreground">Informasi calon presiden BEM</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="space-y-6 flex-1">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama_presiden">Nama Presiden <span className="text-destructive">*</span></Label>
                                            <Input
                                                id="nama_presiden"
                                                value={form.data.nama_presiden}
                                                onChange={e => form.setData('nama_presiden', e.target.value)}
                                                placeholder="Masukkan nama presiden"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="nomor_bp_presiden">Nomor BP <span className="text-destructive">*</span></Label>
                                            <Input
                                                id="nomor_bp_presiden"
                                                value={form.data.nomor_bp_presiden}
                                                onChange={e => form.setData('nomor_bp_presiden', e.target.value)}
                                                placeholder="Masukkan nomor BP"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="prodi_presiden">Program Studi <span className="text-destructive">*</span></Label>
                                            <Select
                                                value={form.data.prodi_presiden}
                                                onValueChange={value => form.setData('prodi_presiden', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih program studi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="SI">
                                                        <div className="flex items-center">
                                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">S1-Sistem Informasi</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="MI">
                                                        <div className="flex items-center">
                                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">D3-Manajemen Informatika</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="SK">
                                                        <div className="flex items-center">
                                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">S1-Sistem Komputer</span>
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-1/3 space-y-2">
                                        <Label htmlFor="foto_presiden" className="italic">Foto 3x4</Label>
                                        <div className="relative flex flex-col items-center p-4 border-2 border-dashed rounded-lg">
                                            {form.data.foto_presiden_preview ? (
                                                <div className="space-y-4">
                                                    <img 
                                                        src={form.data.foto_presiden_preview} 
                                                        alt="Preview" 
                                                        className="w-full h-[200px] object-cover rounded-lg shadow-sm"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="w-full"
                                                        onClick={() => document.getElementById('foto_presiden')?.click()}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                        Ganti Foto
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="flex flex-col items-center justify-center w-full h-[200px] bg-muted/30 rounded-lg">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <p className="text-sm text-muted-foreground text-center">Belum ada foto</p>
                                                        <p className="text-xs text-muted-foreground mt-1">Format: JPG, PNG (Max. 2MB)</p>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        className="w-full"
                                                        onClick={() => document.getElementById('foto_presiden')?.click()}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                        Upload Foto
                                                    </Button>
                                                </div>
                                            )}
                                            <Input
                                                type="file"
                                                id="foto_presiden"
                                                onChange={handleFileChange('foto_presiden')}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Data Wakil */}
                            <div className="space-y-6">
                                <div className="pb-4 border-b">
                                    <h3 className="text-lg font-semibold text-primary">Data Calon Wakil Presiden</h3>
                                    <p className="text-sm text-muted-foreground">Informasi calon wakil presiden BEM</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="space-y-6 flex-1">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama_wakil">Nama Wakil <span className="text-destructive">*</span></Label>
                                            <Input
                                                id="nama_wakil"
                                                value={form.data.nama_wakil}
                                                onChange={e => form.setData('nama_wakil', e.target.value)}
                                                placeholder="Masukkan nama wakil"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="nomor_bp_wakil">Nomor BP <span className="text-destructive">*</span></Label>
                                            <Input
                                                id="nomor_bp_wakil"
                                                value={form.data.nomor_bp_wakil}
                                                onChange={e => form.setData('nomor_bp_wakil', e.target.value)}
                                                placeholder="Masukkan nomor BP"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="prodi_wakil">Program Studi <span className="text-destructive">*</span></Label>
                                            <Select
                                                value={form.data.prodi_wakil}
                                                onValueChange={value => form.setData('prodi_wakil', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih program studi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="SI">
                                                        <div className="flex items-center">
                                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">S1-Sistem Informasi</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="MI">
                                                        <div className="flex items-center">
                                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">D3-Manajemen Informatika</span>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="SK">
                                                        <div className="flex items-center">
                                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">S1-Sistem Komputer</span>
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="w-full sm:w-1/3 space-y-2">
                                        <Label htmlFor="foto_wakil" className="italic">Foto 3x4</Label>
                                        <div className="relative flex flex-col items-center p-4 border-2 border-dashed rounded-lg">
                                            {form.data.foto_wakil_preview ? (
                                                <div className="space-y-4">
                                                    <img 
                                                        src={form.data.foto_wakil_preview} 
                                                        alt="Preview" 
                                                        className="w-full h-[200px] object-cover rounded-lg shadow-sm"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="w-full"
                                                        onClick={() => document.getElementById('foto_wakil')?.click()}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                        Ganti Foto
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="flex flex-col items-center justify-center w-full h-[200px] bg-muted/30 rounded-lg">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <p className="text-sm text-muted-foreground text-center">Belum ada foto</p>
                                                        <p className="text-xs text-muted-foreground mt-1">Format: JPG, PNG (Max. 2MB)</p>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        className="w-full"
                                                        onClick={() => document.getElementById('foto_wakil')?.click()}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                        Upload Foto
                                                    </Button>
                                                </div>
                                            )}
                                            <Input
                                                type="file"
                                                id="foto_wakil"
                                                onChange={handleFileChange('foto_wakil')}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Visi & Misi */}
                            <div className="space-y-6">
                                <div className="pb-4 border-b">
                                    <h3 className="text-lg font-semibold text-primary">Visi & Misi</h3>
                                    <p className="text-sm text-muted-foreground">Visi dan misi kandidat</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="visi">Visi <span className="text-destructive">*</span></Label>
                                        <Textarea
                                            id="visi"
                                            value={form.data.visi}
                                            onChange={e => form.setData('visi', e.target.value)}
                                            placeholder="Masukkan visi (satu per baris)"
                                            className="min-h-[100px]"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Pisahkan setiap visi dengan baris baru (Enter)
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="misi">Misi <span className="text-destructive">*</span></Label>
                                        <Textarea
                                            id="misi"
                                            value={form.data.misi}
                                            onChange={e => form.setData('misi', e.target.value)}
                                            placeholder="Masukkan misi (satu per baris)"
                                            className="min-h-[100px]"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Pisahkan setiap misi dengan baris baru (Enter)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Batal
                                </Button>
                                <Button type="submit" disabled={form.processing} className="min-w-[200px]">
                                    {form.processing ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Menyimpan...</span>
                                        </div>
                                    ) : (
                                        'Simpan Data'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                <Toaster />
            </div>
        </AppLayout>
    );
} 