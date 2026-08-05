"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

const eventsData = {
  "1": { title: "World Tour 2026 - NYC", date: "Sep 15, 2026", venue: "Madison Square Garden", city: "New York", tickets: [
    { id: "ga1", name: "General Admission", price: 79 },
    { id: "vip1", name: "VIP Floor", price: 199 },
    { id: "mg1", name: "Meet & Greet", price: 299 },
  ]},
  "2": { title: "World Tour 2026 - LA", date: "Sep 22, 2026", venue: "Hollywood Bowl", city: "Los Angeles", tickets: [
    { id: "ga2", name: "General Admission", price: 89 },
    { id: "vip2", name: "VIP Floor", price: 249 },
    { id: "mg2", name: "Meet & Greet", price: 349 },
  ]},
  "3": { title: "World Tour 2026 - Chicago", date: "Oct 5, 2026", venue: "United Center", city: "Chicago", tickets: [
    { id: "ga3", name: "General Admission", price: 69 },
    { id: "vip3", name: "VIP Floor", price: 179 },
    { id: "mg3", name: "Meet & Greet", price: 249 },
  ]},
  "4": { title: "Meet & Greet VIP", date: "Oct 12, 2026", venue: "Private Studio", city: "Miami", tickets: [
    { id: "vip4", name: "VIP Meet & Greet", price: 500 },
  ]},
};

export default function EventDetail() {
  const { id } = useParams();
  const event = eventsData[id];
  const [qty, setQty] = useState({});

  if (!event) return <p className="text-center mt-20">Event not found.</p>;

  const updateQty = (ticketId, val) => {
    setQty({ ...qty, [ticketId]: Math.max(0, (qty[ticketId] || 0) + val) });
  };

  const total = event.tickets.reduce((sum, t) => sum + (qty[t.id] || 0) * t.price, 0);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-400 text-lg">{event.date} - {event.venue}, {event.city}</p>
      
      <div className="mt-8 space-y-4">
        {event.tickets.map(ticket => (
          <div key={ticket.id} className="border border-gray-700 rounded-xl p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{ticket.name}</h3>
              <p className="text-2xl font-bold mt-1">${ticket.price}</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => updateQty(ticket.id, -1)} className="bg-gray-700 w-10 h-10 rounded-full text-xl">-</button>
              <span className="text-xl w-6 text-center">{qty[ticket.id] || 0}</span>
              <button onClick={() => updateQty(ticket.id, 1)} className="bg-gray-700 w-10 h-10 rounded-full text-xl">+</button>
            </div>
          </div>
        ))}
      </div>

      {total > 0 && (
        <div className="mt-8 border-t border-gray-700 pt-6">
          <p className="text-2xl font-bold">Total: ${total}</p>
          <button className="mt-4 w-full bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-500">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}