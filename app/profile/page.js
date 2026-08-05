"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const ranks = [
  { name: "New Fan", min: 0, emoji: "🆕", color: "text-gray-400" },
  { name: "Bronze Fan", min: 50, emoji: "🥉", color: "text-amber-500" },
  { name: "Silver Fan", min: 200, emoji: "🥈", color: "text-gray-300" },
  { name: "Gold Fan", min: 500, emoji: "🌟", color: "text-yellow-400" },
  { name: "Platinum Fan", min: 1000, emoji: "💎", color: "text-purple-400" },
  { name: "Diamond Fan", min: 5000, emoji: "👑", color: "text-pink-400" },
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const savedFanCard = JSON.parse(localStorage.getItem("fanCardOrder") || "null");
    if (savedFanCard) savedOrders.push(savedFanCard);
    setOrders(savedOrders);
    setTotalSpent(savedOrders.reduce((sum, o) => sum + (o.total || 0), 0));
  }, []);

  const rank = [...ranks].reverse().find(r => totalSpent >= r.min) || ranks[0];
  const nextRank = ranks[ranks.indexOf(rank) + 1];
  const progress = nextRank ? Math.round(((totalSpent - rank.min) / (nextRank.min - rank.min)) * 100) : 100;

  if (!session) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Fan Profile</h1>
        <p className="text-gray-400 mb-6">Login to see your fan ranking and order history.</p>
        <a href="/login" className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold">Login</a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Fan Profile</h1>
      
      <div className="border border-gray-700 rounded-xl p-6 mb-6 text-center">
        <div className="text-5xl mb-3">{rank.emoji}</div>
        <h2 className={`text-2xl font-bold ${rank.color}`}>{rank.name}</h2>
        <p className="text-gray-400 mt-1">Total spent: ${totalSpent}</p>
        {nextRank && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{rank.name}</span>
              <span>{nextRank.name}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-gray-500 text-xs mt-1">${nextRank.min - totalSpent} more to reach {nextRank.name}</p>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-gray-400">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order, i) => (
            <div key={i} className="border border-gray-700 rounded-xl p-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">{order.event || order.name}</p>
                  <p className="text-gray-400 text-sm">Status: <span className="text-green-400">{order.status || "Completed"}</span></p>
                  {order.date && <p className="text-gray-500 text-xs">{new Date(order.date).toLocaleDateString()}</p>}
                </div>
                <p className="font-bold text-purple-400">${order.total}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}