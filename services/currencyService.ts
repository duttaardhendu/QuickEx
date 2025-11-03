
import { ALL_CURRENCIES } from '../constants';
import type { Currency, HistoricalDataPoint } from '../types';

export const getCurrencies = (): Currency[] => {
  return ALL_CURRENCIES;
};

export const getCurrencyByCode = (code: string): Currency | undefined => {
  return ALL_CURRENCIES.find(c => c.code === code);
};

// New function to simulate exchange rate updates
export const refreshExchangeRates = (currentCurrencies: Currency[]): Currency[] => {
  return currentCurrencies.map(currency => {
    if (currency.code === 'USD') {
      return currency; // USD is the base, its rate is always 1
    }
    
    // Simulate a small fluctuation, e.g., +/- 0.5%
    const fluctuation = (Math.random() - 0.5) * 0.01; 
    const newRateToUsd = currency.rateToUsd * (1 + fluctuation);

    // Simulate a new 24h change
    const newChange24h = (Math.random() - 0.5) * 5;

    return {
      ...currency,
      rateToUsd: newRateToUsd,
      change24h: parseFloat(newChange24h.toFixed(2)),
    };
  });
};

export const generateHistoricalData = (fromCurrency: Currency, toCurrency: Currency, days: number = 30): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  const baseRate = toCurrency.rateToUsd / fromCurrency.rateToUsd;
  let currentRate = baseRate;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${month}/${day}`;
    
    data.unshift({
      date: formattedDate,
      rate: parseFloat(currentRate.toFixed(4)),
    });
    
    const fluctuation = (Math.random() - 0.5) * 0.03; // Fluctuate by up to 1.5%
    currentRate *= (1 + fluctuation);
  }
  
  return data;
};