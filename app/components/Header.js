"use client";
import { useState } from 'react';
import { useCart } from './CartContext';

export default function Header() {
  const { cart = [], cartCount, cartTotal, removeFromCart, isLoaded } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const freeShippingThreshold = 50;
  const amountToFreeShipping = freeShippingThreshold - cartTotal;
  const qualifiesForFreeShipping = cartTotal >= freeShippingThreshold;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-brand-sage">
          ✨ Boutique Little Bits
        </a>
        
        <nav className="hidden md:flex gap-6 text-brand-sage font-medium">
          <a href="/" className="hover:text-brand-coral transition-colors">Home</a>
          <a href="/shop" className="hover:text-brand-coral transition-colors">Shop</a>
          <a href="/stores" className="hover:text-brand-coral transition-colors">Our Stores</a>
          <a href="/about" className="hover:text-brand-coral transition-colors">About</a>
          <a href="/contact" className="hover:text-brand-coral transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          {/* Cart with hover dropdown */}
          <div className="relative group">
            <a 
              href="/cart"
              className="bg-brand-sage text-white px-4 py-2 rounded-full font-semibold hover:bg-brand-coral transition-colors inline-block"
            >
              🛒 Cart ({cartCount})
            </a>
            
            {/* Hover dropdown */}
            <div className="absolute right-0 top-full pt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Free shipping progress */}
                {isLoaded && cartCount > 0 && (
                  <div className="p-4 bg-brand-mint/10 border-b border-gray-100">
                    {qualifiesForFreeShipping ? (
                      <p className="text-green-700 font-semibold text-sm flex items-center gap-2">
                        🎉 You qualify for FREE shipping!
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-brand-sage mb-2">
                          Add <strong>${amountToFreeShipping.toFixed(2)}</strong> more for FREE shipping!
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-brand-coral rounded-full h-2 transition-all"
                            style={{ width: `${Math.min((cartTotal / freeShippingThreshold) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Cart items */}
                {!isLoaded ? (
                  <div className="p-6 text-center text-gray-500">Loading...</div>
                ) : cartCount === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <a 
                      href="/shop" 
                      className="inline-block bg-brand-sage text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-coral transition-colors text-sm"
                    >
                      Start Shopping
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="max-h-64 overflow-y-auto">
                      {cart.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 border-b border-gray-50 last:border-b-0">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="text-sm font-medium text-brand-sage truncate">{item.name}</h4>
                            <p className="text-sm text-brand-coral font-bold">${item.price} × {item.quantity || 1}</p>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              removeFromCart(item.slug);
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {cart.length > 3 && (
                        <p className="text-center text-sm text-gray-500 py-2">
                          +{cart.length - 3} more item{cart.length - 3 > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                    
                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                      <div className="flex justify-between mb-3">
                        <span className="font-semibold text-brand-sage">Subtotal:</span>
                        <span className="font-bold text-brand-coral">${cartTotal.toFixed(2)}</span>
                      </div>
                      <a 
                        href="/cart" 
                        className="block w-full bg-brand-coral text-white py-3 rounded-lg font-semibold text-center hover:bg-brand-sage transition-colors"
                      >
                        View Cart & Checkout
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-brand-sage"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
          <div className="flex flex-col gap-4 text-brand-sage font-medium">
            <a href="/" className="hover:text-brand-coral transition-colors py-2">Home</a>
            <a href="/shop" className="hover:text-brand-coral transition-colors py-2">Shop</a>
            <a href="/stores" className="hover:text-brand-coral transition-colors py-2">Our Stores</a>
            <a href="/about" className="hover:text-brand-coral transition-colors py-2">About</a>
            <a href="/contact" className="hover:text-brand-coral transition-colors py-2">Contact</a>
          </div>
        </nav>
      )}
    </header>
  );
}
