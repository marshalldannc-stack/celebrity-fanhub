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
              <Link key={event.id} href={`/events/${event.id}`} className="border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500 transition group">
                <div className="relative h-48 bg-gray-800">
                  {event.image ? (
                    <img src={event.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">🎤</div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold group-hover:text-purple-400 transition">{event.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {new Date(event.date).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" })}
                    {event.time && ` • ${event.time}`}
                  </p>
                  <p className="text-gray-500 text-sm">{event.venue}, {event.city}</p>
                  <p className="text-purple-400 font-bold mt-2">{priceText}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}