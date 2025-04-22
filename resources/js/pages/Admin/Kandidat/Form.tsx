import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { router } from "@inertiajs/react";

interface Props {
    kandidat?: {
        id?: number;
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

const formSchema = z.object({
    nomor_urut: z.string().min(1, "Nomor urut harus diisi"),
    nama_presiden: z.string().min(1, "Nama presiden harus diisi"),
    nama_wakil: z.string().min(1, "Nama wakil harus diisi"),
    prodi_presiden: z.enum(["SI", "MI", "SK"]),
    prodi_wakil: z.enum(["SI", "MI", "SK"]),
    foto_presiden: z
        .instanceof(FileList)
        .refine((files) => files.length > 0, "Foto presiden harus diisi")
        .optional(),
    foto_wakil: z
        .instanceof(FileList)
        .refine((files) => files.length > 0, "Foto wakil harus diisi")
        .optional(),
    visi: z.string().min(1, "Visi harus diisi"),
    misi: z.string().min(1, "Misi harus diisi"),
    periode: z.string().min(1, "Periode harus diisi"),
});

export default function KandidatForm({ kandidat }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nomor_urut: kandidat?.nomor_urut || "",
            nama_presiden: kandidat?.nama_presiden || "",
            nama_wakil: kandidat?.nama_wakil || "",
            prodi_presiden: kandidat?.prodi_presiden || "SI",
            prodi_wakil: kandidat?.prodi_wakil || "SI",
            visi: kandidat?.visi?.join("\n") || "",
            misi: kandidat?.misi?.join("\n") || "",
            periode: kandidat?.periode || "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            if (key === "foto_presiden" || key === "foto_wakil") {
                if (values[key] instanceof FileList && values[key].length > 0) {
                    formData.append(key, values[key][0]);
                }
            } else if (key === "visi" || key === "misi") {
                formData.append(
                    key,
                    JSON.stringify(values[key].split("\n").filter(Boolean))
                );
            } else {
                formData.append(key, values[key]);
            }
        });

        if (kandidat?.id) {
            router.post(route("kandidat.update", kandidat.id), {
                _method: "PUT",
                ...formData,
            });
        } else {
            router.post(route("kandidat.store"), formData);
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                {kandidat ? "Edit Kandidat" : "Tambah Kandidat"}
            </h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 max-w-2xl"
                >
                    <FormField
                        control={form.control}
                        name="nomor_urut"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nomor Urut</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="nama_presiden"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Calon Presiden</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="nama_wakil"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Calon Wakil</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="prodi_presiden"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prodi Calon Presiden</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih prodi" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="SI">
                                                Sistem Informasi
                                            </SelectItem>
                                            <SelectItem value="MI">
                                                Manajemen Informatika
                                            </SelectItem>
                                            <SelectItem value="SK">
                                                Sistem Komputer
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="prodi_wakil"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prodi Calon Wakil</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih prodi" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="SI">
                                                Sistem Informasi
                                            </SelectItem>
                                            <SelectItem value="MI">
                                                Manajemen Informatika
                                            </SelectItem>
                                            <SelectItem value="SK">
                                                Sistem Komputer
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="foto_presiden"
                            render={({ field: { onChange, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Foto Calon Presiden</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                onChange(e.target.files)
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="foto_wakil"
                            render={({ field: { onChange, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Foto Calon Wakil</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                onChange(e.target.files)
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="visi"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Visi</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Masukkan visi (satu baris per poin)"
                                        className="h-32"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="misi"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Misi</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Masukkan misi (satu baris per poin)"
                                        className="h-32"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="periode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Periode</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Contoh: 2025/2026"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">
                        {kandidat ? "Update" : "Simpan"}
                    </Button>
                </form>
            </Form>
        </div>
    );
} 