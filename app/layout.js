import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#FAF8F5' }}>
        <header style={{ backgroundColor: 'white', borderBottom: '1px solid #EEE', padding: '20px', textAlign: 'center' }}>
          <h1 style={{ color: '#5F7F73', margin: 0 }}>Boutique Little Bits</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
