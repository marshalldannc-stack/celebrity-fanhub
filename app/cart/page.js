"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const paymentMethods = [
  { id: "crypto", name: "₿ Cryptocurrency", desc: "Pay with Bitcoin, Ethereum, USDT & more", icon: "₿", color: "border-orange-500" },
  { id: "card", name: "💳 Credit/Debit Card", desc: "Pay securely with your card", icon: "💳", color: "border-green-500" },
  { id: "giftcard", name: "🎁 Gift Card", desc: "Pay with a gift card", icon: "🎁", color: "border-pink-500" },
  { id: "other", name: "💬 Other Payment Methods", desc: "PayPal, CashApp, Zelle, Venmo, Apple Pay, Chime & more", icon: "💬", color: "border-blue-500" },
];

const otherMethods = [
  { id: "paypal", name: "PayPal", icon: "🅿️" },
  { id: "cashapp", name: "Cash App", icon: "💵" },
  { id: "zelle", name: "Zelle", icon: "🏦" },
  { id: "venmo", name: "Venmo", icon: "📱" },
  { id: "applepay", name: "Apple Pay", icon: "🍎" },
  { id: "chime", name: "Chime", icon: "🔵" },
];

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [step, setStep] = useState("cart"); // cart, payment, other-method, instructions
  const [selectedMethod, setSelectedMethod] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const removeItem = (index) => {
    const newCart = { ...cart };
    newCart.items.splice(index, 1);
    if (newCart.items.length === 0) { localStorage.removeItem("cart"); setCart(null); return; }
    newCart.total = newCart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const selectPayment = (method) => {
    if (method === "crypto" || method === "card") {
      processOrder(method);
    } else if (method === "other") {
      setStep("other-method");
    } else if (method === "giftcard") {
      setSelectedMethod("giftcard");
      setStep("instructions");
    }
  };

  const selectOtherMethod = (method) => {
    setSelectedMethod(method);
    setStep("instructions");
  };

  const processOrder = (method) => {
    const order = {
      id: "ORD-" + Date.now().toString(36).toUpperCase(),
      event: cart.event,
      items: cart.items,
      total: cart.total,
      status: "Completed",
      paymentMethod: method,
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

  if (step === "instructions") {
    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <div className="text-5xl mb-4">📩</div>
        <h1 className="text-2xl font-bold mb-2">Payment Instructions</h1>
        <p className="text-gray-400 mb-6">
          {selectedMethod === "giftcard" ? "Gift Card Payment" : `${selectedMethod?.name} Payment`}
        </p>
        <div className="border border-gray-700 rounded-xl p-6 text-left space-y-4 text-sm">
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-4">
            <p className="font-bold text-yellow-400 mb-2">⚠️ Important — Please Read</p>
            <ul className="text-gray-300 space-y-2">
              <li>1. The payment details will be sent to the <strong>email you registered with</strong></li>
              <li>2. This is a <strong>temporary account</strong> — use it only for this payment</li>
              <li>3. After sending payment, <strong>upload your receipt</strong> below or send it via chat</li>
              <li>4. Your order will be confirmed once payment is verified</li>
            </ul>
          </div>
          <p className="text-gray-400 text-xs text-center">Need help? Click below to chat with support.</p>
        </div>
        <a href="#" onClick={() => { if (typeof Tawk_API !== "undefined") Tawk_API.maximize(); return false; }} className="block w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-full font-bold">
          💬 Chat with Support for Payment Details
        </a>
        <button onClick={() => { processOrder(selectedMethod?.id || "other"); }} className="w-full mt-3 bg-green-600 text-white px-6 py-3 rounded-full font-bold">
          ✅ I've Made Payment — Confirm Order
        </button>
        <button onClick={() => setStep("payment")} className="text-gray-400 mt-4 text-sm">← Back</button>
      </div>
    );
  }

  if (step === "other-method") {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Select Payment Method</h1>
        <p className="text-gray-400 text-center mb-6">Total: <span className="text-white font-bold text-xl">${cart.total}</span></p>
        <div className="grid grid-cols-2 gap-3">
          {otherMethods.map(m => (
            <button key={m.id} onClick={() => selectOtherMethod(m)} className="border border-gray-700 rounded-xl p-4 hover:border-blue-500 transition text-center">
              <div className="text-3xl mb-2">{m.icon}</div>
              <p className="font-bold text-sm">{m.name}</p>
            </button>
          ))}
        </div>
        <button onClick={() => setStep("payment")} className="text-gray-400 mt-4 text-sm">← Back</button>
      </div>
    );
  }

  if (step === "payment") {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Choose Payment Method</h1>
        <p className="text-gray-400 text-center mb-6">Total: <span className="text-white font-bold text-xl">${cart.total}</span></p>
        <div className="space-y-3">
          {paymentMethods.map(m => (
            <button key={m.id} onClick={() => selectPayment(m.id)} className={`w-full border ${m.color} rounded-xl p-4 flex items-center gap-4 hover:bg-gray-800 transition`}>
              <div className="text-3xl">{m.icon}</div>
              <div className="text-left">
                <p className="font-bold">{m.name}</p>
                <p className="text-gray-400 text-xs">{m.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => setStep("cart")} className="text-gray-400 mt-4 text-sm">← Back to Cart</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <p className="text-gray-400 mb-4">{cart.event}</p>
      {cart.items.map((item, i) => (
        <div key={i} className="flex justify-between py-3 border-b border-gray-700">
          <div><p className="font-bold">{item.name}</p><p className="text-sm text-gray-400">{item.qty} x ${item.price}</p></div>
          <div className="flex items-center gap-3">
            <p className="font-bold">${item.price * item.qty}</p>
            <button onClick={() => removeItem(i)} className="text-red-400">✕</button>
          </div>
        </div>
      ))}
      <p className="text-2xl font-bold mt-6">Total: ${cart.total}</p>
      <button onClick={() => setStep("payment")} className="w-full mt-6 bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg">Proceed to Payment</button>
      <Link href="/events" className="block text-center text-purple-400 mt-4 text-sm">← Continue Shopping</Link>
    </div>
  );
}