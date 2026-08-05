"use client";
import { useState, useEffect } from "react";

const defaultTiers = [
  { name: "Bronze", price: 0, emoji: "🥉", perks: ["Digital Card", "Newsletter Access"], image: "" },
  { name: "Silver", price: 19, emoji: "🥈", perks: ["Everything in Bronze", "5% Merch Discount", "Early Access Codes"], image: "" },
  { name: "Gold", price: 49, emoji: "🌟", perks: ["Everything in Silver", "10% Merch Discount", "Presale Access", "Physical Card"], image: "" },
  { name: "Platinum", price: 99, emoji: "💎", perks: ["Everything in Gold", "VIP Meet & Greet", "Signed Merch", "Exclusive Content"], image: "" },
  { name: "Diamond", price: 249, emoji: "👑", perks: ["Everything in Platinum", "Backstage Pass", "Personal Video Message", "Lifetime Access"], image: "" },
];

export default function AdminFanCards() {
  const [tiers, setTiers] = useState(defaultTiers);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ name: "", price: 0, emoji: "", perks: "", image: "" });

  useEffect(() => {
    const saved = localStorage.getItem("fanCardTiers");
    if (saved) setTiers(JSON.parse(saved));
  }, []);

  const saveTiers = (newTiers) => {
    setTiers(newTiers);
    localStorage.setItem("fanCardTiers", JSON.stringify(newTiers));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const w = 300;
      const h = (img.height / img.width) * w;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      setForm({ ...form, image: canvas.toDataURL("image/jpeg", 0.5) });
    };
    img.src = URL.createObjectURL(file);
  };

  const edit = (idx) => {
    const t = tiers[idx];
    setForm({ name: t.name, price: t.price, emoji: t.emoji, perks: t.perks.join(", "), image: t.image || "" });
    setEditIdx(idx);
  };

  const save = () => {
    const newTier = { ...form, price: Number(form.price), perks: form.perks.split(",").map(p => p.trim()) };
    const newTiers = [...tiers];
    if (editIdx !== null) newTiers[editIdx] = newTier;
    saveTiers(newTiers);
    setEditIdx(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Fan Card Tiers</h1>
      
      {editIdx !== null && (
        <div className="border border-gray-700 rounded-xl p-4 mb-6 space-y-3">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Tier Name" />
          <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} type="number" className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Price" />
          <input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Emoji" />
          <input value={form.perks} onChange={(e) => setForm({ ...form, perks: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Perks (comma separated)" />
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
            <p className="text-purple-400">${tier.price}/mo</p>
            <button onClick={() => edit(i)} className="mt-2 text-blue-400 text-xs">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}