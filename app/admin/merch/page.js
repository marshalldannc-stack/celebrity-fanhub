"use client";
import { useState } from "react";

export default function AdminMerch() {
  const [items, setItems] = useState([
    { id: "1", name: "World Tour Hoodie", price: 65, category: "Clothing" },
    { id: "2", name: "Signed Vinyl", price: 45, category: "Music" },
    { id: "3", name: "Tour T-Shirt", price: 35, category: "Clothing" },
  ]);

  const addItem = () => {
    const name = prompt("Item name:");
    const price = prompt("Price:");
    const category = prompt("Category:");
    if (name && price) {
      setItems([...items, { id: Date.now().toString(), name, price: Number(price), category }]);
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(i => i.id !== id));
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