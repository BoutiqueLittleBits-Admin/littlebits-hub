"use client";
import { useCart } from '../components/CartContext';

export default function ShopPage() {
  const { addToCart } = useCart();

  const products = [
    { emoji: "🌈", name: "Rainbow Heart Sticker Pack", price: "12.99", color: "from-pink-300 to-yellow-300", category: "Stickers" },
    { emoji: "🎁", name: "Surprise Gift Box", price: "24.99", color: "from-blue-400 to-green-300", category: "Gift Boxes" },
    { emoji: "💝", name: "Nostalgic Charm Set", price: "18.50", color: "from-red-400 to-pink-300", category: "Accessories" },
    { emoji: "🦋", name: "Butterfly Dreams Journal", price: "16.99", color: "from-purple-300 to-pink-300", category: "Stationery" },
    { emoji: "🌸", name: "Cherry Blossom Washi Tape", price: "8.99", color: "from-pink-200 to-rose-300", category: "Stickers" },
    { emoji: "⭐", name: "Starlight Earring Set", price: "22.00", color: "from-yellow-300 to-orange-300", category: "Accessories" },
    { emoji: "🍬", name: "Candy Shop Mini Prints", price: "14.50", color: "from-cyan-300 to-blue-300", category: "Art" },
    { emoji: "🎀", name: "Velvet Bow Hair Clips", price: "11.99", color: "from-rose-400 to-pink-400", category: "Accessories" },
    { emoji: "🌻", name: "Sunflower Seed Paper Cards", price: "9.99", color: "from-yellow-400 to-amber-300", category: "Stationery" },
    { emoji: "🧸", name: "Cozy Comfort Mystery Bag", price: "29.99", color: "from-amber-200 to-orange-200", category: "Gift Boxes" },
    { emoji: "💫", name: "Wish Upon a Star Necklace", price: "19.99", color: "from-indigo-300 to-purple-300", category: "Accessories" },
    { emoji: "🎨", name: "Watercolor Palette Pins", price: "13.50", color: "from-teal-300 to-emerald-300", category: "Accessories" },
  ];

  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-5xl font-bold text-emerald-700 mb-4 text-center">
          Shop All
        </h1>
        <p className="text-xl text-emerald-600 mb-12 text-center">
          Curated finds to spark joy ✨
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 group">
              <div className={`h-48 bg-gradient-to-br ${item.color} flex items-center justify-center text-6xl group-hover:scale-105 transition-transform`}>
                {item.emoji}
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <h3 className="text-md font-semibold text-emerald-700 mt-2 mb-1">{item.name}</h3>
                <p className="text-lg font-bold text-rose-500 mb-3">${item.price}</p>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full bg-emerald-700 text-white py-2 rounded-lg font-semibold hover:bg-rose-500 transition-colors text-sm"
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
