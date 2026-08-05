import "./globals.css";

export const metadata = {
  title: "Artist Fan Hub",
  description: "Official fan hub with events, merch, and exclusive content",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <nav className="p-4 border-b border-gray-800 flex justify-between items-center">
          <a href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">FanHub</a>
          <div className="space-x-4 text-sm">
            <a href="/events">Events</a>
            <a href="/merch">Merch</a>
            <a href="/fan-card">Fan Card</a>
            <a href="/cart">Cart</a>
            <a href="/login">Login</a>
            <a href="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-full">Sign Up</a>
          </div>
        </nav>
        <main className="p-4 md:p-6">{children}</main>
      </body>
    </html>
  );
}