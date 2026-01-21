"use client";
import { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import Toast from '../components/Toast';
import { client } from '../../lib/sanity';

const allProductsQuery = `
  *[_type == "product" && active == true] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    "image": coalesce(images[0].asset->url, externalImageUrl),
    basePrice,
    compareAtPrice,
    category->{
      title
    },
    shippingProfile,
    hasVariations,
    hasPersonalization,
    featured
  }
`;

export default function ShopPage() {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await client.fetch(allProductsQuery);
        setProducts(data || []);
      } catch (error) {
        console.log('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
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

  const categories = ['All', ...new Set(products.map(p => p.category?.title).filter(Boolean))];

  let filteredProducts = products
    .filter(p => activeCategory === 'All' || p.category?.title === activeCategory)
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.basePrice - b.basePrice);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.basePrice - a.basePrice);
  } else if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-sage border-t-transparent mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Toast message="Added to cart!" isVisible={showToast} />
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h1 className="text-5xl font-bold text-brand-sage mb-4 text-center">Shop All</h1>
        <p className="text-xl text-brand-mint mb-8 text-center">Curated finds to spark joy</p>
        <div className="max-w-md mx-auto mb-8">
          <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-5 py-3 rounded-full border border-gray-200 focus:border-brand-sage focus:ring-2 focus:ring-brand-mint/50 outline-none" />
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full font-medium ${activeCategory === cat ? 'bg-brand-sage text-white' : 'bg-white text-brand-sage border border-brand-sage hover:bg-brand-mint/20'}`}>{cat}</button>
          ))}
        </div>
        <div className="flex justify-center mb-12">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-200 text-brand-sage">
            <option value="default">Sort by: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item, i) => (
              <div key={item._id || i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200 group">
                <a href={`/shop/${item.slug?.current}`}>
                  <div className="h-52 bg-gray-100 flex items-center justify-center">
                    <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform p-3" />
                  </div>
                </a>
                <div className="p-4">
                  <span className="text-xs font-medium text-brand-sage bg-brand-mint/20 px-2 py-1 rounded-full">{item.category?.title || 'Uncategorized'}</span>
                  <a href={`/shop/${item.slug?.current}`}>
                    <h3 className="text-md font-semibold text-brand-sage mt-2 mb-1 hover:text-brand-coral line-clamp-2">{item.title}</h3>
                  </a>
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-lg font-bold text-brand-coral">${item.basePrice?.toFixed(2)}</p>
                    {item.compareAtPrice && <p className="text-sm text-gray-400 line-through">${item.compareAtPrice?.toFixed(2)}</p>}
                  </div>
                  {item.hasVariations || item.hasPersonalization ? (
                    <a href={`/shop/${item.slug?.current}`} className="block w-full bg-brand-sage text-white py-2 rounded-lg font-semibold hover:bg-brand-coral text-sm text-center">Select Options</a>
                  ) : (
                    <button onClick={() => handleAddToCart(item)} className="w-full bg-brand-sage text-white py-2 rounded-lg font-semibold hover:bg-brand-coral text-sm">Add to Cart</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
