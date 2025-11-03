
export enum CurrencyType {
  FIAT = 'fiat',
  CRYPTO = 'crypto',
}

export interface Currency {
  code: string;
  name: string;
  country?: string;
  flag: string;
  symbol: string;
  rateToUsd: number;
  change24h: number;
  type: CurrencyType;
}

export interface HistoricalDataPoint {
  date: string;
  rate: number;
}

export enum View {
  CALCULATOR,
  HISTORY,
}