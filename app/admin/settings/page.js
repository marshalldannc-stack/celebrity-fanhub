"use client";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    artistName: "Artist Name",
    heroImage: "",
    logo: "",
    primaryColor: "purple",
    bio: "Official Fan Hub — Events, Merch & Exclusive Content",
  });

  useEffect(() => {
    const saved = localStorage.getItem("siteSettings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleImage = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSettings({ ...settings, [field]: reader.result });
    reader.readAsDataURL(file);
  };

  const save = () => {
    localStorage.setItem("siteSettings", JSON.stringify(settings));
    alert("Settings saved! Refresh the site to see changes.");
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
        <button onClick={save} className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-bold">Save Settings</button>
      </div>
    </div>
  );
}