"use client";
import { useState } from 'react';
import { useCart } from '../../components/CartContext';
import { useParams } from 'next/navigation';
import Toast from '../../components/Toast';

const allProducts = [
  { slug: "rainbow-heart-sticker-pack", emoji: "🌈", name: "Rainbow Heart Sticker Pack", price: "12.99", color: "from-brand-blush to-brand-gold", category: "Stickers", description: "A delightful collection of 24 rainbow heart stickers perfect for decorating journals, laptops, water bottles, and more. Each sticker is waterproof and made with premium vinyl." },
  { slug: "surprise-gift-box", emoji: "🎁", name: "Surprise Gift Box", price: "24.99", color: "from-brand-slate to-brand-mint", category: "Gift Boxes", description: "Let us curate the perfect surprise! Each gift box contains 4-6 hand-selected items wrapped beautifully. Perfect for birthdays, celebrations, or just because." },
  { slug: "nostalgic-charm-set", emoji: "💝", name: "Nostalgic Charm Set", price: "18.50", color: "from-brand-coral to-brand-blush", category: "Accessories", description: "A set of 5 adorable charms inspired by 90s nostalgia. Attach them to bags, keychains, or jewelry for a touch of retro sweetness." },
  { slug: "butterfly-dreams-journal", emoji: "🦋", name: "Butterfly Dreams Journal", price: "16.99", color: "from-purple-300 to-brand-blush", category: "Stationery", description: "A beautiful 200-page dotted journal with a holographic butterfly cover. Perfect for bullet journaling, sketching, or daily reflections." },
  { slug: "cherry-blossom-washi-tape", emoji: "🌸", name: "Cherry Blossom Washi Tape", price: "8.99", color: "from-brand-blush to-brand-coral", category: "Stickers", description: "Set of 3 delicate cherry blossom washi tapes in pink, white, and gold. Each roll is 10 meters of decorating bliss." },
  { slug: "starlight-earring-set", emoji: "⭐", name: "Starlight Earring Set", price: "22.00", color: "from-brand-gold to-orange-300", category: "Accessories", description: "A stunning set of 3 pairs of star-themed earrings in gold, silver, and rose gold. Hypoallergenic and perfect for sensitive ears." },
  { slug: "candy-shop-mini-prints", emoji: "🍬", name: "Candy Shop Mini Prints", price: "14.50", color: "from-cyan-300 to-brand-slate", category: "Art", description: "Set of 6 mini art prints (4x6 inches) featuring whimsical candy shop illustrations. Printed on premium matte cardstock." },
  { slug: "velvet-bow-hair-clips", emoji: "🎀", name: "Velvet Bow Hair Clips", price: "11.99", color: "from-brand-coral to-brand-blush", category: "Accessories", description: "Set of 4 luxurious velvet bow hair clips in blush, burgundy, navy, and forest green. The perfect finishing touch for any hairstyle." },
  { slug: "sunflower-seed-paper-cards", emoji: "🌻", name: "Sunflower Seed Paper Cards", price: "9.99", color: "from-brand-gold to-amber-300", category: "Stationery", description: "Pack of 8 plantable greeting cards made from seed paper. After reading, plant them and watch sunflowers grow!" },
  { slug: "cozy-comfort-mystery-bag", emoji: "🧸", name: "Cozy Comfort Mystery Bag", price: "29.99", color: "from-amber-200 to-brand-gold", category: "Gift Boxes", description: "A mystery bag filled with cozy goodies — think fuzzy socks, candles, tea, and cute accessories. Every bag is unique!" },
  { slug: "wish-upon-a-star-necklace", emoji: "💫", name: "Wish Upon a Star Necklace", price: "19.99", color: "from-indigo-300 to-brand-blush", category: "Accessories", description: "A dainty star pendant on a 16-inch gold-plated chain. Comes in a beautiful gift box, ready to give or keep." },
  { slug: "watercolor-palette-pins", emoji: "🎨", name: "Watercolor Palette Pins", price: "13.50", color: "from-brand-mint to-brand-sage", category: "Accessories", description: "Set of 4 enamel pins shaped like watercolor palettes, brushes, and paint tubes. Perfect for artists and creatives!" },
];

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  
  const product = allProducts.find(p => p.slug === slug);

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-sage mb-4">Product Not Found</h1>
          <a href="/shop" className="text-brand-coral hover:underline">← Back to Shop</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Toast message="Added to cart!" isVisible={showToast} />
      
      <section className="max-w-6xl mx-auto py-16 px-6">
        <a href="/shop" className="text-brand-sage hover:text-brand-coral transition-colors mb-8 inline-block">
          ← Back to Shop
        </a>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          <div className={`h-96 bg-gradient-to-br ${product.color} rounded-2xl flex items-center justify-center text-9xl shadow-lg`}>
            {product.emoji}
          </div>
          
          <div>
            <span className="text-sm font-medium text-brand-sage bg-brand-mint/20 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-brand-sage mt-4 mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-brand-coral mb-6">
              ${product.price}
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>
            <button 
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-brand-sage text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-coral transition-all shadow-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
