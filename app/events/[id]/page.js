"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EventDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [qty, setQty] = useState({});

  useEffect(() => {
    fetch("/api/events").then(r => r.json()).then(events => {
      const ev = events.find(e => e.id === id);
      setEvent(ev);
    });
  }, [id]);

  if (!event) return <p className="text-center mt-20 text-gray-400">Loading...</p>;

  const tickets = event.ticketTypes || [];
  const updateQty = (ticketId, val) => {
    setQty({ ...qty, [ticketId]: Math.max(0, (qty[ticketId] || 0) + val) });
  };
  const total = tickets.reduce((sum, t) => sum + (qty[t.id] || 0) * t.price, 0);

  const checkout = () => {
    const items = tickets.filter(t => qty[t.id] > 0).map(t => ({ id: t.id, name: t.name, price: t.price, qty: qty[t.id] }));
    if (items.length === 0) return alert("Select tickets");
    localStorage.setItem("cart", JSON.stringify({ items, total, event: event.title }));
    router.push("/cart");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-400 text-lg">{new Date(event.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
      <p className="text-gray-500">{event.venue}, {event.city}</p>
      
      <div className="mt-8 space-y-4">
        {tickets.map(ticket => (
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
          <button onClick={checkout} className="mt-4 w-full bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}