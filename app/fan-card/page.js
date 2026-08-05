"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const defaultTiers = [
  { name: "Bronze", price: 0, emoji: "🥉", perks: ["Digital Card", "Newsletter Access"], image: "" },
  { name: "Silver", price: 19, emoji: "🥈", perks: ["Everything in Bronze", "5% Merch Discount", "Early Access Codes"], image: "" },
  { name: "Gold", price: 49, emoji: "🌟", perks: ["Everything in Silver", "10% Merch Discount", "Presale Access", "Physical Card"], image: "" },
  { name: "Platinum", price: 99, emoji: "💎", perks: ["Everything in Gold", "VIP Meet & Greet", "Signed Merch", "Exclusive Content"], image: "" },
  { name: "Diamond", price: 249, emoji: "👑", perks: ["Everything in Platinum", "Backstage Pass", "Personal Video Message", "Lifetime Access"], image: "" },
];

export default function FanCardPage() {
  const router = useRouter();
  const [tiers, setTiers] = useState(defaultTiers);

  useEffect(() => {
    const saved = localStorage.getItem("fanCardTiers");
    if (saved) setTiers(JSON.parse(saved));
  }, []);

  const join = (tier) => {
    const cart = {
      items: [{ id: tier.name, name: `${tier.name} Fan Card`, price: tier.price, qty: 1 }],
      total: tier.price,
      event: `${tier.name} Fan Card - Monthly`,
    };
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/cart");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Fan Membership Card</h1>
      <p className="text-gray-400 mb-8">Get your exclusive digital fan card with special perks.</p>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {tiers.map((tier, i) => (
          <div key={i} className="border border-gray-700 rounded-xl p-4 text-center">
            {tier.image ? <img src={tier.image} className="w-full h-32 object-cover rounded-lg mb-3" /> : <div className="text-4xl mb-3">{tier.emoji}</div>}
            <h2 className="text-lg font-bold">{tier.name}</h2>
            <p className="text-xl font-bold mt-1">{tier.price === 0 ? "Free" : `$${tier.price}/mo`}</p>
            <ul className="text-gray-400 text-xs mt-3 space-y-1 text-left">
              {tier.perks.map((p, j) => <li key={j}>✓ {p}</li>)}
            </ul>
            <button onClick={() => join(tier)} className={`mt-4 w-full py-2 rounded-full text-sm font-bold ${tier.price === 0 ? "border border-white text-white" : "bg-white text-black"}`}>
              {tier.price === 0 ? "Get Free" : "Join"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}