"use client";
import { useState } from "react";

const defaultData = `Bangor, ME | Maine Savings Amphitheater | 2026-08-08 | 8:00 PM
Anchorage, AK | Alaska Airlines Center | 2026-08-22 | 8:00 PM
Fairbanks, AK | Carlson Center | 2026-08-23 | 7:30 PM
Bend, OR | Hayden Homes Amphitheater | 2026-08-27 | 7:30 PM
Uncasville, CT | Mohegan Sun Arena | 2026-09-04 | 8:00 PM
Uncasville, CT | Mohegan Sun Arena | 2026-09-05 | 8:00 PM
Durant, OK | Choctaw Grand Theater | 2026-09-25 | 8:00 PM
Durant, OK | Choctaw Grand Theater | 2026-09-26 | 8:00 PM
Rogers, AR | Walmart AMP | 2026-09-27 | 7:30 PM
Nampa, ID | Ford Idaho Center Arena | 2026-10-09 | 8:00 PM
Portland, OR | Moda Center | 2026-10-10 | 8:00 PM
Sacramento, CA | Golden 1 Center | 2026-10-11 | 7:00 PM
Morrison, CO | Red Rocks Amphitheatre | 2026-10-18 | 7:00 PM
Nashville, TN | Bridgestone Arena | 2026-10-24 | 8:00 PM
Brandon, MS | Brandon Amphitheater | 2026-10-25 | 7:30 PM
Milwaukee, WI | Fiserv Forum | 2026-11-07 | 8:00 PM
Indianapolis, IN | Gainbridge Fieldhouse | 2026-11-08 | 7:00 PM
Belmont Park, NY | UBS Arena | 2026-11-20 | 8:00 PM
Buffalo, NY | KeyBank Center | 2026-11-21 | 8:00 PM
Toronto, ON | Scotiabank Arena | 2026-11-22 | 7:00 PM
Las Vegas, NV | Dolby Live | 2026-12-04 | 8:00 PM
Fort Worth, TX | Dickies Arena | 2026-12-18 | 8:00 PM
Fort Worth, TX | Dickies Arena | 2026-12-19 | 8:00 PM
Phoenix, AZ | Mortgage Matchup Center | 2026-12-26 | 8:00 PM
Phoenix, AZ | Mortgage Matchup Center | 2026-12-27 | 7:00 PM
Oklahoma City, OK | Paycom Center | 2026-12-29 | 8:00 PM
Chicago, IL | United Center | 2027-01-07 | 8:00 PM`;

export default function BulkImportPage() {
  const [text, setText] = useState(defaultData);
  const [p1, setP1] = useState("49");
  const [p2, setP2] = useState("99");
  const [p3, setP3] = useState("149");
  const [p4, setP4] = useState("199");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const importEvents = async () => {
    setLoading(true);
    const lines = text.split("\n").filter(l => l.trim());
    const events = lines.map(line => {
      const parts = line.split("|").map(p => p.trim());
      return {
        city: parts[0] || "",
        venue: parts[1] || "",
        date: parts[2] || "",
        time: parts[3] || "",
        title: "Matt Rife: Stay Golden World Tour",
        p1: Number(p1), p2: Number(p2), p3: Number(p3), p4: Number(p4),
      };
    });

    const res = await fetch("/api/events/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events }),
    });
    
    if (res.ok) {
      setDone(true);
      setText("");
    } else {
      alert("Import failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bulk Import Events</h1>
      
      {done ? (
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-xl font-bold">Import Complete!</h2>
          <a href="/admin/events" className="text-purple-400 mt-4 block">View All Events →</a>
          <a href="/events" className="text-purple-400 mt-2 block">View Public Events Page →</a>
        </div>
      ) : (
        <>
          <p className="text-gray-400 text-sm mb-2">Format: City, State | Venue | Date | Time</p>
          <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white text-sm mb-4 h-64" />
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div>
              <label className="text-gray-400 text-xs">Bronze $</label>
              <input value={p1} onChange={(e) => setP1(e.target.value)} type="number" className="w-full bg-gray-800 border border-gray-700 rounded-full px-2 py-1 text-white text-sm" />
            </div>
            <div>
              <label className="text-gray-400 text-xs">Silver $</label>
              <input value={p2} onChange={(e) => setP2(e.target.value)} type="number" className="w-full bg-gray-800 border border-gray-700 rounded-full px-2 py-1 text-white text-sm" />
            </div>
            <div>
              <label className="text-gray-400 text-xs">Gold $</label>
              <input value={p3} onChange={(e) => setP3(e.target.value)} type="number" className="w-full bg-gray-800 border border-gray-700 rounded-full px-2 py-1 text-white text-sm" />
            </div>
            <div>
              <label className="text-gray-400 text-xs">VIP $</label>
              <input value={p4} onChange={(e) => setP4(e.target.value)} type="number" className="w-full bg-gray-800 border border-gray-700 rounded-full px-2 py-1 text-white text-sm" />
            </div>
          </div>
          <button onClick={importEvents} disabled={loading} className="w-full bg-purple-600 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-500">
            {loading ? "Importing..." : `Import ${text.split("\n").filter(l => l.trim()).length} Events`}
          </button>
        </>
      )}
    </div>
  );
}