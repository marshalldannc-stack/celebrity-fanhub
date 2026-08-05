"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const [cart, setCart] = useState(null);
  const [step, setStep] = useState("cart");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const openChat = () => {
    if (typeof Tawk_API !== "undefined") Tawk_API.maximize();
  };

  const notifyAdmin = async (type, method) => {
    try {
      await fetch("/api/payment-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email || "guest",
          method: method?.id || method || "other",
          amount: cart.total,
          orderId: type === "request" ? "REQ-" + Date.now().toString(36).toUpperCase() : "ORD-" + Date.now().toString(36).toUpperCase(),
          event: cart.event,
          type: type,
        }),
      });
    } catch {}
  };

  const removeItem = (index) => {
    const newCart = { ...cart };
    newCart.items.splice(index, 1);
    if (newCart.items.length === 0) { localStorage.removeItem("cart"); setCart(null); return; }
    newCart.total = newCart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const processCrypto = async () => {
    setLoading(true);
    const orderId = "ORD-" + Date.now().toString(36).toUpperCase();
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: cart.total, orderId }),
    });
    const data = await res.json();
    if (data.invoice_url) {
      const order = { id: orderId, event: cart.event, items: cart.items, total: cart.total, status: "Processing", paymentMethod: "crypto", date: new Date().toISOString(), email: session?.user?.email || "" };
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.setItem("lastOrder", JSON.stringify(order));
      localStorage.removeItem("cart");
      window.location.href = data.invoice_url;
    } else {
      alert("Payment error. Try again.");
    }
    setLoading(false);
  };

  const selectPayment = async (method) => {
    if (method === "crypto") await processCrypto();
    else if (method === "card") setStep("processing");
    else if (method === "other") setStep("other-method");
    else if (method === "giftcard") { setSelectedMethod("giftcard"); setStep("instructions"); }
  };

  const selectOtherMethod = async (method) => {
    setSelectedMethod(method);
    await notifyAdmin("request", method);
    setStep("instructions");
  };

  const handlePaymentComplete = async () => {
    if (clicked) return;
    setClicked(true);
    await notifyAdmin("pending", selectedMethod);
    setStep("processing");
    setClicked(false);
  };

  if (!session) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold mb-4">Login Required</h1>
        <p className="text-gray-400 mb-6">You need to login to view your cart and checkout.</p>
        <Link href="/login" className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold mr-3">Login</Link>
        <Link href="/signup" className="border border-white text-white px-8 py-3 rounded-full font-bold">Sign Up</Link>
      </div>
    );
  }

  if (!cart && step !== "processing") return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="text-2xl font-bold mb-4">Cart is Empty</h1>
      <p className="text-gray-400 mb-6">Welcome back, {session.user.email}</p>
      <Link href="/events" className="bg-purple-600 text-white px-6 py-3 rounded-full">Browse Events</Link>
    </div>
  );

  if (loading) return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <div className="animate-spin text-5xl mb-4">⏳</div>
      <p className="text-gray-400">Creating payment...</p>
    </div>
  );

  if (step === "processing") {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <div className="text-6xl mb-4">⏳</div>
        <h1 className="text-2xl font-bold mb-2">Payment Processing</h1>
        <p className="text-gray-400 mb-2">We're verifying your payment.</p>
        <p className="text-gray-500 text-sm mb-6">This usually takes a few minutes. Check back soon.</p>
        <div className="border border-yellow-500/50 bg-yellow-500/10 rounded-xl p-4 mb-6">
          <p className="text-yellow-400 text-sm">Status: <strong>Pending Verification</strong></p>
        </div>
        <Link href="/profile" className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold">View My Orders</Link>
        <Link href="/events" className="block text-purple-400 mt-4 text-sm">Continue Shopping</Link>
      </div>
    );
  }

  if (step === "instructions") {
    const details = `Method: ${selectedMethod?.name}\nAmount: $${cart.total}\nEvent: ${cart.event}\nEmail: ${session.user.email}\nItems: ${cart.items.map(i => i.name + " x" + i.qty).join(", ")}`;

    return (
      <div className="max-w-md mx-auto mt-10 text-center">
        <div className="text-5xl mb-4">📩</div>
        <h1 className="text-2xl font-bold mb-2">Payment Instructions</h1>
        <p className="text-gray-400 mb-2">Hi {session.user.email}</p>
        
        <div className="bg-gray-800 rounded-xl p-4 mb-4 text-left">
          <p className="text-sm text-gray-300"><strong>Method:</strong> {selectedMethod?.name}</p>
          <p className="text-sm text-gray-300"><strong>Amount:</strong> ${cart.total}</p>
          <p className="text-sm text-gray-300"><strong>Event:</strong> {cart.event}</p>
          <p className="text-sm text-gray-300"><strong>Email:</strong> {session.user.email}</p>
          <p className="text-sm text-gray-300"><strong>Items:</strong> {cart.items.map(i => `${i.name} x${i.qty}`).join(", ")}</p>
        </div>

        <button onClick={() => { navigator.clipboard.writeText(details); alert("Order details copied! Paste them in the chat."); }} className="w-full mb-3 bg-gray-700 text-white px-4 py-3 rounded-full text-sm font-bold hover:bg-gray-600">
          📋 Copy Order Details
        </button>
        <p className="text-gray-400 text-xs mb-4">Open chat, paste your order details, and we'll send payment info.</p>

        <div className="border border-gray-700 rounded-xl p-6 text-left space-y-4 text-sm">
          {selectedMethod === "giftcard" ? (
            <div className="bg-pink-500/10 border border-pink-500/50 rounded-xl p-4">
              <p className="font-bold text-pink-400 mb-2">🎁 Gift Card Payment</p>
              <ul className="text-gray-300 space-y-2">
                <li>1. Copy your order details above</li>
                <li>2. Open chat and <strong>paste the details</strong></li>
                <li>3. Send your <strong>gift card code</strong> in the chat</li>
                <li>4. We'll verify and confirm your order</li>
              </ul>
            </div>
          ) : (
            <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-4">
              <p className="font-bold text-yellow-400 mb-2">⚠️ Important — Please Read</p>
              <ul className="text-gray-300 space-y-2">
                <li>1. Copy your order details above and paste in chat</li>
                <li>2. We'll send you payment instructions</li>
                <li>3. This is a <strong>temporary account</strong> — use only for this payment</li>
                <li>4. After sending payment, <strong>keep your receipt</strong></li>
              </ul>
            </div>
          )}
        </div>
        <button onClick={openChat} className="block w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-500 text-center">
          💬 Open Chat — We'll send payment details here
        </button>
        <button onClick={handlePaymentComplete} disabled={clicked} className={`w-full mt-3 px-6 py-3 rounded-full font-bold text-white ${clicked ? "bg-gray-600" : "bg-green-600 hover:bg-green-500"}`}>
          {clicked ? "⏳ Processing..." : "✅ I've Made Payment"}
        </button>
        <button onClick={() => setStep("payment")} className="text-gray-400 mt-4 text-sm hover:text-white">← Back</button>
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
            <button key={m.id} onClick={() => selectOtherMethod(m)} className="border border-gray-700 rounded-xl p-4 hover:border-blue-500 hover:bg-gray-800 transition text-center">
              <div className="text-3xl mb-2">{m.icon}</div>
              <p className="font-bold text-sm">{m.name}</p>
            </button>
          ))}
        </div>
        <button onClick={() => setStep("payment")} className="text-gray-400 mt-4 text-sm hover:text-white">← Back</button>
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
        <button onClick={() => setStep("cart")} className="text-gray-400 mt-4 text-sm hover:text-white">← Back to Cart</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <p className="text-gray-400 text-sm mb-1">{session.user.email}</p>
      <p className="text-gray-400 mb-4">{cart.event}</p>
      {cart.items.map((item, i) => (
        <div key={i} className="flex justify-between py-3 border-b border-gray-700">
          <div><p className="font-bold">{item.name}</p><p className="text-sm text-gray-400">{item.qty} x ${item.price}</p></div>
          <div className="flex items-center gap-3">
            <p className="font-bold">${item.price * item.qty}</p>
            <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300">✕</button>
          </div>
        </div>
      ))}
      <p className="text-2xl font-bold mt-6">Total: ${cart.total}</p>
      <button onClick={() => setStep("payment")} className="w-full mt-6 bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-purple-500">Proceed to Payment</button>
      <Link href="/events" className="block text-center text-purple-400 mt-4 text-sm hover:text-purple-300">← Continue Shopping</Link>
    </div>
  );
}