"use client";
import { useState, useEffect } from "react";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events").then(r => r.json()).then(setEvents);
  }, []);

  const addEvent = async () => {
    const title = prompt("Event title:");
    const date = prompt("Date (YYYY-MM-DD):");
    const venue = prompt("Venue:");
    const city = prompt("City:");
    if (!title || !date) return;
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date: new Date(date), venue, city }),
    });
    const res = await fetch("/api/events");
    setEvents(await res.json());
  };

  const deleteEvent = async (id) => {
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    const res = await fetch("/api/events");
    setEvents(await res.json());
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <button onClick={addEvent} className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm">+ Add Event</button>
      </div>
      <div className="space-y-3">
        {events.map(event => (
          <div key={event.id} className="border border-gray-700 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-bold">{event.title}</p>
              <p className="text-gray-400 text-sm">{new Date(event.date).toLocaleDateString()} • {event.venue}, {event.city}</p>
            </div>
            <button onClick={() => deleteEvent(event.id)} className="text-red-400 text-sm">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}