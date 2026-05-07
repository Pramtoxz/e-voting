import Card from '@/components/Card';
import { FileText, Info, Users, Vote } from 'lucide-react';

interface AboutSectionProps {
    garudaUrl: string;
}

export default function AboutSection({ garudaUrl }: AboutSectionProps) {
    return (
        <section id="tentang" className="relative w-full py-12 md:py-24 lg:py-32">
            <div className="absolute top-0 right-0 h-32 w-32 opacity-10 md:h-48 md:w-48">
                <div className="h-full w-full bg-red-600" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
                <div
                    className="h-[500px] w-[500px] bg-contain bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${garudaUrl})`,
                    }}
                ></div>
            </div>

            <div className="relative container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-flex items-center rounded-full border border-red-600 px-2.5 py-0.5 text-sm font-semibold text-red-600 transition-colors focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:outline-none">
                            <Info className="mr-1 h-3.5 w-3.5" />
                            Tentang PEMIRA
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-red-600 sm:text-5xl">Apa itu PEMIRA?</h2>
                        <p className="text-muted-foreground max-w-[900px] text-sm md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Pemilihan Raya Mahasiswa (PEMIRA) adalah proses pemilihan pemimpin organisasi kemahasiswaan di tingkat universitas.
                            Melalui PEMIRA, mahasiswa dapat memilih calon pemimpin yang akan mewakili aspirasi dan kepentingan mereka.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="border-red-100 shadow-sm">
                        <div className="p-6 pt-6">
                            <div className="flex flex-col items-center space-y-2 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                    <Vote className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-bold text-red-600">Demokrasi Kampus</h3>
                                <p className="text-muted-foreground text-sm">
                                    PEMIRA merupakan wujud demokrasi di lingkungan kampus yang memberikan hak suara kepada seluruh mahasiswa.
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="border-red-100 shadow-sm">
                        <div className="p-6 pt-6">
                            <div className="flex flex-col items-center space-y-2 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                    <Users className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-bold text-red-600">Representasi Mahasiswa</h3>
                                <p className="text-muted-foreground text-sm">
                                    Memilih pemimpin yang akan mewakili aspirasi dan kepentingan seluruh mahasiswa di tingkat universitas.
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className="border-red-100 shadow-sm">
                        <div className="p-6 pt-6">
                            <div className="flex flex-col items-center space-y-2 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                    <FileText className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="text-xl font-bold text-red-600">Transparansi</h3>
                                <p className="text-muted-foreground text-sm">
                                    Proses pemilihan yang transparan dan akuntabel untuk memastikan hasil yang adil dan dapat dipercaya.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
