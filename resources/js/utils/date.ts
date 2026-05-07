export function getCurrentYear(): number {
    return new Date().getFullYear();
}

export function getPemiraYear(): string {
    return getCurrentYear().toString();
}

export function getPemiraPeriode(): string {
    const currentYear = getCurrentYear();
    return `${currentYear}/${currentYear + 1}`;
}

export function formatDateTimeWIB(date: Date = new Date()): string {
    return date.toLocaleString('id-ID', {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
