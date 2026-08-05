"use client";
import { useState, useEffect } from "react";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [gaPrice, setGaPrice] = useState("49");
  const [vipPrice, setVipPrice] = useState("149");

  const loadEvents = async () => {
    const res = await fetch("/api/events");
    if (res.ok) setEvents(await res.json());
  };

  useEffect(() => { loadEvents(); }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setTitle(""); setDate(""); setVenue(""); setCity(""); setDescription(""); setImage("");
    setGaPrice("49"); setVipPrice("149");
    setEditId(null); setShowForm(false);
  };

  const saveEvent = async () => {
    if (!title || !date) return alert("Title and date required");
    const url = editId ? `/api/events/${editId}` : "/api/events";
    const method = editId ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, venue, city, description, image, gaPrice: Number(gaPrice), vipPrice: Number(vipPrice) }),
    });
    resetForm();
    loadEvents();
  };

  const editEvent = (e) => {
    setEditId(e.id);
    setTitle(e.title);
    setDate(e.date?.split("T")[0] || "");
    setVenue(e.venue);
    setCity(e.city);
    setDescription(e.description || "");
    setImage(e.image || "");
    setGaPrice(e.ticketTypes?.[0]?.price || 49);
    setVipPrice(e.ticketTypes?.[1]?.price || 149);
    setShowForm(true);
  };

  const deleteEvent = async (id) => {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    loadEvents();
  };

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
          <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" />
          <div className="flex gap-2">
            <input value={venue} onChange={(e) => setVenue(e.target.value)} className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Venue" />
            <input value={city} onChange={(e) => setCity(e.target.value)} className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="City" />
          </div>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm" placeholder="Description" rows="2" />
          <div>
            <label className="text-gray-400 text-sm">Event Image</label>
            <input type="file" accept="image/*" onChange={handleImage} className="w-full text-white text-sm mt-1" />
            {image && <img src={image} className="h-20 rounded mt-2" />}
          </div>
          <div className="flex gap-2">
            <input value={gaPrice} onChange={(e) => setGaPrice(e.target.value)} type="number" className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="GA Price" />
            <input value={vipPrice} onChange={(e) => setVipPrice(e.target.value)} type="number" className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="VIP Price" />
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
                <p className="text-gray-400 text-sm">{new Date(event.date).toLocaleDateString()} • {event.venue}, {event.city}</p>
                <p className="text-purple-400 text-xs">
                  {event.ticketTypes?.map(t => `${t.name}: $${t.price}`).join(" | ") || "No tickets"}
                </p>
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