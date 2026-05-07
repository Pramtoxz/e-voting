import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Kandidat {
    id: number;
    nomor_urut: string;
    nama_presiden: string;
    nama_wakil: string;
    nomor_bp_presiden: string;
    nomor_bp_wakil: string;
    prodi_presiden: string;
    prodi_wakil: string;
    foto_presiden: string;
    foto_wakil: string;
    visi: string[];
    misi: string[];
    periode: string;
}

interface Props {
    kandidats: Kandidat[];
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Index({ kandidats, flash }: Props) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [kandidatToDelete, setKandidatToDelete] = useState<number | null>(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedKandidat, setSelectedKandidat] = useState<Kandidat | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (flash?.success) {
            toast({
                title: 'Berhasil!',
                description: flash.success,
                variant: 'success',
            });
        } else if (flash?.error) {
            toast({
                title: 'Error!',
                description: flash.error,
                variant: 'destructive',
            });
        }
    }, [flash, toast]);

    const handleViewDetail = (kandidat: Kandidat) => {
        setSelectedKandidat(kandidat);
        setDetailDialogOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setKandidatToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDelete = () => {
        if (kandidatToDelete) {
            router.delete(route('kandidat.destroy', kandidatToDelete), {
                onSuccess: () => {
                    toast({
                        title: 'Berhasil!',
                        description: 'Kandidat berhasil dihapus',
                        variant: 'success',
                    });
                },
                onError: () => {
                    toast({
                        title: 'Error!',
                        description: 'Gagal menghapus kandidat',
                        variant: 'destructive',
                    });
                },
            });
        }
        setDeleteDialogOpen(false);
        setKandidatToDelete(null);
    };

    const columns: ColumnDef<Kandidat>[] = [
        {
            accessorKey: 'nomor_urut',
            header: 'No. Urut',
        },
        {
            accessorKey: 'nama_presiden',
            header: 'Nama Presiden',
        },
        {
            accessorKey: 'nomor_bp_presiden',
            header: 'No. BP Presiden',
        },
        {
            accessorKey: 'nama_wakil',
            header: 'Nama Wakil',
        },
        {
            accessorKey: 'nomor_bp_wakil',
            header: 'No. BP Wakil',
        },
        {
            accessorKey: 'prodi_presiden',
            header: 'Prodi Presiden',
            cell: ({ row }) => {
                const prodi = row.original.prodi_presiden;
                return <Badge variant="outline">{prodi}</Badge>;
            },
        },
        {
            accessorKey: 'prodi_wakil',
            header: 'Prodi Wakil',
            cell: ({ row }) => {
                const prodi = row.original.prodi_wakil;
                return <Badge variant="outline">{prodi}</Badge>;
            },
        },
        {
            accessorKey: 'periode',
            header: 'Periode',
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const kandidat = row.original;

                return (
                    <div className="flex flex-wrap gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetail(kandidat)}
                            className="h-8 px-2 text-xs sm:px-3 sm:text-sm"
                        >
                            <Eye className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                            <span className="xs:inline hidden">Detail</span>
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.visit(route('kandidat.edit', kandidat.id))}
                            className="h-8 px-2 text-xs sm:px-3 sm:text-sm"
                        >
                            <Pencil className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                            <span className="xs:inline hidden">Edit</span>
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteClick(kandidat.id)}
                            className="h-8 px-2 text-xs sm:px-3 sm:text-sm"
                        >
                            <Trash2 className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                            <span className="xs:inline hidden">Hapus</span>
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout>
            <Head title="Daftar Kandidat" />
            <div className="p-3 sm:p-6">
                <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-xl font-bold sm:text-2xl">Daftar Kandidat</h1>
                    <Button onClick={() => router.visit(route('kandidat.create'))} className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Kandidat
                    </Button>
                </div>

                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
                            <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus kandidat ini? Tindakan ini tidak dapat dibatalkan.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                                Hapus
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
                    <DialogContent className="h-[95vh] max-w-[95vw] min-w-[800px] overflow-y-auto p-0">
                        {selectedKandidat && (
                            <div className="relative">
                                {/* Header dengan background gradient */}
                                <div className="from-primary/90 to-primary relative h-52 overflow-hidden bg-gradient-to-r">
                                    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20"></div>
                                    <div className="relative flex h-full items-center justify-between px-8 py-6 text-white">
                                        <div>
                                            <h1 className="mb-3 text-4xl font-bold">Kandidat Nomor Urut {selectedKandidat.nomor_urut}</h1>
                                            <p className="text-xl opacity-90">Periode {selectedKandidat.periode}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="p-8">
                                    {/* Kandidat Cards */}
                                    <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
                                        {/* Presiden Card */}
                                        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                                            <div className="flex flex-col md:flex-row">
                                                <div className="w-full md:w-1/2">
                                                    <div className="relative pt-[130%]">
                                                        <img
                                                            src={`/storage/${selectedKandidat.foto_presiden}`}
                                                            alt="Foto Presiden"
                                                            className="absolute inset-0 h-full w-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full p-6 md:w-1/2">
                                                    <div className="mb-6">
                                                        <h3 className="text-2xl font-bold text-foreground">{selectedKandidat.nama_presiden}</h3>
                                                        <p className="mt-1 text-base text-muted-foreground">Calon Presiden BEM</p>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <p className="mb-1 text-base text-muted-foreground">Nomor BP</p>
                                                            <p className="text-lg font-medium">{selectedKandidat.nomor_bp_presiden}</p>
                                                        </div>
                                                        <div>
                                                            <p className="mb-1 text-base text-muted-foreground">Program Studi</p>
                                                            <Badge variant="outline" className="px-4 py-1 text-base">
                                                                {selectedKandidat.prodi_presiden === 'SI'
                                                                    ? 'SI'
                                                                    : selectedKandidat.prodi_presiden === 'MI'
                                                                      ? 'MI'
                                                                      : 'SK'}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Wakil Card */}
                                        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                                            <div className="flex flex-col md:flex-row">
                                                <div className="w-full md:w-1/2">
                                                    <div className="relative pt-[130%]">
                                                        <img
                                                            src={`/storage/${selectedKandidat.foto_wakil}`}
                                                            alt="Foto Wakil"
                                                            className="absolute inset-0 h-full w-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full p-6 md:w-1/2">
                                                    <div className="mb-6">
                                                        <h3 className="text-2xl font-bold text-foreground">{selectedKandidat.nama_wakil}</h3>
                                                        <p className="mt-1 text-base text-muted-foreground">Calon Wakil Presiden BEM</p>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <p className="mb-1 text-base text-muted-foreground">Nomor BP</p>
                                                            <p className="text-lg font-medium">{selectedKandidat.nomor_bp_wakil}</p>
                                                        </div>
                                                        <div>
                                                            <p className="mb-1 text-base text-muted-foreground">Program Studi</p>
                                                            <Badge variant="outline" className="px-4 py-1 text-base">
                                                                {selectedKandidat.prodi_wakil === 'SI'
                                                                    ? 'SI'
                                                                    : selectedKandidat.prodi_wakil === 'MI'
                                                                      ? 'MI'
                                                                      : 'SK'}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Visi & Misi Section */}
                                    <div className="mt-10">
                                        <div className="border-primary/10 rounded-2xl border bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                                            <div className="mb-8 text-center">
                                                <span className="mb-3 inline-block rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600">
                                                    Visi & Misi
                                                </span>
                                                <h3 className="text-2xl font-bold text-foreground">Program Kerja Kandidat</h3>
                                            </div>

                                            <div className="space-y-8">
                                                <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
                                                    <p className="mb-4 text-lg font-semibold text-blue-700">Visi</p>
                                                    <div className="space-y-3">
                                                        {selectedKandidat.visi.map((item, index) => (
                                                            <p key={index} className="text-foreground">
                                                                {index + 1}. {item}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
                                                    <p className="mb-4 text-lg font-semibold text-blue-700">Misi</p>
                                                    <div className="space-y-3">
                                                        {selectedKandidat.misi.map((item, index) => (
                                                            <p key={index} className="text-foreground">
                                                                {index + 1}. {item}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                <div className="-mx-3 overflow-x-auto sm:mx-0">
                    <div className="w-full">
                        <DataTable columns={columns} data={kandidats} searchable={true} searchColumn="nama_presiden" />
                    </div>
                </div>

                <Toaster />
            </div>
        </AppLayout>
    );
}
