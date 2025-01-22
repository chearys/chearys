export function formatHealth(value) {

    let n = Number(value);
    if (Number.isNaN(n)) {
        return "0";
    }

    if (n >= 1e9) {
        return (n / 1e9).toFixed(2) + "b";
    }
    if (n >= 1e6) {
        return (n / 1e6).toFixed(2) + "m";
    }
    if (n >= 1e3) {
        return (n / 1e3).toFixed(2) + "k";
    }
    return n.toFixed(2);
}