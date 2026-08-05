import Link from "next/link";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getSettings() {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: "site" } });
    if (row?.value) return JSON.parse(row.value);
  } catch {}
  return {};
}

export default async function UpdatesPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Latest Updates</h1>
      
      {settings.news ? (
        <div className="border border-gray-700 rounded-xl p-6">
          <p className="text-gray-300 whitespace-pre-line">{settings.news}</p>
          <p className="text-gray-500 text-xs mt-4">Posted by {settings.artistName || "Admin"}</p>
        </div>
      ) : (
        <p className="text-gray-400">No updates yet. Check back soon!</p>
      )}

      <div className="mt-8">
        <Link href="/events" className="text-purple-400 text-sm">← View Events</Link>
      </div>
    </div>
  );
}