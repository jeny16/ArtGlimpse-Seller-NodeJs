export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    } catch (error) {
        return 'Invalid Date';
    }
};

export const daysUntil = (dateString) => {
    if (!dateString) return 0;

    try {
        const targetDate = new Date(dateString);
        const today = new Date();

        // Reset time part for accurate day calculation
        targetDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const differenceInTime = targetDate.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        return differenceInDays >= 0 ? differenceInDays : 0;
    } catch (error) {
        return 0;
    }
};

export const isExpired = (dateString) => {
    if (!dateString) return false;

    try {
        const targetDate = new Date(dateString);
        const today = new Date();

        // Reset time part for accurate comparison
        targetDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        return targetDate < today;
    } catch (error) {
        return false;
    }
};