import { useEffect, useState } from 'react';

interface VoteToastItem {
    id: number;
    name: string;
}

interface VoteToastProps {
    queue: VoteToastItem[];
    onDismiss: (id: number) => void;
}

const TOAST_DURATION = 4500;

export default function VoteToast({ queue, onDismiss }: VoteToastProps) {
    const visible = queue.slice(0, 3);
    return (
        <div className="pointer-events-none fixed top-4 right-4 z-[9999] flex flex-col gap-3">
            {visible.map((item) => (
                <ToastItem key={item.id} item={item} onDismiss={onDismiss} />
            ))}
        </div>
    );
}

function ToastItem({ item, onDismiss }: { item: VoteToastItem; onDismiss: (id: number) => void }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setShow(true), 10);
        const t2 = setTimeout(() => {
            setShow(false);
            setTimeout(() => onDismiss(item.id), 300);
        }, TOAST_DURATION);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [item.id, onDismiss]);

    return (
        <div
            className="pointer-events-auto flex w-72 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl transition-all duration-300"
            style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateX(0)' : 'translateX(24px)',
            }}
        >
            <div className="min-w-0">
                <p className="truncate text-sm font-bold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">Terima kasih sudah memilih</p>
            </div>
        </div>
    );
}
