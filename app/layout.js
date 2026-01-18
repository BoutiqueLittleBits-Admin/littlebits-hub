import "./globals.css";

export const metadata = {
  title: "Boutique Little Bits",
  description: "Creating Moments of Joy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#FAF8F5', color: '#2C2C2C', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header style={{ backgroundColor: 'white', borderBottom: '1px solid #E5E5E5', padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#5F7F73' }}>Boutique Little Bits</div>
          <nav>
            <a href="/" style={{ marginRight: '20px', textDecoration: 'none', color: 'inherit' }}>Home</a>
            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Shop</a>
          </nav>
        </header>
        <main style={{ flexGrow: 1 }}>{children}</main>
        <footer style={{ backgroundColor: '#5F7F73', color: 'white', padding: '48px 40px', textAlign: 'center' }}>
          <p>© 2026 Boutique Little Bits. Creating Moments of Joy.</p>
        </footer>
      </body>
    </html>
  );
}
