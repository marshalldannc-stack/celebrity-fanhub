export default function FanCardPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Fan Membership Card</h1>
      <p className="text-gray-400 mb-8">Get your exclusive digital fan card with special perks and discounts.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-700 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">⭐</div>
          <h2 className="text-xl font-bold">Standard</h2>
          <p className="text-2xl font-bold mt-2">Free</p>
          <ul className="text-gray-400 text-sm mt-4 space-y-2">
            <li>✓ Digital Card</li>
            <li>✓ Newsletter Access</li>
            <li>✓ Early Access Codes</li>
          </ul>
          <button className="mt-6 w-full border border-white text-white px-4 py-2 rounded-full text-sm font-bold">Get Free</button>
        </div>

        <div className="border border-purple-500 rounded-xl p-6 text-center bg-purple-500/10">
          <div className="text-4xl mb-3">🌟</div>
          <h2 className="text-xl font-bold">Gold</h2>
          <p className="text-2xl font-bold mt-2">$49<span className="text-sm text-gray-400">/year</span></p>
          <ul className="text-gray-400 text-sm mt-4 space-y-2">
            <li>✓ Everything in Standard</li>
            <li>✓ 10% Merch Discount</li>
            <li>✓ Presale Access</li>
            <li>✓ Physical Card</li>
          </ul>
          <button className="mt-6 w-full bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">Join Gold</button>
        </div>

        <div className="border border-gray-700 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">💎</div>
          <h2 className="text-xl font-bold">Platinum</h2>
          <p className="text-2xl font-bold mt-2">$99<span className="text-sm text-gray-400">/year</span></p>
          <ul className="text-gray-400 text-sm mt-4 space-y-2">
            <li>✓ Everything in Gold</li>
            <li>✓ VIP Meet & Greet</li>
            <li>✓ Signed Merch</li>
            <li>✓ Exclusive Content</li>
          </ul>
          <button className="mt-6 w-full border border-white text-white px-4 py-2 rounded-full text-sm font-bold">Join Platinum</button>
        </div>
      </div>
    </div>
  );
}