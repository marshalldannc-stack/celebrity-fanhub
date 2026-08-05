"use client";
import { useRouter } from "next/navigation";

export default function JoinButton({ tier }) {
  const router = useRouter();

  const join = () => {
    const cart = { items: [{ id: tier.name, name: `${tier.name} Fan Card`, price: tier.price, qty: 1 }], total: tier.price, event: `${tier.name} Fan Card - Annual` };
    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/cart");
  };

  const isDiamond = tier.name === "Diamond";
  const isPlatinum = tier.name === "Platinum";

  return (
    <button onClick={join} className={`mt-4 w-full py-2 rounded-full text-sm font-bold ${isDiamond ? "bg-pink-600 text-white hover:bg-pink-500" : isPlatinum ? "bg-purple-600 text-white hover:bg-purple-500" : "bg-white text-black hover:bg-gray-200"}`}>
      Join {tier.name}
    </button>
  );
}