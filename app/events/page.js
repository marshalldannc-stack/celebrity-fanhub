import Link from "next/link";

const events = [
  { id: "1", title: "World Tour 2026 - NYC", date: "Sep 15, 2026", venue: "Madison Square Garden", city: "New York", price: "$79 - $299", image: "🎤" },
  { id: "2", title: "World Tour 2026 - LA", date: "Sep 22, 2026", venue: "Hollywood Bowl", city: "Los Angeles", price: "$89 - $349", image: "🎸" },
  { id: "3", title: "World Tour 2026 - Chicago", date: "Oct 5, 2026", venue: "United Center", city: "Chicago", price: "$69 - $249", image: "🎵" },
  { id: "4", title: "Meet & Greet VIP", date: "Oct 12, 2026", venue: "Private Studio", city: "Miami", price: "$500", image: "⭐" },
];

export default function EventsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tour Dates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(event => (
          <Link key={event.id} href={`/events/${event.id}`} className="border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition">
            <div className="text-4xl mb-4">{event.image}</div>
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p className="text-gray-400">{event.date}</p>
            <p className="text-gray-500 text-sm">{event.venue}, {event.city}</p>
            <p className="text-purple-400 font-bold mt-2">{event.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}