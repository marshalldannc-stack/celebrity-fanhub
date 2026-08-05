import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const { email, password, name } = await request.json();
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "Exists" }, { status: 400 });
  await prisma.user.create({ data: { email, password, name } });
  return NextResponse.json({ success: true });
}