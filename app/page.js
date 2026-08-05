import Link from "next/link";
import prisma from "@/lib/prisma";
import Newsletter from "@/components/Newsletter";

export const dynamic = "force-dynamic";

async function getSettings() {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: "site" } });
    if (row?.value) return JSON.parse(row.value);
  } catch {}
  return {};
}

export default async function HomePage() {
  const settings = await getSettings();

  const socials = [
    { name: "Instagram", url: settings.instagram, icon: "📷" },
    { name: "Twitter", url: settings.twitter, icon: "𝕏" },
    { name: "YouTube", url: settings.youtube, icon: "▶️" },
    { name: "TikTok", url: settings.tiktok, icon: "🎵" },
  ].filter(s => s.url);

  return (
    <div>
      <section className="text-center py-20" style={settings.heroImage ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${settings.heroImage})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">{settings.artistName || "Artist Name"}</h1>
        <p className="text-gray-400 text-lg mb-8">{settings.bio || "Official Fan Hub"}</p>
        <div className="flex gap-4 justify-center">
          <Link href="/events" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg">Tour Dates</Link>
          <Link href="/merch" className="border border-white text-white px-8 py-4 rounded-full font-bold text-lg">Shop Merch</Link>
        </div>
        {socials.length > 0 && (
          <div className="flex gap-4 justify-center mt-6">
            {socials.map(s => (
              <a key={s.name} href={s.url} target="_blank" className="text-2xl hover:scale-110 transition" title={s.name}>{s.icon}</a>
            ))}
          </div>
        )}
      </section>

      {settings.news && (
        <section className="max-w-2xl mx-auto mt-8 border border-purple-500/50 bg-purple-500/10 rounded-xl p-6 text-center">
          <p className="text-purple-400 text-sm font-bold mb-2">📢 Latest News</p>
          <p className="text-gray-300 whitespace-pre-line">{settings.news}</p>
        </section>
      )}

      {settings.videoUrl && (
        <section className="max-w-3xl mx-auto mt-12">
          <h2 className="text-xl font-bold mb-4 text-center">📺 Featured Video</h2>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe src={settings.videoUrl} className="w-full h-full" allowFullScreen></iframe>
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
        <Link href="/events" className="border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500 transition">
          {settings.eventsImage ? <img src={settings.eventsImage} className="w-full h-40 object-cover" /> : <div className="w-full h-40 bg-gray-800 flex items-center justify-center text-5xl">🎵</div>}
          <div className="p-6 text-center"><h3 className="font-bold text-lg">Events</h3></div>
        </Link>
        <Link href="/fan-card" className="border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500 transition">
          {settings.fanCardImage ? <img src={settings.fanCardImage} className="w-full h-40 object-cover" /> : <div className="w-full h-40 bg-gray-800 flex items-center justify-center text-5xl">💳</div>}
          <div className="p-6 text-center"><h3 className="font-bold text-lg">Fan Card</h3></div>
        </Link>
        <Link href="/merch" className="border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500 transition">
          {settings.merchImage ? <img src={settings.merchImage} className="w-full h-40 object-cover" /> : <div className="w-full h-40 bg-gray-800 flex items-center justify-center text-5xl">👕</div>}
          <div className="p-6 text-center"><h3 className="font-bold text-lg">Merch</h3></div>
        </Link>
      </section>

      <Newsletter />

      <footer className="text-center text-gray-600 text-xs mt-20 py-8 border-t border-gray-800">
        <p>© 2026 {settings.artistName || "FanHub"}. All rights reserved.</p>
        {socials.length > 0 && (
          <div className="flex gap-3 justify-center mt-2">
            {socials.map(s => (
              <a key={s.name} href={s.url} target="_blank" className="hover:text-gray-400">{s.name}</a>
            ))}
          </div>
        )}
      </footer>
    </div>
  );
}