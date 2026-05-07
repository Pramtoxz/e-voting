import { Kandidat } from '@/types/voting';
import { X } from 'lucide-react';
import { useState } from 'react';

interface VisiMisiDialogProps {
    show: boolean;
    kandidat: Kandidat | null;
    isClosing: boolean;
    onClose: () => void;
}

export default function VisiMisiDialog({ show, kandidat, isClosing, onClose }: VisiMisiDialogProps) {
    const [activeTab, setActiveTab] = useState<'visi' | 'misi'>('visi');

    if (!show || !kandidat) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`} onClick={onClose}>
            <div className={`w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}`} onClick={(e) => e.stopPropagation()}>
                <div className="h-2 w-full bg-gradient-to-r from-red-700 to-red-500"></div>

                <div className="p-4 sm:p-6">
                    <div className="mb-6 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                            <div className="relative">
                                <img
                                    src={`/storage/${kandidat.foto_presiden}`}
                                    alt={kandidat.nama_presiden}
                                    className="h-32 w-24 rounded-lg border-4 border-red-600 object-cover shadow-lg sm:h-40 sm:w-30"
                                />
                                <div className="absolute -top-3 -left-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white shadow-lg">
                                    {kandidat.nomor_urut}
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src={`/storage/${kandidat.foto_wakil}`}
                                    alt={kandidat.nama_wakil}
                                    className="h-32 w-24 rounded-lg border-4 border-red-400 object-cover shadow-lg sm:h-40 sm:w-30"
                                />
                            </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <div className="mb-3">
                                <p className="text-xs font-semibold uppercase tracking-wider text-red-600">Calon Presiden</p>
                                <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">{kandidat.nama_presiden}</h3>
                                <p className="text-sm text-gray-600">NIM: {kandidat.nomor_bp_presiden}</p>
                            </div>
                            <div className="border-t border-gray-200 pt-3">
                                <p className="text-xs font-semibold uppercase tracking-wider text-red-600">Calon Wakil Presiden</p>
                                <h4 className="text-lg font-bold text-gray-800">{kandidat.nama_wakil}</h4>
                                <p className="text-sm text-gray-600">NIM: {kandidat.nomor_bp_wakil}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4 flex space-x-2 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('visi')}
                            className={`px-6 py-3 font-semibold transition-all duration-200 ${
                                activeTab === 'visi' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-600 hover:text-red-600'
                            }`}
                        >
                            Visi
                        </button>
                        <button
                            onClick={() => setActiveTab('misi')}
                            className={`px-6 py-3 font-semibold transition-all duration-200 ${
                                activeTab === 'misi' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-600 hover:text-red-600'
                            }`}
                        >
                            Misi
                        </button>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {activeTab === 'visi' ? (
                            <div className="prose max-w-none">
                                {Array.isArray(kandidat.visi) ? (
                                    <ul className="space-y-3">
                                        {kandidat.visi.map((item, index) => (
                                            item.trim() && (
                                                <li key={index} className="text-gray-700 leading-relaxed">
                                                    {item}
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{kandidat.visi}</p>
                                )}
                            </div>
                        ) : (
                            <div className="prose max-w-none">
                                {Array.isArray(kandidat.misi) ? (
                                    <ol className="space-y-3 list-decimal list-inside">
                                        {kandidat.misi.map((item, index) => (
                                            item.trim() && (
                                                <li key={index} className="text-gray-700 leading-relaxed">
                                                    {item}
                                                </li>
                                            )
                                        ))}
                                    </ol>
                                ) : (
                                    <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{kandidat.misi}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 rounded-full bg-white/90 p-2 text-red-700 shadow-md transition-colors duration-200 hover:bg-red-50"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
