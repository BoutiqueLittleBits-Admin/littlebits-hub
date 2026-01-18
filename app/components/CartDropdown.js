"use client";
import { useState } from 'react';
import { useCart } from './CartContext';

export default function CartDropdown({ isOpen, onClose }) {
  const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });
      
      const { url, error } = await response.json();
      
      if (error) {
        alert('Checkout error: ' + error);
        setLoading(false);
        return;
      }
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-bold text-brand-sage">Your Cart</h3>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Your cart is empty
        </div>
      ) : (
        <>
          <div className="max-h-64 overflow-y-auto">
            {cartItems.map((item, i) => (
              <div key={i} className="p-4 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{item.name}</p>
                    <p className="text-sm text-brand-coral">${item.price}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(i)}
                  className="text-gray-400 hover:text-brand-coral transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 rounded-b-xl">
            <div className="flex justify-between mb-4">
              <span className="font-semibold text-gray-700">Total:</span>
              <span className="font-bold text-brand-sage">${cartTotal}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-brand-coral text-white py-2 rounded-lg font-semibold hover:bg-brand-sage transition-colors mb-2 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Checkout'}
            </button>
            <button 
              onClick={clearCart}
              className="w-full text-gray-500 py-1 text-sm hover:text-brand-coral transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
