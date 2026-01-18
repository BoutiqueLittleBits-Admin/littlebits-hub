export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-emerald-700">
          ✨ Boutique Little Bits
        </div>
        <nav className="hidden md:flex gap-6 text-emerald-600 font-medium">
          <a href="#" className="hover:text-rose-500 transition-colors">Shop</a>
          <a href="#" className="hover:text-rose-500 transition-colors">About</a>
          <a href="#" className="hover:text-rose-500 transition-colors">Contact</a>
        </nav>
        <button className="bg-emerald-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-rose-500 transition-colors">
          🛒 Cart (0)
        </button>
      </div>
    </header>
  );
}
