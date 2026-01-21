"use client";
import { useState, useEffect } from 'react';
import { useCart } from '../../components/CartContext';
import { useParams } from 'next/navigation';
import Toast from '../../components/Toast';
import { client } from '../../../lib/sanity';

const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug && active == true][0] {
    _id,
    title,
    slug,
    description,
    "image": coalesce(images[0].asset->url, externalImageUrl),
    "images": images[].asset->url,
    externalImageUrl,
    basePrice,
    compareAtPrice,
    sku,
    category->{
      _id,
      title,
      slug
    },
    tags,
    shippingProfile,
    processingTime,
    customProcessingDate,
    quantity,
    featured,
    hasVariations,
    variations,
    hasPersonalization,
    personalization,
    specialNote
  }
`;

const relatedProductsQuery = `
  *[_type == "product" && active == true && category._ref == $categoryId && slug.current != $currentSlug][0...4] {
    _id,
    title,
    slug,
    "image": coalesce(images[0].asset->url, externalImageUrl),
    basePrice,
    category->{
      title
    }
  }
`;

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [personalizationText, setPersonalizationText] = useState('');
  const [personalizationError, setPersonalizationError] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const sanityProduct = await client.fetch(productBySlugQuery, { slug });
        
        if (sanityProduct) {
          setProduct(sanityProduct);
          
          if (sanityProduct.hasVariations && sanityProduct.variations?.length > 0) {
            setSelectedVariation(sanityProduct.variations[0]);
          }
          
          if (sanityProduct.category?._id) {
            const related = await client.fetch(relatedProductsQuery, {
              categoryId: sanityProduct.category._id,
              currentSlug: slug
            });
            setRelatedProducts(related);
          }
        }
      } catch (error) {
        console.log('Sanity fetch error:', error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (product.hasPersonalization && product.personalization?.required) {
      if (!personalizationText.trim()) {
        setPersonalizationError('Please fill in the personalization details');
        return;
      }
    }
    
    setPersonalizationError('');
    
    const cartItem = {
      slug: product.slug?.current || product.slug,
      name: product.title,
      price: selectedVariation ? selectedVariation.price.toFixed(2) : product.basePrice.toFixed(2),
      image: product.image || product.externalImageUrl,
      shippingProfile: product.shippingProfile,
    };
    
    if (selectedVariation) {
      cartItem.name = `${product.title} - ${selectedVariation.name}`;
      cartItem.variationName = selectedVariation.name;
      cartItem.variationSku = selectedVariation.sku;
    }
    
    if (personalizationText.trim()) {
      cartItem.personalization = personalizationText.trim();
    }
    
    addToCart(cartItem);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const getCurrentPrice = () => {
    if (selectedVariation) {
      return selectedVariation.price.toFixed(2);
    }
    return product.basePrice?.toFixed(2) || "0.00";
  };

  const getProcessingTimeText = () => {
    if (!product.processingTime) return null;
    
    const times = {
      '1-3-days': '1-3 business days',
      '3-5-days': '3-5 business days',
      '5-7-days': '5-7 business days (Made to Order)',
      '3-4-weeks': '3-4 weeks',
      'custom': product.customProcessingDate || 'Custom',
    };
    
    return times[product.processingTime] || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-sage border-t-transparent mx-auto mb-4"></div>
          <p className="text-brand-sage">Loading product...</p>
        </div>
      </div>
    );
  }

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

  const images = product.images?.length > 0 ? product.images : [product.image || product.externalImageUrl];

  return (
    <div className="min-h-screen">
      <Toast message="Added to cart!" isVisible={showToast} />
      
      <section className="max-w-6xl mx-auto py-16 px-6">
        <a href="/shop" className="text-brand-sage hover:text-brand-coral transition-colors mb-8 inline-block">
          ← Back to Shop
        </a>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          <div>
            <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center p-6 mb-4">
              <img 
                src={images[selectedImageIndex]} 
                alt={product.title}
                className="max-w-full max-h-96 object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx ? 'border-brand-sage' : 'border-transparent hover:border-brand-mint'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <span className="text-sm font-medium text-brand-sage bg-brand-mint/20 px-3 py-1 rounded-full">
              {product.category?.title || 'Uncategorized'}
            </span>
            <h1 className="text-4xl font-bold text-brand-sage mt-4 mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-3 mb-4">
              <p className="text-3xl font-bold text-brand-coral">
                ${getCurrentPrice()}
              </p>
              {product.compareAtPrice && !selectedVariation && (
                <p className="text-xl text-gray-400 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </p>
              )}
            </div>
            
            {product.specialNote && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-yellow-800 font-medium">📌 {product.specialNote}</p>
              </div>
            )}
            
            {getProcessingTimeText() && (
              <p className="text-sm text-gray-500 mb-4">
                ⏱️ Processing time: {getProcessingTimeText()}
              </p>
            )}
            
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>
            
            {product.hasVariations && product.variations?.length > 0 && (
              <div className="mb-6">
                <label className="block text-brand-sage font-semibold mb-2">
                  Select Option:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variations.map((variation, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariation(variation)}
                      disabled={variation.inStock === false}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        selectedVariation?.name === variation.name
                          ? 'border-brand-sage bg-brand-sage text-white'
                          : variation.inStock === false
                          ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-brand-sage text-brand-sage hover:bg-brand-mint/20'
                      }`}
                    >
                      {variation.name} - ${variation.price.toFixed(2)}
                      {variation.inStock === false && ' (Sold Out)'}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {product.hasPersonalization && product.personalization && (
              <div className="mb-6">
                <label className="block text-brand-sage font-semibold mb-2">
                  {product.personalization.label || 'Personalization Details'}
                  {product.personalization.required && <span className="text-brand-coral">*</span>}
                </label>
                {product.personalization.instructions && (
                  <p className="text-sm text-gray-500 mb-2 bg-gray-50 p-3 rounded-lg">
                    {product.personalization.instructions}
                  </p>
                )}
                <textarea
                  value={personalizationText}
                  onChange={(e) => {
                    const limit = product.personalization.characterLimit || 256;
                    if (e.target.value.length <= limit) {
                      setPersonalizationText(e.target.value);
                      setPersonalizationError('');
                    }
                  }}
                  placeholder="Enter your personalization details..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    personalizationError ? 'border-red-400' : 'border-gray-200'
                  } focus:border-brand-sage focus:ring-2 focus:ring-brand-mint/50 outline-none transition-all resize-none`}
                />
                <div className="flex justify-between mt-1">
                  {personalizationError && (
                    <p className="text-red-500 text-sm">{personalizationError}</p>
                  )}
                  <p className="text-sm text-gray-400 ml-auto">
                    {personalizationText.length}/{product.personalization.characterLimit || 256}
                  </p>
                </div>
              </div>
            )}
            
            {product.quantity !== undefined && product.quantity !== null && product.quantity <= 5 && product.quantity > 0 && (
              <p className="text-orange-600 text-sm mb-4">
                ⚡ Only {product.quantity} left in stock!
              </p>
            )}
            
            <button 
              onClick={handleAddToCart}
              disabled={product.quantity === 0 || (selectedVariation?.inStock === false)}
              className={`w-full md:w-auto px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg ${
                product.quantity === 0 || (selectedVariation?.inStock === false)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-brand-sage text-white hover:bg-brand-coral'
              }`}
            >
              {product.quantity === 0 ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-brand-sage mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item, i) => (
                <div key={item._id || i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 group">
                  <a href={`/shop/${item.slug?.current || item.slug}`}>
                    <div className="h-40 overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 p-3"
                      />
                    </div>
                  </a>
                  <div className="p-4">
                    <a href={`/shop/${item.slug?.current || item.slug}`}>
                      <h3 className="text-sm font-semibold text-brand-sage mb-1 hover:text-brand-coral transition-colors line-clamp-2">{item.title}</h3>
                    </a>
                    <p className="text-md font-bold text-brand-coral mb-3">${item.basePrice?.toFixed(2)}</p>
                    <a 
                      href={`/shop/${item.slug?.current || item.slug}`}
                      className="block w-full bg-brand-sage text-white py-2 rounded-lg font-semibold hover:bg-brand-coral tra
