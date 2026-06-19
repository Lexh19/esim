import React, { useState } from 'react';
import MobileFrame from './components/MobileFrame';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import OrderForm from './pages/OrderForm';
import PaymentMethod from './pages/PaymentMethod';
import Invoice from './pages/Invoice';

function App() {
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [price, setPrice] = useState(0);
  const [serviceFee, setServiceFee] = useState(500);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  
  // Cache user details to simulate profile retention
  const [customerDetails, setCustomerDetails] = useState({
    name: 'Iqbaal', 
    email: 'Iqbaalhzd@gmail.com',
    phone: '082130333634'
  });

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setPage('detail');
  };

  const handleOrderNow = (product, size, duration, calculatedPrice) => {
    setSelectedSize(size);
    setSelectedDuration(duration);
    setPrice(calculatedPrice);
    setPage('order');
  };

  const handleNextToPayment = (details) => {
    setCustomerDetails(details);
    setPage('payment');
  };

  const handleConfirmPayment = (method, fee, total) => {
    setPaymentMethod(method);
    setServiceFee(fee);
    setTotalPrice(total);
    setPage('invoice');
  };

  const handleFinished = () => {
    // Reset selections and return home
    setSelectedProduct(null);
    setSelectedSize(null);
    setSelectedDuration(null);
    setPrice(0);
    setTotalPrice(0);
    setPaymentMethod(null);
    setPage('home');
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <ProductList onSelectProduct={handleSelectProduct} />;
      case 'detail':
        return (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setPage('home')} 
            onOrderNow={handleOrderNow} 
          />
        );
      case 'order':
        return (
          <OrderForm
            product={selectedProduct}
            selectedSize={selectedSize}
            selectedDuration={selectedDuration}
            price={price}
            customerDetails={customerDetails}
            onBack={() => setPage('detail')}
            onNext={handleNextToPayment}
          />
        );
      case 'payment':
        return (
          <PaymentMethod
            product={selectedProduct}
            selectedSize={selectedSize}
            selectedDuration={selectedDuration}
            price={price}
            onBack={() => setPage('order')}
            onConfirmPayment={handleConfirmPayment}
          />
        );
      case 'invoice':
        return (
          <Invoice
            product={selectedProduct}
            selectedSize={selectedSize}
            selectedDuration={selectedDuration}
            price={price}
            serviceFee={serviceFee}
            totalPrice={totalPrice}
            customerDetails={customerDetails}
            paymentMethod={paymentMethod}
            onFinished={handleFinished}
          />
        );
      default:
        return <ProductList onSelectProduct={handleSelectProduct} />;
    }
  };

  return (
    <MobileFrame>
      {/* Container with key to trigger animation on page navigation */}
      <div key={page} className="flex-1 flex flex-col min-h-0 h-full w-full overflow-hidden">
        {renderPage()}
      </div>
    </MobileFrame>
  );
}

export default App;
