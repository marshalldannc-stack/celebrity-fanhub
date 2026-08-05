"use client";
import { useState, useEffect } from "react";

export default function Newsletter() {
  const [title, setTitle] = useState("Join the Newsletter");
  const [text, setText] = useState("Get exclusive updates.");

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(data => {
      if (data) {
        setTitle(data.newsletterTitle || "Join the Newsletter");
        setText(data.newsletterText || "Get exclusive updates.");
      }
    });
  }, []);

  const subscribe = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    e.target[0].value = "";
    alert("Subscribed! 🎉");
  };

  return (
    <section className="max-w-md mx-auto mt-20 text-center border border-gray-700 rounded-xl p-8">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400 text-sm mb-4">{text}</p>
      <form onSubmit={subscribe} className="flex gap-2">
        <input type="email" placeholder="Your email" className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" required />
        <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-full font-bold text-sm">Subscribe</button>
      </form>
    </section>
  );
}