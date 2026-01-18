import "./globals.css";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-poppins" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-[#FAF8F5] text-[#2C2C2C] min-h-screen flex flex-col">
        {/* Simple Boutique Header */}
        <header className="bg-white border-b border-[#E5E5E5] py-6 px-10 flex justify-between items-center">
          <div className="text-2xl font-bold text-[#5F7F73]">Boutique Little Bits</div>
          <nav className="space-x-8 font-medium">
            <a href="/" className="hover:text-[#D7746B]">Home</a>
            <a href="/shop" className="hover:text-[#D7746B]">Shop</a>
          </nav>
        </header>

        <main className="flex-grow">{children}</main>

        {/* Boutique Footer */}
        <footer className="bg-[#5F7F73] text-white py-12 px-10 text-center">
          <p>© 2026 Boutique Little Bits. Creating Moments of Joy.</p>
        </footer>
      </body>
    </html>
  );
}
