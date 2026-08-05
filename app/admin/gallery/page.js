"use client";
import { useState, useEffect } from "react";

export default function AdminGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("galleryImages");
    if (saved) setImages(JSON.parse(saved));
  }, []);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      const w = 600; const h = (img.height / img.width) * w;
      canvas.width = w; canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      const compressed = canvas.toDataURL("image/jpeg", 0.5);
      const updated = [...images, compressed];
      setImages(updated);
      localStorage.setItem("galleryImages", JSON.stringify(updated));
    };
    img.src = URL.createObjectURL(file);
  };

  const remove = (i) => {
    const updated = images.filter((_, idx) => idx !== i);
    setImages(updated);
    localStorage.setItem("galleryImages", JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Gallery</h1>
      <label className="bg-purple-600 text-white px-4 py-2 rounded-full cursor-pointer inline-block mb-6">+ Add Photo <input type="file" accept="image/*" onChange={handleImage} className="hidden" /></label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div key={i} className="relative">
            <img src={img} className="w-full h-32 object-cover rounded-xl" />
            <button onClick={() => remove(i)} className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}