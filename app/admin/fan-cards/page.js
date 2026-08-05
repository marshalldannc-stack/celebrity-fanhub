"use client";
import { useState, useEffect } from "react";

const defaultTiers = [
  { name: "Bronze", price: 299, emoji: "🥉", perks: ["Official digital fan card", "Exclusive updates and announcements", "Access to behind-the-scenes content", "Member-only newsletter", "Early access to ticket sales (24 hours before public)"], image: "" },
  { name: "Silver", price: 549, emoji: "🥈", perks: ["Everything in Bronze", "Priority access to select events", "10% discount on official merchandise", "Exclusive digital content (unreleased photos, videos)", "Member-only promotions and giveaways", "Birthday shoutout from Matt Rife Nation"], image: "" },
  { name: "Gold", price: 950, emoji: "🌟", perks: ["Everything in Silver", "Front Row Access to select events", "20% discount on official merchandise", "Signed collectible item (annual)", "Virtual Q&A sessions with Matt Rife", "Exclusive Gold Member merchandise drop"], image: "" },
  { name: "Platinum", price: 1600, emoji: "💎", perks: ["Everything in Gold", "Meet-and-Greet opportunities with Matt Rife", "Signed memorabilia and collectibles", "VIP access to exclusive events", "Personal video message from Matt Rife (annual)", "Premium merchandise package", "Dedicated concierge support"], image: "" },
  { name: "Diamond", price: 2499, emoji: "👑", perks: ["Everything in Platinum", "Ultimate VIP experience - backstage access at select events", "Private meet-up with Matt Rife (annual)", "Lifetime legacy membership recognition", "Custom engraved collectible", "First access to ALL future events, merch, and announcements", "One-of-a-kind signed item", "Name featured in Matt Rife Nation Hall of Fame"], image: "" },
];

export default function AdminFanCards() {
  const [tiers, setTiers] = useState(defaultTiers);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ name: "", price: 0, emoji: "", perks: "", image: "" });

  useEffect(() => {
    fetch("/api/fan-cards").then(r => r.json()).then(data => {
      if (data && data.length > 0) setTiers(data);
    });
  }, []);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const w = 300; const h = (img.height / img.width) * w;
      canvas.width = w; canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      setForm({ ...form, image: canvas.toDataURL("image/jpeg", 0.5) });
    };
    img.src = URL.createObjectURL(file);
  };

  const edit = (idx) => {
    const t = tiers[idx];
    setForm({ name: t.name, price: t.price, emoji: t.emoji, perks: t.perks.join("\n"), image: t.image || "" });
    setEditIdx(idx);
  };

  const save = async () => {
    const newTier = { ...form, price: Number(form.price), perks: form.perks.split("\n").map(p => p.trim()).filter(p => p) };
    const newTiers = [...tiers];
    if (editIdx !== null) newTiers[editIdx] = newTier;
    setTiers(newTiers);
    await fetch("/api/fan-cards", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newTiers) });
    setEditIdx(null);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Fan Card Tiers</h1>
      {editIdx !== null && (
        <div className="border border-gray-700 rounded-xl p-4 mb-6 space-y-3">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Tier Name" />
          <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} type="number" className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Price" />
          <input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Emoji" />
          <textarea value={form.perks} onChange={(e) => setForm({ ...form, perks: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm" placeholder="Perks (one per line)" rows="5" />
          <label className="text-gray-400 text-sm block">Image <input type="file" accept="image/*" onChange={handleImage} className="mt-1" /></label>
          {form.image && <img src={form.image} className="h-16 rounded" />}
          <div className="flex gap-2">
            <button onClick={save} className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">Save</button>
            <button onClick={() => setEditIdx(null)} className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">Cancel</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {tiers.map((tier, i) => (
          <div key={i} className="border border-gray-700 rounded-xl p-4 text-center">
            {tier.image ? <img src={tier.image} className="w-full h-24 object-cover rounded-lg mb-2" /> : <div className="text-4xl mb-2">{tier.emoji}</div>}
            <h3 className="font-bold">{tier.name}</h3>
            <p className="text-purple-400">${tier.price}/yr</p>
            <p className="text-gray-500 text-xs mt-1">{tier.perks.length} perks</p>
            <button onClick={() => edit(i)} className="mt-2 text-blue-400 text-xs">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}