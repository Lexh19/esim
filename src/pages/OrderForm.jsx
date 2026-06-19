import React, { useState } from 'react';
import CheckoutLayout, { checkoutPrimaryBtn } from '../components/CheckoutLayout';

export default function OrderForm({ 
  product, 
  selectedSize, 
  selectedDuration, 
  price, 
  customerDetails, 
  onBack, 
  onNext 
}) {
  const [name, setName] = useState(customerDetails.name || '');
  const [email, setEmail] = useState(customerDetails.email || '');
  const [phone, setPhone] = useState(customerDetails.phone || '');
  
  const [errors, setErrors] = useState({});

  const getOrderDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!name.trim()) {
      tempErrors.name = 'Nama lengkap wajib diisi';
    }
    
    if (!email.trim()) {
      tempErrors.email = 'Alamat email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Format email tidak valid';
    }
    
    if (!phone.trim()) {
      tempErrors.phone = 'Nomor Whatsapp wajib diisi';
    } else if (!/^\d{9,15}$/.test(phone.replace(/[\s-+]/g, ''))) {
      tempErrors.phone = 'Nomor Whatsapp tidak valid (9-15 digit)';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({ name, email, phone });
    }
  };

  return (
    <CheckoutLayout
      title="Detail Pemesan"
      onBack={onBack}
      step={1}
      footer={
        <button
          type="submit"
          form="order-form"
          className={checkoutPrimaryBtn}
        >
          Lanjutkan
        </button>
      }
    >
      <form id="order-form" onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="font-bold text-slate-800 text-sm mb-3">
            Ringkasan Paket
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Paket Terpilih</span>
              <span className="font-semibold text-slate-400">{product.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Data Tersedia</span>
              <span className="font-semibold text-slate-400">{selectedSize.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tanggal Pesanan</span>
              <span className="font-semibold text-slate-400">{getOrderDate()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Jumlah</span>
              <span className="font-semibold text-slate-400">1</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-slate-800 text-sm mb-4">
            Data Pelanggan
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nama
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                }}
                placeholder="Masukkan Nama Pelanggan"
                className={`w-full px-4 py-3 bg-white text-slate-800 placeholder-slate-400 rounded-xl border outline-none text-xs transition-all ${
                  errors.name 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-slate-200 focus:border-brand'
                }`}
              />
              {errors.name && (
                <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Alamat Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                }}
                placeholder="Masukkan Email Pelanggan"
                className={`w-full px-4 py-3 bg-white text-slate-800 placeholder-slate-400 rounded-xl border outline-none text-xs transition-all ${
                  errors.email 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-slate-200 focus:border-brand'
                }`}
              />
              {errors.email && (
                <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nomor Whatsapp
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
                }}
                placeholder="Masukkan Nomor HP Pelanggan"
                className={`w-full px-4 py-3 bg-white text-slate-800 placeholder-slate-400 rounded-xl border outline-none text-xs transition-all ${
                  errors.phone 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-slate-200 focus:border-brand'
                }`}
              />
              {errors.phone && (
                <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.phone}</p>
              )}
              <p className="text-[12px] text-slate-700 mt-2">
                Jika terjadi kendala, kami akan menghubungi ke nomor ini
              </p>
            </div>
          </div>
        </div>
      </form>
    </CheckoutLayout>
  );
}
