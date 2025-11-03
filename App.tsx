import React, { useState, useEffect } from 'react';
import CalculatorView from './components/CalculatorView';
import HistoryView from './components/HistoryView';
import { getCurrencies, refreshExchangeRates } from './services/currencyService';
import type { Currency } from './types';
import { View } from './types';
import { TOP_7_FIAT_CODES } from './constants';


const App: React.FC = () => {
  const [allCurrencies, setAllCurrencies] = useState<Currency[]>(() => getCurrencies());

  // Load state from localStorage or set defaults from user's screenshot
  const [initialState] = useState(() => {
    try {
      const saved = window.localStorage.getItem('currencyAppState');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load state', e);
    }
    return {
      view: View.CALCULATOR,
      baseCurrencyCode: 'JPY',
      historyFromCurrencyCode: 'JPY',
      historyToCurrencyCode: 'INR',
      amount: '230000',
      calculatorTargetCurrencyCodes: ['INR', 'USD', 'CAD', 'EUR', 'SGD', 'GBP'],
    };
  });

  const [view, setView] = useState<View>(initialState.view);
  const [baseCurrencyCode, setBaseCurrencyCode] = useState<string>(initialState.baseCurrencyCode);
  const [historyFromCurrencyCode, setHistoryFromCurrencyCode] = useState<string>(initialState.historyFromCurrencyCode);
  const [historyToCurrencyCode, setHistoryToCurrencyCode] = useState<string>(initialState.historyToCurrencyCode);
  const [amount, setAmount] = useState<string>(initialState.amount);
  const [calculatorTargetCurrencyCodes, setCalculatorTargetCurrencyCodes] = useState<string[]>(initialState.calculatorTargetCurrencyCodes);
  
  const [top7FiatCodes, setTop7FiatCodes] = useState<string[]>(() => {
    try {
      const savedCodes = window.localStorage.getItem('top7FiatCodes');
      if (savedCodes) {
        const parsedCodes = JSON.parse(savedCodes);
        if (Array.isArray(parsedCodes) && parsedCodes.length > 0 && parsedCodes.every(c => typeof c === 'string')) {
          return parsedCodes;
        }
      }
    } catch (error) {
      console.error("Failed to load top currencies from storage:", error);
    }
    return TOP_7_FIAT_CODES;
  });
  
  const baseCurrency = allCurrencies.find(c => c.code === baseCurrencyCode) || allCurrencies.find(c => c.code === 'JPY')!;
  const historyFromCurrency = allCurrencies.find(c => c.code === historyFromCurrencyCode) || allCurrencies.find(c => c.code === 'JPY')!;
  const historyToCurrency = allCurrencies.find(c => c.code === historyToCurrencyCode) || allCurrencies.find(c => c.code === 'INR')!;

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      setAllCurrencies(prevCurrencies => refreshExchangeRates(prevCurrencies));
    }, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(refreshInterval);
  }, []);

  // Effect to save state
  useEffect(() => {
    const stateToSave = {
      view,
      baseCurrencyCode,
      historyFromCurrencyCode,
      historyToCurrencyCode,
      amount,
      calculatorTargetCurrencyCodes,
    };
    try {
      window.localStorage.setItem('currencyAppState', JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save state', e);
    }
  }, [view, baseCurrencyCode, historyFromCurrencyCode, historyToCurrencyCode, amount, calculatorTargetCurrencyCodes]);


  useEffect(() => {
    try {
      window.localStorage.setItem('top7FiatCodes', JSON.stringify(top7FiatCodes));
    } catch (error) {
      console.error("Failed to save top currencies to storage:", error);
    }
  }, [top7FiatCodes]);

  const handleUpdateTop7Fiat = (indexToUpdate: number, newCode: string) => {
    setTop7FiatCodes(prevCodes => {
      const newCodes = [...prevCodes];
      const existingIndex = newCodes.findIndex(code => code === newCode);

      // If the new currency is already in the list, swap them
      if (existingIndex !== -1) {
        const currencyToSwap = newCodes[indexToUpdate];
        newCodes[existingIndex] = currencyToSwap;
      }
      
      newCodes[indexToUpdate] = newCode;
      return newCodes;
    });
  };

  const handleSetBase = (currency: Currency) => {
      setBaseCurrencyCode(currency.code);
  };
  
  const handleSetHistoryFrom = (currency: Currency) => {
      setHistoryFromCurrencyCode(currency.code);
  };
  
  const handleSetHistoryTo = (currency: Currency) => {
      setHistoryToCurrencyCode(currency.code);
  };

  if (!baseCurrency || !historyFromCurrency || !historyToCurrency) {
      return <div>Loading currencies...</div>;
  }

  const renderView = () => {
    switch (view) {
      case View.HISTORY:
        return (
          <HistoryView
            fromCurrency={historyFromCurrency}
            toCurrency={historyToCurrency}
            setFromCurrency={handleSetHistoryFrom}
            setToCurrency={handleSetHistoryTo}
            onBack={() => setView(View.CALCULATOR)}
            currencies={allCurrencies}
            top7FiatCodes={top7FiatCodes}
            onUpdateTop7Fiat={handleUpdateTop7Fiat}
            amount={amount}
            setAmount={setAmount}
          />
        );
      case View.CALCULATOR:
      default:
        return (
          <CalculatorView
            baseCurrency={baseCurrency}
            setBaseCurrency={handleSetBase}
            onShowHistory={() => setView(View.HISTORY)}
            currencies={allCurrencies}
            top7FiatCodes={top7FiatCodes}
            onUpdateTop7Fiat={handleUpdateTop7Fiat}
            amount={amount}
            setAmount={setAmount}
            targetCurrencyCodes={calculatorTargetCurrencyCodes}
            setTargetCurrencyCodes={setCalculatorTargetCurrencyCodes}
          />
        );
    }
  };

  return <div className="h-screen w-screen text-white">{renderView()}</div>;
};

export default App;