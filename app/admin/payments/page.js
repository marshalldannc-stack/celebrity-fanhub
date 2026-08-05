import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PaymentRequestsPage() {
  let requests = [];
  try {
    requests = await prisma.paymentRequest.findMany({ orderBy: { createdAt: "desc" } });
  } catch {}

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payment Requests</h1>
      {requests.length === 0 ? (
        <p className="text-gray-400">No payment requests yet.</p>
      ) : (
        <div className="border border-gray-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Method</th>
                <th className="p-3 text-left">Event</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id} className="border-b border-gray-700">
                  <td className="p-3 text-xs">{r.orderId}</td>
                  <td className="p-3">{r.email}</td>
                  <td className="p-3">{r.method}</td>
                  <td className="p-3">{r.event}</td>
                  <td className="p-3">${r.amount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${r.status === "pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}