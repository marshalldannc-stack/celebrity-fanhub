import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const { email, name } = await request.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
  
  try {
    await prisma.subscriber.create({ data: { email, name: name || "" } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}