import prisma from "@/lib/prisma";
import AddToCartButton from "./AddToCartButton";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function MerchPage() {
  let items = [];
  try {
    items = await prisma.merchItem.findMany({ orderBy: { createdAt: "desc" } });
  } catch {}

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Merch Store</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="border border-gray-700 rounded-xl p-4 hover:border-purple-500 transition text-center">
            {item.image ? <img src={item.image} loading="lazy" className="w-full h-40 object-cover rounded-lg mb-3 bg-gray-800" /> : <div className="text-5xl mb-3">👕</div>}
            <p className="text-xs text-gray-400">{item.category}</p>
            <h3 className="font-bold mt-1">{item.name}</h3>
            <p className="text-purple-400 font-bold mt-2">${item.price}</p>
            <AddToCartButton item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}