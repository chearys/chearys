export function formatHealth(number) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + 'b';  
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + 'm';  
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2) + 'k';  
    } else {
        return number.toFixed(2);
    }
}