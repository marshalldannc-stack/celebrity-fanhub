"use client";
export default function Newsletter() {
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
      <h2 className="text-xl font-bold mb-2">Join the Newsletter</h2>
      <p className="text-gray-400 text-sm mb-4">Get exclusive updates on new music, tours, and merch drops.</p>
      <form onSubmit={subscribe} className="flex gap-2">
        <input type="email" placeholder="Your email" className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm" required />
        <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-full font-bold text-sm">Subscribe</button>
      </form>
    </section>
  );
}