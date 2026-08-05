"use client";
import { useState, useEffect } from "react";

export default function MerchPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/merch").then(r => r.json()).then(setItems);
  }, []);

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
            <div className="text-5xl mb-3">👕</div>
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