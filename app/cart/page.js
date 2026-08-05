"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  if (!cart) return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold mb-4">Cart is Empty</h1>
      <Link href="/events" className="bg-purple-600 text-white px-6 py-3 rounded-full">Browse Events</Link>
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.items.map((item, i) => (
        <div key={i} className="flex justify-between py-3 border-b border-gray-700">
          <div>
            <p className="font-bold">{item.name}</p>
            <p className="text-sm text-gray-400">{item.qty} x ${item.price}</p>
          </div>
          <p className="font-bold">${item.price * item.qty}</p>
        </div>
      ))}
      <p className="text-2xl font-bold mt-6">Total: ${cart.total}</p>
      <button className="w-full mt-6 bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg">Checkout</button>
      <Link href="/events" className="block text-center text-purple-400 mt-4 text-sm">← Continue Shopping</Link>
    </div>
  );
}