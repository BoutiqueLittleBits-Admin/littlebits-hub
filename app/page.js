"use client";

import React from 'react';
import { useCart } from './layout';

export default function HomePage() {
  const { addToCart } = useCart();

  const featuredItems = [
    { emoji: "🌈", name: "Rainbow Heart Sticker Pack", price: "12.99", color: "from-[#E8A3B3] to-[#E9C36A]" },
    { emoji: "🎁", name: "Surprise Gift Box", price: "24.99", color: "from-[#5C7F9B] to-[#8FAE9A]" },
    { emoji: "💝", name: "Nostalgic Charm Set", price: "18.50", color: "from-[#D7746B] to-[#E8A3B3]" }
  ];

  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-5xl font-bold text-[#5F7F73] mb-4">Creating moments of joy</h1>
        <p className="text-xl text-[#8FAE9A] mb-8">
          Curated, colorful surprises and seeds of nostalgia for the fun aunties, thoughtful gifters, and everyone in between.
        </p>
        <button className="bg-[#D7746B] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#5F7F73] hover:-translate-y-1 transition-all shadow-lg">
          Shop the Collection
        </button>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl text-center font-bold text-[#5F7F73] mb-12">Featured Finds</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-[#E5E5E5]">
              <div className={`h-64 bg-gradient-to-br ${item.color} flex items-center justify-center text-7xl`}>
                {item.emoji}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#5F7F73] mb-2">{item.name}</h3>
                <p className="text-xl font-bold text-[#D7746B] mb-4">${item.price}</p>
                <button 
                  onClick={addToCart}
                  className="w-full bg-[#5F7F73] text-white py-2 rounded-lg font-semibold hover:bg-[#D7746B] transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
