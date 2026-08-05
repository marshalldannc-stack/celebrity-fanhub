import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: "fanCardTiers" } });
    if (row?.value) return NextResponse.json(JSON.parse(row.value));
  } catch {}
  return NextResponse.json([]);
}

export async function POST(request) {
  const body = await request.json();
  try {
    await prisma.siteSetting.upsert({
      where: { key: "fanCardTiers" },
      update: { value: JSON.stringify(body) },
      create: { key: "fanCardTiers", value: JSON.stringify(body) },
    });
  } catch {}
  return NextResponse.json({ success: true });
}