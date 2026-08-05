"use client";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import "./globals.css";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="p-4 border-b border-gray-800">
      <div className="flex justify-between items-center">
        <a href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">FanHub</a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">☰</button>
        <div className="hidden md:flex space-x-4 text-sm">
          <a href="/events">Events</a>
          <a href="/merch">Merch</a>
          <a href="/fan-card">Fan Card</a>
          <a href="/cart">Cart</a>
          <a href="/profile">Profile</a>
          <a href="/login">Login</a>
          <a href="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-full">Sign Up</a>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 text-sm">
          <a href="/events" onClick={() => setMenuOpen(false)}>Events</a>
          <a href="/merch" onClick={() => setMenuOpen(false)}>Merch</a>
          <a href="/fan-card" onClick={() => setMenuOpen(false)}>Fan Card</a>
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
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6a6e84eb20d7701d492c081e/1juvreea4';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}