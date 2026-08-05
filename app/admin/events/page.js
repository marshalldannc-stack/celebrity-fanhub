"use client";
import { useState } from "react";

export default function AdminEvents() {
  const [events, setEvents] = useState([
    { id: "1", title: "World Tour 2026 - NYC", date: "2026-09-15", venue: "Madison Square Garden", city: "New York" },
    { id: "2", title: "World Tour 2026 - LA", date: "2026-09-22", venue: "Hollywood Bowl", city: "Los Angeles" },
    { id: "3", title: "World Tour 2026 - Chicago", date: "2026-10-05", venue: "United Center", city: "Chicago" },
    { id: "4", title: "Meet & Greet VIP", date: "2026-10-12", venue: "Private Studio", city: "Miami" },
  ]);

  const addEvent = () => {
    const title = prompt("Event title:");
    const date = prompt("Date (YYYY-MM-DD):");
    const venue = prompt("Venue:");
    const city = prompt("City:");
    if (title && date) {
      setEvents([...events, { id: Date.now().toString(), title, date, venue, city }]);
    }
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
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
              <p className="text-gray-400 text-sm">{event.date} • {event.venue}, {event.city}</p>
            </div>
            <button onClick={() => deleteEvent(event.id)} className="text-red-400 text-sm">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}