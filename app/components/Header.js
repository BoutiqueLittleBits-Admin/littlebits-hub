"use client";
import { useState } from 'react';
import { useCart } from './CartContext';
import CartDropdown from './CartDropdown';

export default function Header() {
  const { cartCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  return (
    <>
      {/* Overlay to close cart when clicking outside */}
      {cartOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeCart}
        />
      )}
      
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
            <div className="relative">
              <button 
                onClick={toggleCart}
                className="bg-brand-sage text-white px-4 py-2 rounded-full font-semibold hover:bg-brand-coral transition-colors relative z-50"
              >
                🛒 Cart ({cartCount})
              </button>
              {cartOpen && <CartDropdown />}
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
    </>
  );
}
