"use client";
import { useState, useEffect } from "react";

export default function ReferralsPage() {
  const [data, setData] = useState({ codes: [], sales: [] });
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const load = async () => {
    const res = await fetch("/api/referral");
    setData(await res.json());
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!name) return;
    await fetch("/api/referral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create", code: code || undefined, name }),
    });
    setName(""); setCode("");
    load();
  };

  const link = (c) => `https://celebrity-fanhub.vercel.app/api/referral?code=${c}`;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Referral Program</h1>
      
      <div className="border border-gray-700 rounded-xl p-4 mb-8">
        <h2 className="font-bold mb-3">Create Referral Link</h2>
        <div className="flex gap-2 mb-3">
          <input value={name} onChange={(e) => setName(e.target.value)} className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Partner name" />
          <input value={code} onChange={(e) => setCode(e.target.value)} className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" placeholder="Code (optional)" />
          <button onClick={create} className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm">Create</button>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Referral Partners</h2>
      <div className="border border-gray-700 rounded-xl overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Clicks</th>
              <th className="p-3 text-left">Sales</th>
              <th className="p-3 text-left">Revenue</th>
              <th className="p-3 text-left">Link</th>
            </tr>
          </thead>
          <tbody>
            {data.codes.map(c => (
              <tr key={c.id} className="border-b border-gray-700">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.code}</td>
                <td className="p-3">{c.clicks}</td>
                <td className="p-3">{c.sales}</td>
                <td className="p-3">${c.revenue}</td>
                <td className="p-3">
                  <button onClick={() => { navigator.clipboard.writeText(link(c.code)); alert("Link copied!"); }} className="text-blue-400 text-xs">Copy Link</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold mb-4">Recent Sales</h2>
      <div className="border border-gray-700 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.sales.map(s => (
              <tr key={s.id} className="border-b border-gray-700">
                <td className="p-3">{s.code}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.event}</td>
                <td className="p-3">${s.amount}</td>
                <td className="p-3 text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}