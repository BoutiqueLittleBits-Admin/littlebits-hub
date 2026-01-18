"use client";
import { useCart } from './components/CartContext';

export default function HomePage() {
  const { addToCart } = useCart();

  const featuredItems = [
    { emoji: "🌈", name: "Rainbow Heart Sticker Pack", price: "12.99", color: "from-pink-300 to-yellow-300" },
    { emoji: "🎁", name: "Surprise Gift Box", price: "24.99", color: "from-blue-400 to-green-300" },
    { emoji: "💝", name: "Nostalgic Charm Set", price: "18.50", color: "from-red-400 to-pink-300" }
  ];

  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-5xl font-bold text-emerald-700 mb-4">
          Creating moments of joy
        </h1>
        <p className="text-xl text-emerald-600 mb-8">
          Curated, colorful surprises and seeds of nostalgia for the fun aunties, thoughtful gifters, and everyone in between.
        </p>
        <a href="/shop" className="inline-block bg-rose-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg">
          Shop the Collection
        </a>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl text-center font-bold text-emerald-700 mb-12">
          Featured Finds
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200">
              <div className={`h-64 bg-gradient-to-br ${item.color} flex items-center justify-center text-7xl`}>
                {item.emoji}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-emerald-700 mb-2">{item.name}</h3>
                <p className="text-xl font-bold text-rose-500 mb-4">${item.price}</p>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full bg-emerald-700 text-white py-2 rounded-lg font-semibold hover:bg-rose-500 transition-colors"
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
