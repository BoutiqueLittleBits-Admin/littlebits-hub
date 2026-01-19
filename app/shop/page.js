"use client";
import { useState } from 'react';
import { useCart } from '../components/CartContext';
import Toast from '../components/Toast';

const products = [
  {
    slug: "teen-woman-valentine-countdown",
    name: "Teen/Woman Valentine Countdown - 14 Days of Joy",
    price: "32.00",
    category: "Gift Sets",
    image: "https://i.etsystatic.com/42012371/r/il/46986b/7524183824/il_fullxfull.7524183824_f0xb.jpg",
  },
  {
    slug: "jumbo-friendship-bracelet",
    name: "Jumbo Friendship Bracelet - Custom Made to Order",
    price: "38.50",
    category: "Accessories",
    image: "https://i.etsystatic.com/42012371/r/il/8ce7a4/5888005579/il_fullxfull.5888005579_sm3z.jpg",
  },
  {
    slug: "rainbow-zipper-pencil-cases",
    name: "Rainbow Zipper Pencil Cases - Stylish Organizers",
    price: "8.00",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/faa7e0/5609801779/il_fullxfull.5609801779_4wud.jpg",
  },
  {
    slug: "kids-valentine-countdown",
    name: "Kids Valentine Countdown - 14 Days of Surprises",
    price: "32.00",
    category: "Gift Sets",
    image: "https://i.etsystatic.com/42012371/r/il/0853bc/6597768787/il_fullxfull.6597768787_8nzt.jpg",
  },
  {
    slug: "teen-tween-advent-calendar",
    name: "Teen & Tween Advent Calendar - Holiday Countdown",
    price: "30.00",
    category: "Gift Sets",
    image: "https://i.etsystatic.com/42012371/r/il/aa22bc/7322461668/il_fullxfull.7322461668_1r12.jpg",
  },
  {
    slug: "tubby-time-bag",
    name: "Tubby Time Bag - Bath Fun Kit for Kids",
    price: "15.00",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/bfde82/5969239582/il_fullxfull.5969239582_ec9c.jpg",
  },
  {
    slug: "pamper-yourself-set",
    name: "Pamper Yourself Set - Ultimate Self-Care Kit",
    price: "23.00",
    category: "Spa & Beauty",
    image: "https://i.etsystatic.com/42012371/r/il/182d84/6017238711/il_fullxfull.6017238711_tiha.jpg",
  },
  {
    slug: "going-to-bed-set-small",
    name: "Going To Bed Set - Sweet Dreams Bundle",
    price: "20.00",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/826ba0/6007312259/il_fullxfull.6007312259_k3pb.jpg",
  },
  {
    slug: "going-to-bed-mini-set",
    name: "Going To Bed Mini Set - Plush, Nightlight & Story",
    price: "15.00",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/9db06e/6006071655/il_fullxfull.6006071655_kwui.jpg",
  },
  {
    slug: "lovely-lavender-kit",
    name: "Lovely Lavender Spa Kit - Complete Relaxation Set",
    price: "23.00",
    category: "Spa & Beauty",
    image: "https://i.etsystatic.com/42012371/r/il/c97ae1/7581594477/il_fullxfull.7581594477_ksfj.jpg",
  },
  {
    slug: "pinktastic-facial-kit",
    name: "PINKtastic Facial Kit - Pink Spa Essentials",
    price: "23.00",
    category: "Spa & Beauty",
    image: "https://i.etsystatic.com/42012371/r/il/352f1d/7581509995/il_fullxfull.7581509995_94kb.jpg",
  },
  {
    slug: "outdoor-play-kit",
    name: "Outdoor Play Kit - Fun-Filled Activities",
    price: "10.00",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/ca5ddd/6008383073/il_fullxfull.6008383073_3lf7.jpg",
  },
  {
    slug: "hello-kitty-friends-purse",
    name: "Hello Kitty & Friends Purse with Add-Ons",
    price: "15.00",
    category: "Accessories",
    image: "https://i.etsystatic.com/42012371/r/il/903ed9/5568980902/il_fullxfull.5568980902_l1xl.jpg",
  },
  {
    slug: "sequined-heart-crossbody",
    name: "Sequined Heart Crossbody Bag - Glamorous Sparkle",
    price: "12.00",
    category: "Accessories",
    image: "https://i.etsystatic.com/42012371/r/il/6d1238/5629549371/il_fullxfull.5629549371_2gws.jpg",
  },
  {
    slug: "enchanting-unicorn-purse",
    name: "Enchanting Unicorn Purse - Magical Style",
    price: "19.00",
    category: "Accessories",
    image: "https://i.etsystatic.com/42012371/r/il/f8b196/5788503614/il_fullxfull.5788503614_iyq1.jpg",
  },
  {
    slug: "kitty-cat-purse",
    name: "Adorable Kitty Cat Purse - Crossbody Bag",
    price: "19.00",
    category: "Accessories",
    image: "https://i.etsystatic.com/42012371/r/il/bc4e3d/5808460964/il_fullxfull.5808460964_6za7.jpg",
  },
  {
    slug: "mermaid-tail-coin-keeper",
    name: "Mermaid Tail Coin Keeper - Fun Coin Bag",
    price: "10.00",
    category: "Accessories",
    image: "https://i.etsystatic.com/42012371/r/il/1af771/5636095195/il_fullxfull.5636095195_4z6l.jpg",
  },
  {
    slug: "sweet-straw-bag",
    name: "Sweet Straw Bag - Darling Crossbody",
    price: "19.00",
    category: "Accessories",
    image: "https://i.etsystatic.com/42012371/r/il/1d5ab8/5620420985/il_fullxfull.5620420985_oax6.jpg",
  },
  {
    slug: "hello-beautiful-spa-set",
    name: "Hello Beautiful Spa Set - Complete Pampering Kit",
    price: "23.00",
    category: "Spa & Beauty",
    image: "https://i.etsystatic.com/42012371/r/il/f5fbbb/5959337220/il_fullxfull.5959337220_gmb9.jpg",
  },
  {
    slug: "little-baker-set",
    name: "Little Baker Set - Kids Baking Fun",
    price: "15.99",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/72b1c7/5459680443/il_fullxfull.5459680443_cdfx.jpg",
  },
  {
    slug: "water-fun-kit",
    name: "Ultimate Water Fun Kit for Summer",
    price: "10.00",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/ac7323/5534132300/il_fullxfull.5534132300_pm3t.jpg",
  },
  {
    slug: "bedtime-pack",
    name: "Bedtime Pack for Sweet Dreams",
    price: "10.00",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/16f223/5522916592/il_fullxfull.5522916592_nori.jpg",
  },
  {
    slug: "milkshake-party-favor",
    name: "Fancy Milkshake Party Favor Cup",
    price: "14.00",
    category: "Gift Sets",
    image: "https://i.etsystatic.com/42012371/r/il/df1828/5397444566/il_fullxfull.5397444566_ahex.jpg",
  },
  {
    slug: "ultimate-spa-kit",
    name: "Ultimate Self-Care Spa Kit for Women",
    price: "23.00",
    category: "Spa & Beauty",
    image: "https://i.etsystatic.com/42012371/r/il/cb6dcf/5967458892/il_fullxfull.5967458892_9mk7.jpg",
  },
  {
    slug: "personalized-kids-sunglasses",
    name: "Personalized Kids Sunglasses - Custom Shades",
    price: "12.00",
    category: "Accessories",
    image: "https://i.etsystatic.com/42012371/r/il/54ce5d/5855690122/il_fullxfull.5855690122_fng6.jpg",
  },
  {
    slug: "bath-spa-set",
    name: "Bath Spa Set - Complete Relaxation Kit",
    price: "23.00",
    category: "Spa & Beauty",
    image: "https://i.etsystatic.com/42012371/r/il/3f3061/6007383455/il_fullxfull.6007383455_fd8y.jpg",
  },
  {
    slug: "bunny-bunting-easter",
    name: "Handcrafted Bunny Bunting - Easter Decor",
    price: "20.00",
    category: "Home Decor",
    image: "https://i.etsystatic.com/42012371/r/il/3f8c81/5882309683/il_fullxfull.5882309683_cwvi.jpg",
  },
  {
    slug: "christmas-advent-calendar",
    name: "Christmas Countdown Advent Calendar",
    price: "30.00",
    category: "Gift Sets",
    image: "https://i.etsystatic.com/42012371/r/il/b1f81d/5536624188/il_fullxfull.5536624188_gsez.jpg",
  },
  {
    slug: "sundae-coin-clutch",
    name: "Sundae Coin Clutch with Add-On Options",
    price: "12.00",
    category: "Accessories",
    image: "https://i.etsystatic.com/42012371/r/il/b19ed0/5767275245/il_fullxfull.5767275245_7min.jpg",
  },
  {
    slug: "shark-coin-pouch",
    name: "Shark Coin Zipper Pouches",
    price: "12.99",
    category: "Accessories",
    image: "https://i.etsystatic.com/42012371/r/il/838ac5/6970523894/il_fullxfull.6970523894_a8u7.jpg",
  },
  {
    slug: "little-artist-starter-kit",
    name: "Little Artist Starter Kit - Creative Fun",
    price: "13.50",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/088acb/6990615820/il_fullxfull.6990615820_7dz0.jpg",
  },
];

