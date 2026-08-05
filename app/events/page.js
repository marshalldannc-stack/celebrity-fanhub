"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => { loadEvents(); }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tour Dates</h1>
      {events.length === 0 ? (
        <p className="text-gray-400">No events scheduled yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map(event => {
            const prices = event.ticketTypes?.map(t => t.price) || [];
            const priceText = prices.length > 0 ? `$${Math.min(...prices)} - $${Math.max(...prices)}` : "Price TBA";
            return (
              <Link key={event.id} href={`/events/${event.id}`} className="border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition">
                <div className="text-4xl mb-4">🎤</div>
                <h2 className="text-xl font-bold">{event.title}</h2>
                <p className="text-gray-400">{new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                <p className="text-gray-500 text-sm">{event.venue}, {event.city}</p>
                <p className="text-purple-400 font-bold mt-2">{priceText}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}