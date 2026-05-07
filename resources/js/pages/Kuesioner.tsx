import Layout from '@/Layout/MainLayout';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { AudioPlayer, DeveloperCard, StarRating, SubmittedView, WelcomeDialog } from '@/components/kuesioner';
import bgMusic from '@/assets/cokelat.m4a';
import { DEVELOPERS, RATING_LABELS } from '@/constants/kuesioner';
import { KuesionerData, KuesionerProps, RatingKey } from '@/types/kuesioner';
import { getPemiraYear } from '@/utils/date';
import { Head, useForm } from '@inertiajs/react';
import { Send, Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Kuesioner({ hasSubmitted, kuesioner, errors, flash }: KuesionerProps) {
    const pemiraYear = getPemiraYear();

    const { data, setData, post, processing } = useForm<KuesionerData>({
        nilai_tampilan: 0,
        nilai_kemudahan: 0,
        nilai_keamanan: 0,
        nilai_kecepatan: 0,
        nilai_keseluruhan: 0,
        saran: '',
        kesan: '',
    });

    const [showAnimation, setShowAnimation] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showWelcomeDialog, setShowWelcomeDialog] = useState(!hasSubmitted);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, []);

    const startExperienceWithMusic = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.3;
            audioRef.current
                .play()
                .then(() => {
                    setIsPlaying(true);
                    setShowWelcomeDialog(false);
                })
                .catch((error) => {
                    console.log('Audio autoplay failed:', error);
                    setShowWelcomeDialog(false);
                });
        } else {
            setShowWelcomeDialog(false);
        }
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleRatingChange = (key: RatingKey, value: number) => {
        setData(key, value);
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 1000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('kuesioner.store'), {
            onSuccess: () => {
                setShowAnimation(true);
                setTimeout(() => setShowAnimation(false), 2500);
            },
        });
    };

    if (hasSubmitted) {
        return (
            <Layout title="Kuesioner - Terima Kasih">
                <Head title="Kuesioner - Terima Kasih" />
                <SubmittedView kuesioner={kuesioner} />
            </Layout>
        );
    }

    return (
        <Layout title={`Kuesioner PEMIRA ${pemiraYear}`}>
            <Head title={`Kuesioner PEMIRA ${pemiraYear}`} />

            <WelcomeDialog show={showWelcomeDialog} onStart={startExperienceWithMusic} />

            <AudioPlayer ref={audioRef} isPlaying={isPlaying} onToggle={toggleMusic} audioSrc={bgMusic} />

            <div className="container mx-auto max-w-4xl px-4 py-12">
                <div className="mb-8 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full border border-red-600 px-3 py-1 text-sm font-semibold text-red-600">
                        <Shield className="mr-1 h-4 w-4" />
                        Kuesioner PEMIRA {pemiraYear}
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-800">Berikan Penilaian Anda</h1>
                    <p className="text-gray-600">Bantu kami meningkatkan sistem e-voting dengan memberikan feedback Anda</p>
                </div>

                <Card className="border-red-200">
                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        {Object.entries(RATING_LABELS).map(([key, label]) => (
                            <StarRating
                                key={key}
                                label={label}
                                value={data[key as RatingKey] as number}
                                onChange={handleRatingChange}
                                ratingKey={key as RatingKey}
                                showAnimation={showAnimation}
                            />
                        ))}

                        {errors && Object.keys(errors).length > 0 && (
                            <div className="rounded-lg bg-red-50 p-4">
                                {Object.values(errors).map((error, index) => (
                                    <p key={index} className="text-sm text-red-600">
                                        {error}
                                    </p>
                                ))}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Saran</label>
                            <textarea
                                value={data.saran}
                                onChange={(e) => setData('saran', e.target.value)}
                                rows={4}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:ring-red-500 focus:outline-none"
                                placeholder="Berikan saran untuk perbaikan sistem..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Kesan</label>
                            <textarea
                                value={data.kesan}
                                onChange={(e) => setData('kesan', e.target.value)}
                                rows={4}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-red-500 focus:ring-red-500 focus:outline-none"
                                placeholder="Bagikan kesan Anda tentang sistem ini..."
                            />
                        </div>

                        <Button type="submit" disabled={processing} className="w-full" size="lg">
                            <Send className="mr-2 h-5 w-5" />
                            {processing ? 'Mengirim...' : 'Kirim Kuesioner'}
                        </Button>
                    </form>
                </Card>

                <div className="mt-12">
                    <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Tim Developer</h2>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {DEVELOPERS.map((dev) => (
                            <DeveloperCard key={dev.name} developer={dev} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
