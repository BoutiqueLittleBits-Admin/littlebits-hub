"use client";
import { useCart } from '../components/CartContext';

export default function ShopPage() {
  const { addToCart } = useCart();

  const products = [
    { emoji: "🌈", name: "Rainbow Heart Sticker Pack", price: "12.99", color: "from-brand-blush to-brand-gold", category: "Stickers" },
    { emoji: "🎁", name: "Surprise Gift Box", price: "24.99", color: "from-brand-slate to-brand-mint", category: "Gift Boxes" },
    { emoji: "💝", name: "Nostalgic Charm Set", price: "18.50", color: "from-brand-coral to-brand-blush", category: "Accessories" },
    { emoji: "🦋", name: "Butterfly Dreams Journal", price: "16.99", color: "from-purple-300 to-brand-blush", category: "Stationery" },
    { emoji: "🌸", name: "Cherry Blossom Washi Tape", price: "8.99", color: "from-brand-blush to-brand-coral", category: "Stickers" },
    { emoji: "⭐", name: "Starlight Earring Set", price: "22.00", color: "from-brand-gold to-orange-300", category: "Accessories" },
    { emoji: "🍬", name: "Candy Shop Mini Prints", price: "14.50", color: "from-cyan-300 to-brand-slate", category: "Art" },
    { emoji: "🎀", name: "Velvet Bow Hair Clips", price: "11.99", color: "from-brand-coral to-brand-blush", category: "Accessories" },
    { emoji: "🌻", name: "Sunflower Seed Paper Cards", price: "9.99", color: "from-brand-gold to-amber-300", category: "Stationery" },
    { emoji: "🧸", name: "Cozy Comfort Mystery Bag", price: "29.99", color: "from-amber-200 to-brand-gold", category: "Gift Boxes" },
    { emoji: "💫", name: "Wish Upon a Star Necklace", price: "19.99", color: "from-indigo-300 to-brand-blush", category: "Accessories" },
    { emoji: "🎨", name: "Watercolor Palette Pins", price: "13.50", color: "from-brand-mint to-brand-sage", category: "Accessories" },
  ];

  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-5xl font-bold text-brand-sage mb-4 text-center">
          Shop All
        </h1>
        <p className="text-xl text-brand-mint mb-12 text-center">
          Curated finds to spark joy ✨
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 group">
              <div className={`h-48 bg-gradient-to-br ${item.color} flex items-center justify-center text-6xl group-hover:scale-105 transition-transform`}>
                {item.emoji}
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-brand-sage bg-brand-mint/20 px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <h3 className="text-md font-semibold text-brand-sage mt-2 mb-1">{item.name}</h3>
                <p className="text-lg font-bold text-brand-coral mb-3">${item.price}</p>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full bg-brand-sage text-white py-2 rounded-lg font-semibold hover:bg-brand-coral transition-colors text-sm"
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
