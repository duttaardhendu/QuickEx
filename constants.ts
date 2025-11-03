import { Currency, CurrencyType } from './types';

export const TOP_7_FIAT_CODES = ['USD', 'EUR', 'JPY', 'GBP', 'INR', 'CAD', 'AUD'];

export const ALL_CURRENCIES: Currency[] = [
  // Top Fiat
  { code: 'USD', name: 'United States Dollar', country: 'United States', flag: '🇺🇸', symbol: '$', rateToUsd: 1, change24h: 0.0, type: CurrencyType.FIAT },
  { code: 'EUR', name: 'European Euro', country: 'European Union', flag: '🇪🇺', symbol: '€', rateToUsd: 0.9120, change24h: 0.21, type: CurrencyType.FIAT },
  { code: 'JPY', name: 'Japanese Yen', country: 'Japan', flag: '🇯🇵', symbol: '¥', rateToUsd: 147.14, change24h: -0.12, type: CurrencyType.FIAT },
  { code: 'GBP', name: 'British Pound', country: 'United Kingdom', flag: '🇬🇧', symbol: '£', rateToUsd: 0.7850, change24h: 0.15, type: CurrencyType.FIAT },
  { code: 'INR', name: 'Indian Rupee', country: 'India', flag: '🇮🇳', symbol: '₹', rateToUsd: 83.50, change24h: 0.05, type: CurrencyType.FIAT },
  
  // Other Major Fiat
  { code: 'AUD', name: 'Australian Dollar', country: 'Australia', flag: '🇦🇺', symbol: 'A$', rateToUsd: 1.5180, change24h: 0.33, type: CurrencyType.FIAT },
  { code: 'CAD', name: 'Canadian Dollar', country: 'Canada', flag: '🇨🇦', symbol: 'C$', rateToUsd: 1.3720, change24h: -0.08, type: CurrencyType.FIAT },
  { code: 'CHF', name: 'Swiss Franc', country: 'Switzerland', flag: '🇨🇭', symbol: 'CHF', rateToUsd: 0.87, change24h: 0.01, type: CurrencyType.FIAT },
  { code: 'CNY', name: 'Chinese Yuan (RMB)', country: 'China', flag: '🇨🇳', symbol: '¥', rateToUsd: 7.25, change24h: -0.03, type: CurrencyType.FIAT },
  { code: 'HKD', name: 'Hong Kong Dollar', country: 'Hong Kong', flag: '🇭🇰', symbol: 'HK$', rateToUsd: 7.82, change24h: 0.0, type: CurrencyType.FIAT },
  { code: 'NZD', name: 'New Zealand Dollar', country: 'New Zealand', flag: '🇳🇿', symbol: 'NZ$', rateToUsd: 1.63, change24h: 0.25, type: CurrencyType.FIAT },
  { code: 'SEK', name: 'Swedish Krona', country: 'Sweden', flag: '🇸🇪', symbol: 'kr', rateToUsd: 10.45, change24h: 0.3, type: CurrencyType.FIAT },
  { code: 'KRW', name: 'South Korean Won', country: 'South Korea', flag: '🇰🇷', symbol: '₩', rateToUsd: 1350.00, change24h: -0.6, type: CurrencyType.FIAT },
  { code: 'SGD', name: 'Singapore Dollar', country: 'Singapore', flag: '🇸🇬', symbol: 'S$', rateToUsd: 1.35, change24h: 0.1, type: CurrencyType.FIAT },
  { code: 'NOK', name: 'Norwegian Krone', country: 'Norway', flag: '🇳🇴', symbol: 'kr', rateToUsd: 10.60, change24h: 0.2, type: CurrencyType.FIAT },
  { code: 'MXN', name: 'Mexican Peso', country: 'Mexico', flag: '🇲🇽', symbol: '$', rateToUsd: 17.10, change24h: -0.4, type: CurrencyType.FIAT },
  { code: 'TWD', name: 'New Taiwan Dollar', country: 'Taiwan', flag: '🇹🇼', symbol: 'NT$', rateToUsd: 31.00, change24h: -0.2, type: CurrencyType.FIAT },
  { code: 'ZAR', name: 'South African Rand', country: 'South Africa', flag: '🇿🇦', symbol: 'R', rateToUsd: 18.50, change24h: 0.5, type: CurrencyType.FIAT },
  { code: 'BRL', name: 'Brazilian Real', country: 'Brazil', flag: '🇧🇷', symbol: 'R$', rateToUsd: 5.15, change24h: -1.2, type: CurrencyType.FIAT },
  { code: 'DKK', name: 'Danish Krone', country: 'Denmark', flag: '🇩🇰', symbol: 'kr', rateToUsd: 6.85, change24h: 0.2, type: CurrencyType.FIAT },
  { code: 'PLN', name: 'Polish Złoty', country: 'Poland', flag: '🇵🇱', symbol: 'zł', rateToUsd: 3.95, change24h: 0.4, type: CurrencyType.FIAT },
  { code: 'THB', name: 'Thai Baht', country: 'Thailand', flag: '🇹🇭', symbol: '฿', rateToUsd: 36.50, change24h: -0.1, type: CurrencyType.FIAT },
  { code: 'IDR', name: 'Indonesian Rupiah', country: 'Indonesia', flag: '🇮🇩', symbol: 'Rp', rateToUsd: 15700, change24h: 0.3, type: CurrencyType.FIAT },
  { code: 'HUF', name: 'Hungarian Forint', country: 'Hungary', flag: '🇭🇺', symbol: 'Ft', rateToUsd: 350.00, change24h: -0.5, type: CurrencyType.FIAT },
  { code: 'CZK', name: 'Czech Koruna', country: 'Czech Republic', flag: '🇨🇿', symbol: 'Kč', rateToUsd: 23.00, change24h: 0.1, type: CurrencyType.FIAT },
  { code: 'ILS', name: 'Israeli New Shekel', country: 'Israel', flag: '🇮🇱', symbol: '₪', rateToUsd: 3.70, change24h: 0.0, type: CurrencyType.FIAT },
  { code: 'CLP', name: 'Chilean Peso', country: 'Chile', flag: '🇨🇱', symbol: '$', rateToUsd: 930.00, change24h: -1.0, type: CurrencyType.FIAT },
  { code: 'PHP', name: 'Philippine Peso', country: 'Philippines', flag: '🇵🇭', symbol: '₱', rateToUsd: 58.50, change24h: 0.2, type: CurrencyType.FIAT },
  { code: 'AED', name: 'UAE Dirham', country: 'United Arab Emirates', flag: '🇦🇪', symbol: 'د.إ', rateToUsd: 3.67, change24h: 0.0, type: CurrencyType.FIAT },
  { code: 'COP', name: 'Colombian Peso', country: 'Colombia', flag: '🇨🇴', symbol: '$', rateToUsd: 3900.00, change24h: -0.8, type: CurrencyType.FIAT },
  { code: 'SAR', name: 'Saudi Riyal', country: 'Saudi Arabia', flag: '🇸🇦', symbol: 'ر.س', rateToUsd: 3.75, change24h: 0.0, type: CurrencyType.FIAT },
  { code: 'MYR', name: 'Malaysian Ringgit', country: 'Malaysia', flag: '🇲🇾', symbol: 'RM', rateToUsd: 4.70, change24h: 0.1, type: CurrencyType.FIAT },
  { code: 'RON', name: 'Romanian Leu', country: 'Romania', flag: '🇷🇴', symbol: 'lei', rateToUsd: 4.55, change24h: 0.2, type: CurrencyType.FIAT },
  { code: 'RUB', name: 'Russian Ruble', country: 'Russia', flag: '🇷🇺', symbol: '₽', rateToUsd: 90.00, change24h: 0.8, type: CurrencyType.FIAT },
  { code: 'TRY', name: 'Turkish Lira', country: 'Turkey', flag: '🇹🇷', symbol: '₺', rateToUsd: 32.50, change24h: -1.5, type: CurrencyType.FIAT },

  // Top 10 Cryptocurrencies
  { code: 'BTC', name: 'Bitcoin', flag: '₿', symbol: '₿', rateToUsd: 87000, change24h: 2.5, type: CurrencyType.CRYPTO },
  { code: 'ETH', name: 'Ethereum', flag: 'Ξ', symbol: 'Ξ', rateToUsd: 4560, change24h: 3.1, type: CurrencyType.CRYPTO },
  { code: 'BNB', name: 'Binance Coin', flag: '🟡', symbol: 'BNB', rateToUsd: 640, change24h: 1.8, type: CurrencyType.CRYPTO },
  { code: 'SOL', name: 'Solana', flag: '📛', symbol: 'SOL', rateToUsd: 206, change24h: 5.2, type: CurrencyType.CRYPTO },
  { code: 'XRP', name: 'Ripple', flag: '💧', symbol: 'XRP', rateToUsd: 0.66, change24h: -0.5, type: CurrencyType.CRYPTO },
  { code: 'DOGE', name: 'Dogecoin', flag: '🐶', symbol: 'DOGE', rateToUsd: 0.15, change24h: 0.2, type: CurrencyType.CRYPTO },
  { code: 'ADA', name: 'Cardano', flag: '₳', symbol: '₳', rateToUsd: 0.50, change24h: 1.1, type: CurrencyType.CRYPTO },
  { code: 'AVAX', name: 'Avalanche', flag: '🔺', symbol: 'AVAX', rateToUsd: 40, change24h: 4.5, type: CurrencyType.CRYPTO },
  { code: 'DOT', name: 'Polkadot', flag: '🟣', symbol: 'DOT', rateToUsd: 7.50, change24h: 2.3, type: CurrencyType.CRYPTO },
  { code: 'MATIC', name: 'Polygon', flag: '💠', symbol: 'MATIC', rateToUsd: 0.80, change24h: 0.9, type: CurrencyType.CRYPTO },
];