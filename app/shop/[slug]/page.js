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
    externalImageUrl,
    basePrice,
    compareAtPrice,
    sku,
    category->{
      _id,
      title
    },
    shippingProfile,
    processingTime,
    customProcessingDate,
    quantity,
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
    basePrice
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

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await client.fetch(productBySlugQuery, { slug });
        if (data) {
          setProduct(data);
          if (data.hasVariations && data.variations?.length > 0) {
            setSelectedVariation(data.variations[0]);
          }
          if (data.category?._id) {
            const related = await client.fetch(relatedProductsQuery, {
              categoryId: data.category._id,
              currentSlug: slug
            });
            setRelatedProducts(related);
          }
        }
      } catch (error) {
        console.log('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product.hasPersonalization && product.personalization?.required && !personalizationText.trim()) {
      setPersonalizationError('Please fill in the personalization details');
      return;
    }
    setPersonalizationError('');
    const cartItem = {
      slug: product.slug?.current,
      name: selectedVariation ? product.title + ' - ' + selectedVariation.name : product.title,
      price: selectedVariation ? selectedVariation.price.toFixed(2) : product.basePrice.toFixed(2),
      image: product.image || product.externalImageUrl,
      shippingProfile: product.shippingProfile,
    };
    if (personalizationText.trim()) {
      cartItem.personalization = personalizationText.trim();
    }
    addToCart(cartItem);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const getCurrentPrice = () => {
    if (selectedVariation) return selectedVariation.price.toFixed(2);
    return product.basePrice?.toFixed(2) || "0.00";
  };

  const getProcessingTimeText = () => {
    const times = {
      '1-3-days': '1-3 business days',
      '3-5-days': '3-5 business days',
      '5-7-days': '5-7 business days (Made to Order)',
      '3-4-weeks': '3-4 weeks',
      'custom': product?.customProcessingDate || 'Custom',
    };
    return times[product?.processingTime] || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-sage border-t-transparent mx-auto mb-4"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-sage mb-4">Product Not Found</h1>
          <a href="/shop" className="text-brand-coral hover:underline">Back to Shop</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Toast message="Added to cart!" isVisible={showToast} />
      <section className="max-w-6xl mx-auto py-16 px-6">
        <a href="/shop" className="text-brand-sage hover:text-brand-coral mb-8 inline-block">Back to Shop</a>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center p-6">
            <img src={product.image || product.externalImageUrl} alt={product.title} className="max-w-full max-h-96 object-contain" />
          </div>
          <div>
            <span className="text-sm font-medium text-brand-sage bg-brand-mint/20 px-3 py-1 rounded-full">{product.category?.title || 'Uncategorized'}</span>
            <h1 className="text-4xl font-bold text-brand-sage mt-4 mb-4">{product.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-3xl font-bold text-brand-coral">${getCurrentPrice()}</p>
              {product.compareAtPrice && <p className="text-xl text-gray-400 line-through">${product.compareAtPrice.toFixed(2)}</p>}
            </div>
            {product.specialNote && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                <p className="text-yellow-800 font-medium">{product.specialNote}</p>
              </div>
            )}
            {getProcessingTimeText() && <p className="text-sm text-gray-500 mb-4">Processing: {getProcessingTimeText()}</p>}
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>
            {product.hasVariations && product.variations?.length > 0 && (
              <div className="mb-6">
                <label className="block text-brand-sage font-semibold mb-2">Select Option:</label>
                <div className="flex flex-wrap gap-2">
                  {product.variations.map((v, i) => (
                    <button key={i} onClick={() => setSelectedVariation(v)} className={`px-4 py-2 rounded-lg border-2 font-medium ${selectedVariation?.name === v.name ? 'border-brand-sage bg-brand-sage text-white' : 'border-brand-sage text-brand-sage hover:bg-brand-mint/20'}`}>
                      {v.name} - ${v.price.toFixed(2)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {product.hasPersonalization && product.personalization && (
              <div className="mb-6">
                <label className="block text-brand-sage font-semibold mb-2">{product.personalization.label || 'Personalization'}{product.personalization.required && <span className="text-brand-coral">*</span>}</label>
                {product.personalization.instructions && <p className="text-sm text-gray-500 mb-2 bg-gray-50 p-3 rounded-lg">{product.personalization.instructions}</p>}
                <textarea value={personalizationText} onChange={(e) => { if (e.target.value.length <= (product.personalization.characterLimit || 256)) { setPersonalizationText(e.target.value); setPersonalizationError(''); }}} placeholder="Enter details..." rows={4} className={`w-full px-4 py-3 rounded-lg border ${personalizationError ? 'border-red-400' : 'border-gray-200'} focus:border-brand-sage outline-none resize-none`} />
                <div className="flex justify-between mt-1">
                  {personalizationError && <p className="text-red-500 text-sm">{personalizationError}</p>}
                  <p className="text-sm text-gray-400 ml-auto">{personalizationText.length}/{product.personalization.characterLimit || 256}</p>
                </div>
              </div>
            )}
            <button onClick={handleAddToCart} className="w-full md:w-auto bg-brand-sage text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-coral transition-all shadow-lg">Add to Cart</button>
          </div>
        </div>
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-brand-sage mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200 group">
                  <a href={`/shop/${item.slug?.current}`}>
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain p-3" />
                    </div>
                  </a>
                  <div className="p-4">
                    <a href={`/shop/${item.slug?.current}`}><h3 className="text-sm font-semibold text-brand-sage mb-1">{item.title}</h3></a>
                    <p className="text-md font-bold text-brand-coral">${item.basePrice?.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
