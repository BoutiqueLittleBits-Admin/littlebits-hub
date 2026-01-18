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

  const handleAddToCart = (item) => {
    addToCart(item);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000)
