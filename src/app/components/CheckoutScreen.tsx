import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { CartItem } from '../types';
import { toast } from 'sonner';

interface CheckoutScreenProps {
  cartItems: CartItem[];
  onBack: () => void;
  onPlaceOrder: (orderDetails: any) => void;
  userEmail: string;
}

export function CheckoutScreen({ cartItems, onBack, onPlaceOrder, userEmail }: CheckoutScreenProps) {
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  // Shipping form
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    email: userEmail,
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  // Payment form
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  const [errors, setErrors] = useState<any>({});

  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const validateShipping = () => {
    const newErrors: any = {};

    if (!shippingForm.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!shippingForm.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(shippingForm.email)) newErrors.email = 'Invalid email';
    if (!shippingForm.phone.trim()) newErrors.phone = 'Phone is required';
    if (!shippingForm.address.trim()) newErrors.address = 'Address is required';
    if (!shippingForm.city.trim()) newErrors.city = 'City is required';
    if (!shippingForm.state.trim()) newErrors.state = 'State is required';
    if (!shippingForm.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: any = {};

    if (!paymentForm.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    else if (paymentForm.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Invalid card number';
    }
    if (!paymentForm.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!paymentForm.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!paymentForm.cvv.trim()) newErrors.cvv = 'CVV is required';
    else if (paymentForm.cvv.length !== 3) newErrors.cvv = 'Invalid CVV';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep('payment');
      toast.success('Shipping details saved');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePayment()) {
      toast.error('Please fill in all payment details');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderDetails = {
        shippingAddress: `${shippingForm.address}, ${shippingForm.city}, ${shippingForm.state} ${shippingForm.zipCode}`,
        paymentMethod: `**** **** **** ${paymentForm.cardNumber.slice(-4)}`,
        total
      };

      onPlaceOrder(orderDetails);
      setIsProcessing(false);
      setStep('success');
      toast.success('Order placed successfully!');
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-20 h-20 mx-auto mb-6" style={{ color: '#10b981' }} />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Order Total</p>
            <p className="text-3xl font-bold" style={{ color: '#375201' }}>
              ${total.toFixed(2)}
            </p>
          </div>
          <p className="text-sm text-gray-600 mb-8">
            A confirmation email has been sent to {shippingForm.email}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 text-white rounded-lg font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#375201' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 hover:underline"
          style={{ color: '#375201' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Cart
        </button>

        <h1 className="text-3xl font-bold mb-8" style={{ color: '#375201' }}>
          Checkout
        </h1>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: '#375201' }}
            >
              1
            </div>
            <span className="font-medium" style={{ color: '#375201' }}>
              Shipping
            </span>
          </div>
          <div className="w-20 h-1 bg-gray-300">
            <div 
              className="h-full transition-all"
              style={{ 
                width: step === 'payment' ? '100%' : '0%',
                backgroundColor: '#375201'
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step === 'payment' ? 'text-white' : 'text-gray-400'
              }`}
              style={{ backgroundColor: step === 'payment' ? '#375201' : '#e5e7eb' }}
            >
              2
            </div>
            <span className={`font-medium ${step === 'payment' ? '' : 'text-gray-400'}`}
              style={{ color: step === 'payment' ? '#375201' : undefined }}
            >
              Payment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 'shipping' ? (
              <form onSubmit={handleShippingSubmit} className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-xl font-bold mb-6" style={{ color: '#375201' }}>
                  Shipping Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={shippingForm.fullName}
                      onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                      style={{ color: '#000000' }}
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        style={{ color: '#000000' }}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        style={{ color: '#000000' }}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                      style={{ color: '#000000' }}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        style={{ color: '#000000' }}
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.state}
                        onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        style={{ color: '#000000' }}
                      />
                      {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={shippingForm.zipCode}
                        onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        style={{ color: '#000000' }}
                      />
                      {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={shippingForm.country}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3 text-white rounded-lg font-medium transition-all hover:opacity-90"
                  style={{ backgroundColor: '#375201' }}
                >
                  Continue to Payment
                </button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-6 h-6" style={{ color: '#375201' }} />
                  <h2 className="text-xl font-bold" style={{ color: '#375201' }}>
                    Payment Information
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={19}
                        value={paymentForm.cardNumber}
                        onChange={(e) => setPaymentForm({
                          ...paymentForm,
                          cardNumber: formatCardNumber(e.target.value)
                        })}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        style={{ color: '#000000' }}
                      />
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      value={paymentForm.cardName}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                      style={{ color: '#000000' }}
                    />
                    {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={paymentForm.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          setPaymentForm({ ...paymentForm, expiryDate: value });
                        }}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        style={{ color: '#000000' }}
                      />
                      {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        maxLength={3}
                        value={paymentForm.cvv}
                        onChange={(e) => setPaymentForm({
                          ...paymentForm,
                          cvv: e.target.value.replace(/\D/g, '')
                        })}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        style={{ color: '#000000' }}
                      />
                      {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={paymentForm.saveCard}
                      onChange={(e) => setPaymentForm({ ...paymentForm, saveCard: e.target.checked })}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#375201' }}
                    />
                    <span className="text-sm text-gray-700">Save card for future purchases</span>
                  </label>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="flex-1 py-3 border-2 rounded-lg font-medium transition-all hover:bg-gray-50"
                    style={{ borderColor: '#375201', color: '#375201' }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 py-3 text-white rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: '#375201' }}
                  >
                    {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                  </button>
                </div>

                <p className="mt-4 text-xs text-gray-500 text-center">
                  Your payment information is encrypted and secure
                </p>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#375201' }}>
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold" style={{ color: '#375201' }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold" style={{ color: '#375201' }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
