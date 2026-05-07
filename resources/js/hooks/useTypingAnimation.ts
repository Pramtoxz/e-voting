import { useEffect, useState } from 'react';

export function useTypingAnimation(textArray: string[]) {
    const [typingText, setTypingText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % textArray.length;
            const fullText = textArray[i];

            setTypingText(isDeleting ? fullText.substring(0, typingText.length - 1) : fullText.substring(0, typingText.length + 1));

            setTypingSpeed(isDeleting ? 50 : 150);

            if (!isDeleting && typingText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && typingText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(500);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [typingText, isDeleting, loopNum, typingSpeed, textArray]);

    return typingText;
}
