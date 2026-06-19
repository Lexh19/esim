import React, { useState } from 'react';
import Header from '../components/Header';
import FilterSheet from '../components/FilterSheet';
import { products, regions, productTypes } from '../data/products';
import { formatPrice } from '../utils/formatter';
import {
  BoltIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

export default function ProductList({ onSelectProduct }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Semua Region');
  const [selectedType, setSelectedType] = useState('Semua Jenis');
  
  // Sheet open states
  const [isRegionSheetOpen, setIsRegionSheetOpen] = useState(false);
  const [isTypeSheetOpen, setIsTypeSheetOpen] = useState(false);

  // Filter products based on search, region and type
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.coverage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.region.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion = 
      selectedRegion === 'Semua Region' || 
      product.region === selectedRegion;

    const matchesType = 
      selectedType === 'Semua Jenis' || 
      (selectedType === 'Instants' && product.type === 'Instant') ||
      (selectedType === 'Topupable' && product.type === 'Topupable');

    return matchesSearch && matchesRegion && matchesType;
  });

  return (
    <div className="flex-1 flex flex-col relative bg-slate-50 select-none min-h-0 overflow-hidden">
      {/* Page Header */}
      <Header title="Travel eSIM" />

      {/* Hero Blue Banner Section with Search & Chips */}
      <div className="bg-brand text-white px-4 pb-20 pt-2 shadow-md z-10 shrink-0">
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Cari Produk yang Anda Mau"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-11 py-3 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 rounded-2xl placeholder-white/60 focus:placeholder-slate-400 border border-white/10 focus:border-white outline-none text-sm transition-all duration-300"
          />
          {/* Search Icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none group-focus-within:text-slate-500">
            <svg className="w-5 h-5 current-color" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
            </svg>
          </div>
        </div>

        {/* Filter Dropdown Chips */}
        <div className="flex gap-2.5">
          {/* Region Filter Trigger */}
          <button
            onClick={() => setIsRegionSheetOpen(true)}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              selectedRegion !== 'Semua Region'
                ? 'bg-white text-brand border-white'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
            }`}
          >
            <span>{selectedRegion}</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* Type Filter Trigger */}
          <button
            onClick={() => setIsTypeSheetOpen(true)}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              selectedType !== 'Semua Jenis'
                ? 'bg-white text-brand border-white'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
            }`}
          >
            <span>{selectedType}</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>

     {/* Main Products Content */}
      <div className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar min-h-0 bg-slate-50 rounded-t-[32px] -mt-8 relative z-10">
        {filteredProducts.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4 text-4xl shadow-inner">
              🔍
            </div>
            <h4 className="font-bold text-slate-700 text-sm">Produk Tidak Ditemukan</h4>
            <p className="text-slate-400 text-xs mt-1 max-w-[240px]">
              Coba cari dengan kata kunci lain atau ubah filter region/jenis produk Anda.
            </p>
          </div>
        ) : (
          /* Products Grid (Mobile-first 2 columns grid) */
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col cursor-pointer group"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Overlay region */}
                  <span className="absolute top-2 left-2 bg-slate-900/60 backdrop-blur-xs text-[10px] font-semibold text-white px-2 py-0.5 rounded-full">
                    {product.region}
                  </span>
                </div>

                {/* Product Body */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-brand transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Region {product.region}</p>
                    
                    {/* Badge Type */}
                    <div className="flex items-center gap-1 mt-2 text-slate-500">
                      {product.type === 'Instant' ? (
                        <>
                          <BoltIcon className="w-4 h-4 text-indigo-500" />
                          <span className="text-[10px] font-medium">Instant</span>
                        </>
                      ) : (
                        <>

                        <CreditCardIcon className="w-4 h-4 text-indigo-500"/>
                          
                          <span className="text-[10px] font-medium">Topupable</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-50 flex items-center justify-between gap-1.5">
                    {/* Price */}
                    <div className="font-bold text-brand text-xs sm:text-sm">
                      {formatPrice(product.basePrice)}
                    </div>
                    {/* Buy Button */}
                    <button
                      className="px-3 py-1.5 bg-brand text-white text-[11px] font-bold rounded-lg hover:bg-brand-dark transition-colors shadow-sm cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                    >
                      Beli
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Region Filter Bottom Sheet */}
      <FilterSheet
        isOpen={isRegionSheetOpen}
        onClose={() => setIsRegionSheetOpen(false)}
        title="Pilih Region"
        options={regions}
        selectedValue={selectedRegion}
        onApply={setSelectedRegion}
        defaultOption="Semua Region"
      />

      {/* Product Type Filter Bottom Sheet */}
      <FilterSheet
        isOpen={isTypeSheetOpen}
        onClose={() => setIsTypeSheetOpen(false)}
        title="Pilih Jenis Produk"
        options={productTypes}
        selectedValue={selectedType}
        onApply={setSelectedType}
        defaultOption="Semua Jenis"
      />
    </div>
  );
}
