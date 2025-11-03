import React, { useState, useMemo } from 'react';
import type { Currency } from '../types';
import { CurrencyType } from '../types';
import CurrencySelectionModal from './CurrencySelectionModal';

interface CalculatorViewProps {
  baseCurrency: Currency;
  setBaseCurrency: (currency: Currency) => void;
  onShowHistory: () => void;
  currencies: Currency[];
  top7FiatCodes: string[];
  onUpdateTop7Fiat: (index: number, newCode: string) => void;
  amount: string;
  setAmount: (value: string) => void;
  targetCurrencyCodes: string[];
  setTargetCurrencyCodes: (codes: string[]) => void;
}

const CalculatorView: React.FC<CalculatorViewProps> = ({ 
  baseCurrency, 
  setBaseCurrency, 
  onShowHistory, 
  currencies, 
  top7FiatCodes, 
  onUpdateTop7Fiat,
  amount,
  setAmount,
  targetCurrencyCodes,
  setTargetCurrencyCodes
}) => {
  const [hasUserTyped, setHasUserTyped] = useState(() => amount !== '1' && amount !== '0');
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(false);
  const [editingTargetIndex, setEditingTargetIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const targetCurrencies = useMemo(() => {
    return targetCurrencyCodes
      .map(code => currencies.find(c => c.code === code))
      .filter((c): c is Currency => !!c);
  }, [targetCurrencyCodes, currencies]);


  const handleInput = (char: string) => {
    if (char === '.') {
      if (!amount.includes('.')) {
        // If it's the first input, start with '0.'
        if (!hasUserTyped) {
            setAmount('0.');
        } else {
            setAmount(amount + '.');
        }
        setHasUserTyped(true);
      }
      return;
    }
    
    // Prevent overflow only after the first character has been entered.
    if (hasUserTyped && amount.length >= 15) return;
    
    // If user has not typed, the first number replaces the default value.
    // Or if the current value is '0', it gets replaced.
    if (!hasUserTyped || amount === '0') {
        setAmount(char);
    } else {
        // Otherwise, append the character.
        setAmount(amount + char);
    }
    setHasUserTyped(true);
  };

  const handleClear = () => {
    setAmount('0');
    setHasUserTyped(false);
  };

  const handleCycle = () => {
    const fiatCurrencies = currencies.filter(c => c.type === CurrencyType.FIAT);
    const currentIndex = fiatCurrencies.findIndex(c => c.code === baseCurrency.code);
    const nextIndex = (currentIndex + 1) % fiatCurrencies.length;
    setBaseCurrency(fiatCurrencies[nextIndex]);
  };
  
  const numericValue = parseFloat(amount) || 0;

  const getConvertedValue = (targetCurrency: Currency) => {
    if (numericValue === 0) return '0.00';
    const valueInUsd = numericValue / baseCurrency.rateToUsd;
    const convertedValue = valueInUsd * targetCurrency.rateToUsd;
    return convertedValue.toLocaleString('en-US', {
      maximumFractionDigits: targetCurrency.type === CurrencyType.CRYPTO ? 6 : 2,
      minimumFractionDigits: 2,
    });
  };
  
  const handleTargetCurrencyChange = (index: number, newCode: string) => {
      const newCodes = [...targetCurrencyCodes];
      const existingIndex = newCodes.findIndex(c => c.code === newCode);

      if (existingIndex !== -1) {
          const currencyToSwapCode = newCodes[index];
          newCodes[existingIndex] = currencyToSwapCode;
      }
      
      newCodes[index] = newCode;
      setTargetCurrencyCodes(newCodes);
  };
  
  const handleEditTarget = (index: number) => {
    setEditingTargetIndex(index);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newTargetCodes = [...targetCurrencyCodes];
    const draggedItem = newTargetCodes.splice(draggedIndex, 1)[0];
    newTargetCodes.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    setTargetCurrencyCodes(newTargetCodes);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const keypadButtons = [
    { label: 'C', action: handleClear, color: 'bg-red-500' },
    { label: '7', action: () => handleInput('7'), color: 'bg-gray-600' },
    { label: '8', action: () => handleInput('8'), color: 'bg-gray-600' },
    { label: '9', action: () => handleInput('9'), color: 'bg-gray-600' },
    { label: <i className="fas fa-sync-alt"></i>, action: handleCycle, color: 'bg-blue-500' },
    { label: '4', action: () => handleInput('4'), color: 'bg-gray-600' },
    { label: '5', action: () => handleInput('5'), color: 'bg-gray-600' },
    { label: '6', action: () => handleInput('6'), color: 'bg-gray-600' },
    { label: '+', action: () => {}, color: 'bg-orange-500' },
    { label: '1', action: () => handleInput('1'), color: 'bg-gray-600' },
    { label: '2', action: () => handleInput('2'), color: 'bg-gray-600' },
    { label: '3', action: () => handleInput('3'), color: 'bg-gray-600' },
    { label: '-', action: () => {}, color: 'bg-orange-500' },
    { label: '0', action: () => handleInput('0'), color: 'bg-gray-600' },
    { label: '.', action: () => handleInput('.'), color: 'bg-gray-600' },
    { label: 'x', action: () => {}, color: 'bg-orange-500' },
    { label: '÷', action: () => {}, color: 'bg-orange-500' },
    { label: '=', action: () => {}, color: 'bg-green-500 col-span-2' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-800 p-4">
      <header className="flex justify-between items-center mb-4">
        <button className="text-xl opacity-0"><i className="fas fa-times"></i></button>
        <h1 className="text-lg font-bold"><i className="fas fa-calculator mr-2"></i>Currency Calculator</h1>
        <button className="text-xl opacity-0"><i className="fas fa-share-alt"></i></button>
      </header>
      
      <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-between mb-4">
        <button onClick={() => setIsBaseModalOpen(true)} className="flex items-center cursor-pointer group">
          <span className="text-3xl mr-3 p-2 rounded-lg bg-gray-600 shadow-lg border-b-2 border-gray-900/40 group-hover:bg-gray-500 group-active:scale-95 group-active:border-b-0 group-active:translate-y-px transition-all duration-100 ease-in-out flex items-center justify-center">
            {baseCurrency.flag}
          </span>
          <div className="flex items-center">
            <span className="text-2xl font-semibold">{baseCurrency.code}</span>
            <i className="fas fa-chevron-down text-xs ml-2 text-gray-400 group-hover:text-white transition-colors"></i>
          </div>
        </button>
        <div className="flex items-baseline justify-end text-4xl font-light bg-blue-600 px-4 py-1 rounded-md text-right">
          <span className="truncate">{amount}</span>
          <span className="text-2xl ml-2 opacity-75">{baseCurrency.symbol}</span>
        </div>
      </div>
      
      <div className="text-center text-gray-400 text-sm mb-4 flex-grow overflow-y-auto pr-2">
        {numericValue === 0 && !hasUserTyped ? "Enter amount to see conversions" : (
           <div className="space-y-2">
           {targetCurrencies.map((c, index) => (
             <div 
                key={`${c.code}-${index}`} 
                className={`flex justify-between items-center bg-gray-700/50 p-2 rounded-lg hover:bg-gray-700 transition-all cursor-pointer ${draggedIndex === index ? 'opacity-50' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onClick={() => handleEditTarget(index)}
             >
               <div className="flex items-center flex-1">
                 <span className="text-gray-500 mr-3 cursor-move" onTouchStart={(e) => e.stopPropagation()}><i className="fas fa-grip-vertical"></i></span>
                 <span className="text-2xl mr-3">{c.flag}</span>
                 <div>
                    <p className="font-semibold">{c.code}</p>
                    <p className="text-xs text-gray-400">{c.name}</p>
                 </div>
               </div>
               <div className="text-right">
                <span className="text-lg font-light">{getConvertedValue(c)}</span>
                <span className="text-sm ml-2 opacity-75">{c.symbol}</span>
               </div>
             </div>
           ))}
           </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2 text-2xl mt-4">
        {keypadButtons.map(({ label, action, color }, index) => {
          const isOperator = ['+', '-', 'x', '÷'].includes(label as string);
          return (
          <button key={index} onClick={action} className={`${color} ${label === '=' ? 'col-span-2' : ''} rounded-lg h-16 transition-transform active:scale-95`}>
            {label}
          </button>
        )})}
      </div>
      
      <div className="text-center mt-4">
        <button onClick={onShowHistory} className="text-blue-400 hover:text-blue-300 transition-colors">
          View History Charts <i className="fas fa-arrow-right ml-1"></i>
        </button>
      </div>

      <CurrencySelectionModal
        isOpen={isBaseModalOpen || editingTargetIndex !== null}
        onClose={() => {
            setIsBaseModalOpen(false);
            setEditingTargetIndex(null);
        }}
        onSelect={(currency) => {
            if (isBaseModalOpen) {
                setBaseCurrency(currency);
            } else if (editingTargetIndex !== null) {
                handleTargetCurrencyChange(editingTargetIndex, currency.code);
            }
            setIsBaseModalOpen(false);
            setEditingTargetIndex(null);
        }}
        selectedCurrencyCode={
            isBaseModalOpen 
                ? baseCurrency.code 
                : (editingTargetIndex !== null ? targetCurrencies[editingTargetIndex]?.code : '')
        }
        currencies={currencies}
        top7FiatCodes={top7FiatCodes}
        onUpdateTop7Fiat={onUpdateTop7Fiat}
      />
    </div>
  );
};

export default CalculatorView;