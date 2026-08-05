"use client";
import { useState } from "react";

const items = [
  { id: "1", name: "World Tour Hoodie", price: 65, image: "👕", category: "Clothing" },
  { id: "2", name: "Signed Vinyl", price: 45, image: "💿", category: "Music" },
  { id: "3", name: "Tour T-Shirt", price: 35, image: "👚", category: "Clothing" },
  { id: "4", name: "Phone Case", price: 25, image: "📱", category: "Accessories" },
  { id: "5", name: "Poster Set", price: 20, image: "🖼️", category: "Accessories" },
  { id: "6", name: "Limited Hat", price: 30, image: "🧢", category: "Clothing" },
];

export default function MerchPage() {
  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart") || '{"items":[],"total":0,"event":"Merch"}');
    const existing = cart.items.find(i => i.id === item.id);
    if (existing) existing.qty += 1;
    else cart.items.push({ ...item, qty: 1 });
    cart.total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Merch Store</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="border border-gray-700 rounded-xl p-4 hover:border-purple-500 transition text-center">
            <div className="text-5xl mb-3">{item.image}</div>
            <p className="text-xs text-gray-400">{item.category}</p>
            <h3 className="font-bold mt-1">{item.name}</h3>
            <p className="text-purple-400 font-bold mt-2">${item.price}</p>
            <button onClick={() => addToCart(item)} className="mt-3 bg-white text-black px-4 py-2 rounded-full text-sm font-bold w-full">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}