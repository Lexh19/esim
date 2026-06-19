import React, { useState } from 'react';
import { dataSizes, dayOptions } from '../data/products';
import { formatPrice } from '../utils/formatter';

export default function ProductDetail({ product, onBack, onOrderNow }) {
  const [selectedSize, setSelectedSize] = useState(dataSizes[0]); // Default 3GB
  const [selectedDuration, setSelectedDuration] = useState(dayOptions[0]); // Default 7 Days
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Dynamic pricing calculation based on multipliers
  const calculatedPrice = Math.round(
    product.basePrice * selectedSize.multiplier * selectedDuration.multiplier
  );

  const handleOrder = () => {
    onOrderNow(product, selectedSize, selectedDuration, calculatedPrice);
  };

  // Simulated carousel images
  const carouselImages = [
    product.image,
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80'
  ];

  return (
    <div className="flex-1 flex flex-col bg-white relative select-none min-h-0 overflow-hidden">
      {/* Top Banner Image with Carousel & Back Button */}
      <div className="relative w-full h-72 bg-slate-900 shrink-0">
        <img
          src={carouselImages[carouselIndex]}
          alt={product.name}
          className="w-full h-full object-cover opacity-90 transition-all duration-500"
        />
        {/* Dark overlay top grad */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

        {/* Back Button overlay */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-xs text-white rounded-full hover:bg-black/60 transition-all cursor-pointer shadow-sm"
          aria-label="Go back"
        >
          <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Carousel Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2  z-30 flex gap-1.5 bg-black/30 backdrop-blur-xs px-2.5 py-1.5 rounded-full ">
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCarouselIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                carouselIndex === idx ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Details Body */}
      <div className="flex-1 px-5 py-6 overflow-y-auto no-scrollbar min-h-0 pb-24 bg-white rounded-t-[32px] -mt-8 relative z-10">
        {/* Title, Badge & Price */}
        <div className="flex justify-between items-start gap-2 mb-4">
          <div>
            <h2 className="font-extrabold text-slate-800 text-lg sm:text-xl">
              {product.name}
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">Region {product.region}</p>
            
            {/* Badge */}
            <div className="flex items-center gap-1 mt-2 text-slate-500">
              {product.type === 'Instant' ? (
                <>
                  <svg className="w-3.5 h-3.5 text-amber-500 fill-amber-500" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-[10px] font-semibold">Instant</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                  <span className="text-[10px] font-semibold">Topupable</span>
                </>
              )}
            </div>
          </div>
          {/* Price */}
          <div className="text-right">
            <div className="text-brand font-extrabold text-lg">
              {formatPrice(calculatedPrice)}
            </div>
            <p className="text-[9px] text-slate-400">Termasuk PPN</p>
          </div>
        </div>

        {/* Country Coverage */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6">
          <div className="text-xs font-bold text-slate-700">Cakupan negara</div>
          <div className="text-xs text-slate-500 mt-1 font-medium">{product.coverage}</div>
        </div>

        {/* Data Size Selector */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-slate-700 mb-2">Ukuran Data</label>
          <div className="grid grid-cols-4 gap-2">
            {dataSizes.map((size) => {
              const isSelected = selectedSize.id === size.id;
              return (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand text-white border-brand shadow-xs shadow-brand/20'
                      : 'bg-brand-light/30 text-slate-600 border-slate-200 hover:bg-brand-light/50'
                  }`}
                >
                  {size.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration Days Selector */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 mb-2">Pilih Jumlah Hari</label>
          <div className="grid grid-cols-4 gap-2">
            {dayOptions.map((opt) => {
              const isSelected = selectedDuration.id === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedDuration(opt)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand text-white border-brand shadow-xs shadow-brand/20'
                      : 'bg-brand-light/30 text-slate-600 border-slate-200 hover:bg-brand-light/50'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Description List */}
        <div>
          <h4 className="font-bold text-slate-800 text-sm mb-2.5">Deskripsi</h4>
          <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed pl-1 list-none">
            {product.description.map((item, index) => (
              <li key={index} className="flex gap-2 items-start">
                <span className="text-brand font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating Bottom Button */}
      <div className="absolute bottom-0 inset-x-0 p-4 bg-white border-t border-slate-100 z-20 shrink-0">
        <button
          onClick={handleOrder}
          className="w-full py-3.5 bg-brand text-white font-bold rounded-2xl hover:bg-brand-dark transition-all duration-300 shadow-md shadow-brand/20 cursor-pointer text-sm"
        >
          Pesan Sekarang
        </button>
      </div>
    </div>
  );
}
