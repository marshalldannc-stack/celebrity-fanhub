"use client";
import { useState, useEffect } from "react";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [p1, setP1] = useState("49");
  const [p2, setP2] = useState("99");
  const [p3, setP3] = useState("149");
  const [p4, setP4] = useState("199");

  const loadEvents = async () => {
    const res = await fetch("/api/events");
    if (res.ok) setEvents(await res.json());
  };

  useEffect(() => { loadEvents(); }, []);

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
      setImage(canvas.toDataURL("image/jpeg", 0.5));
    };
    img.src = URL.createObjectURL(file);
  };

  const resetForm = () => {
    setTitle(""); setDate(""); setTime(""); setVenue(""); setCity(""); setDescription(""); setImage("");
    setP1("49"); setP2("99"); setP3("149"); setP4("199");
    setEditId(null); setShowForm(false);
  };

  const saveEvent = async () => {
    if (!title || !date) return alert("Title and date required");
    const url = editId ? `/api/events/${editId}` : "/api/events";
    const method = editId ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, time, venue, city, description, image, prices: [Number(p1), Number(p2), Number(p3), Number(p4)] }),
    });
    resetForm();
    loadEvents();
  };

  const editEvent = (e) => {
    setEditId(e.id);
    setTitle(e.title);
    setDate(e.date?.split("T")[0] || "");
    setTime(e.time || "");
    setVenue(e.venue);
    setCity(e.city);
    setDescription(e.description || "");
    setImage(e.image || "");
    const prices = e.ticketTypes?.map(t => t.price) || [49, 99, 149, 199];
    setP1(prices[0] || 49); setP2(prices[1] || 99); setP3(prices[2] || 149); setP4(prices[3] || 199);
    setShowForm(true);
  };

  const deleteEvent = async (id) => {
    if (!confirm("Delete?")) return;
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    loadEvents();
  };

  const tierNames = ["Bronze", "Silver", "Gold", "VIP"];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm">
          {showForm ? "Cancel" : "+ Add Event"}
        </button>
      </div>

      {showForm && (
        <div className="border border-gray-700 rounded-xl p-4 mb-6 space-y-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Event Title" />
          <div className="flex gap-2">
            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" />
            <input value={time} onChange={(e) => setTime(e.target.value)} type="time" className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Show time" />
          </div>
          <div className="flex gap-2">
            <input value={venue} onChange={(e) => setVenue(e.target.value)} className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Venue" />
            <input value={city} onChange={(e) => setCity(e.target.value)} className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="City" />
          </div>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm" placeholder="Description" rows="2" />
          <label className="text-gray-400 text-sm block">Image <input type="file" accept="image/*" onChange={handleImage} className="mt-1" /></label>
          {image && <img src={image} className="h-20 rounded" />}
          <div className="grid grid-cols-4 gap-2">
            {tierNames.map((name, i) => {
              const vals = [p1, p2, p3, p4];
              const setters = [setP1, setP2, setP3, setP4];
              return (
                <div key={i}>
                  <label className="text-gray-400 text-xs">{name}</label>
                  <input value={vals[i]} onChange={(e) => setters[i](e.target.value)} type="number" className="w-full bg-gray-800 border border-gray-700 rounded-full px-2 py-1 text-white text-sm" />
                </div>
              );
            })}
          </div>
          <button onClick={saveEvent} className="w-full bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
            {editId ? "Update Event" : "Create Event"}
          </button>
        </div>
      )}

      <div className="space-y-3">
        {events.map(event => (
          <div key={event.id} className="border border-gray-700 rounded-xl p-4 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              {event.image && <img src={event.image} className="w-12 h-12 rounded-lg object-cover" />}
              <div>
                <p className="font-bold">{event.title}</p>
                <p className="text-gray-400 text-xs">{new Date(event.date).toLocaleDateString()} {event.time || ""} • {event.venue}, {event.city}</p>
                <p className="text-purple-400 text-xs">{event.ticketTypes?.map(t => `$${t.price}`).join(" | ") || "No prices"}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editEvent(event)} className="text-blue-400 text-sm">Edit</button>
              <button onClick={() => deleteEvent(event.id)} className="text-red-400 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}