"use client";
import { useState, useEffect } from "react";

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("galleryImages");
    if (saved) setImages(JSON.parse(saved));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
      {images.length === 0 ? (
        <p className="text-gray-400">No photos yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <img key={i} src={img} className="w-full h-48 object-cover rounded-xl" />
          ))}
        </div>
      )}
    </div>
  );
}