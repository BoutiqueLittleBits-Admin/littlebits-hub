import "./globals.css";

export const metadata = {
  title: "Boutique Little Bits",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
