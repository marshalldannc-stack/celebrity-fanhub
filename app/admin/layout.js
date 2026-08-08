"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) router.push("/admin/login");
  }, []);

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/events", label: "Events" },
    { href: "/admin/events/bulk", label: "Bulk Import" },
    { href: "/admin/merch", label: "Merch" },
    { href: "/admin/fan-cards", label: "Fan Cards" },
    { href: "/admin/gallery", label: "Gallery" },
    { href: "/admin/referrals", label: "Referrals" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/subscribers", label: "Subscribers" },
    { href: "/admin/payments", label: "Payments" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <div>
      <nav className="p-4 border-b border-gray-800 bg-black">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white text-2xl bg-gray-800 px-3 py-1 rounded-lg">☰</button>
            <Link href="/admin" className="text-lg font-bold text-purple-400">Admin Panel</Link>
          </div>
          <div className="flex gap-3 items-center">
            <a href="/" target="_blank" className="text-gray-400 text-sm hover:text-white">View Site</a>
            <button onClick={() => { localStorage.removeItem("adminAuth"); router.push("/admin/login"); }} className="bg-red-600 text-white px-3 py-1 rounded-full text-xs">Logout</button>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden mt-4 flex flex-col space-y-2 text-sm">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className={`px-3 py-2 rounded-lg ${pathname === l.href ? "bg-purple-600 text-white" : "text-gray-300 hover:bg-gray-800"}`}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
      <main className="p-4 md:p-6">{children}</main>
    </div>
  );
}