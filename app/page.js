"use client";
import { useState } from 'react';
import { useCart } from './components/CartContext';
import Toast from './components/Toast';

export default function HomePage() {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (item) => {
    addToCart(item);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const featuredItems = [
    { slug: "rainbow-heart-sticker-pack", emoji: "🌈", name: "Rainbow Heart Sticker Pack", price: "12.99", color: "from-brand-blush to-brand-gold" },
    { slug: "surprise-gift-box", emoji: "🎁", name: "Surprise Gift Box", price: "24.99", color: "from-brand-slate to-brand-mint" },
    { slug: "nostalgic-charm-set", emoji: "💝", name: "Nostalgic Charm Set", price: "18.50", color: "from-brand-coral to-brand-blush" }
  ];

  return (
    <div className="min-h-screen">
      <Toast message="Added to cart!" isVisible={showToast} />
      
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-5xl font-bold text-brand-sage mb-4">
          Creating moments of joy
        </h1>
        <p className="text-xl text-brand-mint mb-8">
          Curated, colorful surprises and seeds of nostalgia for the fun aunties, thoughtful gifters, and everyone in between.
        </p>
        <a href="/shop" className="inline-block bg-brand-coral text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-sage transition-all shadow-lg">
          Shop the Collection
        </a>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl text-center font-bold text-brand-sage mb-12">
          Featured Finds
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 group">
              <a href={`/shop/${item.slug}`}>
                <div className={`h-64 bg-gradient-to-br ${item.color} flex items-center justify-center text-7xl group-hover:scale-105 transition-transform`}>
                  {item.emoji}
                </div>
              </a>
              <div className="p-6">
                <a href={`/shop/${item.slug}`}>
                  <h3 className="text-lg font-semibold text-brand-sage mb-2 hover:text-brand-coral transition-colors">{item.name}</h3>
                </a>
                <p className="text-xl font-bold text-brand-coral mb-4">${item.price}</p>
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-brand-sage text-white py-2 rounded-lg font-semibold hover:bg-brand-coral transition-colors"
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
