import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  
  if (code) {
    // Track a click
    try {
      await prisma.referralCode.updateMany({
        where: { code },
        data: { clicks: { increment: 1 } },
      });
    } catch {}
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  // Return all referral stats
  const codes = await prisma.referralCode.findMany({ orderBy: { sales: "desc" } });
  const sales = await prisma.referralSale.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ codes, sales });
}

export async function POST(request) {
  const body = await request.json();
  
  if (body.action === "create") {
    const code = await prisma.referralCode.create({
      data: {
        code: body.code || "ref-" + Date.now().toString(36),
        name: body.name || "Partner",
      },
    });
    return NextResponse.json(code);
  }
  
  if (body.action === "sale") {
    await prisma.referralCode.updateMany({
      where: { code: body.code },
      data: { sales: { increment: 1 }, revenue: { increment: body.amount || 0 } },
    });
    await prisma.referralSale.create({
      data: {
        code: body.code,
        amount: body.amount || 0,
        event: body.event || "",
        email: body.email || "",
      },
    });
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: "Invalid action" });
}