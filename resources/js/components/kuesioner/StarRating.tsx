import starAnimation from '@/assets/bintang.json';
import { RatingKey } from '@/types/kuesioner';
import Lottie from 'lottie-react';
import { Star } from 'lucide-react';

interface StarRatingProps {
    label: string;
    value: number;
    onChange: (key: RatingKey, value: number) => void;
    ratingKey: RatingKey;
    disabled?: boolean;
    showAnimation: boolean;
}

export default function StarRating({ label, value, onChange, ratingKey, disabled = false, showAnimation }: StarRatingProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => !disabled && onChange(ratingKey, star)}
                        disabled={disabled}
                        className={`relative transition-all duration-200 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'}`}
                    >
                        {showAnimation && value === star ? (
                            <div className="h-10 w-10">
                                <Lottie animationData={starAnimation} loop={false} />
                            </div>
                        ) : (
                            <Star className={`h-10 w-10 ${star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        )}
                    </button>
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-600">{value > 0 ? `${value}/5` : 'Belum dinilai'}</span>
            </div>
        </div>
    );
}
