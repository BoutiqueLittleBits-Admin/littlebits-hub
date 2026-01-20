export default function ReturnsPolicy() {
  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold text-brand-sage mb-8 text-center">
          Returns & Refunds
        </h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          
          <div className="bg-brand-mint/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-brand-sage mb-2">Our Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              Due to the nature of our hand-curated gift bags, kits, and personalized items, <strong>all sales are final</strong>. We do not accept returns or exchanges.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-sage mb-4">📦 Damaged Items</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We take great care in packaging your order, but sometimes things happen during shipping. If your item arrives damaged or broken:
            </p>
            <ol className="text-gray-700 leading-relaxed space-y-2 ml-4">
              <li>1. <strong>Take photos</strong> of the damage (both the item and packaging)</li>
              <li>2. <strong>Contact us within 48 hours</strong> of delivery via our <a href="/contact" className="text-brand-coral hover:underline">contact page</a></li>
              <li>3. We will review your photos and work with you on a resolution</li>
            </ol>
            <p className="text-gray-700 leading-relaxed mt-4">
              Photos are required so we can file a claim with USPS. We appreciate your understanding!
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-sage mb-4">❌ Wrong Item Received</h2>
            <p className="text-gray-700 leading-relaxed">
              Mistakes happen! If we accidentally sent you the wrong item, please <a href="/contact" className="text-brand-coral hover:underline">contact us</a> right away. We will send you the correct item at no additional cost — and you're welcome to keep the item we sent by mistake. 💝
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-sage mb-4">📬 Lost Packages</h2>
            <p className="text-gray-700 leading-relaxed">
              If tracking shows your package was delivered but you haven't received it, please check with neighbors and your local post office first. If still missing, contact us and we will file a claim with USPS. Once the claim is processed, we will work with you on next steps — whether that's a replacement or refund.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-sage mb-4">🚫 Order Cancellations</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Non-personalized orders:</strong> May be cancelled any time before shipping. Please <a href="/contact" className="text-brand-coral hover:underline">contact us</a> as soon as possible.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Personalized/custom orders:</strong> Cannot be cancelled once production has begun, as these items are made specifically for you.
            </p>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <p className="text-gray-500 text-sm text-center">
              Have questions? We're here to help! <a href="/contact" className="text-brand-coral hover:underline">Contact us</a>
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
