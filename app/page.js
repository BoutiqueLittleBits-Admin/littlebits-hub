"use client";
import { useState, useEffect } from 'react';
import { useCart } from './components/CartContext';
import Toast from './components/Toast';
import { client } from '../lib/sanity';

const featuredProductsQuery = `
  *[_type == "product" && active == true && featured == true][0...4] {
    _id,
    title,
    slug,
    "image": coalesce(images[0].asset->url, externalImageUrl),
    basePrice,
    category->{
      title
    },
    hasVariations,
    hasPersonalization,
    shippingProfile
  }
`;

export default function Home() {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const data = await client.fetch(featuredProductsQuery);
        setFeaturedProducts(data || []);
      } catch (error) {
        console.log('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  const handleAddToCart = (item) => {
    if (item.hasVariations || item.hasPersonalization) {
      window.location.href = `/shop/${item.slug?.current}`;
      return;
    }
    addToCart({
      slug: item.slug?.current,
      name: item.title,
      price: item.basePrice?.toFixed(2),
      image: item.image,
      shippingProfile: item.shippingProfile,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <Toast message="Added to cart!" isVisible={showToast} />
      
      <section className="bg-gradient-to-br from-brand-blush via-brand-cream to-brand-mint py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-brand-sage mb-6">Welcome to Little Bits</h1>
          <p className="text-xl text-brand-sage/80 mb-8 max-w-2xl mx-auto">Thoughtful. Curated. Creative. Because the best gifts come in little bits.</p>
          <a href="/shop" className="inline-block bg-brand-coral text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-sage transition-colors shadow-lg">Shop Now ✨</a>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-sage mb-4">✨ Featured Finds ✨</h2>
            <p className="text-lg text-brand-mint">Hand-picked favorites just for you</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-sage border-t-transparent"></div></div>
          ) : featuredProducts.length === 0 ? (
            <p className="text-center text-gray-500">No featured products yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((item, i) => (
                <div key={item._id || i} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 group">
                  <a href={`/shop/${item.slug?.current}`}>
                    <div className="h-52 overflow-hidden bg-gray-50">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2" />
                    </div>
                  </a>
                  <div className="p-4">
                    <span className="text-xs font-medium text-brand-sage bg-brand-mint/20 px-2 py-1 rounded-full">{item.category?.title || 'Uncategorized'}</span>
                    <a href={`/shop/${item.slug?.current}`}><h3 className="text-md font-semibold text-brand-sage mt-2 mb-1 hover:text-brand-coral transition-colors line-clamp-2">{item.title}</h3></a>
                    <p className="text-lg font-bold text-brand-coral mb-3">${item.basePrice?.toFixed(2)}</p>
                    {item.hasVariations || item.hasPersonalization ? (
                      <a href={`/shop/${item.slug?.current}`} className="block w-full bg-brand-sage text-white py-2 rounded-lg font-semibold hover:bg-brand-coral transition-colors text-sm text-center">Select Options</a>
                    ) : (
                      <button onClick={() => handleAddToCart(item)} className="w-full bg-brand-sage text-white py-2 rounded-lg font-semibold hover:bg-brand-coral transition-colors text-sm">Add to Cart</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <a href="/shop" className="inline-block border-2 border-brand-sage text-brand-sage px-8 py-3 rounded-full font-bold hover:bg-brand-sage hover:text-white transition-colors">View All Products →</a>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-brand-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-sage mb-12 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Gift Sets", emoji: "🎁", color: "from-brand-coral to-brand-blush" },
              { name: "Kids", emoji: "🧸", color: "from-brand-gold to-amber-300" },
              { name: "Spa & Beauty", emoji: "💆‍♀️", color: "from-brand-blush to-brand-mint" },
              { name: "Accessories", emoji: "👜", color: "from-brand-mint to-brand-sage" },
              { name: "Home Decor", emoji: "🏠", color: "from-brand-slate to-brand-mint" },
            ].map((cat, i) => (
              <a key={i} href="/shop" className={`bg-gradient-to-br ${cat.color} rounded-2xl p-6 text-center hover:scale-105 transition-transform shadow-md`}>
                <div className="text-4xl mb-2">{cat.emoji}</div>
                <h3 className="font-bold text-white text-sm">{cat.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">💝</div>
              <h3 className="font-bold text-brand-sage mb-2">Curated with Love</h3>
              <p className="text-gray-600 text-sm">Every item hand-selected to spark joy</p>
            </div>
            <div>
              <div className="text-4xl mb-4">📦</div>
              <h3 className="font-bold text-brand-sage mb-2">Gift-Ready Packaging</h3>
              <p className="text-gray-600 text-sm">Beautiful presentation every time</p>
            </div>
            <div>
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-bold text-brand-sage mb-2">Unique Finds</h3>
              <p className="text-gray-600 text-sm">Items you will not find anywhere else</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-brand-mint/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-brand-sage mb-6">Also Find Us On</h2>
          <div className="flex justify-center gap-6">
            <a href="https://www.ebay.com/usr/littlebitsboutique" target="_blank" rel="noopener noreferrer" className="bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-medium text-brand-sage">🛒 eBay Store</a>
            <a href="https://www.etsy.com/shop/BoutiqueLittleBits" target="_blank" rel="noopener noreferrer" className="bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 font-medium text-brand-sage">🧡 Etsy Shop</a>
          </div>
        </div>
      </section>
    </div>
  );
}
