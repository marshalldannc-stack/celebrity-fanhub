"use client";
import { useState } from "react";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

function NavBar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: "/events", label: "Events" },
    { href: "/merch", label: "Merch" },
    { href: "/fan-card", label: "Fan Card" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/updates", label: "Updates" },
  ];

  return (
    <nav className="p-4 border-b border-gray-800">
      <div className="flex justify-between items-center">
        <a href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">FanHub</a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">☰</button>
        <div className="hidden md:flex space-x-4 text-sm items-center">
          {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
          <a href="/cart">Cart</a>
          <a href="/profile">Profile</a>
          {session ? (
            <>
              <span className="text-gray-400 text-xs">{session.user.email}</span>
              <button onClick={() => signOut()} className="bg-red-600 text-white px-3 py-1 rounded-full text-xs">Logout</button>
            </>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/signup" className="bg-purple-600 text-white px-4 py-2 rounded-full">Sign Up</a>
            </>
          )}
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 text-sm">
          {links.map(l => <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>)}
          <a href="/cart" onClick={() => setMenuOpen(false)}>Cart</a>
          <a href="/profile" onClick={() => setMenuOpen(false)}>Profile</a>
          {session ? (
            <>
              <span className="text-gray-400 text-xs">{session.user.email}</span>
              <button onClick={() => { signOut(); setMenuOpen(false); }} className="bg-red-600 text-white px-3 py-1 rounded-full text-xs w-fit">Logout</button>
            </>
          ) : (
            <>
              <a href="/login" onClick={() => setMenuOpen(false)}>Login</a>
              <a href="/signup" onClick={() => setMenuOpen(false)} className="bg-purple-600 text-white px-4 py-2 rounded-full w-fit">Sign Up</a>
            </>
          )}
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
        <Analytics />
      </body>
    </html>
  );
}