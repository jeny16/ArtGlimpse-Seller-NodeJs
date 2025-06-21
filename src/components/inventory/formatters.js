export const formatCurrency = (amount, currency = 'INR') => {
    if (amount === undefined || amount === null) return '-';

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(amount);
};

export const formatPercentage = (value) => {
    if (value === undefined || value === null) return '-';
    return `${value}%`;
};