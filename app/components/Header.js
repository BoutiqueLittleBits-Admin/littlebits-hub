"use client";
import { useState } from 'react';
import { useCart } from './CartContext';
import CartDropdown from './CartDropdown';

export default function Header() {
  const { cartCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-emerald-700">
          ✨ Boutique Little Bits
        </a>
        
        <nav className="hidden md:flex gap-6 text-emerald-600 font-medium">
          <a href="/" className="hover:text-rose-500 transition-colors">Home</a>
          <a href="/shop" className="hover:text-rose-500 transition-colors">Shop</a>
          <a href="/about" className="hover:text-rose-500 transition-colors">About</a>
          <a href="/contact" className="hover:text-rose-500 transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setCartOpen(!cartOpen)}
              className="bg-emerald-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-rose-500 transition-colors"
            >
              🛒 Cart ({cartCount})
            </button>
            <CartDropdown isOpen={cartOpen} onClose={() => setCartOpen(false)} />
          </div>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-emerald-700"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
          <div className="flex flex-col gap-4 text-emerald-600 font-medium">
            <a href="/" className="hover:text-rose-500 transition-colors py-2">Home</a>
            <a href="/shop" className="hover:text-rose-500 transition-colors py-2">Shop</a>
            <a href="/about" className="hover:text-rose-500 transition-colors py-2">About</a>
            <a href="/contact" className="hover:text-rose-500 transition-colors py-2">Contact</a>
          </div>
        </nav>
      )}
    </header>
  );
}
