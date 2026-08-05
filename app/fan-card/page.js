import prisma from "@/lib/prisma";
import JoinButton from "./JoinButton";

export const dynamic = "force-dynamic";
export const revalidate = 30;

const defaultTiers = [
  { name: "Bronze", price: 299, emoji: "🥉", perks: ["Official digital fan card", "Exclusive updates", "Behind-the-scenes content", "Member-only newsletter", "Early ticket access"], image: "" },
  { name: "Silver", price: 549, emoji: "🥈", perks: ["Everything in Bronze", "Priority event access", "10% merch discount", "Exclusive digital content", "Member-only giveaways", "Birthday shoutout"], image: "" },
  { name: "Gold", price: 950, emoji: "🌟", perks: ["Everything in Silver", "Front Row Access", "20% merch discount", "Signed collectible (annual)", "Virtual Q&A sessions", "Exclusive merch drop"], image: "" },
  { name: "Platinum", price: 1600, emoji: "💎", perks: ["Everything in Gold", "Meet-and-Greet", "Signed memorabilia", "VIP event access", "Personal video message", "Premium merch package", "Concierge support"], image: "" },
  { name: "Diamond", price: 2499, emoji: "👑", perks: ["Everything in Platinum", "Backstage access", "Private meet-up (annual)", "Lifetime recognition", "Custom collectible", "First access to everything", "One-of-a-kind signed item"], image: "" },
];

const taglines = ["Real Stories. Real Connections.", "Be Part of the Legend.", "Front Row Access.", "Join the Legacy.", "A Comedy Icon. A Timeless Legend."];

async function getTiers() {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: "fanCardTiers" } });
    if (row?.value) return JSON.parse(row.value);
  } catch {}
  return defaultTiers;
}

export default async function FanCardPage() {
  const tiers = await getTiers();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-center">Matt Rife Fan Card</h1>
      <p className="text-gray-400 text-center mb-2">Choose Your Access. Join the Legacy.</p>
      <p className="text-gray-500 text-sm text-center mb-8">All plans billed annually. Cancel anytime.</p>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {tiers.map((tier, i) => (
          <div key={i} className={`border rounded-xl p-5 text-center ${i === 4 ? "border-pink-500 bg-pink-500/10" : i === 3 ? "border-purple-500 bg-purple-500/10" : "border-gray-700"}`}>
            {tier.image ? <img src={tier.image} className="w-full h-32 object-cover rounded-lg mb-3" /> : <div className="text-5xl mb-3">{tier.emoji}</div>}
            <h2 className="text-lg font-bold">{tier.name}</h2>
            <p className="text-xs text-gray-400 italic mt-1">"{taglines[i]}"</p>
            <p className="text-2xl font-bold mt-2 text-purple-400">${tier.price}<span className="text-sm text-gray-400">/yr</span></p>
            <ul className="text-gray-400 text-xs mt-3 space-y-1.5 text-left">
              {tier.perks.map((p, j) => <li key={j} className="flex gap-2"><span>✓</span> {p}</li>)}
            </ul>
            <JoinButton tier={tier} />
          </div>
        ))}
      </div>
    </div>
  );
}