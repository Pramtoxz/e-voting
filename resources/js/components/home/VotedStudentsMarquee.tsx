import { VotedStudent } from '@/types/voting';
import { Clock, Vote } from 'lucide-react';

interface VotedStudentsMarqueeProps {
    students: VotedStudent[];
    loading: boolean;
    getInitialAvatar: (student: VotedStudent) => string;
}

export default function VotedStudentsMarquee({ students, loading, getInitialAvatar }: VotedStudentsMarqueeProps) {
    return (
        <section className="w-full overflow-hidden border-b border-red-100 bg-white py-12">
            <div className="mb-6 flex items-center gap-4 px-6 md:px-8">
                <div className="flex items-center gap-3 text-2xl font-bold text-red-600">
                    <Vote className="h-8 w-8" />
                    <span>Mahasiswa yang telah memilih:</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-3 text-lg">
                    <Clock className="h-6 w-6" />
                    <span>Update real-time setiap 5 detik</span>
                </div>
            </div>

            <div className="relative w-full overflow-hidden py-6">
                {loading ? (
                    <div className="w-full p-8 text-center text-xl font-medium">Memuat data...</div>
                ) : (
                    <div className="flex whitespace-nowrap">
                        <div className="animate-marquee flex py-6">
                            {students.map((student) => (
                                <div key={student.id} className="marquee-item mx-8 flex items-center rounded-xl border border-red-200 bg-red-50 px-6 py-4">
                                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-4 border-red-600 shadow-md">
                                        <img src={getInitialAvatar(student)} alt={student.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="ml-5 min-w-[200px]">
                                        <p className="text-xl font-bold text-gray-800">{student.name}</p>
                                        <p className="mt-1 flex items-center gap-3 text-base text-gray-600">
                                            <span className="font-medium">{student.faculty}</span>
                                            <span className="inline-block h-2 w-2 rounded-full bg-red-600"></span>
                                            <span>{student.timestamp}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
