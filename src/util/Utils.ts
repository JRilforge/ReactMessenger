export function timeDifference(previous: Date) {
    const current: number = new Date().getTime();

    const msPerMinute: number = 60 * 1000;
    const msPerHour: number = msPerMinute * 60;
    const msPerDay: number = msPerHour * 24;
    const msPerMonth: number = msPerDay * 30;
    const msPerYear: number = msPerDay * 365;

    const elapsed: number = current - previous.getTime();

    if (elapsed < msPerMinute) {
        return Math.round(elapsed/1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed/msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed/msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';
    }

    return Math.round(elapsed/msPerYear) + ' years ago';
}