import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

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
                title: "Berhasil!",
                description: flash.success,
                variant: "success",
            });
        } else if (flash?.error) {
            toast({
                title: "Error!",
                description: flash.error,
                variant: "destructive",
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
                        title: "Berhasil!",
                        description: "Kandidat berhasil dihapus",
                        variant: "success",
                    });
                },
                onError: () => {
                    toast({
                        title: "Error!",
                        description: "Gagal menghapus kandidat",
                        variant: "destructive",
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
                return (
                    <Badge variant="outline">
                        {prodi}
                    </Badge>
                );
            }
        },
        {
            accessorKey: 'prodi_wakil',
            header: 'Prodi Wakil',
            cell: ({ row }) => {
                const prodi = row.original.prodi_wakil;
                return (
                    <Badge variant="outline">
                        {prodi}
                    </Badge>
                );
            }
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
                            className="h-8 px-2 text-xs sm:text-sm sm:px-3"
                        >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            <span className="hidden xs:inline">Detail</span>
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.visit(route('kandidat.edit', kandidat.id))}
                            className="h-8 px-2 text-xs sm:text-sm sm:px-3"
                        >
                            <Pencil className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            <span className="hidden xs:inline">Edit</span>
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteClick(kandidat.id)}
                            className="h-8 px-2 text-xs sm:text-sm sm:px-3"
                        >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            <span className="hidden xs:inline">Hapus</span>
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
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 sm:mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold">Daftar Kandidat</h1>
                    <Button 
                        onClick={() => router.visit(route('kandidat.create'))}
                        className="w-full sm:w-auto"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Kandidat
                    </Button>
                </div>

                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Konfirmasi Penghapusan</AlertDialogTitle>
                            <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus kandidat ini? 
                                Tindakan ini tidak dapat dibatalkan.
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
                    <DialogContent className="max-w-[95vw] min-w-[800px] h-[95vh] overflow-y-auto p-0">
                        {selectedKandidat && (
                            <div className="relative">
                                {/* Header dengan background gradient */}
                                <div className="relative h-52 bg-gradient-to-r from-primary/90 to-primary overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20"></div>
                                    <div className="relative px-8 py-6 flex items-center justify-between h-full text-white">
                                        <div>
                                            <h1 className="text-4xl font-bold mb-3">Kandidat Nomor Urut {selectedKandidat.nomor_urut}</h1>
                                            <p className="text-xl opacity-90">Periode {selectedKandidat.periode}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="p-8">
                                    {/* Kandidat Cards */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
                                        {/* Presiden Card */}
                                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                            <div className="flex flex-col md:flex-row">
                                                <div className="w-full md:w-1/2">
                                                    <div className="relative pt-[130%]">
                                                        <img 
                                                            src={`/storage/${selectedKandidat.foto_presiden}`}
                                                            alt="Foto Presiden"
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full md:w-1/2 p-6">
                                                    <div className="mb-6">
                                                        <h3 className="text-2xl font-bold text-gray-900">{selectedKandidat.nama_presiden}</h3>
                                                        <p className="text-base text-gray-600 mt-1">Calon Presiden BEM</p>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <p className="text-base text-gray-500 mb-1">Nomor BP</p>
                                                            <p className="text-lg font-medium">{selectedKandidat.nomor_bp_presiden}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-base text-gray-500 mb-1">Program Studi</p>
                                                            <Badge variant="outline" className="text-base px-4 py-1">
                                                                {selectedKandidat.prodi_presiden === 'SI' ? 'SI' :
                                                                 selectedKandidat.prodi_presiden === 'MI' ? 'MI' :
                                                                 'SK'}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Wakil Card */}
                                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                            <div className="flex flex-col md:flex-row">
                                                <div className="w-full md:w-1/2">
                                                    <div className="relative pt-[130%]">
                                                        <img 
                                                            src={`/storage/${selectedKandidat.foto_wakil}`}
                                                            alt="Foto Wakil"
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full md:w-1/2 p-6">
                                                    <div className="mb-6">
                                                        <h3 className="text-2xl font-bold text-gray-900">{selectedKandidat.nama_wakil}</h3>
                                                        <p className="text-base text-gray-600 mt-1">Calon Wakil Presiden BEM</p>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <p className="text-base text-gray-500 mb-1">Nomor BP</p>
                                                            <p className="text-lg font-medium">{selectedKandidat.nomor_bp_wakil}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-base text-gray-500 mb-1">Program Studi</p>
                                                            <Badge variant="outline" className="text-base px-4 py-1">
                                                                {selectedKandidat.prodi_wakil === 'SI' ? 'SI' :
                                                                 selectedKandidat.prodi_wakil === 'MI' ? 'MI' :
                                                                 'SK'}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Visi & Misi Section */}
                                    <div className="mt-10">
                                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10">
                                            <div className="text-center mb-8">
                                                <span className="inline-block px-4 py-1 bg-blue-50 rounded-full text-blue-600 text-sm font-semibold mb-3">
                                                    Visi & Misi
                                                </span>
                                                <h3 className="text-2xl font-bold text-gray-900">
                                                    Program Kerja Kandidat
                                                </h3>
                                            </div>

                                            <div className="space-y-8">
                                                <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                                                    <p className="font-semibold text-blue-700 mb-4 text-lg">Visi</p>
                                                    <div className="space-y-3">
                                                        {selectedKandidat.visi.map((item, index) => (
                                                            <p key={index} className="text-gray-700">
                                                                {index + 1}. {item}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                                                    <p className="font-semibold text-blue-700 mb-4 text-lg">Misi</p>
                                                    <div className="space-y-3">
                                                        {selectedKandidat.misi.map((item, index) => (
                                                            <p key={index} className="text-gray-700">
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

                <div className="overflow-x-auto -mx-3 sm:mx-0">
                    <div className="w-full">
                        <DataTable
                            columns={columns}
                            data={kandidats}
                            searchable={true}
                            searchColumn="nama_presiden"
                        />
                    </div>
                </div>
                
                <Toaster />
            </div>
        </AppLayout>
    );
}
