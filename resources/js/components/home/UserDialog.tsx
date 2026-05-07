import { Link } from '@inertiajs/react';
import { LogOut, X } from 'lucide-react';
import { UserProps } from '@/types/voting';

interface UserDialogProps {
    show: boolean;
    user: UserProps;
    onClose: () => void;
    getInitials: () => string;
    getAvatarBgColor: () => string;
}

export default function UserDialog({ show, user, onClose, getInitials, getAvatarBgColor }: UserDialogProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={onClose}>
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="h-2 w-full bg-gradient-to-r from-red-700 to-red-500"></div>

                <div className="p-6">
                    <div className="mb-6 flex items-center space-x-4">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full border-2 border-red-500 object-cover" />
                        ) : (
                            <div className={`flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white ${getAvatarBgColor()}`}>
                                {getInitials()}
                            </div>
                        )}
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{user?.name}</h3>
                            <p className="text-gray-600">{user?.email}</p>
                            {user?.username && <p className="text-sm text-red-600">NIM: {user.username}</p>}
                        </div>
                    </div>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 transition-all duration-300 hover:bg-red-100"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                    </Link>
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
