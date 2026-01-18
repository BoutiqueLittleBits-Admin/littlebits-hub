export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-5xl font-bold text-brand-sage mb-8 text-center">
          Our Story
        </h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
          <p className="text-lg text-gray-600 mb-6">
            Boutique Little Bits started with a simple idea: everyone deserves a little moment of joy. 
            We believe in the power of small surprises, thoughtful gifts, and the magic of nostalgia.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Whether you're the fun auntie who always brings the best presents, a thoughtful friend 
            looking for something unique, or someone who just wants to treat yourself — we've got 
            something special for you.
          </p>
          <p className="text-lg text-gray-600">
            Every item in our collection is carefully curated to spark joy, bring back happy memories, 
            and create new ones worth keeping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gradient-to-br from-brand-blush to-brand-gold rounded-2xl p-8">
            <div className="text-5xl mb-4">🌈</div>
            <h3 className="text-xl font-bold text-white mb-2">Curated with Care</h3>
            <p className="text-white/90">Every item handpicked for maximum joy</p>
          </div>
          <div className="bg-gradient-to-br from-brand-slate to-brand-mint rounded-2xl p-8">
            <div className="text-5xl mb-4">💝</div>
            <h3 className="text-xl font-bold text-white mb-2">Gift-Ready</h3>
            <p className="text-white/90">Beautiful packaging included</p>
          </div>
          <div className="bg-gradient-to-br from-brand-coral to-brand-blush rounded-2xl p-8">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-white mb-2">Sparking Joy</h3>
            <p className="text-white/90">Since 2025</p>
          </div>
        </div>
      </section>
    </div>
  );
}
