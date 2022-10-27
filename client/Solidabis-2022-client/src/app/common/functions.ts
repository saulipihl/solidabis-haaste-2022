export function randomInt(minValue: number, maxValue: number): number {
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}

export function roundToOneDecimal(number: number): number {
    return Math.round(number * 10) / 10;
}

export function roundToTwoDecimals(number: number): number {
    return Math.round(number * 100) / 100;
}