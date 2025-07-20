import {describe, it, expect, beforeEach} from '@jest/globals';
import {DateTime} from 'luxon';
import {convertToCurrency, isUpToDate} from './utils';
import {CurrencyCode, CountryName, CurrencyRate} from './types';

const mockRate: CurrencyRate = {
  amount: 1,
  code: CurrencyCode.USD,
  country: CountryName.USA,
  currencyName: 'dollar',
  rateToCzk: 3,
};

describe('convertToCurrency', () => {
  it('converts CZK amount to given currency', () => {
    expect(convertToCurrency(6, {...mockRate, rateToCzk: 2})).toBe(3);
  });

  it('truncates the result to two decimals', () => {
    expect(convertToCurrency(100, mockRate)).toBe(33.33);
    expect(convertToCurrency(101, mockRate)).toBe(33.66);
  });
});

describe('isUpToDate', () => {
  const now = DateTime.fromISO('2023-12-17T10:00:00.000Z');

  beforeEach(() => {
    jest.setSystemTime(now.toJSDate());
  });

  it('returns true when dates are on the same day', () => {
    const today = now.startOf('day');
    expect(isUpToDate(today)).toBe(true);
  });

  it('returns false when dates differ', () => {
    const yesterday = now.minus({days: 1});
    expect(isUpToDate(yesterday)).toBe(false);
  });
});
