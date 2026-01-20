export default function Footer() {
  return (
    <footer className="bg-brand-coral/10 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-brand-sage mb-4">✨ Boutique Little Bits</h3>
            <p className="text-gray-600 text-sm">
              Hand-curated gifts made with intention and thoughtfulness. Sparking joy since 2023.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-brand-sage mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/shop" className="text-gray-600 hover:text-brand-coral transition-colors">All Products</a></li>
              <li><a href="/cart" className="text-gray-600 hover:text-brand-coral transition-colors">Cart</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-brand-sage mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/faq" className="text-gray-600 hover:text-brand-coral transition-colors">FAQ</a></li>
              <li><a href="/shipping" className="text-gray-600 hover:text-brand-coral transition-colors">Shipping Policy</a></li>
              <li><a href="/returns" className="text-gray-600 hover:text-brand-coral transition-colors">Returns & Refunds</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-brand-coral transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-brand-sage mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-gray-600 hover:text-brand-coral transition-colors">Our Story</a></li>
              <li><a href="/stores" className="text-gray-600 hover:text-brand-coral transition-colors">Our Stores</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-brand-coral/20 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2023-{new Date().getFullYear()} Boutique Little Bits. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