export default function ShopPage() {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const handleAddToCart = (item) => {
    addToCart(item);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];
  
  let filteredProducts = products
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  } else if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="min-h-screen">
      <Toast message="Added to cart!" isVisible={showToast} />
      
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-5xl font-bold text-brand-sage mb-4 text-center">
          Shop All
        </h1>
        <p className="text-xl text-brand-mint mb-8 text-center">
          Curated finds to spark joy ✨
        </p>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-200 focus:border-brand-sage focus:ring-2 focus:ring-brand-mint/50 outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-brand-sage text-white'
                  : 'bg-white text-brand-sage border border-brand-sage hover:bg-brand-mint/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-12">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 text-brand-sage focus:border-brand-sage focus:ring-2 focus:ring-brand-mint/50 outline-none transition-all"
          >
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500">No products found. Try a different search!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 group">
                <a href={`/shop/${item.slug}`}>
                  <div className="h-52 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 p-3"
                    />
                  </div>
                </a>
                <div className="p-4">
                  <span className="text-xs font-medium text-brand-sage bg-brand-mint/20 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <a href={`/shop/${item.slug}`}>
                    <h3 className="text-md font-semibold text-brand-sage mt-2 mb-1 hover:text-brand-coral transition-colors line-clamp-2">{item.name}</h3>
                  </a>
                  <p className="text-lg font-bold text-brand-coral mb-3">${item.price}</p>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-brand-sage text-white py-2 rounded-lg font-semibold hover:bg-brand-coral transition-colors text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
