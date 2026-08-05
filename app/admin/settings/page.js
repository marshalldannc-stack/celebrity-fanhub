"use client";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    artistName: "Artist Name",
    heroImage: "",
    logo: "",
    bio: "Official Fan Hub — Events, Merch & Exclusive Content",
    primaryColor: "purple",
    eventsImage: "",
    fanCardImage: "",
    merchImage: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(data => {
      if (data) setSettings(data);
    });
  }, []);

  const handleImage = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSettings({ ...settings, [field]: reader.result });
    reader.readAsDataURL(file);
  };

  const save = async () => {
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      <div className="space-y-4">
        <div>
          <label className="text-gray-400 text-sm">Artist Name</label>
          <input value={settings.artistName} onChange={(e) => setSettings({ ...settings, artistName: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white" />
        </div>
        <div>
          <label className="text-gray-400 text-sm">Tagline / Bio</label>
          <input value={settings.bio} onChange={(e) => setSettings({ ...settings, bio: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white" />
        </div>
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
        <div>
          <label className="text-gray-400 text-sm">Theme Color</label>
          <select value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white">
            <option value="purple">Purple</option>
            <option value="pink">Pink</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
          </select>
        </div>
        <button onClick={save} className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-bold">
          {saved ? "Saved ✓" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}