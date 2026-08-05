import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: "site" } });
    if (row?.value) return NextResponse.json(JSON.parse(row.value));
  } catch {}
  return NextResponse.json({
    artistName: "Artist Name",
    heroImage: "",
    logo: "",
    bio: "Official Fan Hub",
    primaryColor: "purple",
    eventsImage: "",
    fanCardImage: "",
    merchImage: "",
  });
}

export async function POST(request) {
  const body = await request.json();
  try {
    await prisma.siteSetting.upsert({
      where: { key: "site" },
      update: { value: JSON.stringify(body) },
      create: { key: "site", value: JSON.stringify(body) },
    });
  } catch {}
  return NextResponse.json({ success: true });
}