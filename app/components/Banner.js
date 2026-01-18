"use client";
import { useState } from 'react';

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-brand-coral text-white text-center py-2 px-4 relative">
      <p className="text-sm font-medium">
        ✨ Free shipping on orders over $50! ✨
      </p>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
      >
        ✕
      </button>
    </div>
  );
}
