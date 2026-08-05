"use client";

export default function AddToCartButton({ item }) {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || '{"items":[],"total":0,"event":"Merch"}');
    const existing = cart.items.find(i => i.id === item.id);
    if (existing) existing.qty += 1;
    else cart.items.push({ ...item, qty: 1 });
    cart.total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item.name} added to cart!`);
  };

  return (
    <button onClick={addToCart} className="mt-3 bg-white text-black px-4 py-2 rounded-full text-sm font-bold w-full hover:bg-gray-200">
      Add to Cart
    </button>
  );
}