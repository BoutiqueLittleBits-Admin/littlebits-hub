"use client";
import { useState } from 'react';
import { useCart } from '../components/CartContext';

export default function CartPage() {
  const { cart = [], removeFromCart, updateQuantity, clearCart, isLoaded } = useCart();
  const [zipCode, setZipCode] = useState('');
  const [shippingRates, setShippingRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);
  const [loadingRates, setLoadingRates] = useState(false);
  const [error, setError] = useState('');

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">✨</div>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0);
  const freeShippingThreshold = 50;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;

  // Auto-detect shipping profile based on cart items
  // If ANY item requires large-box, use large-box
  const getShippingProfile = () => {
    const hasLargeItem = cart.some(item => item.shippingProfile === 'large-box');
    return hasLargeItem ? 'large-box' : 'small-envelope';
  };

  const calculateShipping = async () => {
    if (zipCode.length !== 5) {
      setError('Please enter a valid 5-digit zip code');
      return;
    }

    setLoadingRates(true);
    setError('');
    setShippingRates([]);
    setSelectedRate(null);

    const packageType = getShippingProfile();

    try {
      const response = await fetch('/api/shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zipCode, packageType }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setShippingRates(data.rates);
        if (data.rates.length > 0) {
          setSelectedRate(data.rates[0]);
        }
      }
    } catch (err) {
      setError('Failed to calculate shipping. Please try again.');
    }

    setLoadingRates(false);
  };

  const handleCheckout = async () => {
    if (!qualifiesForFreeShipping && !selectedRate) {
      setError('Please calculate shipping first');
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          shippingRate: qualifiesForFreeShipping ? null : selectedRate,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Checkout failed. Please try again.');
      }
    } catch (err) {
      setError('Checkout failed. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <section className="max-w-4xl mx-auto py-20 px-6 text-center">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-4xl font-bold text-brand-sage mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Looks like you have not added anything yet!</p>
          <a 
            href="/shop" 
            className="inline-block bg-brand-sage text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-coral transition-colors"
          >
            Start Shopping ✨
          </a>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold text-brand-sage mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {cart.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-6 border-b border-gray-100 last:border-b-0">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-brand-sage">{item.name}</h3>
                    <p className="text-brand-coral font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.slug, Math.max(1, (item.quantity || 1) - 1))}
                      className="w-8 h-8 rounded-full bg-gray-100 text-brand-sage hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity || 1}</span>
                    <button 
                      onClick={() => updateQuantity(item.slug, (item.quantity || 1) + 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 text-brand-sage hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.slug)}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-brand-sage mb-6">Order Summary</h2>

              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              {!qualifiesForFreeShipping && (
                <div className="mb-6 p-4 bg-brand-mint/10 rounded-xl">
                  <p className="text-sm text-brand-sage mb-2">
                    Add <strong>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more for FREE shipping!
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-brand-coral rounded-full h-2 transition-all"
                      style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {qualifiesForFreeShipping ? (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-700 font-semibold flex items-center gap-2">
                    🎉 You qualify for FREE shipping!
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-brand-sage mb-2">
                      Shipping Zip Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                        placeholder="Enter zip code"
                        className="flex-grow px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-sage focus:ring-2 focus:ring-brand-mint/50 outline-none"
                      />
                      <button
                        onClick={calculateShipping}
                        disabled={loadingRates || zipCode.length !== 5}
                        className="px-4 py-3 bg-brand-sage text-white rounded-lg font-semibold hover:bg-brand-coral transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loadingRates ? '...' : 'Calculate'}
                      </button>
                    </div>
                  </div>

                  {shippingRates.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-brand-sage mb-2">
                        Shipping Method
                      </label>
                      <div className="space-y-2">
                        {shippingRates.map((rate) => (
                          <label
                            key={rate.id}
                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                              selectedRate?.id === rate.id
                                ? 'border-brand-sage bg-brand-mint/10'
                                : 'border-gray-200 hover:border-brand-mint'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="shipping"
                                checked={selectedRate?.id === rate.id}
                                onChange={() => setSelectedRate(rate)}
                                className="text-brand-sage"
                              />
                              <div>
                                <p className="font-medium text-brand-sage">{rate.service}</p>
                                <p className="text-xs text-gray-500">{rate.estimatedDays} business days</p>
                              </div>
                            </div>
                            <span className="font-bold text-brand-coral">${rate.price.toFixed(2)}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {qualifiesForFreeShipping 
                    ? <span className="text-green-600">FREE</span>
                    : selectedRate 
                      ? `$${selectedRate.price.toFixed(2)}`
                      : '—'
                  }
                </span>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-brand-sage">Total</span>
                <span className="text-lg font-bold text-brand-coral">
                  ${(subtotal + (qualifiesForFreeShipping ? 0 : (selectedRate?.price || 0))).toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!qualifiesForFreeShipping && !selectedRate}
                className="w-full bg-brand-coral text-white py-4 rounded-full font-bold text-lg hover:bg-brand-sage transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
