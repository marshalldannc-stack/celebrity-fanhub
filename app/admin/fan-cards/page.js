"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const defaultTiers = [
  { name: "Bronze", price: 299, emoji: "🥉", perks: ["Official digital fan card", "Exclusive updates and announcements", "Access to behind-the-scenes content", "Member-only newsletter", "Early access to ticket sales (24 hours before public)"], image: "" },
  { name: "Silver", price: 549, emoji: "🥈", perks: ["Everything in Bronze", "Priority access to select events", "10% discount on official merchandise", "Exclusive digital content", "Member-only promotions and giveaways", "Birthday shoutout from Matt Rife Nation"], image: "" },
  { name: "Gold", price: 950, emoji: "🌟", perks: ["Everything in Silver", "Front Row Access to select events", "20% discount on official merchandise", "Signed collectible item (annual)", "Virtual Q&A sessions with Matt Rife", "Exclusive Gold Member merchandise drop"], image: "" },
  { name: "Platinum", price: 1600, emoji: "💎", perks: ["Everything in Gold", "Meet-and-Greet opportunities with Matt Rife", "Signed memorabilia and collectibles", "VIP access to exclusive events", "Personal video message from Matt Rife (annual)", "Premium merchandise package", "Dedicated concierge support"], image: "" },
  { name: "Diamond", price: 2499, emoji: "👑", perks: ["Everything in Platinum", "Ultimate VIP experience - backstage access", "Private meet-up with Matt Rife (annual)", "Lifetime legacy membership recognition", "Custom engraved collectible", "First access to ALL future events and merch", "One-of-a-kind signed item", "Name in Matt Rife Nation Hall of Fame"], image: "" },
];

const taglines = ["Real Stories. Real Connections. Real Legacy.", "Be Part of the Legend.", "Front Row Access.", "Join the Legacy.", "A Comedy Icon. A Timeless Legend."];

export default function FanCardPage() {
  const router = useRouter();
  const [tiers, setTiers] = useState(defaultTiers);

  useEffect(() => {
    fetch("/api/fan-cards").then(r => r.json()).then(data => {
      if (data && data.length > 0) setTiers(data);
    });
  }, []);

  const join = (tier) => {
    const cart = { items: [{ id: tier.name, name: `${tier.name} Fan Card`, price: tier.price, qty: 1 }], total: tier.price, event: `${tier.name} Fan Card - Annual Membership` };
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">Matt Rife Fan Card</h1>
      <p className="text-gray-400 text-center mb-2">Choose Your Access. Join the Legacy.</p>
      <p className="text-gray-500 text-sm text-center mb-8">All plans billed annually. Cancel anytime.</p>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {tiers.map((tier, i) => (
          <div key={i} className={`border rounded-xl p-5 text-center ${i === 4 ? "border-pink-500 bg-pink-500/10" : i === 3 ? "border-purple-500 bg-purple-500/10" : "border-gray-700"} hover:scale-105 transition`}>
            {tier.image ? <img src={tier.image} className="w-full h-32 object-cover rounded-lg mb-3" /> : <div className="text-5xl mb-3">{tier.emoji}</div>}
            <h2 className="text-lg font-bold">{tier.name}</h2>
            <p className="text-xs text-gray-400 italic mt-1">"{taglines[i]}"</p>
            <p className="text-2xl font-bold mt-2 text-purple-400">${tier.price}<span className="text-sm text-gray-400">/yr</span></p>
            <ul className="text-gray-400 text-xs mt-3 space-y-1.5 text-left">
              {tier.perks.map((p, j) => <li key={j} className="flex gap-2"><span>✓</span> {p}</li>)}
            </ul>
            <button onClick={() => join(tier)} className={`mt-4 w-full py-2 rounded-full text-sm font-bold ${i === 4 ? "bg-pink-600 text-white hover:bg-pink-500" : i === 3 ? "bg-purple-600 text-white hover:bg-purple-500" : "bg-white text-black hover:bg-gray-200"}`}>
              Join {tier.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}