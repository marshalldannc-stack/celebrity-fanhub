"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ConfirmationPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("lastOrder");
    if (saved) setOrder(JSON.parse(saved));
  }, []);

  if (!order) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-4">Order Complete!</h1>
        <p className="text-gray-400 mb-6">Thank you for your purchase.</p>
        <Link href="/events" className="bg-purple-600 text-white px-6 py-3 rounded-full">Browse Events</Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-gray-400 mb-6">We'll send payment details to your email.</p>
      <div className="border border-gray-700 rounded-xl p-6 text-left space-y-3">
        <p><span className="text-gray-400">Order:</span> {order.id}</p>
        <p><span className="text-gray-400">Event:</span> {order.event}</p>
        <p><span className="text-gray-400">Total:</span> <span className="text-purple-400 font-bold">${order.total}</span></p>
        <p><span className="text-gray-400">Method:</span> {order.paymentMethod}</p>
      </div>
      <Link href="/profile" className="inline-block mt-6 bg-purple-600 text-white px-6 py-3 rounded-full font-bold">View Orders</Link>
    </div>
  );
}