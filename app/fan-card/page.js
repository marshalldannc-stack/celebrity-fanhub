"use client";

export default function FanCardPage() {
  const tiers = [
    { name: "Bronze", price: "Free", emoji: "🥉", color: "border-amber-600", bg: "bg-amber-600/10", perks: ["Digital Card", "Newsletter Access"] },
    { name: "Silver", price: "$19/yr", emoji: "🥈", color: "border-gray-300", bg: "bg-gray-500/10", perks: ["Everything in Bronze", "5% Merch Discount", "Early Access Codes"] },
    { name: "Gold", price: "$49/yr", emoji: "🌟", color: "border-yellow-500", bg: "bg-yellow-500/10", perks: ["Everything in Silver", "10% Merch Discount", "Presale Access", "Physical Card"] },
    { name: "Platinum", price: "$99/yr", emoji: "💎", color: "border-purple-500", bg: "bg-purple-500/10", perks: ["Everything in Gold", "VIP Meet & Greet", "Signed Merch", "Exclusive Content"] },
    { name: "Diamond", price: "$249/yr", emoji: "👑", color: "border-pink-500", bg: "bg-pink-500/10", perks: ["Everything in Platinum", "Backstage Pass", "Personal Video Message", "Lifetime Membership"] },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Fan Membership Card</h1>
      <p className="text-gray-400 mb-8">Get your exclusive digital fan card with special perks and discounts.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {tiers.map((tier, i) => (
          <div key={i} className={`border ${tier.color} ${tier.bg} rounded-xl p-5 text-center`}>
            <div className="text-4xl mb-3">{tier.emoji}</div>
            <h2 className="text-lg font-bold">{tier.name}</h2>
            <p className="text-xl font-bold mt-1">{tier.price}</p>
            <ul className="text-gray-400 text-xs mt-4 space-y-2 text-left">
              {tier.perks.map((perk, j) => (
                <li key={j}>✓ {perk}</li>
              ))}
            </ul>
            <button className={`mt-6 w-full py-2 rounded-full text-sm font-bold ${i === 4 ? "bg-pink-600 text-white" : "border border-white text-white"}`}>
              {tier.price === "Free" ? "Get Free" : "Join " + tier.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}