import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  let users = [];
  try {
    users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  } catch {}

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Registered Users</h1>
      {users.length === 0 ? (
        <p className="text-gray-400">No users yet.</p>
      ) : (
        <div className="border border-gray-700 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-gray-700">
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 text-gray-400">{u.name || "-"}</td>
                  <td className="p-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}