export default function ShippingPolicy() {
  return (
    <div className="min-h-screen">
      <section className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold text-brand-sage mb-8 text-center">
          Shipping Policy
        </h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
          
          <div>
            <h2 className="text-2xl font-semibold text-brand-sage mb-4">✨ Processing Time</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Most orders ship within <strong>1-3 business days</strong>. We carefully package each item with love and attention to ensure it arrives safely.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Personalized items</strong> require additional time for customization and ship within <strong>10 business days</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Holiday & seasonal items</strong> may have specific ship dates noted in the listing. Please check individual product descriptions for details.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-sage mb-4">📦 Shipping Methods & Rates</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We ship via <strong>USPS</strong> and offer multiple shipping speeds at checkout. Rates are calculated based on your location and package size.
            </p>
            <div className="bg-brand-mint/10 rounded-xl p-4 mb-4">
              <p className="text-brand-sage font-semibold text-lg">
                🎉 FREE shipping on orders over $50!
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Expedited shipping may be available for special requests. Please <a href="/contact" className="text-brand-coral hover:underline">contact us</a> before ordering if you need rush delivery.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-sage mb-4">🌍 International Shipping</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Yes, we ship internationally! International orders are shipped via USPS International services.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Please note:</strong> International shipping typically takes <strong>2-4 weeks</strong> depending on destination and customs processing. By placing an international order, you acknowledge and accept the longer delivery timeframe.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The buyer is responsible for any customs duties, import taxes, or fees charged by their country. These are not included in the shipping cost.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-sage mb-4">📍 Tracking Your Order</h2>
            <p className="text-gray-700 leading-relaxed">
              Once your order ships, you will receive an email with tracking information. You can use this to follow your package's journey to your doorstep!
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-brand-sage mb-4">⚠️ Important Notes</h2>
            <ul className="text-gray-700 leading-relaxed space-y-2">
              <li>• Please double-check your shipping address at checkout. We are not responsible for packages sent to incorrect addresses provided by the customer.</li>
              <li>• Once a package is in the carrier's hands, delivery timeframes are estimates and may be affected by weather, holidays, or carrier delays.</li>
              <li>• If your package appears lost in transit, please <a href="/contact" className="text-brand-coral hover:underline">contact us</a> and we will file a claim with USPS and work with you on a resolution.</li>
            </ul>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <p className="text-gray-500 text-sm text-center">
              Questions about shipping? <a href="/contact" className="text-brand-coral hover:underline">Contact us</a> — we're happy to help!
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
