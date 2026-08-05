"use client";
import { useState, useEffect } from "react";

export default function AdminMerch() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/merch").then(r => r.json()).then(setItems);
  }, []);

  const addItem = async () => {
    const name = prompt("Item name:");
    const price = prompt("Price:");
    const category = prompt("Category:");
    if (!name || !price) return;
    await fetch("/api/merch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price), category }),
    });
    const res = await fetch("/api/merch");
    setItems(await res.json());
  };

  const deleteItem = async (id) => {
    await fetch(`/api/merch/${id}`, { method: "DELETE" });
    const res = await fetch("/api/merch");
    setItems(await res.json());
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Merch</h1>
        <button onClick={addItem} className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm">+ Add Item</button>
      </div>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="border border-gray-700 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-gray-400 text-sm">${item.price} • {item.category}</p>
            </div>
            <button onClick={() => deleteItem(item.id)} className="text-red-400 text-sm">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}