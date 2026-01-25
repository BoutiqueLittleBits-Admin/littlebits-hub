import './globals.css'
import Script from 'next/script'
import Header from './components/Header'
import Footer from './components/Footer'
import Banner from './components/Banner'
import { CartProvider } from './components/CartContext'

export const metadata = {
  title: 'Boutique Little Bits | Curated Gifts & Joyful Surprises',
  description: 'Thoughtful. Curated. Creative. Because the best gifts come in little bits. Shop personalized gifts, spa kits, kids items, and unique finds.',
  keywords: 'gifts, personalized gifts, curated gifts, spa kits, kids gifts, boutique, unique gifts, gift sets',
  openGraph: {
    title: 'Boutique Little Bits | Curated Gifts & Joyful Surprises',
    description: 'Thoughtful. Curated. Creative. Because the best gifts come in little bits.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G00Z5GWDYB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G00Z5GWDYB');
          `}
        </Script>
      </head>
      <body>
        <CartProvider>
          <Banner />
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
