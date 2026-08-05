import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// We'll store settings in the database as a simple key-value
let settings = { artistName: "Artist Name", heroImage: "", logo: "", bio: "Official Fan Hub", primaryColor: "purple" };

export async function GET() {
  try {
    // Use subscriber table to store settings (hack, but works)
    const data = await prisma.subscriber.findFirst({ where: { email: "__settings__" } });
    if (data?.name) {
      return NextResponse.json(JSON.parse(data.name));
    }
  } catch {}
  return NextResponse.json(settings);
}

export async function POST(request) {
  const body = await request.json();
  settings = body;
  try {
    await prisma.subscriber.upsert({
      where: { email: "__settings__" },
      update: { name: JSON.stringify(body) },
      create: { email: "__settings__", name: JSON.stringify(body) },
    });
  } catch {}
  return NextResponse.json({ success: true });
}