export function roundTo(num, precision) {
    return num.toFixed(precision).replace('.', ',');
}
