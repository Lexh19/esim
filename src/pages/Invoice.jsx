import React, { useState } from 'react';
import CheckoutLayout, { checkoutPrimaryBtn } from '../components/CheckoutLayout';
import { formatPrice } from '../utils/formatter';

export default function Invoice({ 
  product, 
  selectedSize, 
  selectedDuration, 
  price, 
  serviceFee, 
  totalPrice, 
  customerDetails, 
  paymentMethod, 
  onFinished 
}) {
  const [copied, setCopied] = useState(false);

  const [invoiceId] = useState(() => `INV-${Math.floor(10000000000 + Math.random() * 90000000000)}`);
  const [refNo] = useState(() => Math.floor(100000000000000 + Math.random() * 900000000000000).toString());
  
  const [txDate] = useState(() => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const today = new Date();
    return `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
  });

  const [txTime] = useState(() => {
    const today = new Date();
    const hh = String(today.getHours()).padStart(2, '0');
    const mm = String(today.getMinutes()).padStart(2, '0');
    const ss = String(today.getSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss} WIB`;
  });

  const maskPhone = (phone) => {
    const cleanPhone = phone.replace(/[\s-+]/g, '');
    if (cleanPhone.length <= 4) return '****' + cleanPhone;
    return '*'.repeat(cleanPhone.length - 4) + cleanPhone.slice(-4);
  };

  const maskEmail = (email) => {
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    const local = parts[0];
    const domain = parts[1];
    if (local.length <= 3) return '***@' + domain;
    
    const maskCount = Math.ceil(local.length * 0.6);
    return '*'.repeat(maskCount) + local.slice(maskCount) + '@' + domain;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(invoiceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CheckoutLayout
      title="Invoice"
      onBack={onFinished}
      step={3}
      footer={
        <button
          onClick={onFinished}
          className={checkoutPrimaryBtn}
        >
          Selesai
        </button>
      }
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-4">
          <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h2 className="text-2xl font-extrabold text-brand tracking-tight">
          {formatPrice(totalPrice)}
        </h2>

        <div className="flex items-center gap-1.5 mt-1 relative">
          <span className="text-xs text-slate-500 font-medium">No. {invoiceId}</span>
          <button 
            onClick={handleCopy}
            className="p-1 hover:bg-slate-50 active:bg-slate-100 rounded-md transition-colors cursor-pointer text-brand"
            title="Copy Invoice ID"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
            </svg>
          </button>

          {copied && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] font-bold py-1 px-2 rounded-md shadow-xs animate-fade-in pointer-events-none">
              Copied!
            </span>
          )}
        </div>

        <div className="w-full border-t border-dashed border-slate-200 my-5" />

        <div className="w-full space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Status</span>
            <span className="bg-emerald-50 text-emerald-600 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
              Berhasil
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">No. Ref</span>
            <span className="font-semibold text-slate-700 select-all">{refNo}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Tgl Transaksi</span>
            <span className="font-semibold text-slate-700">{txDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Waktu Transaksi</span>
            <span className="font-semibold text-slate-700">{txTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-medium">Metode pembayaran</span>
            <span className="font-semibold text-slate-700">{paymentMethod.name}</span>
          </div>
        </div>

        <div className="w-full border-t border-dashed border-slate-200 my-5" />

        <div className="w-full space-y-3">
          <h3 className="font-bold text-slate-800 text-xs">Detail Transaksi</h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Produk</span>
              <span className="font-semibold text-slate-700">{product.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Data Tersedia</span>
              <span className="font-semibold text-slate-700">{selectedSize.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Jumlah</span>
              <span className="font-semibold text-slate-700">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Nama Pelanggan</span>
              <span className="font-semibold text-slate-700">{customerDetails.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Nomor Whatsapp</span>
              <span className="font-semibold text-slate-700">{maskPhone(customerDetails.phone)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Email</span>
              <span className="font-semibold text-slate-700">{maskEmail(customerDetails.email)}</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-3 leading-relaxed">
            Kami akan segera mengirimkan kode QR eSIM ke email Anda. Cek inbox (atau folder spam) ya!
          </p>
        </div>

        <div className="w-full border-t border-dashed border-slate-200 my-5" />

        <div className="w-full space-y-3 text-xs">
          <h3 className="font-bold text-slate-800 text-xs">Detail Pembayaran</h3>
          <div className="flex justify-between">
            <span className="text-slate-400">Harga</span>
            <span className="font-semibold text-slate-700">{formatPrice(price, true)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Biaya Transaksi</span>
            <span className="font-semibold text-slate-700">{formatPrice(serviceFee, true)}</span>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
}
