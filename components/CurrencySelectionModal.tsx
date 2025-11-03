import React, { useMemo, useState } from 'react';
import type { Currency } from '../types';
import { CurrencyType } from '../types';

interface CurrencySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (currency: Currency) => void;
  selectedCurrencyCode: string;
  currencies: Currency[];
  top7FiatCodes?: string[];
  onUpdateTop7Fiat?: (index: number, newCode: string) => void;
}

const CurrencyItem: React.FC<{ currency: Currency, isSelected: boolean, onSelect: () => void }> = ({ currency, isSelected, onSelect }) => (
    <div onClick={onSelect} className={`flex items-center p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 ${isSelected ? 'bg-blue-900/50' : ''}`}>
        <input type="radio" name="currency" checked={isSelected} readOnly className="mr-4 form-radio text-blue-500 bg-gray-800 border-gray-600 focus:ring-blue-500" />
        <span className="text-2xl mr-3">{currency.flag}</span>
        <div>
            <p className="font-semibold">{currency.code} - {currency.name}</p>
            {currency.type === CurrencyType.CRYPTO && (
                 <p className="text-sm text-gray-400">~${currency.rateToUsd.toLocaleString()}</p>
            )}
        </div>
    </div>
);


const CurrencySelectionModal: React.FC<CurrencySelectionModalProps> = ({ isOpen, onClose, onSelect, selectedCurrencyCode, currencies, top7FiatCodes, onUpdateTop7Fiat }) => {
  const [activeTab, setActiveTab] = useState<'top' | 'fiat' | 'crypto'>('top');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { allFiat, allCrypto, top7Fiat } = useMemo(() => {
    const allFiat = currencies.filter(c => c.type === CurrencyType.FIAT).sort((a, b) => a.name.localeCompare(b.name));
    const allCrypto = currencies.filter(c => c.type === CurrencyType.CRYPTO).sort((a, b) => a.name.localeCompare(b.name));
    const top7Fiat = top7FiatCodes?.map(code => currencies.find(c => c.code === code)).filter((c): c is Currency => !!c) || [];
    return { allFiat, allCrypto, top7Fiat };
  }, [currencies, top7FiatCodes]);

  const filterList = (list: Currency[]) => {
    if (!searchTerm) return list;
    const lowercasedFilter = searchTerm.toLowerCase();
    return list.filter(c => 
        c.name.toLowerCase().includes(lowercasedFilter) ||
        c.code.toLowerCase().includes(lowercasedFilter)
    );
  };

  const handleSelect = (currency: Currency) => {
    onSelect(currency);
    setSearchTerm('');
  }

  if (!isOpen) return null;

  const TabButton: React.FC<{tab: 'top' | 'fiat' | 'crypto', children: React.ReactNode}> = ({tab, children}) => (
    <button 
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
    >
        {children}
    </button>
  );

  const renderList = (list: Currency[], title: string) => (
    <div className="p-4 pt-0">
      <h3 className="text-md font-semibold text-gray-300 mb-2 sticky top-0 bg-gray-800 py-2">{title}</h3>
      {filterList(list).map(c => (
        <CurrencyItem key={c.code} currency={c} isSelected={c.code === selectedCurrencyCode} onSelect={() => handleSelect(c)} />
      ))}
    </div>
  );

  const renderTop7List = () => (
    <div className="p-4 pt-0">
      <h3 className="text-md font-semibold text-gray-300 mb-2 sticky top-0 bg-gray-800 py-2">Top Currencies</h3>
      {top7Fiat.map((currency, index) => (
        <div key={`${currency.code}-${index}`} className="flex items-center justify-between p-3 border-b border-gray-700">
            <div onClick={() => handleSelect(currency)} className={`flex items-center cursor-pointer flex-grow ${selectedCurrencyCode === currency.code ? 'text-blue-400' : ''}`}>
                <span className="text-2xl mr-3">{currency.flag}</span>
                <div>
                    <p className="font-semibold">{currency.code} - {currency.name}</p>
                </div>
            </div>
            <div className="relative">
                <select
                    value={currency.code}
                    onChange={(e) => onUpdateTop7Fiat?.(index, e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-md py-1 pl-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                    {allFiat.map(fiat => (
                        <option key={fiat.code} value={fiat.code} className="bg-gray-800">
                            {fiat.code} {fiat.symbol} - {fiat.name}
                        </option>
                    ))}
                </select>
                <i className="fas fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none"></i>
            </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end" onClick={onClose}>
      <div 
        className="w-full bg-gray-800 rounded-t-2xl shadow-lg max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 text-center border-b border-gray-700 sticky top-0 bg-gray-800">
          <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-3"></div>
          <h2 className="text-lg font-bold">Select Currency</h2>
        </div>

        <div className='p-4 border-b border-gray-700'>
          <input
            type="text"
            placeholder="Search by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-center mt-3 space-x-2">
            <TabButton tab="top">Top</TabButton>
            <TabButton tab="fiat">Fiat</TabButton>
            <TabButton tab="crypto">Crypto</TabButton>
          </div>
        </div>
        
        <div className="overflow-y-auto">
          {activeTab === 'top' && renderTop7List()}
          {activeTab === 'fiat' && renderList(allFiat, 'All Fiat Currencies')}
          {activeTab === 'crypto' && renderList(allCrypto, 'All Cryptocurrencies')}
        </div>
      </div>
    </div>
  );
};

export default CurrencySelectionModal;