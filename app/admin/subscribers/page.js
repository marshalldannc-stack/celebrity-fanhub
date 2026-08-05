import prisma from "@/lib/prisma";

export default async function SubscribersPage() {
  let subscribers = [];
  try {
    subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
  } catch {}

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Newsletter Subscribers</h1>
      {subscribers.length === 0 ? (
        <p className="text-gray-400">No subscribers yet.</p>
      ) : (
        <div className="border border-gray-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-b border-gray-700">
                  <td className="p-3">{s.email}</td>
                  <td className="p-3 text-gray-400">{s.name || "-"}</td>
                  <td className="p-3 text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}