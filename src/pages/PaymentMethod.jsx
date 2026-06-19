import React, { useState } from 'react';
import CheckoutLayout, { checkoutPrimaryBtn } from '../components/CheckoutLayout';
import { paymentMethods } from '../data/products';
import { formatPrice } from '../utils/formatter';

export default function PaymentMethod({ 
  product, 
  selectedSize, 
  selectedDuration, 
  price, 
  onBack, 
  onConfirmPayment 
}) {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const serviceFee = 500;
  const totalPrice = price + serviceFee;

  const getOrderDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const handlePayment = () => {
    onConfirmPayment(selectedMethod, serviceFee, totalPrice);
  };

  return (
    <CheckoutLayout
      title="Metode Pembayaran"
      onBack={onBack}
      step={2}
      footer={
        <>
          <div className="space-y-2 mb-4 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Harga</span>
              <span className="font-semibold text-slate-700">{formatPrice(price, true)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Biaya Layanan</span>
              <span className="font-semibold text-slate-700">{formatPrice(serviceFee)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-800 text-sm">Total</span>
              <span className="font-extrabold text-brand text-base">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className={checkoutPrimaryBtn}
          >
            Lanjutkan
          </button>
        </>
      }
    >
      <div className="mb-6">
        <h3 className="font-bold text-slate-800 text-sm mb-3">
          Ringkasan Paket
        </h3>
        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Paket Terpilih</span>
            <span className="font-semibold text-slate-700">{product.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Data Tersedia</span>
            <span className="font-semibold text-slate-700">{selectedSize.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Tanggal Pesanan</span>
            <span className="font-semibold text-slate-700">{getOrderDate()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Jumlah</span>
            <span className="font-semibold text-slate-700">1</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold text-slate-800 text-sm mb-1">
          Pilih Metode Pembayaran
        </h3>

        {paymentMethods.map((method) => {
          const isSelected = selectedMethod.id === method.id;
          return (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method)}
              className={`w-full bg-white rounded-xl p-4 border flex items-center justify-between transition-all duration-300 cursor-pointer text-left ${
                isSelected 
                  ? 'border-brand ring-2 ring-brand/10' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl overflow-hidden p-1 shrink-0">
                  {typeof method.icon === 'string' && method.icon.includes('http') ? (
                    // Jika berupa URL link gambar, render tag <img>
                    <img 
                      src={method.icon} 
                      alt={method.name} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback jika gambar gagal dimuat
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    // Jika berupa emoji (Saldo), render komponen teks biasa
                    <span className="text-lg">{method.icon}</span>
                  )}
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                    {method.name}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-4 ml-auto">
                <p className="text-[11px] font-medium text-slate-500 text-right">
                  {method.details}
                </p>

                {/* Lingkaran Radio Button */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'border-brand' : 'border-slate-300'
                }`}>
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-brand" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </CheckoutLayout>
  );
}
