import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

let cache = null;
let cacheTime = 0;

export async function GET() {
  if (cache && Date.now() - cacheTime < 300000) {
    return NextResponse.json(cache);
  }
  
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: "site" } });
    if (row?.value) {
      cache = JSON.parse(row.value);
      cacheTime = Date.now();
      return NextResponse.json(cache);
    }
  } catch {}
  
  return NextResponse.json({
    artistName: "", heroImage: "", bio: "", news: "",
    eventsImage: "", fanCardImage: "", merchImage: "",
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
    cache = body;
    cacheTime = Date.now();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}