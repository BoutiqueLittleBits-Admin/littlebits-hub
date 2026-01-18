export default function Footer() {
  return (
    <footer className="bg-emerald-700 text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">✨ Boutique Little Bits</h3>
            <p className="text-emerald-100">
              Creating moments of joy with curated, colorful surprises.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2 text-emerald-100">
              <a href="/shop" className="hover:text-white transition-colors">Shop All</a>
              <a href="/about" className="hover:text-white transition-colors">About Us</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-emerald-100 mb-4">Follow us for updates and joy!</p>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-rose-300 transition-colors">📸</a>
              <a href="#" className="hover:text-rose-300 transition-colors">💌</a>
              <a href="#" className="hover:text-rose-300 transition-colors">🎵</a>
            </div>
          </div>
        </div>
        <div className="border-t border-emerald-600 mt-8 pt-8 text-center text-emerald-100">
          © 2025 Boutique Little Bits. Made with 💝
        </div>
      </div>
    </footer>
  );
}
