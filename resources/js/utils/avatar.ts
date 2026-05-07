import { UserProps, VotedStudent } from '@/types/voting';

export function getUserInitials(user: UserProps | undefined): string {
    if (!user?.name) return 'U';
    return user.name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
}

export function getAvatarBgColor(userId: number | undefined): string {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-indigo-500'];
    const colorIndex = (userId || 0) % colors.length;
    return colors[colorIndex];
}

export function getStudentAvatar(student: VotedStudent): string {
    if (student.foto_bukti) {
        return `/storage/${student.foto_bukti}`;
    }
    return `https://ui-avatars.com/api/?name=${student.name.charAt(0)}&background=ef4444&color=fff&size=100`;
}
