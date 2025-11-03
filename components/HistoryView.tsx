import React, { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { Currency, HistoricalDataPoint } from '../types';
import { generateHistoricalData } from '../services/currencyService';
import CurrencySelectionModal from './CurrencySelectionModal';

interface HistoryViewProps {
  fromCurrency: Currency;
  toCurrency: Currency;
  setFromCurrency: (c: Currency) => void;
  setToCurrency: (c: Currency) => void;
  onBack: () => void;
  currencies: Currency[];
  top7FiatCodes: string[];
  onUpdateTop7Fiat: (index: number, newCode: string) => void;
  amount: string;
  setAmount: (value: string) => void;
}

const CurrencySelect: React.FC<{ currency: Currency, onClick: () => void }> = ({ currency, onClick }) => (
    <button onClick={onClick} className="flex items-center bg-gray-700 p-2 rounded-lg">
        <span className="text-2xl mr-2">{currency.flag}</span>
        <span className="font-semibold">{currency.code}</span>
        <i className="fas fa-chevron-down ml-2 text-xs"></i>
    </button>
);


const HistoryView: React.FC<HistoryViewProps> = ({ fromCurrency, toCurrency, setFromCurrency, setToCurrency, onBack, currencies, top7FiatCodes, onUpdateTop7Fiat, amount, setAmount }) => {
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [modalTarget, setModalTarget] = useState<'from' | 'to' | null>(null);

  const exchangeRate = useMemo(() => toCurrency.rateToUsd / fromCurrency.rateToUsd, [fromCurrency, toCurrency]);
  const convertedAmount = useMemo(() => (parseFloat(amount) || 0) * exchangeRate, [amount, exchangeRate]);

  useEffect(() => {
    setHistoricalData(generateHistoricalData(fromCurrency, toCurrency, 90));
  }, [fromCurrency, toCurrency]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };
  
  const handleSelectCurrency = (currency: Currency) => {
    if (modalTarget === 'from') {
        setFromCurrency(currency);
    } else if (modalTarget === 'to') {
        setToCurrency(currency);
    }
    setModalTarget(null);
  };

  const minRate = Math.min(...historicalData.map(d => d.rate));
  const maxRate = Math.max(...historicalData.map(d => d.rate));

  return (
    <div className="flex flex-col h-full bg-gray-800 p-4 text-white">
      <header className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-xl"><i className="fas fa-arrow-left"></i></button>
        <h1 className="text-xl font-bold">History</h1>
        <button className="text-xl"><i className="fas fa-sync-alt"></i></button>
      </header>

      <div className="bg-gray-700/50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <CurrencySelect currency={fromCurrency} onClick={() => setModalTarget('from')} />
          <button onClick={handleSwap} className="text-2xl text-gray-400"><i className="fas fa-exchange-alt"></i></button>
          <CurrencySelect currency={toCurrency} onClick={() => setModalTarget('to')} />
        </div>
        <div className="flex justify-between items-end">
            <div className="w-1/2">
                <div className="flex items-baseline border-b border-gray-500 focus-within:border-blue-400 pb-1">
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                        className="w-full bg-transparent text-3xl font-light focus:outline-none"
                    />
                    <span className="text-xl text-gray-400 ml-2">{fromCurrency.symbol}</span>
                </div>
            </div>
            <div className="w-1/2 text-right">
                <p className="text-xs text-gray-400">Today</p>
                <p className="text-3xl font-light">
                    {convertedAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })} <span className="text-xl text-gray-400">{toCurrency.symbol}</span>
                </p>
            </div>
        </div>
      </div>
      
      <div className="mt-6 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-2 text-sm">
          <span>3 months</span>
          <span>Aug 04, 2025 - Nov 02, 2025 <i className="fas fa-chevron-down ml-1 text-xs"></i></span>
        </div>
        <div className="bg-cyan-900/30 p-4 rounded-lg flex-grow relative">
            <div className="absolute top-2 left-2 text-xs text-gray-300">Min: {minRate.toFixed(2)}</div>
            <div className="absolute top-2 right-2 text-xs text-gray-300">Max: {maxRate.toFixed(2)}</div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" tick={{ fill: '#9CA3AF' }} fontSize={12} interval={Math.floor(historicalData.length / 5)} />
                    <YAxis domain={['dataMin', 'dataMax']} tick={{ fill: '#9CA3AF' }} fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4B5563' }} />
                    <Line type="monotone" dataKey="rate" stroke="#22D3EE" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>

      <CurrencySelectionModal
        isOpen={!!modalTarget}
        onClose={() => setModalTarget(null)}
        onSelect={handleSelectCurrency}
        selectedCurrencyCode={modalTarget === 'from' ? fromCurrency.code : toCurrency.code}
        currencies={currencies}
        top7FiatCodes={top7FiatCodes}
        onUpdateTop7Fiat={onUpdateTop7Fiat}
      />
    </div>
  );
};

export default HistoryView;