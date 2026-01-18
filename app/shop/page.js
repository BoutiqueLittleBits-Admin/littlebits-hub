"use client";
import { useCart } from '../components/CartContext';

export default function ShopPage() {
  const { addToCart } = useCart();

  const products = [
    { slug: "rainbow-heart-sticker-pack", emoji: "🌈", name: "Rainbow Heart Sticker Pack", price: "12.99", color: "from-brand-blush to-brand-gold", category: "Stickers" },
    { slug: "surprise-gift-box", emoji: "🎁", name: "Surprise Gift Box", price: "24.99", color: "from-brand-slate to-brand-mint", category: "Gift Boxes" },
    { slug: "nostalgic-charm-set", emoji: "💝", name: "Nostalgic Charm Set", price: "18.50", color: "from-brand-coral to-brand-blush", category: "Accessories" },
    { slug: "butterfly-dreams-journal", emoji: "🦋", name: "Butterfly Dreams Journal", price: "16.99", color: "from-purple-300 to-brand-blush", category: "Stationery" },
    { slug: "cherry-blossom-washi-tape", emoji: "🌸", name: "Cherry Blossom Washi Tape", price: "8.99", color: "from-brand-blush to-brand-coral", category: "Stickers" },
    { slug: "starlight-earring-set", emoji: "⭐", name: "Starlight Earring Set", price: "22.00", color: "from-brand-gold to-orange-300", category: "Accessories" },
    { slug: "candy-shop-mini-prints", emoji: "🍬", name: "Candy Shop Mini Prints", price: "14.50", color: "from-cyan-300 to-brand-slate", category: "Art" },
    { slug: "velvet-bow-hair-clips", emoji: "🎀", name: "Velvet Bow Hair Clips", price: "11.99", color: "from-brand-coral to-brand-blush", category: "Accessories" },
    { slug: "sunflower-seed-paper-cards", emoji: "🌻", name: "Sunflower Seed Paper Cards", price: "9.99", color: "from-brand-gold to-amber-300", category: "Stationery" },
    { slug: "cozy-comfort-mystery-bag", emoji: "🧸", name: "Cozy Comfort Mystery Bag", price: "29.99", color: "from-amber-200 to-brand-gold", category: "Gift Boxes" },
    { slug: "wish-upon-a-star-necklace", emoji: "💫", name: "Wish Upon a Star Necklace", price: "19.99", color: "from-indigo-300 to-brand-blush", category: "Accessories" },
    { slug: "watercolor-palette-pins", emoji: "🎨", name: "Watercolor Palette Pins", price: "13.50", color: "from-brand-mint to-brand-sage", category: "Accessories" },
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
              <a href={`/shop/${item.slug}`}>
                <div className={`h-48 bg-gradient-to-br ${item.color} flex items-center justify-center text-6xl group-hover:scale-105 transition-transform`}>
                  {item.emoji}
                </div>
              </a>
              <div className="p-4">
                <span className="text-xs font-medium text-brand-sage bg-brand-mint/20 px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <a href={`/shop/${item.slug}`}>
                  <h3 className="text-md font-semibold text-brand-sage mt-2 mb-1 hover:text-brand-coral transition-colors">{item.name}</h3>
                </a>
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
