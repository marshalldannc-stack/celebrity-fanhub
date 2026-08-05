import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getSettings() {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: "site" } });
    if (row?.value) return JSON.parse(row.value);
  } catch {}
  return {};
}

export const metadata = { title: "About" };

export default async function AboutPage() {
  const s = await getSettings();
  const achievements = s.aboutAchievements ? s.aboutAchievements.split("\n").filter(a => a.trim()) : [];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About {s.artistName || "Us"}</h1>
      {s.aboutStory ? (
        <div className="text-gray-300 whitespace-pre-line leading-relaxed">{s.aboutStory}</div>
      ) : (
        <p className="text-gray-400">Bio coming soon.</p>
      )}
      {achievements.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Achievements</h2>
          <ul className="space-y-2">
            {achievements.map((a, i) => (
              <li key={i} className="flex gap-2 text-gray-300">🏆 {a.trim()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}