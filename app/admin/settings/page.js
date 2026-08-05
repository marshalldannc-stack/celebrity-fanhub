"use client";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    artistName: "",
    heroImage: "",
    logo: "",
    bio: "",
    news: "",
    eventsImage: "",
    fanCardImage: "",
    merchImage: "",
  });

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(data => {
      if (data) setSettings(prev => ({ ...prev, ...data }));
    });
  }, []);

  const handleImage = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const w = 600;
      const h = (img.height / img.width) * w;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      const compressed = canvas.toDataURL("image/jpeg", 0.5);
      setSettings(prev => ({ ...prev, [field]: compressed }));
    };
    img.src = URL.createObjectURL(file);
  };

  const save = async () => {
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    alert("Saved!");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      <div className="space-y-4">
        <input value={settings.artistName} onChange={(e) => setSettings({ ...settings, artistName: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white" placeholder="Artist Name" />
        <input value={settings.bio} onChange={(e) => setSettings({ ...settings, bio: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white" placeholder="Bio" />
        <textarea value={settings.news || ""} onChange={(e) => setSettings({ ...settings, news: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm" placeholder="News / Updates (shown on homepage)" rows="3" />
        <label className="text-gray-400 text-sm block">Hero Image <input type="file" accept="image/*" onChange={(e) => handleImage(e, "heroImage")} className="mt-1" /></label>
        {settings.heroImage && <img src={settings.heroImage} className="h-20 rounded" />}
        <label className="text-gray-400 text-sm block">Events Image <input type="file" accept="image/*" onChange={(e) => handleImage(e, "eventsImage")} className="mt-1" /></label>
        {settings.eventsImage && <img src={settings.eventsImage} className="h-20 rounded" />}
        <label className="text-gray-400 text-sm block">Fan Card Image <input type="file" accept="image/*" onChange={(e) => handleImage(e, "fanCardImage")} className="mt-1" /></label>
        {settings.fanCardImage && <img src={settings.fanCardImage} className="h-20 rounded" />}
        <label className="text-gray-400 text-sm block">Merch Image <input type="file" accept="image/*" onChange={(e) => handleImage(e, "merchImage")} className="mt-1" /></label>
        {settings.merchImage && <img src={settings.merchImage} className="h-20 rounded" />}
        <button onClick={save} className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-bold">Save All</button>
      </div>
    </div>
  );
}