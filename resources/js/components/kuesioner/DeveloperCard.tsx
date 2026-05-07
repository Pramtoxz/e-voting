import { Developer } from '@/types/kuesioner';
import { Github, Instagram } from 'lucide-react';

interface DeveloperCardProps {
    developer: Developer;
}

export default function DeveloperCard({ developer }: DeveloperCardProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-red-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="relative aspect-square">
                <img src={developer.photo} alt={developer.name} className="h-full w-full object-cover" />
                <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{developer.name}</h3>
                    <p className="text-sm text-red-200">{developer.role}</p>
                </div>
            </div>
            <div className="p-4">
                <div className="flex gap-2">
                    <a
                        href={developer.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-700 transition-all duration-300 hover:bg-gray-100"
                    >
                        <Github className="h-5 w-5" />
                        <span className="text-sm font-medium">GitHub</span>
                    </a>
                    <a
                        href={developer.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-pink-300 bg-pink-50 px-4 py-2 text-pink-700 transition-all duration-300 hover:bg-pink-100"
                    >
                        <Instagram className="h-5 w-5" />
                        <span className="text-sm font-medium">Instagram</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
