import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { CartProvider } from './components/CartContext'

export const metadata = {
  title: 'Boutique Little Bits | Curated Gifts & Joyful Surprises',
  description: 'Curated, colorful surprises and seeds of nostalgia for the fun aunties, thoughtful gifters, and everyone in between. Shop stickers, accessories, gift boxes and more.',
  keywords: 'gifts, stickers, accessories, boutique, curated gifts, nostalgia, fun gifts',
  openGraph: {
    title: 'Boutique Little Bits | Curated Gifts & Joyful Surprises',
    description: 'Creating moments of joy with curated, colorful surprises.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
