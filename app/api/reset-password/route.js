import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const { email } = await request.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    // In production, send an actual email. For now, just log it.
    console.log("Password reset requested for:", email);
  }
  return NextResponse.json({ success: true });
}