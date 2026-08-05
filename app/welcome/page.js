"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function WelcomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push("/login");
  }, [session]);

  if (!session) return null;

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-3xl font-bold mb-2">Welcome to the FanHub!</h1>
      <p className="text-gray-400 mb-2">You're now an official member, {session.user.email}</p>
      <p className="text-gray-500 text-sm mb-8">Get exclusive access to events, merch, fan cards & more.</p>
      <div className="space-y-3">
        <Link href="/events" className="block w-full bg-purple-600 text-white px-6 py-3 rounded-full font-bold">Browse Events</Link>
        <Link href="/fan-card" className="block w-full border border-white text-white px-6 py-3 rounded-full font-bold">Get Your Fan Card</Link>
        <Link href="/" className="text-gray-400 text-sm mt-4 block">Go to Homepage</Link>
      </div>
    </div>
  );
}