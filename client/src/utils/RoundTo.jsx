export function roundTo(num, precision) {
  if (isNaN(num) || num === null || num === undefined) {
    return "0,00"; // ili bilo koja zamjenska vrijednost
  }
  return Number(num).toFixed(precision).replace(".", ",");
}
