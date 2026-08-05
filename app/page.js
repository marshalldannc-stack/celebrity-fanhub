"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  const [settings, setSettings] = useState({
    artistName: "Artist Name",
    heroImage: "",
    bio: "Official Fan Hub — Events, Merch & Exclusive Content",
    eventsImage: "",
    fanCardImage: "",
    merchImage: "",
  });

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(data => {
      if (data) setSettings(data);
    });
  }, []);

  return (
    <div>
      <section className="text-center py-20 relative" style={settings.heroImage ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${settings.heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } : {}}>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          {settings.artistName}
        </h1>
        <p className="text-gray-400 text-lg mb-8">{settings.bio}</p>
        <div className="flex gap-4 justify-center">
          <Link href="/events" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200">Tour Dates</Link>
          <Link href="/merch" className="border border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition">Shop Merch</Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
        <div className="border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500 transition">
          {settings.eventsImage ? <img src={settings.eventsImage} className="w-full h-40 object-cover" /> : <div className="w-full h-40 bg-gray-800 flex items-center justify-center text-5xl">🎵</div>}
          <div className="p-6 text-center">
            <h3 className="font-bold text-lg">Events & Tickets</h3>
            <p className="text-gray-400 text-sm mt-2">Get tickets to upcoming shows and meet & greets.</p>
            <Link href="/events" className="text-purple-400 text-sm mt-4 inline-block">Browse Events →</Link>
          </div>
        </div>
        <div className="border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500 transition">
          {settings.fanCardImage ? <img src={settings.fanCardImage} className="w-full h-40 object-cover" /> : <div className="w-full h-40 bg-gray-800 flex items-center justify-center text-5xl">💳</div>}
          <div className="p-6 text-center">
            <h3 className="font-bold text-lg">Fan Card</h3>
            <p className="text-gray-400 text-sm mt-2">Get your exclusive digital fan card with perks.</p>
            <Link href="/fan-card" className="text-purple-400 text-sm mt-4 inline-block">Get Yours →</Link>
          </div>
        </div>
        <div className="border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500 transition">
          {settings.merchImage ? <img src={settings.merchImage} className="w-full h-40 object-cover" /> : <div className="w-full h-40 bg-gray-800 flex items-center justify-center text-5xl">👕</div>}
          <div className="p-6 text-center">
            <h3 className="font-bold text-lg">Merch Store</h3>
            <p className="text-gray-400 text-sm mt-2">Exclusive clothing, accessories & more.</p>
            <Link href="/merch" className="text-purple-400 text-sm mt-4 inline-block">Shop Now →</Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}