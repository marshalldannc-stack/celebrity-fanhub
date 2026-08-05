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
      setEvent(events.find(e => e.id === id));
    });
  }, [id]);

  if (!event) return <p className="text-center mt-20 text-gray-400">Loading...</p>;

  const tickets = event.ticketTypes || [];
  const updateQty = (ticketId, val) => setQty({ ...qty, [ticketId]: Math.max(0, (qty[ticketId] || 0) + val) });
  const total = tickets.reduce((sum, t) => sum + (qty[t.id] || 0) * t.price, 0);

  const checkout = () => {
    const items = tickets.filter(t => qty[t.id] > 0).map(t => ({ id: t.id, name: t.name, price: t.price, qty: qty[t.id] }));
    if (items.length === 0) return alert("Select tickets");
    localStorage.setItem("cart", JSON.stringify({ items, total, event: event.title }));
    router.push("/cart");
  };

  return (
    <div className="max-w-3xl mx-auto">
      {event.image && (
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <img src={event.image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}
      <h1 className="text-3xl md:text-4xl font-bold">{event.title}</h1>
      <p className="text-gray-400 text-lg mt-2">
        {new Date(event.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        {event.time && ` • ${event.time}`}
      </p>
      <p className="text-gray-500 text-lg">{event.venue}, {event.city}</p>
      {event.description && <p className="text-gray-400 mt-4">{event.description}</p>}
      
      <div className="mt-8 space-y-4">
        {tickets.map((ticket, i) => {
          const colors = ["border-amber-500/50 bg-amber-500/5", "border-gray-400/50 bg-gray-400/5", "border-yellow-500/50 bg-yellow-500/5", "border-purple-500/50 bg-purple-500/5"];
          return (
            <div key={ticket.id} className={`border ${colors[i]} rounded-xl p-5 flex justify-between items-center`}>
              <div>
                <h3 className="text-lg font-bold">{ticket.name}</h3>
                <p className="text-2xl font-bold mt-1">${ticket.price}</p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => updateQty(ticket.id, -1)} className="bg-gray-700 w-10 h-10 rounded-full text-xl hover:bg-gray-600">-</button>
                <span className="text-xl w-6 text-center font-bold">{qty[ticket.id] || 0}</span>
                <button onClick={() => updateQty(ticket.id, 1)} className="bg-gray-700 w-10 h-10 rounded-full text-xl hover:bg-gray-600">+</button>
              </div>
            </div>
          );
        })}
      </div>

      {total > 0 && (
        <div className="mt-8 border-t border-gray-700 pt-6 sticky bottom-0 bg-black pb-4">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">Total: ${total}</p>
            <p className="text-gray-400">{Object.values(qty).reduce((a, b) => a + b, 0)} tickets</p>
          </div>
          <button onClick={checkout} className="mt-4 w-full bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-500">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}