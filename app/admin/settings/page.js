"use client";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    artistName: "Artist Name",
    heroImage: "",
    logo: "",
    bio: "Official Fan Hub",
    eventsImage: "",
    fanCardImage: "",
    merchImage: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(data => {
      if (data) setSettings(prev => ({ ...prev, artistName: data.artistName || "Artist Name", bio: data.bio || "" }));
    });
    const imgs = localStorage.getItem("siteImages");
    if (imgs) setSettings(prev => ({ ...prev, ...JSON.parse(imgs) }));
  }, []);

  const handleImage = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updated = { ...settings, [field]: reader.result };
      setSettings(updated);
      const imgs = { heroImage: updated.heroImage, logo: updated.logo, eventsImage: updated.eventsImage, fanCardImage: updated.fanCardImage, merchImage: updated.merchImage };
      localStorage.setItem("siteImages", JSON.stringify(imgs));
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ artistName: settings.artistName, bio: settings.bio }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      <p className="text-gray-400 text-sm mb-4">Text saves to cloud. Images save to this browser.</p>
      <div className="space-y-4">
        <div>
          <label className="text-gray-400 text-sm">Artist Name</label>
          <input value={settings.artistName} onChange={(e) => setSettings({ ...settings, artistName: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white" />
        </div>
        <div>
          <label className="text-gray-400 text-sm">Tagline / Bio</label>
          <input value={settings.bio} onChange={(e) => setSettings({ ...settings, bio: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white" />
        </div>
        <button onClick={save} className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-bold">
          {saved ? "Saved ✓" : "Save Name & Bio"}
        </button>
        <hr className="border-gray-700" />
        <div>
          <label className="text-gray-400 text-sm">Hero Background Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleImage(e, "heroImage")} className="w-full text-white text-sm mt-1" />
          {settings.heroImage && <img src={settings.heroImage} className="h-32 rounded mt-2" />}
        </div>
        <div>
          <label className="text-gray-400 text-sm">Events Section Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleImage(e, "eventsImage")} className="w-full text-white text-sm mt-1" />
          {settings.eventsImage && <img src={settings.eventsImage} className="h-16 rounded mt-2" />}
        </div>
        <div>
          <label className="text-gray-400 text-sm">Fan Card Section Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleImage(e, "fanCardImage")} className="w-full text-white text-sm mt-1" />
          {settings.fanCardImage && <img src={settings.fanCardImage} className="h-16 rounded mt-2" />}
        </div>
        <div>
          <label className="text-gray-400 text-sm">Merch Section Image</label>
          <input type="file" accept="image/*" onChange={(e) => handleImage(e, "merchImage")} className="w-full text-white text-sm mt-1" />
          {settings.merchImage && <img src={settings.merchImage} className="h-16 rounded mt-2" />}
        </div>
        <div>
          <label className="text-gray-400 text-sm">Logo</label>
          <input type="file" accept="image/*" onChange={(e) => handleImage(e, "logo")} className="w-full text-white text-sm mt-1" />
          {settings.logo && <img src={settings.logo} className="h-12 rounded mt-2" />}
        </div>
      </div>
    </div>
  );
}