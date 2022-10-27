import { roundToOneDecimal, roundToTwoDecimals } from './functions';

describe('Functions', () => {
  beforeEach(async () => {
  });

  it('roundToOneDecimal rounds correctly', () => {
    const value = roundToOneDecimal(1.11111);
    expect(value).toBe(1.1);

    const value2 = roundToOneDecimal(5);
    expect(value2).toBe(5);

    const value3 = roundToOneDecimal(2.56);
    expect(value3).toBe(2.6);
  });

  it('roundToTwoDecimals rounds correctly', () => {
    const value = roundToTwoDecimals(1.11111);
    expect(value).toBe(1.11);

    const value2 = roundToTwoDecimals(5);
    expect(value2).toBe(5);

    const value3 = roundToTwoDecimals(2.56);
    expect(value3).toBe(2.56);

    const value4 = roundToTwoDecimals(2.568);
    expect(value4).toBe(2.57);
  });
});
