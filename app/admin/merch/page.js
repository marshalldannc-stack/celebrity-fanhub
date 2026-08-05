"use client";
import { useState, useEffect } from "react";

export default function AdminMerch() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const loadItems = async () => {
    const res = await fetch("/api/merch");
    if (res.ok) setItems(await res.json());
  };

  useEffect(() => { loadItems(); }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setName(""); setPrice(""); setCategory(""); setDescription(""); setImage("");
    setEditId(null); setShowForm(false);
  };

  const saveItem = async () => {
    if (!name || !price) return alert("Name and price required");
    const url = editId ? `/api/merch/${editId}` : "/api/merch";
    const method = editId ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price), category, description, image }),
    });
    resetForm();
    loadItems();
  };

  const editItem = (item) => {
    setEditId(item.id);
    setName(item.name);
    setPrice(item.price);
    setCategory(item.category || "");
    setDescription(item.description || "");
    setImage(item.image || "");
    setShowForm(true);
  };

  const deleteItem = async (id) => {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/merch/${id}`, { method: "DELETE" });
    loadItems();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Merch</h1>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm">
          {showForm ? "Cancel" : "+ Add Item"}
        </button>
      </div>

      {showForm && (
        <div className="border border-gray-700 rounded-xl p-4 mb-6 space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Item Name" />
          <div className="flex gap-2">
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Price" />
            <input value={category} onChange={(e) => setCategory(e.target.value)} className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Category" />
          </div>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm" placeholder="Description" rows="2" />
          <div>
            <label className="text-gray-400 text-sm">Item Image</label>
            <input type="file" accept="image/*" onChange={handleImage} className="w-full text-white text-sm mt-1" />
            {image && <img src={image} className="h-20 rounded mt-2" />}
          </div>
          <button onClick={saveItem} className="w-full bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
            {editId ? "Update Item" : "Create Item"}
          </button>
        </div>
      )}

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="border border-gray-700 rounded-xl p-4 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              {item.image && <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />}
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-gray-400 text-sm">${item.price} • {item.category}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editItem(item)} className="text-blue-400 text-sm">Edit</button>
              <button onClick={() => deleteItem(item.id)} className="text-red-400 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}