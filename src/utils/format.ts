export function formatDate(date: Date, short?: boolean): string {
    const formatter = new Intl.DateTimeFormat('en-US', {
        day: short ? '2-digit' : 'numeric',
        month: short ? '2-digit' : 'long',
        year: short ? '2-digit' : 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Warsaw',
    });

    return formatter.format(date);
}