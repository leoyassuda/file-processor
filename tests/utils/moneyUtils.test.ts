import { expect, test, describe } from 'bun:test';
import { formatMoney } from '@utils/moneyUtils';

describe('formatBrazilianNumber', () => {
  test('should format a number correctly', () => {
    const number = 1234.56;
    expect(formatMoney(number)).toBe('1,234.56');
  });

  test('should handle negative numbers', () => {
    const number = -9871.65;
    expect(formatMoney(number)).toBe('-9,871.65');
  });
});
