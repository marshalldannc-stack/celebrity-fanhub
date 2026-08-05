
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const removeItem = (index) => {
    const newCart = { ...cart };
    newCart.items.splice(index, 1);
    if (newCart.items.length === 0) {
      localStorage.removeItem("cart");
      setCart(null);
      return;
    }
    newCart.total = newCart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const checkout = () => {
    const order = {
      id: "ORD-" + Date.now().toString(36).toUpperCase(),
      event: cart.event,
      items: cart.items,
      total: cart.total,
      status: "Completed",
      date: new Date().toISOString(),
    };
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("lastOrder", JSON.stringify(order));
    localStorage.removeItem("cart");
    router.push("/confirmation");
  };

  if (!cart) return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Cart is Empty</h1>
      <Link href="/events" className="bg-purple-600 text-white px-6 py-3 rounded-full">Browse Events</Link>
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <p className="text-gray-400 mb-4">{cart.event}</p>
      {cart.items.map((item, i) => (
        <div key={i} className="flex justify-between py-3 border-b border-gray-700">
          <div>
            <p className="font-bold">{item.name}</p>
            <p className="text-sm text-gray-400">{item.qty} x ${item.price}</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-bold">${item.price * item.qty}</p>
            <button onClick={() => removeItem(i)} className="text-red-400">✕</button>
          </div>
        </div>
      ))}
      <p className="text-2xl font-bold mt-6">Total: ${cart.total}</p>
      <button onClick={checkout} className="w-full mt-6 bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg">Complete Order</button>
      <Link href="/events" className="block text-center text-purple-400 mt-4 text-sm">← Continue Shopping</Link>
    </div>
  );
}