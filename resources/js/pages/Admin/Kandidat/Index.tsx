import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from "@inertiajs/react";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
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
import { router } from "@inertiajs/react";

interface Kandidat {
    id: number;
    nomor_urut: string;
    nama_presiden: string;
    nama_wakil: string;
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
}

export default function Index({ kandidats }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = () => {
        if (deleteId) {
            router.delete(route('kandidat.destroy', deleteId));
        }
        setDeleteId(null);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Daftar Kandidat</h1>
                <Button asChild>
                    <Link href={route('kandidat.create')}>
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Tambah Kandidat
                    </Link>
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No. Urut</TableHead>
                        <TableHead>Presiden</TableHead>
                        <TableHead>Wakil</TableHead>
                        <TableHead>Prodi Presiden</TableHead>
                        <TableHead>Prodi Wakil</TableHead>
                        <TableHead>Periode</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {kandidats.map((kandidat) => (
                        <TableRow key={kandidat.id}>
                            <TableCell>{kandidat.nomor_urut}</TableCell>
                            <TableCell>{kandidat.nama_presiden}</TableCell>
                            <TableCell>{kandidat.nama_wakil}</TableCell>
                            <TableCell>{kandidat.prodi_presiden}</TableCell>
                            <TableCell>{kandidat.prodi_wakil}</TableCell>
                            <TableCell>{kandidat.periode}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        asChild
                                    >
                                        <Link
                                            href={route(
                                                'kandidat.edit',
                                                kandidat.id
                                            )}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => setDeleteId(kandidat.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <AlertDialog
                open={deleteId !== null}
                onOpenChange={() => setDeleteId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Apakah Anda yakin?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini tidak dapat dibatalkan. Data kandidat akan
                            dihapus secara permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
} 