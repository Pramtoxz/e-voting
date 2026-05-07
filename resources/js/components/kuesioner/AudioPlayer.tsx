import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { forwardRef } from 'react';

interface AudioPlayerProps {
    isPlaying: boolean;
    onToggle: () => void;
    audioSrc: string;
}

const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(({ isPlaying, onToggle, audioSrc }, ref) => {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={onToggle}
                className="flex items-center gap-2 rounded-full border border-red-200 bg-white px-4 py-3 text-red-700 shadow-lg transition-all duration-300 hover:bg-red-50 hover:shadow-xl"
            >
                {isPlaying ? (
                    <>
                        <Volume2 className="h-5 w-5" />
                        <span className="hidden sm:inline">Musik Aktif</span>
                        <Pause className="h-5 w-5" />
                    </>
                ) : (
                    <>
                        <VolumeX className="h-5 w-5" />
                        <span className="hidden sm:inline">Putar Musik</span>
                        <Play className="h-5 w-5" />
                    </>
                )}
            </button>
            <audio ref={ref} src={audioSrc} loop />
        </div>
    );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
