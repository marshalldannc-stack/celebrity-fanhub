import Link from "next/link";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  return (
    <div>
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          Artist Name
        </h1>
        <p className="text-gray-400 text-lg mb-8">Official Fan Hub — Events, Merch & Exclusive Content</p>
        <div className="flex gap-4 justify-center">
          <Link href="/events" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200">Tour Dates</Link>
          <Link href="/merch" className="border border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition">Shop Merch</Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
        <div className="border border-gray-700 rounded-xl p-6 text-center hover:border-purple-500 transition">
          <div className="text-4xl mb-3">🎵</div>
          <h3 className="font-bold text-lg">Events & Tickets</h3>
          <p className="text-gray-400 text-sm mt-2">Get tickets to upcoming shows and meet & greets.</p>
          <Link href="/events" className="text-purple-400 text-sm mt-4 inline-block">Browse Events →</Link>
        </div>
        <div className="border border-gray-700 rounded-xl p-6 text-center hover:border-purple-500 transition">
          <div className="text-4xl mb-3">💳</div>
          <h3 className="font-bold text-lg">Fan Card</h3>
          <p className="text-gray-400 text-sm mt-2">Get your exclusive digital fan card with perks.</p>
          <Link href="/fan-card" className="text-purple-400 text-sm mt-4 inline-block">Get Yours →</Link>
        </div>
        <div className="border border-gray-700 rounded-xl p-6 text-center hover:border-purple-500 transition">
          <div className="text-4xl mb-3">👕</div>
          <h3 className="font-bold text-lg">Merch Store</h3>
          <p className="text-gray-400 text-sm mt-2">Exclusive clothing, accessories & more.</p>
          <Link href="/merch" className="text-purple-400 text-sm mt-4 inline-block">Shop Now →</Link>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}