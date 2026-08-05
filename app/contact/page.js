import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getSettings() {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: "site" } });
    if (row?.value) return JSON.parse(row.value);
  } catch {}
  return {};
}

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const s = await getSettings();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <div className="space-y-4">
        {s.contactEmail && (
          <div className="border border-gray-700 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-white">{s.contactEmail}</p>
          </div>
        )}
        {s.contactPhone && (
          <div className="border border-gray-700 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Phone</p>
            <p className="text-white">{s.contactPhone}</p>
          </div>
        )}
        {!s.contactEmail && !s.contactPhone && (
          <p className="text-gray-400">Contact info coming soon.</p>
        )}
      </div>
    </div>
  );
}