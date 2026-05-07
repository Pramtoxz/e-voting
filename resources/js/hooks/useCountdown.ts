import { useEffect, useState } from 'react';

export function useCountdown(initialCount: number = 3) {
    const [countdown, setCountdown] = useState(initialCount);
    const [showCountdown, setShowCountdown] = useState(false);

    useEffect(() => {
        if (showCountdown && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown, showCountdown]);

    const startCountdown = () => {
        setCountdown(initialCount);
        setShowCountdown(true);
    };

    const resetCountdown = () => {
        setCountdown(initialCount);
        setShowCountdown(false);
    };

    return {
        countdown,
        showCountdown,
        startCountdown,
        resetCountdown,
    };
}
