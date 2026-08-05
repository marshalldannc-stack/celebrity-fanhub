"use client";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Events", "Merch", "Fan Card", "Gallery", "About", "Contact"];

  return (
    <nav className="p-4 border-b border-gray-800">
      <div className="flex justify-between items-center">
        <a href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">FanHub</a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">☰</button>
        <div className="hidden md:flex space-x-4 text-sm items-center">
          {links.map(l => <a key={l} href={`/${l.toLowerCase().replace(" ", "-")}`}>{l}</a>)}
          <a href="/cart">Cart</a>
          <a href="/profile">Profile</a>
          <a href="/login">Login</a>
          <a href="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-full">Sign Up</a>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 text-sm">
          {links.map(l => <a key={l} href={`/${l.toLowerCase().replace(" ", "-")}`} onClick={() => setMenuOpen(false)}>{l}</a>)}
          <a href="/cart" onClick={() => setMenuOpen(false)}>Cart</a>
          <a href="/profile" onClick={() => setMenuOpen(false)}>Profile</a>
          <a href="/login" onClick={() => setMenuOpen(false)}>Login</a>
          <a href="/signup" onClick={() => setMenuOpen(false)} className="bg-purple-600 text-white px-4 py-2 rounded-full w-fit">Sign Up</a>
        </div>
      )}
    </nav>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <SessionProvider>
          <NavBar />
          <main className="p-4 md:p-6">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}