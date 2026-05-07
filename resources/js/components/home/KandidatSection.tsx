import { Kandidat } from '@/types/voting';
import { getPemiraYear } from '@/utils/date';
import KandidatCard from './KandidatCard';

interface KandidatSectionProps {
    kandidat: Kandidat[];
    onOpenDialog: (kandidat: Kandidat) => void;
}

export default function KandidatSection({ kandidat, onOpenDialog }: KandidatSectionProps) {
    const pemiraYear = getPemiraYear();

    return (
        <section id="kandidat" className="relative w-full bg-red-50 py-12 md:py-24 lg:py-32">
            <div className="absolute top-0 left-0 h-8 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoNTBMNTAgMTAwSDBWMHoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNNTAgMGg1MEwxMDAgMTAwSDUwVjB6IiBmaWxsPSIjZWYxNDFjIi8+PC9zdmc+')] bg-repeat-x"></div>
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter text-red-700 sm:text-5xl">Kandidat PEMIRA {pemiraYear}</h2>
                        <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Kenali calon pemimpin yang akan mewakili aspirasi dan kepentingan mahasiswa di kampus kita.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-2">
                    {kandidat.map((calon) => (
                        <KandidatCard key={calon.id} kandidat={calon} onOpenDialog={onOpenDialog} />
                    ))}
                </div>
            </div>
        </section>
    );
}
