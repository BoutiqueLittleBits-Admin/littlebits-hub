export default function Footer() {
  return (
    <footer className="bg-brand-sage text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">✨ Boutique Little Bits</h3>
            <p className="text-brand-mint">
              Creating moments of joy with curated, colorful surprises.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-brand-mint">
              <a href="/shop" className="hover:text-white transition-colors">Shop All</a>
              <a href="/about" className="hover:text-white transition-colors">About Us</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Also Find Us On</h4>
            <div className="flex flex-col gap-2 text-brand-mint">
              <a href="https://www.ebay.com/usr/littlebitsboutique" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                🛒 eBay Store
              </a>
              <a href="https://www.etsy.com/shop/BoutiqueLittleBits" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                🧡 Etsy Shop
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="flex flex-col gap-2 text-brand-mint">
              <a href="mailto:holleeann@boutiquelittlebits.com" className="hover:text-white transition-colors flex items-center gap-2">
                💌 holleeann@boutiquelittlebits.com
              </a>
            </div>
            <div className="flex gap-4 text-2xl mt-4">
              <a href="#" className="hover:text-brand-blush transition-colors">📸</a>
              <a href="#" className="hover:text-brand-blush transition-colors">🎵</a>
            </div>
          </div>
        </div>
        <div className="border-t border-brand-mint/30 mt-8 pt-8 text-center text-brand-mint">
          © 2025 Boutique Little Bits. Made with 💝
        </div>
      </div>
    </footer>
  );
}
